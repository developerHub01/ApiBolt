import { requestDefaultCodeSnippit } from "@/constant/request-code.constant";
import type { CodeSnippitDataInterface } from "@/types/code-snippit.types";
import type {
  RequestCodeSnippitInterface,
  TRequestCodeType,
} from "@/types/request-code.type";
import { needsQuotesForKey } from "@/utils/helper";
import {
  generateMaskedAndRealCode,
  getBodyData,
  getBodyRawData,
  getFormData,
  getHeadersData,
  getHeadersDataObject,
  getXWWWFormUrlencodedData,
} from "@/utils/snippet-generator/helper.utils";

export const generateJavascriptFetchCode = async ({
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
  const headersString = getHeadersData({
    headers,
    bodyType,
    rawBodyDataType,
    authorization,
    binaryData,
  });

  const bodyRawData = await getBodyRawData({
    rawBodyDataType,
    bodyType,
    rawData,
  });

  const options: Array<{
    key: string;
    value: unknown;
  }> = [
    {
      key: "method",
      value: `"${method.toUpperCase()}"`,
    },
  ];

  if (headersString)
    options.push({
      key: "headers",
      value: "myHeaders",
    });

  const dataValue = getBodyData({ bodyType, formData, xWWWFormUrlencoded });
  if (dataValue)
    options.push({
      key: "data",
      value: dataValue,
    });

  const formDataString = getFormData({
    bodyType,
    formData,
  });

  const xwwFormUrlEncodedString = getXWWWFormUrlencodedData({
    bodyType,
    xWWWFormUrlencoded,
  });

  const apiFetchString = `fetch("${url}", {
${options.map(({ key, value }) => `\t${needsQuotesForKey(key) ? JSON.stringify(key) : key}: ${value}`).join(",\n")}
})
\t.then(response => response.json())
\t.then(result => console.log(result))
\t.catch(error => console.error(error));`;

  const code = `${headersString}${formDataString}${xwwFormUrlEncodedString}${bodyRawData}${apiFetchString}`;
  return generateMaskedAndRealCode({ code, authorization });
};

export const generateJavascriptAxiosCode = async ({
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
  const importString = `import axios from "axios";\n\n`;

  const headersString = getHeadersDataObject({
    headers,
    bodyType,
    rawBodyDataType,
    authorization,
    binaryData,
  });

  const bodyRawData = await getBodyRawData({
    rawBodyDataType,
    bodyType,
    rawData,
  });

  const formDataString = getFormData({
    bodyType,
    formData,
  });

  const xwwFormUrlEncodedString = getXWWWFormUrlencodedData({
    bodyType,
    xWWWFormUrlencoded,
  });

  const options: Array<{
    key: string;
    value: unknown;
  }> = [
    {
      key: "method",
      value: `"${method.toUpperCase()}"`,
    },
    {
      key: "url",
      value: `"${url}"`,
    },
  ];

  if (headersString)
    options.push({
      key: "headers",
      value: "myHeaders",
    });

  const dataValue = getBodyData({ bodyType, formData, xWWWFormUrlencoded });
  if (dataValue)
    options.push({
      key: "data",
      value: dataValue,
    });

  const apiFetchString = `axios({
${options.map(({ key, value }) => `\t${needsQuotesForKey(key) ? JSON.stringify(key) : key}: ${value}`).join(",\n")}
})
\t.then(response => console.log(response.data))
\t.catch(error => console.error(error));`;

  const code = `${importString}${headersString}${formDataString}${xwwFormUrlEncodedString}${bodyRawData}${apiFetchString}`;
  return generateMaskedAndRealCode({ code, authorization });
};

export const generateJavascriptjQueryCode = async ({
  url,
  method,
  headers,
  authorization,
  formData,
  xWWWFormUrlencoded,
  rawData,
  rawBodyDataType,
  bodyType,
  binaryData,
}: CodeSnippitDataInterface) => {
  const importString = `/* Requires jQuery library */\n\n`;

  const headersString = getHeadersDataObject({
    headers,
    bodyType,
    rawBodyDataType,
    authorization,
    binaryData,
  });

  const bodyRawData = await getBodyRawData({
    rawBodyDataType,
    bodyType,
    rawData,
  });

  const formDataString = getFormData({
    bodyType,
    formData,
  });

  const xwwFormUrlEncodedString = getXWWWFormUrlencodedData({
    bodyType,
    xWWWFormUrlencoded,
  });

  const options: Array<{ key: string; value: unknown }> = [
    { key: "url", value: `"${url}"` },
    { key: "method", value: `"${method.toUpperCase()}"` },
  ];

  if (headersString) options.push({ key: "headers", value: "myHeaders" });

  const dataValue = getBodyData({ bodyType, formData, xWWWFormUrlencoded });
  if (dataValue) options.push({ key: "data", value: dataValue });

  if (bodyType === "form-data") {
    options.push({ key: "processData", value: false });
    options.push({ key: "contentType", value: false });
  }

  const apiJqueryString = `$.ajax({
${options
  .map(
    ({ key, value }) =>
      `\t${needsQuotesForKey(key) ? JSON.stringify(key) : key}: ${value}`
  )
  .join(",\n")}
})
\t.done(response => console.log(response))
\t.fail(error => console.error(error));`;

  const code = `${importString}${headersString}${formDataString}${xwwFormUrlEncodedString}${bodyRawData}${apiJqueryString}`;
  return generateMaskedAndRealCode({ code, authorization });
};

export const generateJavascriptXhrCode = async ({
  url,
  method,
  headers,
  authorization,
  formData,
  xWWWFormUrlencoded,
  rawData,
  rawBodyDataType,
  bodyType,
  binaryData,
}: CodeSnippitDataInterface) => {
  const headersString = getHeadersDataObject({
    headers,
    bodyType,
    rawBodyDataType,
    authorization,
    binaryData,
  });

  const headerLoopString = headersString
    ? `\nfor (const key in myHeaders) {
\txhr.setRequestHeader(key, myHeaders[key]);
}\n`
    : "";

  const bodyRawData = await getBodyRawData({
    rawBodyDataType,
    bodyType,
    rawData,
  });

  const formDataString = getFormData({
    bodyType,
    formData,
  });

  const xwwFormUrlEncodedString = getXWWWFormUrlencodedData({
    bodyType,
    xWWWFormUrlencoded,
  });

  const options: Array<{ key: string; value: unknown }> = [
    { key: "url", value: `"${url}"` },
    { key: "method", value: `"${method.toUpperCase()}"` },
  ];

  if (headersString) options.push({ key: "headers", value: "myHeaders" });

  const dataValue = getBodyData({ bodyType, formData, xWWWFormUrlencoded });
  if (dataValue) options.push({ key: "data", value: dataValue });

  if (bodyType === "form-data") {
    options.push({ key: "processData", value: false });
    options.push({ key: "contentType", value: false });
  }

  let sendVariableName = "";

  switch (bodyType) {
    case "form-data":
      sendVariableName = "formData";
      break;
    case "x-www-form-urlencoded":
      sendVariableName = "params.toString()";
      break;
    case "raw":
      sendVariableName = "raw";
      break;
    case "binary":
      sendVariableName = "file";
      break;
  }

  const apiXhrString = `const xhr = new XMLHttpRequest();
xhr.open("${method.toUpperCase()}", "${url}", true);
${headerLoopString}
xhr.onload = () => console.log(xhr.responseText);
xhr.onerror = () => console.error("Request failed");

xhr.send(${sendVariableName});`;

  const code = `${headersString}${formDataString}${xwwFormUrlEncodedString}${bodyRawData}${apiXhrString}`;
  return generateMaskedAndRealCode({ code, authorization });
};

export const generateJavascriptSuperagentCode = () => {};

export const generateJavascriptHttpCode = () => {};

export const generateJavaScriptCode = async (
  type: TRequestCodeType,
  data: CodeSnippitDataInterface
): Promise<RequestCodeSnippitInterface> => {
  switch (type) {
    case "javascript-fetch":
      return await generateJavascriptFetchCode(data);
    case "javascript-axios":
      return generateJavascriptAxiosCode(data);
    case "javascript-jquery":
      return generateJavascriptjQueryCode(data);
    case "javascript-xhr":
      return generateJavascriptXhrCode(data);
    // case "javascript-superagent":
    //   return generateJavascriptSuperagentCode();
  }
  return requestDefaultCodeSnippit;
};
