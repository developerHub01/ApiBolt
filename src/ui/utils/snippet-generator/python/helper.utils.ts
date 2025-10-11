import type { CodeSnippitDataInterface } from "@/types/code-snippit.types";
import { isValidJson } from "@/utils/helper";
import {
  getHeadersList,
  jsonFormatter,
} from "@/utils/snippet-generator/helper.utils";

export const generateHeadersString = ({
  headers,
  authorization,
  rawBodyDataType,
  bodyType,
}: Pick<
  CodeSnippitDataInterface,
  "headers" | "authorization" | "binaryData" | "rawBodyDataType" | "bodyType"
>) => {
  let headersString = getHeadersList({
    headers,
    authorization,
    rawBodyDataType,
    bodyType,
  })
    .map(
      ({ key, value }) => `\t${JSON.stringify(key)}: ${JSON.stringify(value)}`
    )
    .join(",\n");

  if (headersString)
    headersString = `# ============== HEADERS ===================\nheaders = {\n${headersString}\n}\n\n`;

  return headersString;
};

export const generateRawDataString = async ({
  method,
  rawData,
  rawBodyDataType,
  bodyType,
}: Pick<
  CodeSnippitDataInterface,
  "method" | "rawData" | "rawBodyDataType" | "bodyType"
>) => {
  let rawDataString = "";
  if (method.toLowerCase() !== "get" && bodyType === "raw") {
    if (rawBodyDataType === "json" && isValidJson(rawData))
      rawDataString = `json_data = ${await jsonFormatter(rawData)}\n\n`;
    else rawDataString = `data = """${rawData}"""\n\n`;
  }

  return rawDataString;
};
