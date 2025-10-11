import { requestDefaultCodeSnippit } from "@/constant/request-code.constant";
import type { CodeSnippitDataInterface } from "@/types/code-snippit.types";
import type { TRequestCodeType } from "@/types/request-code.type";
import { generateMaskedAndRealCode } from "@/utils/snippet-generator/helper.utils";
import {
  generateHeadersString,
  generateRawDataString,
} from "@/utils/snippet-generator/python/helper.utils";

export const generatePythonRequestsCode = async ({
  url,
  method,
  headers,
  authorization,
  formData,
  xWWWFormUrlencoded,
  rawBodyDataType,
  bodyType,
  binaryData,
  rawData,
}: CodeSnippitDataInterface) => {
  const importString = `import requests\n\n`;
  const urlString = `url = "${url}"\n\n`;

  /* ============== HEADERS =================== */
  const headersString = generateHeadersString({
    headers,
    authorization,
    rawBodyDataType,
    bodyType,
  });

  /* ============== FORM-DATA =================== */
  let formDataString = "";
  if (
    method.toLowerCase() !== "get" &&
    bodyType === "form-data" &&
    formData.length
  ) {
    let normalFormDataString = "";
    if (formData.some((entry) => entry.type === "text")) {
      normalFormDataString = `data = {
${formData
  .filter((entry) => entry.type === "text")
  .map(({ key, value }) => `\t${JSON.stringify(key)}: ${JSON.stringify(value)}`)
  .join(",\n")}
}\n\n`;
    }

    let fileFormDataString = "";
    if (formData.some((entry) => entry.type === "file")) {
      fileFormDataString = `files = [
${formData
  .filter((entry) => entry.type === "file")
  .map(
    ({ key, value }) =>
      `\t(${JSON.stringify(key)}, open(${JSON.stringify(value)}, "rb"))`
  )
  .join(",\n")}
]\n\n`;
    }

    if (normalFormDataString || fileFormDataString) {
      formDataString = `#============== FORM-DATA ===================
${normalFormDataString}${fileFormDataString}`;
    }
  }

  /* ============== X-WWW-FORM-URLENCODER-DATA =================== */
  let xwwwFormUrlencoderString = "";
  if (
    method.toLowerCase() !== "get" &&
    bodyType === "x-www-form-urlencoded" &&
    xWWWFormUrlencoded.length
  ) {
    xwwwFormUrlencoderString = `data = {
${xWWWFormUrlencoded
  .map(({ key, value }) => `\t${JSON.stringify(key)}: ${JSON.stringify(value)}`)
  .join(",\n")}
}\n\n`;
  }

  /* ============== RAW-DATA =================== */
  const rawDataString = await generateRawDataString({
    method,
    rawData,
    rawBodyDataType,
    bodyType,
  });

  const endString = `print(response.text)`;

  const optionsArr: Array<{
    key: string;
    value: string;
  }> = [];

  if (headersString)
    optionsArr.push({
      key: "headers",
      value: "headers",
    });

  if (bodyType === "form-data" && method !== "get") {
    if (formData.some((entry) => entry.type === "text"))
      optionsArr.push({
        key: "data",
        value: "data",
      });
    if (formData.some((entry) => entry.type === "file"))
      optionsArr.push({
        key: "files",
        value: "files",
      });
  }

  if (bodyType === "x-www-form-urlencoded" && method !== "get") {
    optionsArr.push({
      key: "data",
      value: "data",
    });
  }

  if (bodyType === "raw" && method !== "get") {
    optionsArr.push({
      key: "data",
      value: rawBodyDataType === "json" ? "json.dumps(json_data)" : "data",
    });
  }

  if (bodyType === "binary" && method !== "get") {
    optionsArr.push({
      key: "data",
      value: "f",
    });
  }

  const optionsString = optionsArr.length
    ? `, ${optionsArr.map(({ key, value }) => `${key}=${value}`).join(", ")}`
    : "";

  let code = "";

  /* ============== BINARY-DATA =================== */
  if (method.toLowerCase() !== "get" && bodyType === "binary") {
    const binaryDataString = `
with open("${binaryData ?? "<Your file path should go here>"}", "rb") as f:
\tresponse = requests.post(url${optionsString})\n\n`;

    code = `${importString}${urlString}${headersString}${binaryDataString}${endString}`;
  } else {
    const httpActionString = `# ============== HTTP CALL ===================
response = requests.${method}(url${optionsString})\n`;

    code = `${importString}${urlString}${headersString}${formDataString}${xwwwFormUrlencoderString}${rawDataString}${httpActionString}${endString}`;
  }

  return generateMaskedAndRealCode({ code, authorization });
};

export const generatePythonHttpClientCode = async ({
  url,
  method,
  headers,
  authorization,
  formData,
  xWWWFormUrlencoded,
  rawBodyDataType,
  bodyType,
  binaryData,
  rawData,
}: CodeSnippitDataInterface) => {
  console.log({
    url,
    method,
    headers,
    authorization,
    formData,
    xWWWFormUrlencoded,
    rawBodyDataType,
    bodyType,
    binaryData,
    rawData,
  });

  const code = ``;
  return generateMaskedAndRealCode({ code, authorization });
};

export const generatePythonUrllib3Code = async ({
  url,
  method,
  headers,
  authorization,
  formData,
  xWWWFormUrlencoded,
  rawBodyDataType,
  bodyType,
  binaryData,
  rawData,
}: CodeSnippitDataInterface) => {
  console.log({
    url,
    method,
    headers,
    authorization,
    formData,
    xWWWFormUrlencoded,
    rawBodyDataType,
    bodyType,
    binaryData,
    rawData,
  });

  const code = ``;
  return generateMaskedAndRealCode({ code, authorization });
};

export const generatePythonAiohttpCode = async ({
  url,
  method,
  headers,
  authorization,
  formData,
  xWWWFormUrlencoded,
  rawBodyDataType,
  bodyType,
  binaryData,
  rawData,
}: CodeSnippitDataInterface) => {
  console.log({
    url,
    method,
    headers,
    authorization,
    formData,
    xWWWFormUrlencoded,
    rawBodyDataType,
    bodyType,
    binaryData,
    rawData,
  });

  const code = ``;
  return generateMaskedAndRealCode({ code, authorization });
};

export const generatePythonCode = async (
  type: TRequestCodeType,
  data: CodeSnippitDataInterface
) => {
  switch (type) {
    case "python-requests":
      return await generatePythonRequestsCode(data);
    case "python-http-client":
      return await generatePythonHttpClientCode(data);
    case "python-aiohttp":
      return await generatePythonAiohttpCode(data);
    case "python-urllib3":
      return await generatePythonUrllib3Code(data);
  }

  return requestDefaultCodeSnippit;
};
