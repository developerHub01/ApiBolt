import type { CodeSnippitDataInterface } from "@/types/code-snippit.types";
import type { TRequestCodeType } from "@/types/request-code.type";
import { isStringIsValidObject } from "@/utils/helper";
import mime from "mime";

// formdata.append(
//   "",
//   fileInput.files[0],
//   "547685045_1488077659050543_866646527741654918_n.jpg"
// );
// formdata.append(
//   "",
//   fileInput.files[0],
//   "480865739_1336020140922963_3335755998115065399_n.jpg"
// );

export const generateJavascriptFetchCode = ({
  url,
  method,
  headers,
  authorization,
  formData,
  xWWWFormUrlencoded,
  rawData,
  rawBodyDataType,
  bodyType,
}: CodeSnippitDataInterface) => {
  const showHeaders = headers.length || authorization;

  if (authorization)
    headers.push({
      key: "Authorization",
      value: "••••••",
    });

  const headersString = showHeaders
    ? `/* Headers ========== */
const myHeaders = new Headers();
${headers
  .map(
    ({ key = "", value = "" }) =>
      `myHeaders.append(${JSON.stringify(key)}, ${JSON.stringify(value)});`
  )
  .join("\n")}\n\n`
    : "";

  const formDataString =
    bodyType === "form-data"
      ? `/* form-data =========== */
const formData = new FormData();
${formData.length ? formData.map(({ key = "", value = "" }) => `formData.append(${JSON.stringify(key)}, ${JSON.stringify(value)});`).join("\n") : ""}\n\n`
      : "";

  const xWWWFormUrlencodedString =
    bodyType === "x-www-form-urlencoded"
      ? `/* x-www-form-urlencoded =========== */
const urlencoded = new URLSearchParams();
${xWWWFormUrlencoded.length ? xWWWFormUrlencoded.map(({ key = "", value = "" }) => `urlencoded.append(${JSON.stringify(key)}, ${JSON.stringify(value)});`).join("\n") : ""}\n\n`
      : "";

  console.log(typeof rawData);
  console.log(rawData);
  console.log(isStringIsValidObject(rawData));

  const serializedRawData = isStringIsValidObject(rawData)
    ? rawData
    : JSON.stringify(rawData);
  const rawDataString =
    bodyType === "raw"
      ? rawBodyDataType === "json" && isStringIsValidObject(rawData)
        ? `const raw = JSON.stringify(${serializedRawData});\n\n`
        : `const raw = ${serializedRawData};\n\n`
      : "";

  const binaryDataString =
    bodyType === "binary" ? `const file = "<file contents here>";\n\n` : "";

  const options = `/* fetch options =========== */
const requestOptions = {
\tmethod: "${method.toUpperCase()}", ${showHeaders ? "\n\theaders: myHeaders," : ""}${bodyType === "none" ? "" : `\n\tbody: ${bodyType === "binary" ? "file" : bodyType === "form-data" ? "formData" : bodyType === "raw" ? "raw" : bodyType === "x-www-form-urlencoded" ? "urlencoded" : ""},`}
\tredirect: "follow"
};\n\n`;

  const fetchApi = `/* fetch api =========== */
fetch("${url}", requestOptions)
\t.then((response) => response.text())
\t.then((result) => console.log(result))
\t.catch((error) => console.error(error));`;

  return `${headersString}${formDataString}${xWWWFormUrlencodedString}${rawDataString}${binaryDataString}${options}${fetchApi}`;
};

export const generateJavascriptAxiosCode = () => {};

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

export const generateJavaScriptCode = (
  type: TRequestCodeType,
  data: CodeSnippitDataInterface
): string => {
  switch (type) {
    case "javascript-fetch":
      return generateJavascriptFetchCode(data);
    // case "javascript-axios":
    //   return generateJavascriptAxiosCode();
    case "javascript-jquery":
      return generateJavascriptjQueryCode(data);
    // case "javascript-xhr":
    //   return generateJavascriptjXhrCode();
    // case "javascript-superagent":
    //   return generateJavascriptjSuperagentCode();
  }
  return "";
};
