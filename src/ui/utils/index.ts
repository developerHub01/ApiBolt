import type {
  APIPayloadBody,
  TRequestBodyType,
} from "@/context/request/RequestResponseProvider";
import axios from "axios";
import { isElectron } from "@/utils/electron";

export const getResponseType = (contentType: string) => {
  if (contentType.includes("application/json")) {
    return "JSON";
  } else if (contentType.includes("text/html")) {
    return "HTML";
  } else if (contentType.includes("text/plain")) {
    return "TEXT";
  } else if (
    contentType.includes("application/javascript") ||
    contentType.includes("application/x-javascript")
  ) {
    return "JavaScript";
  } else if (
    contentType.includes("application/xml") ||
    contentType.includes("text/xml")
  ) {
    return "XML";
  } else {
    return "TEXT";
  }
};

export const getPayloadSize = (data: unknown): number => {
  try {
    const str = typeof data === "string" ? data : JSON.stringify(data);
    return new TextEncoder().encode(str).length;
  } catch (err) {
    console.error("getPayloadSize error:", err);
    return 0;
  }
};

export const formatSize = (size: number) =>
  size > 1024 ? `${(size / 1024).toFixed(2)} KB` : `${size} B`;

export const parseUrlParams = (api: string) => {
  try {
    const url = new URL(api);
    return Array.from(url.searchParams.entries());
  } catch {
    const queryParams = api.split("?")[1] ?? "";
    return Array.from(new URLSearchParams(queryParams).entries());
  }
};

export const getRawContentType = (
  subtype: "json" | "xml" | "html" | "text" | "javascript"
) => {
  switch (subtype) {
    case "json":
      return "application/json";
    case "xml":
      return "application/xml";
    case "html":
      return "text/html";
    case "text":
      return "text/plain";
    case "javascript":
      return "application/javascript";
    default:
      return "text/plain";
  }
};

export const sendRequest = async ({
  method,
  url,
  headers,
  hiddenHeaders,
  bodyType,
  formData,
  xWWWformDataUrlencoded,
  rawData,
  binaryData,
  rawSubType,
}: APIPayloadBody) => {
  let data = null;
  url = ensureAbsoluteUrl(url);
  headers = {
    ...headers,
    ...hiddenHeaders,
  };

  switch (bodyType) {
    case "none": {
      data = null;
      break;
    }

    case "raw": {
      headers["Content-Type"] = getRawContentType(rawSubType ?? "text");
      data = rawData;
      break;
    }

    case "form-data": {
      if (!formData) break;
      const formPayload = new FormData();
      for (const { key, value } of formData) {
        if (value instanceof File) {
          // Single file
          formPayload.append(key, value);
        } else if (Array.isArray(value) && value[0] instanceof File) {
          // Multiple files
          value.forEach((file) => formPayload.append(key, file));
        } else if (typeof value === "string") {
          // Plain string or number
          formPayload.append(key, value);
        }
      }
      data = formPayload;
      delete headers["Content-Type"];
      break;
    }

    case "x-www-form-urlencoded": {
      if (!xWWWformDataUrlencoded) break;

      const urlSearchParams = new URLSearchParams();
      xWWWformDataUrlencoded.forEach(({ key, value }) => {
        urlSearchParams.append(key, value);
      });
      data = urlSearchParams;
      headers["Content-Type"] = "application/x-www-form-urlencoded";
      break;
    }

    case "binary": {
      headers["Content-Type"] = "application/octet-stream";
      data = binaryData;
      break;
    }

    default:
      throw new Error("Unsupported body type");
  }
  
  return axios({
    method,
    url,
    headers,
    data,
    withCredentials: isElectron(),
    maxRedirects: 5,
  });
};

export const requestDataSize = ({
  bodyType,
  formData,
  xWWWformDataUrlencoded,
  rawData,
  binaryData,
}: {
  bodyType: TRequestBodyType;
  formData?: Array<{
    key: string;
    value: string | Array<File>;
  }>;
  xWWWformDataUrlencoded?: Array<{
    key: string;
    value: string;
  }>;
  rawData?: string;
  binaryData?: File;
}) => {
  switch (bodyType) {
    case "binary":
      return getPayloadSize(binaryData);
    case "raw":
      return getPayloadSize(rawData);
    case "form-data":
      return getPayloadSize(formData);
    case "x-www-form-urlencoded":
      return getPayloadSize(xWWWformDataUrlencoded);
    default:
      return 0;
  }
};

export const fileToBase64 = (file: File): Promise<string> =>
  new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => resolve(String(reader.result));
    reader.onerror = reject;
    reader.readAsDataURL(file);
  });

export const converterFileToMetadata = async (
  file: File,
  supportBase64: boolean = false
) => {
  const fileData = {
    name: file.name,
    size: file.size,
    type: file.type,
    lastModified: file.lastModified,
    fileName: file.name,
    mimeType: file.type,
  };

  return {
    ...fileData,
    base64: supportBase64 ? await fileToBase64(file) : undefined,
  };
};

export const base64ToFileObject = (
  base64: string,
  filename: string,
  mimeType: string
): File => {
  const byteString = atob(base64.split(",")[1]); // Decode Base64
  const ab = new ArrayBuffer(byteString.length);
  const ia = new Uint8Array(ab);
  for (let i = 0; i < byteString.length; i++) {
    ia[i] = byteString.charCodeAt(i);
  }

  return new File([ab], filename, { type: mimeType });
};

export const isLocalhost = (url: string) => {
  try {
    const parsedUrl = new URL(url);
    const hostname = parsedUrl.hostname;

    return (
      hostname === "localhost" || hostname === "127.0.0.1" || hostname === "::1"
    );
  } catch {
    console.error("Invalid URL");
    return false;
  }
};

export const ensureAbsoluteUrl = (url: string): string => {
  if (/^https?:\/\//i.test(url)) {
    return url; // already absolute
  }
  return `http://${url}`; // fallback (you can choose https if needed)
};
