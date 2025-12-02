import type { CodeSnippitDataInterface } from "@shared/types/code-snippit.types";
import { getHeadersList } from "@/utils/snippet-generator/helper.utils";
import { isValidJson } from "@/utils/helper";
import mime from "mime";

export const getHeadersData = ({
  headers,
  authorization,
  binaryData,
  rawBodyDataType,
  bodyType
}: Pick<
  CodeSnippitDataInterface,
  "headers" | "authorization" | "binaryData" | "rawBodyDataType" | "bodyType"
>) => {
  const headersList = getHeadersList({
    headers,
    authorization,
    binaryData,
    rawBodyDataType,
    bodyType
  });

  if (!headersList.length) return "";

  return `/* headers ========= */
$headers = [
${headersList.map(({ key, value }) => `\t${JSON.stringify(`${key}: ${value}`)}`).join(",\n")}
];\n\n`;
};

export const getHeadersDataObject = ({
  headers,
  authorization,
  binaryData,
  rawBodyDataType,
  bodyType
}: Pick<
  CodeSnippitDataInterface,
  "headers" | "authorization" | "binaryData" | "rawBodyDataType" | "bodyType"
>) => {
  const headersList = getHeadersList({
    headers,
    authorization,
    binaryData,
    rawBodyDataType,
    bodyType
  });

  if (!headersList.length) return "";

  return `/* headers ========= */
$headers = [
${headersList.map(({ key, value }) => `\t${`${JSON.stringify(key)}: ${JSON.stringify(value)}`}`).join(",\n")}
];\n\n`;
};

export const getHttpRequest2HeadersData = ({
  headers,
  authorization,
  binaryData,
  rawBodyDataType,
  bodyType
}: Pick<
  CodeSnippitDataInterface,
  "headers" | "authorization" | "binaryData" | "rawBodyDataType" | "bodyType"
>) => {
  const headersList = getHeadersList({
    headers,
    authorization,
    binaryData,
    rawBodyDataType,
    bodyType
  });

  if (!headersList.length) return "";

  return `/* headers ========= */
$request->setHeader([
${headersList.map(({ key, value }) => `\t${`${JSON.stringify(key)} => ${JSON.stringify(value)}`}`).join(",\n")}
]);\n\n`;
};

export const getXWWWFormUrlencodedCurlData = ({
  bodyType,
  xWWWFormUrlencoded
}: Pick<CodeSnippitDataInterface, "bodyType" | "xWWWFormUrlencoded">) => {
  if (bodyType !== "x-www-form-urlencoded" || !xWWWFormUrlencoded.length)
    return "";

  return `/* x-www-form-urlencoded data ========= */
$data = http_build_query([
${xWWWFormUrlencoded
  .map(
    ({ key, value }) => `\t${JSON.stringify(key)} => ${JSON.stringify(value)}`
  )
  .join(",\n")}
]);\t\n\n`;
};

export const getXWWWFormUrlencodedArrData = ({
  bodyType,
  xWWWFormUrlencoded
}: Pick<CodeSnippitDataInterface, "bodyType" | "xWWWFormUrlencoded">) => {
  if (bodyType !== "x-www-form-urlencoded" || !xWWWFormUrlencoded.length)
    return "";

  return `/* x-www-form-urlencoded data ========= */
$data = [
${xWWWFormUrlencoded
  .map(
    ({ key, value }) => `\t${JSON.stringify(key)} => ${JSON.stringify(value)}`
  )
  .join(",\n")}
];\t\n\n`;
};

export const getFormData = ({
  bodyType,
  formData
}: Pick<CodeSnippitDataInterface, "bodyType" | "formData">) => {
  if (bodyType !== "form-data" || !formData.length) return "";

  return `/* form-data ========= */
$formData = [
${formData
  .map(({ key, value, type }) =>
    type === "text"
      ? `\t${JSON.stringify(key)} => ${JSON.stringify(value)}`
      : `\t${JSON.stringify(key)} => new CURLFile(${JSON.stringify(value)}`
  )
  .join(",\n")}
];\t\n\n`;
};

export const getMultipartData = ({
  bodyType,
  formData
}: Pick<CodeSnippitDataInterface, "bodyType" | "formData">) => {
  if (bodyType !== "form-data" || !formData.length) return "";

  return `/* form-data ========= */
$multipart = [
${formData
  .map(({ key, value, type }) => {
    const name = `"name" => ${JSON.stringify(key)}`;
    const content =
      type === "text"
        ? `"contents" => ${JSON.stringify(value)}`
        : `"contents" => fopen(${JSON.stringify(value)}, "r")`;

    return `\t[
\t\t${name},
\t\t${content}
\t]`;
  })
  .join(",\n")}
];\t\n\n`;
};

export const getPeclFormData = ({
  bodyType,
  formData
}: Pick<CodeSnippitDataInterface, "bodyType" | "formData">) => {
  if (bodyType !== "form-data" || !formData.length) return "";

  return `/* form-data ========= */
$body = new http\\Message\\Body();
$body->addForm([
${formData
  .map(({ key, value, type }) =>
    type === "text"
      ? `\t${JSON.stringify(key)} => ${JSON.stringify(value)}`
      : `\t${JSON.stringify(key)} => new CURLFile(${JSON.stringify(value)}`
  )
  .join(",\n")}
]);\t\n\n`;
};

export const getHttpRequest2FormData = ({
  bodyType,
  formData
}: Pick<CodeSnippitDataInterface, "bodyType" | "formData">) => {
  if (bodyType !== "form-data" || !formData.length) return "";

  let normalDataString = "";
  if (formData.some(entry => entry.type === "text")) {
    normalDataString = `/* Add normal fields */
$request->addPostParameter([
${formData
  .filter(entry => entry.type === "text")
  .map(
    ({ key, value }) => `\t${JSON.stringify(key)} => ${JSON.stringify(value)}`
  )
  .join(",\n")}
]);`;
  }

  let filesDataString = "";
  if (formData.some(entry => entry.type === "file")) {
    filesDataString = `/* Add files */
${formData
  .filter(entry => entry.type === "file")
  .map(
    ({ key, value }) =>
      `$request->addUpload(${JSON.stringify(key)}, ${JSON.stringify(value)}, "remoteFileName", ${JSON.stringify(mime.getType(value))});`
  )
  .join("\n")}`;
  }

  if (normalDataString && filesDataString) normalDataString += "\n\n";

  return `${normalDataString}${filesDataString}\n\n`;
};

const objectToString = (data: unknown, level: number = 0): string => {
  const indent = "\t".repeat(level);

  // Primitive values
  if (data === null) return "null";
  if (typeof data === "boolean") return data ? "true" : "false";
  if (typeof data === "number") return data.toString();
  if (typeof data === "string") return JSON.stringify(data);

  // Arrays
  if (Array.isArray(data)) {
    if (data.length === 0) return "[]";
    const items = data
      .map(item => `${indent}\t${objectToString(item, level + 1)}`)
      .join(",\n");
    return `[\n${items}\n${indent}]`;
  }

  // Objects
  if (typeof data === "object") {
    const entries = Object.entries(data);
    if (entries.length === 0) return "[]";

    const items = entries
      .map(([key, value]) => {
        const formattedKey = JSON.stringify(key);
        const formattedValue = objectToString(value, level + 1);
        return `${indent}\t${formattedKey} => ${formattedValue}`;
      })
      .join(",\n");

    return `[\n${items}\n${indent}]`;
  }

  return JSON.stringify(data);
};

export const getRawData = ({
  bodyType,
  rawBodyDataType,
  rawData
}: Pick<
  CodeSnippitDataInterface,
  "bodyType" | "rawBodyDataType" | "rawData"
>) => {
  if (bodyType !== "raw" || !rawData) return null;

  let data = "";

  switch (rawBodyDataType) {
    case "text":
    case "html":
    case "xml":
    case "javascript": {
      data = JSON.stringify(rawData);
      break;
    }

    case "json": {
      if (isValidJson(rawData)) {
        const parsed = JSON.parse(rawData);
        data = `json_encode(${objectToString(parsed, 0)})`;
      } else {
        data = JSON.stringify(rawData);
      }
      break;
    }
  }

  return `/* raw-data ========= */
$data = ${data};\n\n`;
};
