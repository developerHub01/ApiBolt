import type { CodeSnippitDataInterface } from "@/types/code-snippit.types";
import type { TRequestCodeType } from "@/types/request-code.type";
import { isStringIsValidObject, needsQuotesForKey } from "@/utils/helper";
import mime from "mime";
import {
  getBodyData,
  getBodyRawData,
  getFormData,
  getHeadersData,
  getHeadersList,
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
  .then(response => response.json())
  .then(result => console.log(result))
  .catch(error => console.error(error));`;

  return `${headersString}${formDataString}${xwwFormUrlEncodedString}${bodyRawData}${apiFetchString}`;
};

export const generateJavascriptAxiosCode = ({
  url,
  method,
  headers,
  authorization,
  formData,
  xWWWFormUrlencoded,
  rawBodyDataType,
  bodyType,
  binaryData,
}: CodeSnippitDataInterface) => {
  let headersString = "";

  const allHeadersList = getHeadersList({
    headers,
    bodyType,
    rawBodyDataType,
    authorization,
    binaryData,
  });

  if (allHeadersList.length) {
    headersString = `{
${allHeadersList.map(({ key, value }) => `\t\t${JSON.stringify(key)}: ${JSON.stringify(value)}`).join(",\n")}
\t}`;
  }

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
      value: headersString,
    });

  const dataValue = getBodyData({
    bodyType,
    formData,
    xWWWFormUrlencoded,
  });
  if (dataValue)
    options.push({
      key: "data",
      value: dataValue,
    });

  const importString = `import axios from "axios";`;

  return `${importString}

axios({
${options.map(({ key, value }) => `\t${JSON.stringify(key)}: ${value}`).join(",\n")}
})
  .then(response => console.log(response.data))
  .catch(error => console.error(error));`;
};

const jQueryCodeFormDataExtraSettingsMeta = [
  {
    key: "processData",
    value: true,
  },
  {
    key: "mimeType",
    value: "multipart/form-data",
  },
  {
    key: "contentType",
    value: false,
  },
];

export const generateJavascriptjQueryCode = ({
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
  let settingsData: unknown;
  let headersString = "";

  const headerContentType =
    bodyType === "x-www-form-urlencoded"
      ? "application/x-www-form-urlencoded"
      : bodyType === "binary"
        ? binaryData
          ? mime.getType(binaryData)
          : "text/plain"
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

  if (headerContentType)
    headers.push({
      key: "Content-Type",
      value: headerContentType,
    });
  if (authorization)
    headers.push({
      key: "Authorization",
      value: "••••••",
    });

  if (headers.length || authorization) {
    headersString = `{
${headers.map(({ key, value }) => `\t\t${JSON.stringify(key)}: ${JSON.stringify(value)}`).join(",\n")}
\t}`;
  }

  switch (bodyType) {
    case "form-data":
      settingsData = "formData";
      break;
    case "x-www-form-urlencoded": {
      if (!xWWWFormUrlencoded.length) break;
      settingsData = `{
${xWWWFormUrlencoded.map(({ key, value }) => `\t\t${JSON.stringify(key)}: ${JSON.stringify(value)}`).join(",\n")}
\t}`;
      break;
    }
    case "raw": {
      if (!rawData) break;
      settingsData = `${
        rawBodyDataType === "json"
          ? `JSON.stringify(${rawData})`
              .split("\n")
              .map((line, i) => (i === 0 ? line : "\t" + line))
              .join("\n")
          : isStringIsValidObject(rawData)
            ? rawData
            : JSON.stringify(rawData)
      }`;
      break;
    }
    case "binary": {
      if (!rawData) break;
      settingsData = "<file contents here>";
      break;
    }
  }

  const settingsArr: Array<{
    key: string;
    value: unknown;
  }> = [
    {
      key: "url",
      value: `"${url}"`,
    },
    {
      key: "method",
      value: `"${method.toUpperCase()}"`,
    },
    {
      key: "timeout",
      value: 0,
    },
  ];

  if (headersString)
    settingsArr.push({
      key: "headers",
      value: headersString,
    });

  if (bodyType === "form-data")
    settingsArr.push(...jQueryCodeFormDataExtraSettingsMeta);

  if (settingsData)
    settingsArr.push({
      key: "data",
      value: settingsData,
    });

  const settings = `{
${settingsArr.map(({ key, value }) => `\t${JSON.stringify(key)}: ${value}`).join(",\n")}
}`;
  const settingsString = `/* settings =========== */
const settings = ${settings}`;

  const formDataString =
    bodyType === "form-data"
      ? `/* form-data =========== */
const formData = new FormData();
${formData.length ? formData.map(({ key = "", value = "" }) => `formData.append(${JSON.stringify(key)}, ${JSON.stringify(value)});`).join("\n") : ""}\n\n`
      : "";

  const ajaxCodeString = `/* fetch api =========== */
$.ajax(settings).done(function (response) {
\tconsole.log(response);
});`;

  return `${formDataString}${settingsString}

${ajaxCodeString}`;
};

export const generateJavascriptjXhrCode = () => {};

export const generateJavascriptjSuperagentCode = () => {};

export const generateJavascriptjHttpCode = () => {};

export const generateJavaScriptCode = async (
  type: TRequestCodeType,
  data: CodeSnippitDataInterface
): Promise<string> => {
  switch (type) {
    case "javascript-fetch":
      return await generateJavascriptFetchCode(data);
    case "javascript-axios":
      return generateJavascriptAxiosCode(data);
    case "javascript-jquery":
      return generateJavascriptjQueryCode(data);
    // case "javascript-xhr":
    //   return generateJavascriptjXhrCode();
    // case "javascript-superagent":
    //   return generateJavascriptjSuperagentCode();
  }
  return "";
};
