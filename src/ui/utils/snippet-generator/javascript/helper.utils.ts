import type { CodeSnippitDataInterface } from "@/types/code-snippit.types";
import {
  getHeadersList,
  jsonFormatter,
} from "@/utils/snippet-generator/helper.utils";
import { isValidJson, needsQuotesForKey } from "@/utils/helper";

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
