import http from "http";
import https from "https";
import fs, { constants } from "fs";
import zlib from "zlib";
import { access } from "fs/promises";
import FormData from "form-data";
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

interface NodeJSSystemError extends Error {
  code?: string;
}

const SETTINGS = {
  httpVersion: "HTTP/1.x",
  requestTimeout: 30000,
  maxResponseSize: 50,
  sslVerification: true,
  disableCookies: false,
  maxRedirects: 10,
};

const fetchInternal = async (
  rawPayload: APIPayloadBody,
  redirectCount: number = 0,
): Promise<ResponseInterface> => {
  if (!SETTINGS.disableCookies && !jar)
    throw new Error("Cookie Jar not initialized");

  const urlObj = new URL(rawPayload.url);
  const normalizedUrl = urlObj.origin;
  const payload = await apiPayloadHandler(rawPayload);

  if (!SETTINGS.disableCookies)
    payload.headers = await injectCookies(payload.headers, rawPayload.url);

  /* * Force headers that Cloudflare and WAFs expect * */
  const cleanHeaders: Record<string, string> = {
    "User-Agent": "PostmanRuntime/7.35.0",
    Accept: "*/*",
    "Accept-Encoding": "gzip, deflate, br",
    Connection: "keep-alive",
    ...payload.headers,
  };

  /* * CLOUDFLARE 400 FIX: Remove Host and Content-Length for bodyless requests * */
  Object.keys(cleanHeaders).forEach(headerKey => {
    const lowerKey = headerKey.toLowerCase();
    if (lowerKey === "host") delete cleanHeaders[headerKey];

    if (
      ["get", "head"].includes(payload.method.toLowerCase()) &&
      lowerKey === "content-length"
    )
      delete cleanHeaders[headerKey];
  });

  const responsePayload: ResponseInterface = {
    headers: {},
    status: 0,
    statusText: "",
    statusDescription: "",
    data: null,
    requestSize: {
      header: 0,
      body: 0,
    },
    responseSize: {
      header: 0,
      body: 0,
    },
  };

  return new Promise(resolve => {
    const isHttps = urlObj.protocol === "https:";
    const transport = isHttps ? https : http;

    const requestOptions: https.RequestOptions = {
      method: payload.method,
      hostname: urlObj.hostname,
      port: urlObj.port || (isHttps ? 443 : 80),
      path: urlObj.pathname + urlObj.search,
      headers: cleanHeaders,
      timeout: SETTINGS.requestTimeout,
      rejectUnauthorized: isHttps ? SETTINGS.sslVerification : undefined,
    };

    const req = transport.request(requestOptions, res => {
      /* * Handle Redirects * */
      if (
        [301, 302, 303, 307, 308].includes(res.statusCode || 0) &&
        res.headers.location
      ) {
        if (redirectCount >= SETTINGS.maxRedirects) {
          resolve(errorResponse("Too many redirects", "REDIRECT_ERROR"));
          return;
        }
        const redirectedUrl = new URL(res.headers.location, rawPayload.url)
          .href;
        resolve(
          fetchInternal(
            {
              ...rawPayload,
              url: redirectedUrl,
            },
            redirectCount + 1,
          ),
        );
        return;
      }

      const setCookie = res.headers["set-cookie"];
      if (!SETTINGS.disableCookies && setCookie) {
        const cookieArray = Array.isArray(setCookie) ? setCookie : [setCookie];
        cookieArray.forEach(cookieString => {
          jar!.setCookie(cookieString, rawPayload.url).catch(() => {});
        });
      }

      /* * Handle Decompression * */
      let stream:
        | http.IncomingMessage
        | zlib.Gunzip
        | zlib.Inflate
        | zlib.BrotliDecompress = res;
      const contentEncoding = res.headers["content-encoding"];

      if (contentEncoding === "gzip") stream = res.pipe(zlib.createGunzip());
      else if (contentEncoding === "deflate")
        stream = res.pipe(zlib.createInflate());
      else if (contentEncoding === "br")
        stream = res.pipe(zlib.createBrotliDecompress());

      const chunks: Array<Buffer> = [];
      let receivedBytes = 0;

      stream.on("data", (chunk: Buffer) => {
        receivedBytes += chunk.length;
        if (
          SETTINGS.maxResponseSize > 0 &&
          receivedBytes > SETTINGS.maxResponseSize * 1024 * 1024
        ) {
          req.destroy(new Error("MAX_SIZE_EXCEEDED"));
          return;
        }
        chunks.push(chunk);
      });

      stream.on("end", async () => {
        if (!SETTINGS.disableCookies) await jarManager.saveToDB();

        const resHeaders: Record<string, string> = {};
        Object.entries(res.headers).forEach(([key, value]) => {
          resHeaders[key] = Array.isArray(value)
            ? value.join(", ")
            : String(value || "");
        });

        const cookies = !SETTINGS.disableCookies
          ? parseSetCookie(
              (await jarManager.getCookiesByDomain(normalizedUrl)) ?? [],
            )
          : [];

        const buffer = Buffer.concat(chunks);
        const rawString = buffer.toString();
        let finalData: ResponseInterface["data"] = rawString;

        const isJson = resHeaders["content-type"]?.includes("application/json");
        if (isJson && rawString.trim().length) {
          try {
            finalData = JSON.parse(rawString);
          } catch (err) {
            /*  */
          }
        }

        const statusDetails = await getHttpStatusByCode(String(res.statusCode));

        resolve({
          ...responsePayload,
          status: res.statusCode || 0,
          headers: resHeaders,
          data: finalData,
          cookies,
          statusText: statusDetails?.reason ?? "OK",
          statusDescription: statusDetails?.description ?? "",
          responseSize: {
            header: JSON.stringify(res.headers).length,
            body: receivedBytes,
          },
        });
      });
    });

    req.on("error", (err: NodeJSSystemError) => {
      resolve({
        ...responsePayload,
        status: 0,
        statusText: getDetailedNodeError(err.code, err.message),
        statusDescription: err.message,
      });
    });

    if (SETTINGS.requestTimeout > 0) {
      req.setTimeout(SETTINGS.requestTimeout, () => {
        req.destroy(new Error("ETIMEDOUT"));
      });
    }

    if (payload.data instanceof FormData) payload.data.pipe(req);
    else if (
      payload.data !== null &&
      payload.data !== undefined &&
      payload.data !== ""
    ) {
      req.write(payload.data);
      req.end();
    } else req.end();
  });
};

export const fetchApi: ElectronAPIInterface["fetchApi"] = rawPayload => {
  return fetchInternal(rawPayload, 0);
};

const injectCookies = async (headers: Record<string, string>, url: string) => {
  const cookieString = await jar!.getCookieString(url);
  if (cookieString) headers["Cookie"] = cookieString;

  return headers;
};

const apiPayloadHandler = async (payload: APIPayloadBody) => {
  const {
    bodyType,
    formData,
    xWWWformDataUrlencoded,
    rawData,
    rawSubType,
    method,
    url,
    headers: rawHeaders,
  } = payload;
  const headers: Record<string, string> = {
    ...rawHeaders,
  };
  let data: string | Buffer | FormData | null = null;
  const upperMethod = method?.toUpperCase() ?? "GET";

  if (!["GET", "HEAD"].includes(upperMethod)) {
    if (bodyType === "raw") {
      headers["Content-Type"] = getRawContentType(rawSubType ?? "text");
      data = rawData || "";
    } else if (bodyType === "form-data" && formData) {
      const form = new FormData();
      for (const { id, key, value } of formData) {
        if (!key?.trim()) continue;

        const current =
          typeof value === "undefined"
            ? (await getBodyFormDataByFormId(id))?.value
            : value;
        if (!current) continue;
        if (Array.isArray(current))
          current.forEach(filePath => {
            form.append(key, fs.createReadStream(filePath));
          });
        else form.append(key, String(current));
      }
      Object.assign(headers, form.getHeaders());
      data = form;
    } else if (bodyType === "x-www-form-urlencoded" && xWWWformDataUrlencoded) {
      const params = new URLSearchParams();
      xWWWformDataUrlencoded.forEach(({ key, value }) => {
        params.append(key, value);
      });
      data = params.toString();
      headers["Content-Type"] = "application/x-www-form-urlencoded";
    } else if (bodyType === "binary") {
      const path = await getBodyBinaryData();
      if (path) {
        headers["Content-Type"] = "application/octet-stream";
        data = fs.readFileSync(path);
      }
    }
  }
  return {
    url,
    method: upperMethod,
    headers,
    data,
  };
};

const getBodyBinaryData = async (): Promise<string | null> => {
  const binary = await getBodyBinary();
  if (binary?.path) {
    try {
      await access(binary.path, constants.R_OK);
      return binary.path;
    } catch (err) {
      return null;
    }
  }
  return null;
};

const getDetailedNodeError = (
  code: string | undefined,
  message: string,
): string => {
  if (message === "MAX_SIZE_EXCEEDED") return "Max Response Size Exceeded";

  switch (code) {
    case "ENOTFOUND":
    case "EAI_AGAIN":
      return "DNS Resolution Failed";
    case "ECONNREFUSED":
      return "Connection Refused";
    case "ECONNRESET":
      return "Connection Reset";
    case "ETIMEDOUT":
    case "ESOCKETTIMEDOUT":
      return "Request Timeout";
    case "CERT_HAS_EXPIRED":
    case "DEPTH_ZERO_SELF_SIGNED_CERT":
    case "UNABLE_TO_VERIFY_LEAF_SIGNATURE":
      return "SSL Certificate Rejected";
    case "ERR_TLS_CERT_ALTNAME_INVALID":
    case "EPROTO":
      return "SSL/TLS Handshake Failed";
    default:
      return code ? `Transfer Error (${code})` : "Transfer Error";
  }
};

const errorResponse = (
  description: string,
  statusText: string,
): ResponseInterface => {
  return {
    headers: {},
    status: 0,
    statusText: statusText,
    statusDescription: description,
    data: null,
    cookies: [],
    requestSize: {
      header: 0,
      body: 0,
    },
    responseSize: {
      header: 0,
      body: 0,
    },
  };
};
