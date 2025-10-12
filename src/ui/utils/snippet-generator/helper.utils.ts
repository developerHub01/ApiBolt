import type { CodeSnippitDataInterface } from "@/types/code-snippit.types";
import { codeFormatter } from "@/utils/code";
import { MASKED_AUTHORIZATION } from "@/constant/code-snippit.constant";

export const getBodyType = ({
  bodyType,
  rawBodyDataType,
}: Pick<CodeSnippitDataInterface, "rawBodyDataType" | "bodyType">) =>
  bodyType === "x-www-form-urlencoded"
    ? "application/x-www-form-urlencoded"
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

export const getHeadersList = ({
  headers,
  authorization,
  rawBodyDataType,
  bodyType,
}: Pick<
  CodeSnippitDataInterface,
  "headers" | "authorization" | "binaryData" | "rawBodyDataType" | "bodyType"
>): Array<{
  key: string;
  value?: string;
}> => {
  const headerContentType = getBodyType({
    bodyType,
    rawBodyDataType,
  });

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

  return headers;
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

export const jsonFormatter = async (str: string) =>
  await codeFormatter({
    code: str,
    rawRequestBodyType: "json",
  });

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
