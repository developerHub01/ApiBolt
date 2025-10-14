import type {
  CodeSnippitDataInterface,
  RequestCodeSnippitInterface,
  TRequestCodeType,
} from "@/types/code-snippit.types";
import {
  defaultBinaryData,
  generateMaskedAndRealCode,
  getHeadersList,
} from "@/utils/snippet-generator/helper.utils";
import { requestDefaultCodeSnippit } from "@/constant/code-snippit.constant";
import { getBodyRawData } from "./helper.utils";

export const generateShellCURLCode = async ({
  url,
  method,
  headers,
  authorization,
  xWWWFormUrlencoded,
  rawData,
  binaryData,
  rawBodyDataType,
  bodyType,
  formData,
}: CodeSnippitDataInterface) => {
  const snippitList = [];

  snippitList.push(`curl -X ${method.toUpperCase()} ${JSON.stringify(url)}`);

  const headersList = getHeadersList({
    headers,
    authorization,
    rawBodyDataType,
    bodyType,
  });

  if (
    headersList.length &&
    bodyType === "binary" &&
    !headersList.some((entry) => entry.key === "Content-Type")
  ) {
    headersList.push({
      key: "Content-Type",
      value: "application/octet-stream",
    });
  }

  if (headersList.length)
    snippitList.push(
      `${headersList
        .map(({ key, value }) => `\t-H ${JSON.stringify(`${key}: ${value}`)}`)
        .join(` \\\n`)}`
    );

  if (
    bodyType === "form-data" &&
    formData.length &&
    method.toLowerCase() !== "get"
  )
    snippitList.push(
      `${formData.map(({ key, value, type }) => `\t-F ${type === "text" ? JSON.stringify(`${key}=${value}`) : JSON.stringify(`${key}[]=${value}`)}`).join(" \\\n")}`
    );

  if (
    bodyType === "x-www-form-urlencoded" &&
    xWWWFormUrlencoded.length &&
    method.toLowerCase() !== "get"
  )
    snippitList.push(
      `\t-d ${JSON.stringify(
        xWWWFormUrlencoded.map(({ key, value }) => `${key}=${value}`).join("&")
      )}`
    );

  if (bodyType === "binary" && method.toLowerCase() !== "get") {
    snippitList.push(
      `\t--data-binary ${JSON.stringify(binaryData ?? defaultBinaryData)}`
    );
  }

  if (bodyType === "raw" && method.toLowerCase() !== "get") {
    snippitList.push();
    let rawDataString = await getBodyRawData({
      rawBodyDataType,
      bodyType,
      rawData,
    });

    rawDataString =
      rawBodyDataType === "json"
        ? `\t'${rawDataString
            .split("\n")
            .map((entry, index) => (index && entry ? `\t\t${entry}` : entry))
            .join("\n")}'`
        : `\t${rawDataString}`;

    snippitList.push(`\t-d ${rawDataString}`);
  }

  const code = snippitList.join(" \\\n");

  return generateMaskedAndRealCode({ code, authorization });
};

export const generateShellHTTPieCode = async ({
  url,
  method,
  headers,
  authorization,
  xWWWFormUrlencoded,
  rawData,
  binaryData,
  rawBodyDataType,
  bodyType,
  formData,
}: CodeSnippitDataInterface) => {
  console.log({
    url,
    method,
    headers,
    authorization,
    xWWWFormUrlencoded,
    rawData,
    binaryData,
    rawBodyDataType,
    bodyType,
    formData,
  });

  const code = ``;

  return generateMaskedAndRealCode({ code, authorization });
};

export const generateShellWgetCode = async ({
  url,
  method,
  headers,
  authorization,
  xWWWFormUrlencoded,
  rawData,
  binaryData,
  rawBodyDataType,
  bodyType,
  formData,
}: CodeSnippitDataInterface) => {
  console.log({
    url,
    method,
    headers,
    authorization,
    xWWWFormUrlencoded,
    rawData,
    binaryData,
    rawBodyDataType,
    bodyType,
    formData,
  });

  const code = ``;

  return generateMaskedAndRealCode({ code, authorization });
};

export const generateShellCode = async (
  type: TRequestCodeType,
  data: CodeSnippitDataInterface
): Promise<RequestCodeSnippitInterface> => {
  switch (type) {
    case "shell-curl":
      return await generateShellCURLCode(data);
    case "shell-httpie":
      return await generateShellHTTPieCode(data);
    case "shell-wget":
      return await generateShellCURLCode(data);
  }

  return requestDefaultCodeSnippit;
};
