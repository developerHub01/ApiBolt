import type { CodeSnippitDataInterface } from "@/types/code-snippit.types";
import { isValidJson } from "@/utils/helper";
import { jsonFormatter } from "@/utils/snippet-generator/helper.utils";

export const getBodyRawData = async ({
  rawBodyDataType,
  bodyType,
  rawData,
}: Pick<
  CodeSnippitDataInterface,
  "rawBodyDataType" | "bodyType" | "rawData"
>) => {
  if (bodyType !== "raw") return "";

  if (rawBodyDataType === "json" && isValidJson(rawData.trim()))
    return `${await jsonFormatter(rawData.trim())}`;
  else return JSON.stringify(rawData.trim());
};
