import type { CodeSnippitDataInterface } from "@/types/code-snippit.types";
import type { TRequestCodeType } from "@/types/request-code.type";
import { isStringIsValidObject } from "@/utils/helper";

// const stringifyHeaders = (headers?: Record<string, string>): string => {
//   if (!headers || Object.keys(headers).length === 0) return "";
//   return Object.entries(headers)
//     .map(([key, value]) => `  "${key}": "${value}"`)
//     .join(",\n");
// };

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

  const headersString = showHeaders
    ? `/* Headers ========== */
const myHeaders = new Headers();
${headers
  .map(({ key = "", value = "" }) => `myHeaders.append("${key}", "${value}");`)
  .join("\n")}
${authorization ? `myHeaders.append("Authorization", "••••••");` : ""}\n\n`
    : "";

  const formDataString =
    bodyType === "form-data"
      ? `/* form-data =========== */
const formData = new FormData();
${formData.length ? formData.map(({ key = "", value = "" }) => `formData.append("${key}", "${value}");`).join("\n") : ""}\n\n`
      : "";

  const xWWWFormUrlencodedString =
    bodyType === "x-www-form-urlencoded"
      ? `/* x-www-form-urlencoded =========== */
const urlencoded = new URLSearchParams();
${xWWWFormUrlencoded.length ? xWWWFormUrlencoded.map(({ key = "", value = "" }) => `urlencoded.append("${key}", "${value}");`).join("\n") : ""}\n\n`
      : "";

  const rawDataString =
    bodyType === "raw"
      ? rawBodyDataType === "json" && isStringIsValidObject(rawData)
        ? `const raw = JSON.stringify(${rawData});\n\n`
        : `const raw = ${JSON.stringify(rawData)};\n\n`
      : "";

  const binaryDataString =
    bodyType === "binary" ? `const file = "<file contents here>";\n\n` : "";

  const options = `const requestOptions = {
  method: "${method.toUpperCase()}", ${showHeaders ? "\n  headers: myHeaders," : ""}
  ${bodyType !== "none" ? `body: ${bodyType === "binary" ? "file" : bodyType === "form-data" ? "formData" : bodyType === "raw" ? "raw" : bodyType === "x-www-form-urlencoded" ? "urlencoded" : ""},` : ""}
  redirect: "follow"
};\n\n`;

  const fetchApi = `fetch("${url}", requestOptions)
  .then((response) => response.text())
  .then((result) => console.log(result))
  .catch((error) => console.error(error));`;

  return `${headersString}${formDataString}${xWWWFormUrlencodedString}${rawDataString}${binaryDataString}${options}${fetchApi}`;
};

export const generateJavascriptAxiosCode = () => {};

export const generateJavascriptjQueryCode = () => {};

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
    // case "javascript-jquery":
    //   return generateJavascriptjQueryCode();
    // case "javascript-xhr":
    //   return generateJavascriptjXhrCode();
    // case "javascript-superagent":
    //   return generateJavascriptjSuperagentCode();
  }
  return "";
};
