import axios from "axios";
import {
  getPayloadSize,
  getRawContentType,
  requestDataSize,
} from "@/main/utils/utils.js";
import { parseSetCookie } from "@/main/utils/cookies.js";
import { client, jar } from "@/main/index.js";
import { jarManager } from "@/main/utils/cookieManager.js";
import { getBodyBinary } from "@/main/db/bodyBinaryDB.js";
import path from "node:path";
import fs, { constants } from "node:fs";
import { access } from "node:fs/promises";
import FormData from "form-data";
import mime from "mime-types";
import { getBodyFormDataByFormId } from "@/main/db/bodyFormDataDB.js";
import { getHttpStatusByCode } from "@/main/db/httpStatusDB.js";
import {
  APIPayloadBody,
  ResponseInterface,
} from "@shared/types/request-response.types.js";
import { ElectronAPIInterface } from "@shared/types/api/electron-api";

/* 

  const updatedPayload = {
    withCredentials: true,
    url: payload.url,
    method: payload.method ?? "get",
    headers: payload.headers
  };
*/

interface APIPayloadInterface extends Pick<
  APIPayloadBody,
  "headers" | "url" | "method"
> {
  withCredentials?: boolean;
  data?: FormData | URLSearchParams | string | fs.ReadStream;
}

export const fetchApi: ElectronAPIInterface["fetchApi"] = async (
  rawPayload: APIPayloadBody,
) => {
  if (!client || !jar) throw new Error();
  const payload = await apiPayloadHandler(rawPayload);

  let responsePayload: ResponseInterface = {
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

  try {
    const normalizedUrl = new URL(payload.url).origin;
    const res = await client(payload);

    const setCookies = res.headers["set-cookie"] || [];

    await Promise.all(
      setCookies.map(cookie => jar?.setCookie(cookie, normalizedUrl)),
    );

    await jarManager.saveToDB();

    const cookies = parseSetCookie(
      (await jarManager.getCookiesByDomain(normalizedUrl)) ?? [],
    );

    const statusDetails = await getHttpStatusByCode(String(res.status));
    if (!statusDetails) throw new Error();

    responsePayload = {
      ...responsePayload,
      headers: res.headers,
      status: res.status,
      statusText:
        res.statusText ?? (statusDetails.editedReason || statusDetails.reason),
      statusDescription:
        statusDetails.editedDescription || statusDetails.description,
      data: res.data,
      cookies,
      responseSize: {
        header:
          getPayloadSize(
            Object.entries(res.headers).map(([key, value]) => ({
              id: key,
              key,
              value: String(value),
            })),
          ) ?? 0,
        body: getPayloadSize(res.data) ?? 0,
      },
    };
  } catch (error: unknown) {
    if (axios.isAxiosError(error)) {
      const errRes = error.response;
      /* Server responded with error status (4xx, 5xx) */

      if (errRes) {
        const statusDetails = await getHttpStatusByCode(String(errRes.status));
        responsePayload = {
          ...responsePayload,
          data: errRes.data,
          headers: errRes.headers,
          status: errRes.status,
          statusText:
            errRes.statusText ??
            statusDetails?.editedReason ??
            statusDetails?.reason ??
            "",
          statusDescription:
            statusDetails?.editedDescription ??
            statusDetails?.description ??
            "",
          responseSize: {
            header:
              getPayloadSize(
                Object.entries(errRes.headers).map(([key, value]) => ({
                  id: key,
                  key,
                  value: String(value),
                })),
              ) ?? 0,
            body: getPayloadSize(errRes.data) ?? 0,
          },
        };
      } else if (error.request) {
        responsePayload = {
          ...responsePayload,
          data: null,
          headers: {},
          status: 0,
          statusText: "Network Error",
          statusDescription: error.message,
          responseSize: { header: 0, body: 0 },
        };
      } else {
        responsePayload = {
          ...responsePayload,
          data: null,
          headers: {},
          status: 0,
          statusText: "Request Error",
          statusDescription: (error as Error).message,
          responseSize: { header: 0, body: 0 },
        };
      }
    } else {
      /* Something else happened (error in request setup, etc.) */
      responsePayload = {
        ...responsePayload,
        data: null,
        headers: {},
        status: 0,
        statusText: "Request Error",
        statusDescription:
          "An unexpected error occurred while setting up the request.",
        responseSize: {
          header: 0,
          body: 0,
        },
      };
    }
  } finally {
    if (!["get", "option"].includes(payload.method)) {
      responsePayload.requestSize = {
        ...responsePayload,
        header:
          getPayloadSize(
            Object.entries(payload.headers).map(([key, value]) => ({
              id: key,
              key,
              value: String(value),
            })),
          ) ?? 0,
        body: requestDataSize({
          bodyType: rawPayload.bodyType,
          rawData: rawPayload.rawData,
          binaryData:
            typeof payload.data === "string" ? payload.data : undefined,
          formData: rawPayload.formData?.map(item => ({
            id: item.id,
            key: item.key,
            value: item.value,
          })),
          xWWWformDataUrlencoded: rawPayload.xWWWformDataUrlencoded?.map(
            item => ({
              id: item.id,
              key: item.key,
              value: item.value,
            }),
          ),
        }),
      };
    }
  }
  return responsePayload;
};

const apiPayloadHandler = async (payload: APIPayloadBody) => {
  const { bodyType, formData, xWWWformDataUrlencoded, rawData, rawSubType } =
    payload;

  const updatedPayload: APIPayloadInterface = {
    withCredentials: true,
    url: payload.url,
    method: payload.method ?? "get",
    headers: payload.headers,
  };

  updatedPayload.data = undefined;

  switch (bodyType) {
    case "none": {
      delete updatedPayload.data;
      break;
    }
    case "raw": {
      updatedPayload.headers["Content-Type"] = getRawContentType(
        rawSubType ?? "text",
      );
      updatedPayload.data = rawData;
      break;
    }
    case "form-data": {
      if (!formData) break;
      updatedPayload.data = await getBodyFormData(formData);
      delete updatedPayload.headers["Content-Type"];
      break;
    }
    case "x-www-form-urlencoded": {
      if (!xWWWformDataUrlencoded) break;
      const urlSearchParams = new URLSearchParams();
      xWWWformDataUrlencoded.forEach(({ key, value }) => {
        urlSearchParams.append(key, value);
      });
      updatedPayload.data = urlSearchParams;
      updatedPayload.headers["Content-Type"] =
        "application/x-www-form-urlencoded";
      break;
    }
    case "binary": {
      const { contentType, data } = await getBodyBinaryData();

      updatedPayload.headers["Content-Type"] = contentType;

      if (!data) delete updatedPayload.data;
      else updatedPayload.data = data;
      break;
    }
    default: {
      delete updatedPayload.data;
    }
  }

  if (["get", "head"].includes(updatedPayload.method?.toLowerCase())) {
    delete updatedPayload.data;
    delete updatedPayload.headers["Content-Type"];
  }
  if (!updatedPayload.data) delete updatedPayload.headers["Content-Type"];
  delete updatedPayload.headers["Content-Length"];

  return updatedPayload;
};

export const getBodyFormData = async (
  formData: APIPayloadBody["formData"],
): Promise<FormData> => {
  const formPayload = new FormData();
  if (!formData) return formPayload;

  for (const { id, key, value } of formData) {
    if (!key?.trim()) continue;

    // Fetch external data if value is undefined (your custom logic)
    const currentValue =
      typeof value === "undefined"
        ? (await getBodyFormDataByFormId(id))?.value
        : value;
    if (!currentValue) continue;

    if (Array.isArray(currentValue)) {
      for (const filePath of currentValue) {
        if (!filePath?.trim()) continue;
        try {
          /* checking existance and permission both */
          await access(filePath, constants.R_OK);
          const filename = path.basename(filePath);
          const mimeType = mime.lookup(filePath) || "application/octet-stream";

          formPayload.append(key, fs.createReadStream(filePath), {
            filename,
            contentType: mimeType,
          });
        } catch (err) {
          console.warn(`File not found or not readable: ${filePath}`, err);
        }
      }
    } else if (typeof currentValue === "string") {
      formPayload.append(key, currentValue);
    }
  }

  return formPayload;
};

const getBodyBinaryData = async () => {
  const contentType = "application/octet-stream";
  let data: fs.ReadStream | undefined;
  const binaryData = await getBodyBinary();
  if (binaryData?.path) {
    try {
      await access(binaryData.path, constants.R_OK);
      /* non-blocking read */
      data = fs.createReadStream(binaryData.path);
    } catch {
      console.warn(`File not found or unreadable: ${binaryData.path}`);
    }
  }

  return {
    contentType,
    data,
  };
};
