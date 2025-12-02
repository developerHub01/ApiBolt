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
>): Promise<{
  code: string;
  type: "text" | "json";
}> => {
  if (bodyType !== "raw") return { code: "", type: "text" };

  if (rawBodyDataType === "json" && isValidJson(rawData.trim()))
    return { code: `${await jsonFormatter(rawData.trim())}`, type: "json" };
  else return { code: JSON.stringify(rawData.trim()), type: "text" };
};
