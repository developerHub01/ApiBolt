import type {
  CodeSnippitDataInterface,
  RequestCodeSnippitInterface,
  TRequestCodeType
} from "@shared/types/code-snippit.types";
import {
  defaultBinaryData,
  generateMaskedAndRealCode,
  getHeadersList
} from "@/utils/snippet-generator/helper.utils";
import { requestDefaultCodeSnippit } from "@/constant/code-snippit.constant";
import { getBodyRawData } from "@/utils/snippet-generator/shell/helper.utils";

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
  formData
}: CodeSnippitDataInterface) => {
  const snippitList = [];

  snippitList.push(`curl -X ${method.toUpperCase()} ${JSON.stringify(url)}`);

  const headersList = getHeadersList({
    headers,
    authorization,
    rawBodyDataType,
    bodyType
  });

  if (
    headersList.length &&
    bodyType === "binary" &&
    !headersList.some(entry => entry.key === "Content-Type")
  ) {
    headersList.push({
      key: "Content-Type",
      value: "application/octet-stream"
    });
  }

  if (headersList.length)
    headersList.forEach(({ key, value }) =>
      snippitList.push(`\t-H ${JSON.stringify(`${key}:${value}`)}`)
    );

  if (
    bodyType === "form-data" &&
    formData.length &&
    method.toLowerCase() !== "get"
  )
    formData.forEach(({ key, value, type }) =>
      snippitList.push(
        `\t-F ${type === "text" ? JSON.stringify(`${key}=${value}`) : JSON.stringify(`${key}[]=${value}`)}`
      )
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
    let rawDataString = await getBodyRawData({
      rawBodyDataType,
      bodyType,
      rawData
    });

    rawDataString =
      rawBodyDataType === "json"
        ? `'${rawDataString
            .split("\n")
            .map((entry, index) => (index && entry ? `\t\t${entry}` : entry))
            .join("\n")}'`
        : rawDataString;

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
  formData
}: CodeSnippitDataInterface) => {
  const snippitList = [];

  snippitList.push(`http ${method.toUpperCase()}`);
  snippitList.push(`\t${JSON.stringify(url)}`);

  const headersList = getHeadersList({
    headers,
    authorization,
    rawBodyDataType,
    bodyType
  });

  let contentType =
    headersList.find(entry => entry.key === "Content-Type")?.value ?? "";

  if (
    headersList.length &&
    bodyType === "binary" &&
    !headersList.some(entry => entry.key === "Content-Type")
  )
    contentType = "application/octet-stream";

  if (headersList.length)
    headersList.forEach(({ key, value }) =>
      snippitList.push(`\t${JSON.stringify(`${key}:${value}`)}`)
    );

  if (
    bodyType === "form-data" &&
    formData.length &&
    method.toLowerCase() !== "get"
  ) {
    snippitList[0] = `http --form ${method.toUpperCase()}`;
    formData.forEach(({ key, value, type }) =>
      snippitList.push(
        `\t${JSON.stringify(type === "text" ? `${key}=${value}` : `${key}@${value}`)}`
      )
    );
  }

  if (
    bodyType === "x-www-form-urlencoded" &&
    xWWWFormUrlencoded.length &&
    method.toLowerCase() !== "get"
  ) {
    snippitList[0] = `http --form ${method.toUpperCase()}`;
    xWWWFormUrlencoded.map(({ key, value }) =>
      snippitList.push(`\t${JSON.stringify(`${key}=${value}`)}`)
    );
  }

  if (bodyType === "binary" && method.toLowerCase() !== "get") {
    snippitList.push(
      `\t"Content-Type:application/octet-stream" <`,
      `\t${JSON.stringify(binaryData ?? defaultBinaryData)}`
    );
  }

  if (bodyType === "raw" && method.toLowerCase() !== "get") {
    let rawDataString = await getBodyRawData({
      rawBodyDataType,
      bodyType,
      rawData
    });

    rawDataString =
      rawBodyDataType === "json"
        ? `'${rawDataString
            .split("\n")
            .map((entry, index) => (index && entry ? `\t${entry}` : entry))
            .join("\n")}'`
        : rawDataString;

    snippitList.push(
      `\t${JSON.stringify(`Content-Type:${contentType}`)} <<<`,
      `\t${rawDataString}`
    );
  }

  const code = snippitList.join(" \\\n");

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
  bodyType
}: CodeSnippitDataInterface) => {
  const snippitList = [];

  snippitList.push(`wget`, `\t--method=${method.toUpperCase()}`);

  const headersList = getHeadersList({
    headers,
    authorization,
    rawBodyDataType,
    bodyType
  });

  if (headersList.length)
    headersList.forEach(({ key, value }) =>
      snippitList.push(`\t--header=${JSON.stringify(`${key}:${value}`)}`)
    );

  if (
    bodyType === "x-www-form-urlencoded" &&
    xWWWFormUrlencoded.length &&
    method.toLowerCase() !== "get"
  ) {
    snippitList.push(
      `\t--body-data=${JSON.stringify(
        xWWWFormUrlencoded.map(({ key, value }) => `${key}=${value}`).join("&")
      )}`
    );
  }

  if (bodyType === "binary" && method.toLowerCase() !== "get") {
    snippitList.push(
      `\t--header="Content-Type:application/octet-stream"`,
      `\t--body-file=${JSON.stringify(binaryData ?? defaultBinaryData)}`
    );
  }

  if (bodyType === "raw" && method.toLowerCase() !== "get")
    snippitList.push(`\t--body-data=${JSON.stringify(rawData)}`);

  snippitList.push(`\t${JSON.stringify(url)}`, `\t-O response.txt`);

  const warningMessage = `#===============================================
# WGET WARNING: multipart/form-data not supported
# Please use curl or HTTPie for this request type
# Example:
# curl -X POST "http://example.com" -F "field=@/path/to/file"
#===============================================`;

  const code =
    bodyType === "form-data" ? warningMessage : snippitList.join(" \\\n");

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
      return await generateShellWgetCode(data);
  }

  return requestDefaultCodeSnippit;
};
