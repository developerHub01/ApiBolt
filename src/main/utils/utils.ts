import { JWTBearerAuthInterface } from "@shared/types/authorization.types";
import {
  APIPayloadBody,
  TContentType,
} from "@shared/types/request-response.types";
import jwt, { Algorithm } from "jsonwebtoken";

export const hasValue = (value: unknown) =>
  value !== null && value !== undefined;

export const getRawContentType = (subtype: TContentType) => {
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

export const generateJWT = ({
  payload,
  secret,
  algorithm,
}: Pick<JWTBearerAuthInterface, "payload" | "secret"> & {
  algorithm: JWTBearerAuthInterface["algo"];
}) =>
  jwt.sign(payload, secret, {
    algorithm: algorithm as Algorithm,
  });

type PayloadKeys =
  | "binaryData"
  | "rawData"
  | "formData"
  | "xWWWformDataUrlencoded";

type TGetPayloadSize = Pick<APIPayloadBody, PayloadKeys>[keyof Pick<
  APIPayloadBody,
  PayloadKeys
>];

export const getPayloadSize = (data: TGetPayloadSize) => {
  try {
    const str =
      typeof data === "string"
        ? data
        : JSON.stringify(data, (_, value) => {
            // skip functions
            if (typeof value === "function") return undefined;
            // handle buffers
            if (value instanceof Buffer) return value.toString("base64");
            // handle streams
            if (value && value.path && value.fd === null)
              return `[ReadStream:${value.path}]`;
            return value;
          });

    return new TextEncoder().encode(str).length;
  } catch (err) {
    console.error("getPayloadSize error:", err);
    return 0;
  }
};

export const requestDataSize = ({
  bodyType,
  formData,
  xWWWformDataUrlencoded,
  rawData,
  binaryData,
}: Pick<
  APIPayloadBody,
  "bodyType" | "formData" | "xWWWformDataUrlencoded" | "rawData" | "binaryData"
>) => {
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
