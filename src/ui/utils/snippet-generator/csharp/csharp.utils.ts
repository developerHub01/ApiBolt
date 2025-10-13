import type {
  CodeSnippitDataInterface,
  RequestCodeSnippitInterface,
  TRequestCodeType,
} from "@/types/code-snippit.types";
import {
  defaultBinaryData,
  generateMaskedAndRealCode,
  getBodyType,
  getHeadersList,
} from "@/utils/snippet-generator/helper.utils";
import { requestDefaultCodeSnippit } from "@/constant/code-snippit.constant";

export const generateCSharpHttpClientCode = async ({
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
  const startString = `class Program
{
\tstatic async Task Main()
\t{
\t\t// ===== URL =====
\t\tstring url = "${url}";

\t\tusing HttpClient client = new HttpClient();\n\n`;

  let bodyVariableName: null | string = null;

  const bodyTypeString = getBodyType({
    bodyType,
    rawBodyDataType,
  });

  const headersList = getHeadersList({
    headers,
    authorization,
    rawBodyDataType,
    bodyType,
  });
  const headersString = !headersList.length
    ? ""
    : `\t\t// ===== Headers =====
${headers.map(({ key, value }) => `\t\tclient.DefaultRequestHeaders.Add(${JSON.stringify(key)}, ${JSON.stringify(value)});`).join("\n")}\n\n`;

  let formDataStrnig = "";
  if (
    bodyType === "form-data" &&
    method.toLowerCase() !== "get" &&
    formData.length
  ) {
    formDataStrnig = `\t\t// ===== POST Multipart/Form-Data =====
\t\tusing var multipartContent = new MultipartFormDataContent();
${formData.map(({ key, value, type }) => `\t\tmultipartContent.Add(new StringContent(${type === "text" ? `new StringContent(${JSON.stringify(value)})` : `new ByteArrayContent(File.ReadAllBytes(${JSON.stringify(value)}))`}), ${JSON.stringify(key)});`).join("\n")}\n\n`;
    bodyVariableName = "multipartContent";
  }

  let xWWWFormUrlencodedString = "";
  if (
    bodyType === "x-www-form-urlencoded" &&
    method.toLowerCase() !== "get" &&
    xWWWFormUrlencoded.length
  ) {
    xWWWFormUrlencodedString = `\t\t// ===== POST x-www-form-urlencoded =====
\t\tvar formData = new FormUrlEncodedContent(new[]
\t\t{
${xWWWFormUrlencoded.map(({ key, value }) => `\t\t\tnew KeyValuePair<string, string>(${JSON.stringify(key)}, ${JSON.stringify(value)})`).join(",\n")}
\t\t});\n\n`;
    bodyVariableName = "formData";
  }

  let rawDataString = "";
  if (bodyType === "raw" && method.toLowerCase() !== "get") {
    rawDataString = `\t\t// ===== POST Raw JSON =====
\t\tstring raw = ${JSON.stringify(rawData)};
\t\tvar data = new StringContent(raw, Encoding.UTF8, ${JSON.stringify(bodyTypeString)});\n\n`;
    bodyVariableName = "data";
  }

  let binaryDataString = "";
  if (bodyType === "binary" && method.toLowerCase() !== "get") {
    binaryDataString = `\t\t// ===== POST Binary File =====
\t\tbyte[] fileBytes = File.ReadAllBytes(${JSON.stringify(binaryData ?? defaultBinaryData)});
\t\tvar byteContent = new ByteArrayContent(fileBytes);
\t\tbyteContent.Headers.ContentType = new MediaTypeHeaderValue("application/octet-stream");\n\n`;
    bodyVariableName = "byteContent";
  }

  const bodyOptionString =
    method.toLowerCase() === "get" ? "" : `, ${bodyVariableName}`;

  const endString = `\t\tHttpResponseMessage response = await client.${method[0].toUpperCase() + method.slice(1).toLowerCase()}Async(url${bodyOptionString});
\t\tConsole.WriteLine(await response.Content.ReadAsStringAsync());
\t\t}
\t}
}`;

  const code = `${startString}${headersString}${formDataStrnig}${xWWWFormUrlencodedString}${rawDataString}${binaryDataString}${endString}`;
  return generateMaskedAndRealCode({ code, authorization });
};

export const generateCSharpRestSharpCode = async ({
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

export const generateCSharpFlurlCode = async ({
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

export const generateCSharpCode = async (
  type: TRequestCodeType,
  data: CodeSnippitDataInterface
): Promise<RequestCodeSnippitInterface> => {
  switch (type) {
    case "csharp-httpclient":
      return await generateCSharpHttpClientCode(data);
    case "csharp-flurl":
      return await generateCSharpFlurlCode(data);
    case "csharp-restsharp":
      return await generateCSharpRestSharpCode(data);
  }
  return requestDefaultCodeSnippit;
};
