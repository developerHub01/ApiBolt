import type { TRequestCodeType } from "@/types/request-code.type";
import type { THTTPMethods } from "@/types/request-response.types";

interface RequestInterface {
  method: THTTPMethods;
  url: string;
  headers: Record<string, string>;
  body: string;
}

const stringifyHeaders = (headers?: Record<string, string>): string => {
  if (!headers || Object.keys(headers).length === 0) return "";
  return Object.entries(headers)
    .map(([key, value]) => `  "${key}": "${value}"`)
    .join(",\n");
};

export const generateJavascriptFetchCode = ({
  url,
  method,
  headers,
  body,
}: RequestInterface) => {
  const hasHeaders = headers && Object.keys(headers).length > 0;
  const headerBlock = hasHeaders
    ? `headers: {\n${stringifyHeaders(headers)}\n  },\n`
    : "";

  const bodyBlock = body ? `body: ${JSON.stringify(body, null, 2)},\n` : "";

  return `fetch("${url}", {
  method: "${method.toUpperCase()}",
  ${headerBlock}${bodyBlock}}).then(response => response.json())
  .then(data => console.log(data))
  .catch(error => console.error(error));`;
};

export const generateJavascriptAxiosCode = () => {};

export const generateJavascriptjQueryCode = () => {};

export const generateJavascriptjXhrCode = () => {};

export const generateJavascriptjSuperagentCode = () => {};

export const generateJavascriptjHttpCode = () => {};

export const generateJavaScriptCode = (type: TRequestCodeType) => {
  switch (type) {
    case "javascript-fetch":
      // return generateJavascriptFetchCode();
    // case "javascript-axios":
    //   return generateJavascriptAxiosCode();
    // case "javascript-jquery":
    //   return generateJavascriptjQueryCode();
    // case "javascript-xhr":
    //   return generateJavascriptjXhrCode();
    // case "javascript-superagent":
    //   return generateJavascriptjSuperagentCode();
  }
};
