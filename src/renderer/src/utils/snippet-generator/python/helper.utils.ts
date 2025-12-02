import type { CodeSnippitDataInterface } from "@shared/types/code-snippit.types";
import { isValidJson } from "@/utils/helper";
import {
  getHeadersList,
  jsonFormatter
} from "@/utils/snippet-generator/helper.utils";

export const generateHeadersString = ({
  headers,
  authorization,
  rawBodyDataType,
  bodyType,
  method
}: Pick<
  CodeSnippitDataInterface,
  | "headers"
  | "authorization"
  | "binaryData"
  | "rawBodyDataType"
  | "bodyType"
  | "method"
>) => {
  let headersList = getHeadersList({
    headers,
    authorization,
    rawBodyDataType,
    bodyType
  });

  if (method === "get")
    headersList = headersList.filter(header => header.key !== "Content-Type");

  let headersString = headersList
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
  bodyType
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
