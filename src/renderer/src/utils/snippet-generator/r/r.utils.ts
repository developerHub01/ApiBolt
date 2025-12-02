import { requestDefaultCodeSnippit } from "@/constant/code-snippit.constant";
import type {
  CodeSnippitDataInterface,
  TRequestCodeType
} from "@shared/types/code-snippit.types";
import {
  defaultBinaryData,
  generateMaskedAndRealCode,
  getHeadersList
} from "@/utils/snippet-generator/helper.utils";
import { getBodyRawData } from "@/utils/snippet-generator/r/helper.utils";

export const generateRHttrCode = async ({
  url,
  method,
  headers,
  authorization,
  formData,
  xWWWFormUrlencoded,
  rawBodyDataType,
  bodyType,
  binaryData,
  rawData
}: CodeSnippitDataInterface) => {
  const startString = `library(httr)\n
${method.toUpperCase()}(\n`;

  const endString = `)`;

  const snippitList: Array<string> = [`\t${JSON.stringify(url)}`];

  if (method.toLowerCase() !== "get") snippitList.push(`\tbody = ""`);

  if (
    bodyType === "form-data" &&
    formData.length &&
    method.toLowerCase() !== "get"
  ) {
    snippitList[1] = `\tbody = list(
${formData.map(({ key, value, type }) => `\t\t${key} = ${type === "text" ? JSON.stringify(value) : `upload_file(${JSON.stringify(value)})`}`).join(",\n")}
\t)`;
    snippitList.push(`\tencode = "multipart"`);
  }

  if (
    bodyType === "x-www-form-urlencoded" &&
    xWWWFormUrlencoded.length &&
    method.toLowerCase() !== "get"
  ) {
    snippitList[1] = `\tbody = list(${xWWWFormUrlencoded.map(({ key, value }) => `${key}=${JSON.stringify(value)}`).join(", ")})`;
    snippitList.push(`\tencode = "form"`);
  }

  if (bodyType === "binary" && method.toLowerCase() !== "get")
    snippitList[1] = `\tbody = upload_file(${JSON.stringify(binaryData ?? defaultBinaryData)})`;

  if (bodyType === "raw" && method.toLowerCase() !== "get") {
    const data = await getBodyRawData({
      rawBodyDataType,
      bodyType,
      rawData
    });

    const code =
      data.type === "text"
        ? data.code
        : data.code
            .split("\n")
            .map((line, index) => (index ? `\t${line}` : line))
            .join("\n");

    snippitList[1] = `\tbody = ${rawBodyDataType === "json" ? `'${code}'` : code}`;

    if (data.type === "json") snippitList.push(`\tencode = "raw"`);
  }

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

  if (headersList.length) {
    snippitList.push(`\tadd_headers(
${headersList
  .map(({ key, value }) => `\t\t\`${key}\` = ${JSON.stringify(value)}`)
  .join(",\n")}\n\t)\n`);
  }

  const code = `${startString}${snippitList.join(",\n")}${endString}`;
  return generateMaskedAndRealCode({ code, authorization });
};

export const generateRRcurlCode = async ({
  url,
  method,
  headers,
  authorization,
  formData,
  xWWWFormUrlencoded,
  rawBodyDataType,
  bodyType,
  binaryData,
  rawData
}: CodeSnippitDataInterface) => {
  const startString = `library(RCurl)\n
curlPerform(\n`;

  const endString = `
)`;

  const snippitList: Array<string> = [
    `\turl = ${JSON.stringify(url)}`,
    `\tcustomrequest = "${method.toUpperCase()}"`
  ];

  if (method.toLowerCase() !== "get") snippitList.push(`\tpostfields = ""`);

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

  if (
    bodyType === "x-www-form-urlencoded" &&
    xWWWFormUrlencoded.length &&
    method.toLowerCase() !== "get"
  )
    snippitList[2] = `\tpostfields = ${xWWWFormUrlencoded.map(({ key, value }) => `${key}=${JSON.stringify(value)}`).join("&")}`;

  if (bodyType === "binary" && method.toLowerCase() !== "get")
    snippitList[2] = `\tpostfields = readBin(${JSON.stringify(binaryData ?? defaultBinaryData)}, "raw", n = file.info(${JSON.stringify(binaryData ?? defaultBinaryData)})$size)`;

  if (bodyType === "raw" && method.toLowerCase() !== "get") {
    const data = await getBodyRawData({
      rawBodyDataType,
      bodyType,
      rawData
    });

    const code =
      data.type === "text"
        ? data.code
        : data.code
            .split("\n")
            .map((line, index) => (index ? `\t${line}` : line))
            .join("\n");

    snippitList[2] = `\tpostfields = ${rawBodyDataType === "json" ? `'${code}'` : code}`;
  }

  if (headersList.length) {
    snippitList.push(`\thttpheader = c(
${headersList
  .map(
    ({ key, value }) => `\t\t${JSON.stringify(key)} = ${JSON.stringify(value)}`
  )
  .join(",\n")}\n\t)`);
  }

  if (
    bodyType === "form-data" &&
    formData.length &&
    method.toLowerCase() !== "get"
  ) {
    snippitList.push(`\tcurl = getCurlHandle()`);
    snippitList.push(`\t.opts = list(
\t\tmultipart = TRUE,
\t\tpostfields = list(
${formData.map(({ key, value, type }) => `\t\t\t${JSON.stringify(key)} = ${type === "text" ? `${JSON.stringify(key)}` : `fileUpload(${JSON.stringify(value)})`}`).join(",\n")}
\t\t)
\t)`);
  }

  const code = `${startString}${snippitList.join(",\n")}${endString}`;
  return generateMaskedAndRealCode({ code, authorization });
};

export const generateRCode = async (
  type: TRequestCodeType,
  data: CodeSnippitDataInterface
) => {
  switch (type) {
    case "r-httr":
      return await generateRHttrCode(data);
    case "r-rcurl":
      return await generateRRcurlCode(data);
  }
  return requestDefaultCodeSnippit;
};
