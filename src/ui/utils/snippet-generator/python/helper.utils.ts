import type { CodeSnippitDataInterface } from "@/types/code-snippit.types";
import { getHeadersList } from "@/utils/snippet-generator/helper.utils";

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

  if (headersString) headersString = `headers = {\n${headersString}\n}\n\n`;

  return headersString;
};
