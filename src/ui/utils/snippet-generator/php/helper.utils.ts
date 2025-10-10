import type { CodeSnippitDataInterface } from "@/types/code-snippit.types";
import { getHeadersList } from "@/utils/snippet-generator/helper.utils";
import { isValidJson } from "@/utils/helper";

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
$headers = [
${headersList.map(({ key, value }) => `\t${JSON.stringify(`${key}: ${value}`)}`).join(",\n")}
];\n\n`;
};

export const getXWWWFormUrlencodedData = ({
  bodyType,
  xWWWFormUrlencoded,
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
]};\t\n\n`;
};

export const getFormData = ({
  bodyType,
  formData,
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

export const getRawData = ({
  bodyType,
  rawBodyDataType,
  rawData,
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
        const parsedData = JSON.parse(rawData);
        if (
          typeof parsedData === "object" &&
          !Array.isArray(parsedData) &&
          parsedData !== null
        )
          data = `json_encode([
${Object.entries(parsedData)
  .map(([key, value]) => `\t${JSON.stringify(key)} => ${JSON.stringify(value)}`)
  .join(",\n")}
])`;
        else data = `json_encode(${rawData})`;
      } else data = JSON.stringify(rawData);
      break;
    }
  }

  console.log({ data });

  return `/* raw-data ========= */
$data = ${data};\n\n`;
};
