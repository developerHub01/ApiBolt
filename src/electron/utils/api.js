import axios from 'axios';
import { getRawContentType } from './utils.js';
import { parseSetCookie } from './cookies.js';

export const fetchApi = async (_, payload) => {
  const {
    method,
    url,
    hiddenHeaders,
    bodyType,
    formData,
    xWWWformDataUrlencoded,
    rawData,
    binaryData,
    rawSubType,
  } = payload;

  let { headers } = payload;

  let data = null;
  headers = {
    ...headers,
    ...hiddenHeaders,
  };

  switch (bodyType) {
    case "none":
      data = null;
      break;
    case "raw":
      headers["Content-Type"] = getRawContentType(rawSubType ?? "text");
      data = rawData;
      break;
    case "form-data":
      if (!formData) break;
      const formPayload = new FormData();
      for (const { key, value } of formData) {
        if (value instanceof File) {
          formPayload.append(key, value);
        } else if (Array.isArray(value) && value[0] instanceof File) {
          value.forEach((file) => formPayload.append(key, file));
        } else if (typeof value === "string") {
          formPayload.append(key, value);
        }
      }
      data = formPayload;
      delete headers["Content-Type"];
      break;
    case "x-www-form-urlencoded":
      if (!xWWWformDataUrlencoded) break;
      const urlSearchParams = new URLSearchParams();
      xWWWformDataUrlencoded.forEach(({ key, value }) => {
        urlSearchParams.append(key, value);
      });
      data = urlSearchParams;
      headers["Content-Type"] = "application/x-www-form-urlencoded";
      break;
    case "binary":
      headers["Content-Type"] = "application/octet-stream";
      data = binaryData;
      break;
    default:
      throw new Error("Unsupported body type");
  }

  try {
    const res = await axios({
      method,
      url,
      headers,
      data,
      withCredentials: true,
      maxRedirects: 5,
    });
    
    const cookies = parseSetCookie(res.headers["set-cookie"]);

    return {
      headers: res.headers,
      status: res.status,
      statusText: res.statusText,
      data: res.data,
      cookies,
    };
  } catch (error) {
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
