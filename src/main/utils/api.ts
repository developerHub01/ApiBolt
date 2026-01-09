import { Curl, CurlHttpVersion, CurlCode, HttpPostField } from "node-libcurl";
import fs, { constants } from "fs";
import { access, open } from "fs/promises";
import mime from "mime-types";
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

type CurlHeaderObject = Record<string, string | Array<string> | undefined>;

interface PreparedPayload {
  url: string;
  method: string;
  headers: Record<string, string>;
  data: string | Array<HttpPostField> | number | undefined;
  fileHandle?: fs.promises.FileHandle;
}

/*
 * Global configuration.
 * maxResponseSize is our primary defense against V8 Heap crashes during string conversion.
 */
const SETTINGS = {
  httpVersion: "HTTP/1.x",
  requestTimeout: 0,
  maxResponseSize: 50,
  sslVerification: true,
  disableCookies: false,
};

export const fetchApi: ElectronAPIInterface["fetchApi"] = async (
  rawPayload: APIPayloadBody,
): Promise<ResponseInterface> => {
  /*
   * Guard: ensure cookie infrastructure is ready if stateful requests are enabled.
   */
  if (!SETTINGS.disableCookies && !jar)
    throw new Error("Cookie Jar not initialized");

  const curl = new Curl();
  const normalizedUrl = new URL(rawPayload.url).origin;
  const payload = await apiPayloadHandler(rawPayload);

  /*
   * Pull stored cookies from the jar and inject the 'Cookie' header before cURL starts.
   */
  if (!SETTINGS.disableCookies)
    payload.headers = await injectCookies(payload.headers, rawPayload.url);

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
    /*
     * Finalizer: Closes cURL handles and releases OS file descriptors for uploads.
     */
    const cleanupAndResolve = async (result: ResponseInterface) => {
      if (curl.isOpen) curl.close();
      if (payload.fileHandle)
        await payload.fileHandle
          .close()
          .catch(err => console.error("File close error:", err));
      resolve(result);
    };

    try {
      curl.setOpt(Curl.option.URL, payload.url);
      curl.setOpt(Curl.option.CUSTOMREQUEST, payload.method);

      /*
       * Map UI version selection to libcurl internal constants.
       */
      curl.setOpt(
        Curl.option.HTTP_VERSION,
        SETTINGS.httpVersion === "HTTP/2.0"
          ? CurlHttpVersion.V2_0
          : SETTINGS.httpVersion === "HTTP/1.0"
            ? CurlHttpVersion.V1_0
            : CurlHttpVersion.V1_1,
      );

      if (SETTINGS.requestTimeout > 0)
        curl.setOpt(Curl.option.TIMEOUT_MS, SETTINGS.requestTimeout);

      if (SETTINGS.maxResponseSize > 0)
        curl.setOpt(
          Curl.option.MAXFILESIZE,
          SETTINGS.maxResponseSize * 1024 * 1024,
        );

      curl.setOpt(Curl.option.SSL_VERIFYPEER, SETTINGS.sslVerification ? 1 : 0);
      curl.setOpt(Curl.option.SSL_VERIFYHOST, SETTINGS.sslVerification ? 2 : 0);
      curl.setOpt(Curl.option.ACCEPT_ENCODING, "");

      const headerArray = Object.entries(payload.headers).map(
        ([k, v]) => `${k}: ${v}`,
      );
      curl.setOpt(Curl.option.HTTPHEADER, headerArray);

      /*
       * Payload dispatch: handles multi-part forms, binary streams, or raw strings.
       */
      if (payload.data)
        if (rawPayload.bodyType === "form-data")
          curl.setOpt(
            Curl.option.HTTPPOST,
            payload.data as Array<HttpPostField>,
          );
        else if (rawPayload.bodyType === "binary") {
          curl.setOpt(Curl.option.UPLOAD, true);
          curl.setOpt(Curl.option.READDATA, payload.data as number);
        } else curl.setOpt(Curl.option.POSTFIELDS, payload.data as string);

      /*
       * Real-time header parsing.
       * Captures cookies even during 3xx redirects so they aren't lost.
       */
      curl.on("header", (headerBuffer: Buffer) => {
        if (!SETTINGS.disableCookies)
          processHeaderLine(headerBuffer.toString(), rawPayload.url);
      });

      curl.on(
        "end",
        async (statusCode, data, headersArray: Array<CurlHeaderObject>) => {
          /*
           * Retrieve the header set from the final hop in the request chain.
           */
          const lastHeaderObj = headersArray[headersArray.length - 1] ?? {};
          const resHeaders: Record<string, string> = {};

          Object.entries(lastHeaderObj).forEach(([key, value]) => {
            const lowerKey = key.toLowerCase();
            if (lowerKey !== "result")
              resHeaders[lowerKey] = Array.isArray(value)
                ? value.join(", ")
                : String(value);
          });

          /*
           * Persist all cookies captured via the 'header' event to the local DB.
           */
          if (!SETTINGS.disableCookies) await jarManager.saveToDB();

          const cookies = !SETTINGS.disableCookies
            ? parseSetCookie(
                (await jarManager.getCookiesByDomain(normalizedUrl)) ?? [],
              )
            : [];

          /*
           * JSON Extraction with whitespace validation to prevent parsing empty bodies.
           */
          let finalData = data.toString();
          const isJson =
            resHeaders["content-type"]?.includes("application/json");
          if (isJson && finalData.trim().length)
            try {
              finalData = JSON.parse(finalData);
            } catch (err) {
              /* Return raw data if the JSON is malformed */
            }

          const statusDetails = await getHttpStatusByCode(String(statusCode));

          await cleanupAndResolve({
            ...responsePayload,
            status: statusCode,
            headers: resHeaders,
            data: finalData,
            cookies,
            statusText: statusDetails?.reason ?? "OK",
            statusDescription: statusDetails?.description ?? "",
            responseSize: {
              header: curl.getInfo("HEADER_SIZE") as number,
              body: curl.getInfo("SIZE_DOWNLOAD") as number,
            },
            requestSize: {
              header: curl.getInfo("REQUEST_SIZE") as number,
              body: curl.getInfo("SIZE_UPLOAD") as number,
            },
          });
        },
      );

      /*
       * Error handler for network-level failures (DNS, TCP reset, etc).
       */
      curl.on("error", (err, errorCode) => {
        cleanupAndResolve({
          ...responsePayload,
          status: 0,
          statusText: getDetailedErrorStatus(errorCode),
          statusDescription: err.message,
        });
      });

      curl.perform();
    } catch (e) {
      /*
       * Fallback for immediate synchronous failures.
       */
      cleanupAndResolve({
        ...responsePayload,
        statusText: "Setup Error",
        statusDescription: (e as Error).message,
      });
    }
  });
};

/*
 * Fetches relevant cookies from the jar and prepares the Cookie header.
 */
const injectCookies = async (
  headers: Record<string, string>,
  url: string,
): Promise<Record<string, string>> => {
  const cookieString = await jar!.getCookieString(url);
  if (cookieString) headers["Cookie"] = cookieString;
  return headers;
};

/*
 * Parses a single header line to extract and store Set-Cookie values immediately.
 */
const processHeaderLine = (headerLine: string, url: string): void => {
  if (headerLine.toLowerCase().startsWith("set-cookie:"))
    /* Extract value and immediately pass to the jar catch-block */
    jar!
      .setCookie(headerLine.split(/:(.*)/s)[1]?.trim() ?? "", url)
      .catch(() => {});
};

/*
 * Transforms UI-agnostic payload data into a format libcurl can digest.
 */
const apiPayloadHandler = async (
  payload: APIPayloadBody,
): Promise<PreparedPayload> => {
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
  let data: string | Array<HttpPostField> | number | undefined;
  let fileHandle: fs.promises.FileHandle | undefined;
  const upperMethod = method?.toUpperCase() ?? "GET";

  /*
   * Standardized body handling for write-capable methods.
   */
  if (!["GET", "HEAD"].includes(upperMethod))
    if (bodyType === "raw") {
      headers["Content-Type"] = getRawContentType(rawSubType ?? "text");
      data = rawData;
    } else if (bodyType === "form-data" && formData) {
      data = await getBodyFormData(formData);
      delete headers["Content-Type"];
    } else if (bodyType === "x-www-form-urlencoded" && xWWWformDataUrlencoded) {
      const params = new URLSearchParams();
      xWWWformDataUrlencoded.forEach(({ key, value }) =>
        params.append(key, value),
      );
      data = params.toString();
      headers["Content-Type"] = "application/x-www-form-urlencoded";
    } else if (bodyType === "binary") {
      const path = await getBodyBinaryData();
      if (path) {
        headers["Content-Type"] = "application/octet-stream";
        fileHandle = await open(path, "r");
        data = fileHandle.fd;
      }
    }

  return { url, method: upperMethod, headers, data, fileHandle };
};

/*
 * Aggregates multipart fields and validates file accessibility for uploads.
 */
const getBodyFormData = async (
  formData: APIPayloadBody["formData"],
): Promise<Array<HttpPostField>> => {
  const multipart: Array<HttpPostField> = [];
  if (!formData) return multipart;

  for (const { id, key, value } of formData) {
    if (!key?.trim()) continue;
    const current =
      typeof value === "undefined"
        ? (await getBodyFormDataByFormId(id))?.value
        : value;
    if (!current) continue;
    if (Array.isArray(current))
      for (const filePath of current)
        try {
          await access(filePath, constants.R_OK);
          multipart.push({
            name: key,
            file: filePath,
            type: mime.lookup(filePath) || "application/octet-stream",
          });
        } catch (err) {
          console.error("File access error:", err);
        }
    else
      multipart.push({
        name: key,
        contents: String(current),
      });
  }
  return multipart;
};

/*
 * Locates and validates the binary stream source.
 */
const getBodyBinaryData = async (): Promise<string | null> => {
  const binary = await getBodyBinary();
  if (binary?.path)
    try {
      await access(binary.path, constants.R_OK);
      return binary.path;
    } catch (err) {
      console.error("Binary access error:", err);
      return null;
    }
  return null;
};

/*
 * Map libcurl numeric error codes to developer-friendly strings.
 */
const getDetailedErrorStatus = (code: number): string => {
  switch (code) {
    case CurlCode.CURLE_COULDNT_RESOLVE_PROXY:
      return "Proxy Error";
    case CurlCode.CURLE_COULDNT_RESOLVE_HOST:
      return "DNS Resolution Failed";
    case CurlCode.CURLE_COULDNT_CONNECT:
      return "Connection Refused";
    case CurlCode.CURLE_OPERATION_TIMEDOUT:
      return "Request Timeout";
    case CurlCode.CURLE_SSL_CONNECT_ERROR:
      return "SSL/TLS Handshake Failed";
    case CurlCode.CURLE_SSL_CERTPROBLEM:
      return "SSL Certificate Rejected";
    case CurlCode.CURLE_TOO_MANY_REDIRECTS:
      return "Too Many Redirects";
    case CurlCode.CURLE_ABORTED_BY_CALLBACK:
      return "Max Response Size Exceeded";
    case CurlCode.CURLE_HTTP2:
      return "HTTP/2 Protocol Error";
    default:
      return `Transfer Error (${code})`;
  }
};
