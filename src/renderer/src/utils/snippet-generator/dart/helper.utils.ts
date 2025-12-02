import type { CodeSnippitDataInterface } from "@shared/types/code-snippit.types";
import { isValidJson } from "@/utils/helper";
import { jsonFormatter } from "@/utils/snippet-generator/helper.utils";

export const getBodyRawData = async ({
  rawBodyDataType,
  bodyType,
  rawData
}: Pick<
  CodeSnippitDataInterface,
  "rawBodyDataType" | "bodyType" | "rawData"
>) => {
  if (bodyType !== "raw") return "";

  let rawDataString = "";

  if (rawBodyDataType === "json" && isValidJson(rawData.trim()))
    rawDataString = `sonEncode(${await jsonFormatter(rawData.trim())})`;
  else rawDataString = JSON.stringify(rawData.trim());

  return `var rawData = ${rawDataString};\n\n`;
};
