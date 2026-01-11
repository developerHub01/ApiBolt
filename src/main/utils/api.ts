import { Pool, FormData as UndiciFormData, Dispatcher } from "undici";
import fs from "fs";
import zlib from "zlib";
import { promisify } from "util";
import { getRawContentType } from "@/main/utils/utils.js";
import { parseSetCookie } from "@/main/utils/cookies.js";
import { jar } from "@/main/index.js";
import { jarManager } from "@/main/utils/cookieManager.js";
import { getBodyBinary } from "@/main/db/bodyBinaryDB.js";
import { getBodyFormDataByFormId } from "@/main/db/bodyFormDataDB.js";
import { getHttpStatusByCode } from "@/main/db/httpStatusDB.js";
import {
  APIPayloadBody,
  ResponseInterface,
} from "@shared/types/request-response.types.js";
import { ElectronAPIInterface } from "@shared/types/api/electron-api";

const gunzip = promisify(zlib.gunzip);
const inflate = promisify(zlib.inflate);
const brotliDecompress = promisify(zlib.brotliDecompress);

const SETTINGS = {
  requestTimeout: 30000,
  maxResponseSize: 50,
  sslVerification: true,
  disableCookies: false,
};

interface InternalPayload {
  method: Dispatcher.HttpMethod;
  headers: Record<string, string>;
  data: string | Buffer | UndiciFormData | fs.ReadStream | null;
}

export const fetchApi: ElectronAPIInterface["fetchApi"] = async (
  rawPayload: APIPayloadBody,
): Promise<ResponseInterface> => {
  if (!SETTINGS.disableCookies && !jar)
    throw new Error("Cookie Jar not initialized");

  const urlObj: URL = new URL(rawPayload.url);
  const normalizedUrl: string = urlObj.origin;
  const payload: InternalPayload = await apiPayloadHandler(rawPayload);

  if (!SETTINGS.disableCookies) {
    const cookieString: string | undefined = await jar!.getCookieString(
      rawPayload.url,
    );
    if (cookieString) payload.headers.Cookie = cookieString;
  }

  const pool: Pool = new Pool(urlObj.origin, {
    connect: {
      rejectUnauthorized: SETTINGS.sslVerification,
    },
  });

  try {
    const response: Dispatcher.ResponseData = await pool.request({
      path: urlObj.pathname + urlObj.search,
      method: payload.method,
      headers: payload.headers,
      body: payload.data,
      headersTimeout: SETTINGS.requestTimeout,
      bodyTimeout: SETTINGS.requestTimeout,
    });

    const setCookie = response.headers["set-cookie"];
    if (!SETTINGS.disableCookies && setCookie) {
      const cookieArray: Array<string> = Array.isArray(setCookie)
        ? setCookie
        : [setCookie];
      for (const str of cookieArray)
        await jar!.setCookie(str, rawPayload.url).catch(() => {});
      await jarManager.saveToDB();
    }

    const chunks: Array<Buffer> = [];
    let receivedBytes: number = 0;
    for await (const chunk of response.body) {
      const b: Buffer = chunk as Buffer;
      receivedBytes += b.length;
      if (
        SETTINGS.maxResponseSize > 0 &&
        receivedBytes > SETTINGS.maxResponseSize * 1024 * 1024
      )
        throw new Error("MAX_SIZE_EXCEEDED");
      chunks.push(b);
    }

    let buffer: Buffer = Buffer.concat(chunks);

    const encoding: string | Array<string> | undefined =
      response.headers["content-encoding"];
    if (encoding === "gzip") buffer = await gunzip(buffer);
    else if (encoding === "deflate") buffer = await inflate(buffer);
    else if (encoding === "br") buffer = await brotliDecompress(buffer);

    const rawString: string = buffer.toString();
    let finalData: Record<string, unknown> | string | null = rawString;

    const contentType: string = String(response.headers["content-type"] || "");
    if (
      contentType.includes("application/json") &&
      rawString.trim().length > 0
    ) {
      try {
        finalData = JSON.parse(rawString) as Record<string, unknown>;
      } catch {
        finalData = rawString;
      }
    }

    const statusDetails = await getHttpStatusByCode(
      String(response.statusCode),
    );
    const cookies = !SETTINGS.disableCookies
      ? parseSetCookie(
          (await jarManager.getCookiesByDomain(normalizedUrl)) ?? [],
        )
      : [];

    return {
      status: response.statusCode,
      headers: response.headers as Record<string, string>,
      data: finalData,
      cookies,
      statusText: statusDetails?.reason ?? "OK",
      statusDescription: statusDetails?.description ?? "",
      requestSize: {
        header: 0,
        body: 0,
      },
      responseSize: {
        header: JSON.stringify(response.headers).length,
        body: receivedBytes,
      },
    };
  } catch (err: unknown) {
    const error = err as Error & { code?: string };
    return {
      status: 0,
      headers: {},
      data: null,
      cookies: [],
      statusText: getDetailedErrorStatus(error),
      statusDescription: error.message,
      requestSize: {
        header: 0,
        body: 0,
      },
      responseSize: {
        header: 0,
        body: 0,
      },
    };
  } finally {
    await pool.close();
  }
};

const getDetailedErrorStatus = (error: Error & { code?: string }): string => {
  if (error.message === "MAX_SIZE_EXCEEDED")
    return "Max Response Size Exceeded";
  switch (error.code) {
    case "UND_ERR_INVALID_ARG":
      return "Invalid Request Headers (Content-Length)";
    case "ETIMEDOUT":
      return "Request Timeout";
    case "ECONNREFUSED":
      return "Connection Refused";
    default:
      return error.code ? `Transfer Error (${error.code})` : "Transfer Error";
  }
};

const apiPayloadHandler = async (
  payload: APIPayloadBody,
): Promise<InternalPayload> => {
  const {
    bodyType,
    formData,
    xWWWformDataUrlencoded,
    rawData,
    rawSubType,
    method,
    headers: rawHeaders,
  } = payload;

  const headers: Record<string, string> = {
    ...rawHeaders,
  };

  Object.keys(headers).forEach((key: string) => {
    if (key.toLowerCase() === "content-length") delete headers[key];
  });

  let data: string | Buffer | UndiciFormData | fs.ReadStream | null = null;
  const upperMethod: Dispatcher.HttpMethod = (method?.toUpperCase() ??
    "GET") as Dispatcher.HttpMethod;

  if (!["GET", "HEAD"].includes(upperMethod)) {
    if (bodyType === "raw") {
      headers["Content-Type"] = getRawContentType(rawSubType ?? "text");
      data = rawData || "";
    } else if (bodyType === "form-data" && formData) {
      const form: UndiciFormData = new UndiciFormData();
      for (const { id, key, value } of formData) {
        if (!key?.trim()) continue;
        const current: string | Array<string> | undefined =
          typeof value === "undefined"
            ? (await getBodyFormDataByFormId(id))?.value
            : value;

        if (!current) continue;

        if (Array.isArray(current)) {
          for (const path of current) {
            const fileBuf: Buffer = await fs.promises.readFile(path);
            form.append(key, new Blob([new Uint8Array(fileBuf)]));
          }
        } else form.append(key, String(current));
      }
      data = form;
    } else if (bodyType === "x-www-form-urlencoded" && xWWWformDataUrlencoded) {
      const params: URLSearchParams = new URLSearchParams();
      xWWWformDataUrlencoded.forEach(i => params.append(i.key, i.value));
      data = params.toString();
      headers["Content-Type"] = "application/x-www-form-urlencoded";
    } else if (bodyType === "binary") {
      const binary = await getBodyBinary();
      if (binary?.path) {
        data = fs.createReadStream(binary.path);
        headers["Content-Type"] = "application/octet-stream";
      }
    }
  }

  return {
    method: upperMethod,
    headers,
    data,
  };
};

/*
 * CODE EXPLANATION:
 * * 1. POOL CONNECTION MANAGEMENT:
 * Uses Undici's Pool to manage HTTP connections. This is significantly faster
 * than standard fetch as it reuses established sockets for subsequent requests
 * to the same origin.
 * * 2. COOKIE SYNCHRONIZATION:
 * Before the request, relevant cookies are pulled from the Jar. After the
 * request, any 'set-cookie' headers are parsed and persisted back to the
 * database, ensuring session continuity like a browser.
 * * 3. MEMORY-SAFE STREAMING:
 * The response body is processed as an AsyncIterable stream. This prevents
 * loading massive files into RAM at once. The engine monitors total
 * received bytes and aborts if the 'maxResponseSize' limit is exceeded.
 * * 4. AUTOMATIC DECOMPRESSION:
 * Standard APIs often return Gzip, Brotli, or Deflate encodings to save
 * bandwidth. This engine detects the 'content-encoding' header and uses
 * Node's 'zlib' module to decompress the buffer into readable text.
 * * 5. DATA TYPE NORMALIZATION:
 * The 'apiPayloadHandler' converts various body types (Multipart, Binary,
 * URL-Encoded, Raw) into formats Undici can stream efficiently. It also
 * strips manual 'Content-Length' headers to prevent conflict with
 * Undici's internal length calculations.
 */
