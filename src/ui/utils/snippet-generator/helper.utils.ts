import mime from "mime";
import type { CodeSnippitDataInterface } from "@/types/code-snippit.types";
import { isValidJson, needsQuotesForKey } from "@/utils/helper";
import { codeFormatter } from "@/utils/code";
import { MASKED_AUTHORIZATION } from "@/constant/request-code.constant";

export const getHeadersList = ({
  headers,
  authorization,
  binaryData,
  rawBodyDataType,
  bodyType,
}: Pick<
  CodeSnippitDataInterface,
  "headers" | "authorization" | "binaryData" | "rawBodyDataType" | "bodyType"
>): Array<{
  key: string;
  value?: string;
}> => {
  const headerContentType =
    bodyType === "x-www-form-urlencoded"
      ? "application/x-www-form-urlencoded"
      : bodyType === "form-data"
        ? "multipart/form-data"
        : bodyType === "binary"
          ? binaryData
            ? mime.getType(binaryData)
            : "text/plain"
          : bodyType === "raw"
            ? rawBodyDataType === "text"
              ? "text/plain"
              : rawBodyDataType === "html"
                ? "text/html"
                : rawBodyDataType === "xml"
                  ? "application/xml"
                  : rawBodyDataType === "javascript"
                    ? "application/javascript"
                    : rawBodyDataType === "json"
                      ? "application/json"
                      : ""
            : "";

  if (headerContentType)
    headers.push({
      key: "Content-Type",
      value: headerContentType,
    });
  if (authorization)
    headers.push({
      key: authorization.key,
      value: MASKED_AUTHORIZATION,
    });

  return headers.map((header) => ({
    ...header,
    value: JSON.stringify(header.value),
  }));
};

export const getHeadersData = ({
  headers,
  authorization,
  binaryData,
  rawBodyDataType,
  bodyType,
}: Pick<
  CodeSnippitDataInterface,
  "headers" | "authorization" | "binaryData" | "rawBodyDataType" | "bodyType"
>) => {
  const headersList = getHeadersList({
    headers,
    authorization,
    binaryData,
    rawBodyDataType,
    bodyType,
  });
  if (!headersList.length) return "";

  return `/* headers ========= */
const myHeaders = new Headers();
${headersList.map(({ key, value }) => `myHeaders.append(${JSON.stringify(key)}, ${value});`).join("\n")}\n\n`;
};

export const getHeadersDataObject = ({
  headers,
  authorization,
  binaryData,
  rawBodyDataType,
  bodyType,
}: Pick<
  CodeSnippitDataInterface,
  "headers" | "authorization" | "binaryData" | "rawBodyDataType" | "bodyType"
>) => {
  const headersList = getHeadersList({
    headers,
    authorization,
    binaryData,
    rawBodyDataType,
    bodyType,
  });
  if (!headersList.length) return "";

  return `/* headers ========= */
const myHeaders = {
${headersList.map(({ key, value }) => `\t${needsQuotesForKey(key) ? JSON.stringify(key) : key}: ${value}`).join(",\n")}
}\n\n`;
};

export const getBodyData = ({
  bodyType,
  formData,
  xWWWFormUrlencoded,
}: Pick<
  CodeSnippitDataInterface,
  "bodyType" | "formData" | "xWWWFormUrlencoded"
>) => {
  let settingsData = null;
  switch (bodyType) {
    case "form-data":
      if (!formData.length) break;
      settingsData = "formData";
      break;
    case "x-www-form-urlencoded": {
      if (!xWWWFormUrlencoded.length) break;
      settingsData = "params";
      break;
    }
    case "raw": {
      settingsData = "raw";
      break;
    }
    case "binary": {
      settingsData = `"<file contents here>"`;
      break;
    }
  }

  return settingsData;
};

const jsonFormatter = async (str: string) =>
  await codeFormatter({
    code: str,
    rawRequestBodyType: "json",
  });

export const getBodyRawData = async ({
  rawBodyDataType,
  bodyType,
  rawData,
}: Pick<
  CodeSnippitDataInterface,
  "rawBodyDataType" | "bodyType" | "rawData"
>) => {
  if (bodyType !== "raw") return "";

  let rawDataString = "";

  if (rawBodyDataType === "json" && isValidJson(rawData))
    rawDataString = `JSON.stringify(${await jsonFormatter(rawData)})`;
  else rawDataString = JSON.stringify(rawData);

  return `const raw = ${rawDataString}\n\n`;
};

export const getXWWWFormUrlencodedData = ({
  bodyType,
  xWWWFormUrlencoded,
}: Pick<CodeSnippitDataInterface, "bodyType" | "xWWWFormUrlencoded">) => {
  if (bodyType !== "x-www-form-urlencoded" || !xWWWFormUrlencoded.length)
    return "";

  return `/* x-www-form-urlencoded data ========= */
const params = new URLSearchParams();
${xWWWFormUrlencoded
  .map(
    ({ key, value }) =>
      `params.append(${JSON.stringify(key)}, ${JSON.stringify(value)});`
  )
  .join("\n")}\t\n\n`;
};

export const getFormData = ({
  bodyType,
  formData,
}: Pick<CodeSnippitDataInterface, "bodyType" | "formData">) => {
  if (bodyType !== "form-data" || !formData.length) return "";

  return `/* form-data ========= */
const formData = new FormData();
${formData
  .map(({ key, value, type }) =>
    type === "text"
      ? `formData.append(${JSON.stringify(key)}, ${JSON.stringify(value)});`
      : `formData.append(${JSON.stringify(key)}, fileInput.files[0], ${JSON.stringify(value)});`
  )
  .join("\n")}\t\n\n`;
};

export const generateMaskedAndRealCode = ({
  code,
  authorization,
}: {
  code: string;
  authorization: CodeSnippitDataInterface["authorization"];
}) => ({
  maskedCode: code,
  code: authorization
    ? code.replaceAll(MASKED_AUTHORIZATION, authorization.value)
    : code,
});
