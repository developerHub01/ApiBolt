import { requestDefaultCodeSnippit } from "@/constant/code-snippit.constant";
import type {
  CodeSnippitDataInterface,
  TRequestCodeType,
} from "@/types/code-snippit.types";
import {
  defaultBinaryData,
  generateMaskedAndRealCode,
} from "@/utils/snippet-generator/helper.utils";
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
    method,
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
  let rawDataString = await generateRawDataString({
    method,
    rawData,
    rawBodyDataType,
    bodyType,
  });
  if (method !== "get" && bodyType === "raw" && rawBodyDataType === "json")
    rawDataString += `body = json.dumps(json_data)\n\n`;

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

  if (bodyType === "form-data" && method !== "get" && formData.length) {
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

  if (
    (bodyType === "raw" ||
      (bodyType === "x-www-form-urlencoded" && xWWWFormUrlencoded.length)) &&
    method !== "get"
  ) {
    optionsArr.push({
      key: "data",
      value: "data",
    });
  }

  if (bodyType === "binary" && method !== "get") {
    optionsArr.push({
      key: "data",
      value: "f",
    });
  }

  const optionsString = optionsArr.length
    ? `,\n${optionsArr.map(({ key, value }) => `\t${bodyType === "binary" ? "\t" : ""}${key}=${value}`).join(",\n")}`
    : "";

  let code = "";

  /* ============== BINARY-DATA =================== */
  if (method.toLowerCase() !== "get" && bodyType === "binary") {
    const binaryDataString = `# ============== BINARY-DATA ===================
with open(${JSON.stringify(binaryData ?? defaultBinaryData)}, "rb") as f:
\tresponse = requests.post(
\t\turl${optionsString}
\t)\n\n`;

    code = `${importString}${urlString}${headersString}${binaryDataString}${endString}`;
  } else {
    const httpActionString = `# ============== HTTP CALL ===================
response = requests.${method}(
\turl${optionsString}
)\n`;

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
  const importString = `import http.client
from urllib.parse import urlparse, urlencode
import mimetypes
import json\n\n`;

  const urlString = `url = "${url}"
parsed = urlparse(url)\n\n`;

  /* ============== HEADERS =================== */
  const headersString = generateHeadersString({
    headers,
    authorization,
    rawBodyDataType,
    bodyType,
    method,
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
      normalFormDataString = `# text fields
fields = {
${formData
  .filter((entry) => entry.type === "text")
  .map(({ key, value }) => `\t${JSON.stringify(key)}: ${JSON.stringify(value)}`)
  .join(",\n")}
}
for name, value in fields.items():
\tbody_lines.extend([
\t\tf"--{boundary}",
\t\tf'Content-Disposition: form-data; name="{name}"',
\t\t"",
\t\tvalue,
\t])\n\n`;
    }

    let fileFormDataString = "";
    if (formData.some((entry) => entry.type === "file")) {
      fileFormDataString = `# files
files = [
${formData
  .filter((entry) => entry.type === "file")
  .map(
    ({ key, value }) => `\t(${JSON.stringify(key)}, ${JSON.stringify(value)})`
  )
  .join(",\n")}
]

for fieldname, filename in files:
\tmimetype = mimetypes.guess_type(filename)[0] or "application/octet-stream"
\twith open(filename, "rb") as f:
\t\tfile_content = f.read()
\tbody_lines.extend([
\t\tf"--{boundary}",
\t\tf'Content-Disposition: form-data; name="{fieldname}"; filename="{filename}"',
\t\tf"Content-Type: {mimetype}",
\t\t"",
\t\tfile_content.decode("latin1")  # binary-safe
\t])\n\n`;
    }

    if (normalFormDataString || fileFormDataString) {
      formDataString = `#============== FORM-DATA ===================
boundary = "----WebKitFormBoundary7MA4YWxkTrZu0gW"
body_lines = []
${normalFormDataString}${fileFormDataString}
body_lines.append(f"--{boundary}--")
body_lines.append("")

body = "\r\n".join(body_lines)
headers["Content-Type"] = f"multipart/form-data; boundary={boundary}"\n\n`;
    }
  }

  /* ============== X-WWW-FORM-URLENCODER-DATA =================== */
  let xwwwFormUrlencoderString = "";
  if (
    method.toLowerCase() !== "get" &&
    bodyType === "x-www-form-urlencoded" &&
    xWWWFormUrlencoded.length
  ) {
    xwwwFormUrlencoderString = `body = urlencode({
${xWWWFormUrlencoded
  .map(({ key, value }) => `\t${JSON.stringify(key)}: ${JSON.stringify(value)}`)
  .join(",\n")}
})\n\n`;
  }

  /* ============== RAW-DATA =================== */
  let rawDataString = await generateRawDataString({
    method,
    rawData,
    rawBodyDataType,
    bodyType,
  });
  if (method !== "get" && bodyType === "raw" && rawBodyDataType === "json")
    rawDataString += `body = json.dumps(json_data)\n\n`;

  /* ============== BINARY-DATA =================== */
  let binaryDataString = "";
  if (method.toLowerCase() !== "get" && bodyType === "binary") {
    binaryDataString = `# ============== BINARY-DATA ===================
with open(${JSON.stringify(binaryData ?? defaultBinaryData)}, "rb") as f:
\tbody = f.read()\n\n`;
  }

  const optionsArr: Array<{
    key: string;
    value: string;
  }> = [];

  if (headersString)
    optionsArr.push({
      key: "headers",
      value: "headers",
    });

  if (["binary", "raw"].includes(bodyType) && method !== "get")
    optionsArr.push({
      key: "body",
      value: "body",
    });
  if (
    (bodyType === "form-data" && formData.length) ||
    (bodyType === "x-www-form-urlencoded" &&
      xWWWFormUrlencoded.length &&
      method !== "get")
  )
    optionsArr.push({
      key: "body",
      value: "body",
    });

  const optionsString = optionsArr.length
    ? `, ${optionsArr.map(({ key, value }) => `${key}=${value}`).join(", ")}`
    : "";

  const requestString = `conn = http.client.HTTPConnection(parsed.hostname, parsed.port or 80)
conn.request("${method.toUpperCase()}", parsed.path${optionsString})\n\n`;

  const endString = `res = conn.getresponse()
print(res.read().decode())
conn.close()`;

  const code = `${importString}${urlString}${headersString}${formDataString}${xwwwFormUrlencoderString}${rawDataString}${binaryDataString}${requestString}${endString}`;
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
  const importString = `import urllib3
from urllib.parse import urlparse, urlencode
import mimetypes
import json\n\n`;

  const startString = `url = "${url}"
parsed = urlparse(url)
http = urllib3.PoolManager()\n\n`;

  /* ============== HEADERS =================== */
  const headersString = generateHeadersString({
    headers,
    authorization,
    rawBodyDataType,
    bodyType,
    method,
  });

  /* ============== FORM-DATA =================== */
  let formDataString = "";
  if (
    method.toLowerCase() !== "get" &&
    bodyType === "form-data" &&
    formData.length
  ) {
    formDataString = `fields = {
${formData.map(({ key, value, type }) => `\t${JSON.stringify(key)}: ${type === "text" ? JSON.stringify(value) : `("${value}", open("${value}", "rb"))`}`).join(",\n")}
}\n\n`;
  }

  /* ============== X-WWW-FORM-URLENCODER-DATA =================== */
  let xwwwFormUrlencoderString = "";
  if (
    method.toLowerCase() !== "get" &&
    bodyType === "x-www-form-urlencoded" &&
    xWWWFormUrlencoded.length
  ) {
    xwwwFormUrlencoderString = `body = urlencode({
${xWWWFormUrlencoded
  .map(({ key, value }) => `\t${JSON.stringify(key)}: ${JSON.stringify(value)}`)
  .join(",\n")}
})\n\n`;
  }

  /* ============== RAW-DATA =================== */
  let rawDataString = await generateRawDataString({
    method,
    rawData,
    rawBodyDataType,
    bodyType,
  });
  if (method !== "get" && bodyType === "raw" && rawBodyDataType === "json")
    rawDataString += `body = json.dumps(json_data).encode()\n\n`;

  /* ============== BINARY-DATA =================== */
  let binaryDataString = "";
  if (method.toLowerCase() !== "get" && bodyType === "binary") {
    binaryDataString = `# ============== BINARY-DATA ===================
with open(${JSON.stringify(binaryData ?? defaultBinaryData)}, "rb") as f:
\tbody = f.read()\n\n`;
  }

  const optionsArr: Array<{
    key: string;
    value: string;
  }> = [];

  if (headersString)
    optionsArr.push({
      key: "headers",
      value: "headers",
    });

  if (["binary", "raw"].includes(bodyType) && method !== "get")
    optionsArr.push({
      key: "body",
      value: "body",
    });

  if (
    ((bodyType === "form-data" && formData.length) ||
      (bodyType === "x-www-form-urlencoded" && xWWWFormUrlencoded.length)) &&
    method !== "get"
  )
    optionsArr.push({
      key: "body",
      value: "body",
    });

  const optionsString = optionsArr.length
    ? `,\n${optionsArr.map(({ key, value }) => `\t${key}=${value}`).join(",\n")}`
    : "";

  const requestString = `response = http.request(
\t"${method.toUpperCase()}",
\tparsed.geturl()${optionsString}
)\n\n`;

  const endString = `print(response.data.decode())`;

  const code = `${importString}${startString}${headersString}${formDataString}${xwwwFormUrlencoderString}${rawDataString}${binaryDataString}${requestString}${endString}`;
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
  const startString = `import aiohttp
import asyncio
import json

url = "${url}"\n\n`;

  /* ============== HEADERS =================== */
  const headersString = generateHeadersString({
    headers,
    authorization,
    rawBodyDataType,
    bodyType,
    method,
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

  let formDataImplementationString = "";
  if (
    method.toLowerCase() !== "get" &&
    bodyType === "form-data" &&
    formDataString
  ) {
    let textFormString = "";
    let fileFormString = "";
    if (formData.some((entry) => entry.type === "text"))
      textFormString = `\t\tfor k, v in data.items():
\t\t\tform.add_field(k, v)\n`;
    if (formData.some((entry) => entry.type === "file"))
      fileFormString = `\t\tfor k, f in files.items():
\t\t\tform.add_field(k, f, filename=f.name)\n`;

    if (textFormString || fileFormString)
      formDataImplementationString = `\t\tform = aiohttp.FormData()\n${textFormString}${fileFormString}`;
  }

  /* ============== X-WWW-FORM-URLENCODER-DATA =================== */
  let xwwwFormUrlencoderString = "";
  if (
    method.toLowerCase() !== "get" &&
    bodyType === "x-www-form-urlencoded" &&
    xWWWFormUrlencoded.length
  ) {
    xwwwFormUrlencoderString = `body = {
${xWWWFormUrlencoded
  .map(({ key, value }) => `\t${JSON.stringify(key)}: ${JSON.stringify(value)}`)
  .join(",\n")}
}\n\n`;
  }

  /* ============== RAW-DATA =================== */
  let rawDataString = await generateRawDataString({
    method,
    rawData,
    rawBodyDataType,
    bodyType,
  });
  if (method !== "get" && bodyType === "raw" && rawBodyDataType === "json")
    rawDataString += `body = json.dumps(json_data)\n\n`;

  /* ============== BINARY-DATA =================== */
  let binaryDataString = "";
  if (method.toLowerCase() !== "get" && bodyType === "binary") {
    binaryDataString = `# ============== BINARY-DATA ===================
with open(${JSON.stringify(binaryData ?? defaultBinaryData)}, "rb") as f:
\tbody = f.read()\n\n`;
  }

  const optionsArr: Array<{
    key: string;
    value: string;
  }> = [];

  if (headersString)
    optionsArr.push({
      key: "headers",
      value: "headers",
    });

  if (["binary", "raw"].includes(bodyType) && method !== "get")
    optionsArr.push({
      key: "body",
      value: "body",
    });

  if (bodyType === "form-data" && method !== "get" && formData.length)
    optionsArr.push({
      key: "body",
      value: "form",
    });

  if (
    bodyType === "x-www-form-urlencoded" &&
    method !== "get" &&
    xWWWFormUrlencoded.length
  )
    optionsArr.push({
      key: "body",
      value: "body",
    });

  const optionsString = optionsArr.length
    ? `, ${optionsArr.map(({ key, value }) => `${key}=${value}`).join(", ")}`
    : "";

  const httpRequestCallString = `async def main():
\tasync with aiohttp.ClientSession() as session:
${formDataImplementationString}\t\tasync with session.${method.toLowerCase()}(url${optionsString}) as resp:
\t\t\tprint(await resp.text())\n\n`;

  const endString = `asyncio.run(main())`;

  const code = `${startString}${headersString}${formDataString}${xwwwFormUrlencoderString}${rawDataString}${binaryDataString}${httpRequestCallString}${endString}`;
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
