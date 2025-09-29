import axios from "axios";
import { getPayloadSize, getRawContentType, requestDataSize } from "./utils.js";
import { parseSetCookie } from "./cookies.js";
import { jar } from "../main.js";
import { getCookiesByDomain, saveCookiesToFile } from "./cookieManager.js";
import { getBodyBinary } from "../db/bodyBinaryDB.js";
import path from "path";
import fs, { constants } from "fs";
import { access } from "fs/promises";
import FormData from "form-data";
import mime from "mime-types";
import { getBodyFormDataByFormId } from "../db/bodyFormDataDB.js";
import { getHttpStatusByCode } from "../db/httpStatusDB.js";

export const fetchApi = async (_, rawPayload) => {
  const payload = await apiPayloadHandler(rawPayload);
  let responsePayload = {};

  try {
    const normalizedUrl = new URL(payload.url).origin;
    const res = await axios(payload);

    const setCookies = res.headers["set-cookie"] || [];

    await Promise.all(
      setCookies.map((cookie) => jar.setCookie(cookie, normalizedUrl))
    );

    saveCookiesToFile();

    const cookies = parseSetCookie(
      Array.from(await getCookiesByDomain(normalizedUrl))
    );

    const statusDetails = await getHttpStatusByCode(String(res.status));

    responsePayload = {
      headers: res.headers,
      status: res.status,
      statusText:
        res.statusText ?? (statusDetails.editedReason || statusDetails.reason),
      statusDescription:
        res.statusDescription ??
        (statusDetails.editedDescription || statusDetails.description),
      data: res.data,
      cookies,
      responseSize: {
        header: getPayloadSize(res.headers) ?? 0,
        body: getPayloadSize(res.data) ?? 0,
      },
    };
  } catch (error) {
    const statusDetails = await getHttpStatusByCode(
      String(error.response.status)
    );

    if (axios.isAxiosError(error) && error.response) {
      responsePayload = {
        data: error.response.data,
        headers: error.response.headers,
        status: error.response.status,
        statusText:
          error.response.statusText ??
          (statusDetails.editedReason || statusDetails.reason),
        statusDescription:
          error.response.statusDescription ??
          (statusDetails.editedDescription || statusDetails.description),
        responseSize: {
          header: getPayloadSize(error.response.headers) ?? 0,
          body: getPayloadSize(error.response.data) ?? 0,
        },
      };
    } else {
      responsePayload = {
        data: null,
        headers: {},
        status: 0,
        statusText: "Network Error",
        statusDescription:
          "Could not connect to the server. Check your internet or API URL.",
        responseSize: {
          header: 0,
          body: 0,
        },
      };
    }
  } finally {
    if (!["get", "option"].includes(payload.method)) {
      responsePayload.requestSize = {
        header: getPayloadSize(payload.headers) ?? 0,
        body: requestDataSize({
          bodyType: rawPayload.bodyType,
          rawData: rawPayload.rawData,
          binaryData: payload.data,
          formData: rawPayload.formData?.map((item) => ({
            key: item.key,
            value: item.value,
          })),
          xWWWformDataUrlencoded: rawPayload.xWWWformDataUrlencoded?.map(
            (item) => ({
              key: item.key,
              value: item.value,
            })
          ),
        }),
      };
    }
    return responsePayload;
  }
};

const apiPayloadHandler = async (payload) => {
  const { bodyType, formData, xWWWformDataUrlencoded, rawData, rawSubType } =
    payload;

  const updatedPayload = {
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
        rawSubType ?? "text"
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
    delete updatedPayload.headers["Content-Length"];
  }
  if (!updatedPayload.data) delete updatedPayload.headers["Content-Type"];

  return updatedPayload;
};

export const getBodyFormData = async (formData) => {
  const formPayload = new FormData();

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
  let data;
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
