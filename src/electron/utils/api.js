import axios from "axios";
import { getRawContentType } from "./utils.js";
import { parseSetCookie } from "./cookies.js";
import { jar } from "../main.js";
import { getCookiesByDomain, saveCookiesToFile } from "./cookieManager.js";
import { getBodyBinary } from "../db/bodyBinaryDB.js";
import path from "path";
import fs from "fs";
import { Blob } from "buffer";
import { readFile, access } from "fs/promises";
import { getBodyFormDataByFormId } from "../db/bodyFormDataDB.js";

export const fetchApi = async (_, payload) => {
  payload = await apiPayloadHandler(payload);
  
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

    return {
      headers: res.headers,
      status: res.status,
      statusText: res.statusText,
      data: res.data,
      cookies,
    };
  } catch (error) {
    console.log(error);
    if (axios.isAxiosError(error) && error.response) {
      return {
        data: error.response.data,
        headers: error.response.headers,
        status: error.response.status,
        statusText: error.response.statusText,
        statusDescription: "",
      };
    } else {
      return {
        data: null,
        headers: {},
        status: 0,
        statusText: "Network Error",
        statusDescription:
          "Could not connect to the server. Check your internet or API URL.",
      };
    }
  }
};

const apiPayloadHandler = async (payload) => {
  const {
    bodyType,
    formData,
    xWWWformDataUrlencoded,
    rawData,
    binaryData,
    rawSubType,
  } = payload;

  const updatedPayload = {
    withCredentials: true,
    url: payload.url,
    method: payload.method,
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
          await access(filePath);

          const fileBuffer = await readFile(filePath);
          const filename = path.basename(filePath);

          const blob = new Blob([fileBuffer]);
          formPayload.append(key, blob, filename);
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
