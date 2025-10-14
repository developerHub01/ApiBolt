import { requestDefaultCodeSnippit } from "@/constant/code-snippit.constant";
import type {
  CodeSnippitDataInterface,
  RequestCodeSnippitInterface,
  TRequestCodeType,
} from "@/types/code-snippit.types";
import {
  defaultBinaryData,
  generateMaskedAndRealCode,
  getHeadersList,
} from "@/utils/snippet-generator/helper.utils";
import { getBodyRawData } from "@/utils/snippet-generator/dart/helper.utils";

export const generateDartHttpCode = async ({
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
  const startString = `void main() async {\n`;

  const endString = `
\tprint(response.body);
}`;

  let bodyString = "";

  const headersList = getHeadersList({
    headers,
    authorization,
    rawBodyDataType,
    bodyType,
  });

  if (
    headersList.length &&
    bodyType === "binary" &&
    !headersList.some((entry) => entry.key === "Content-Type")
  ) {
    headersList.push({
      key: "Content-Type",
      value: "application/octet-stream",
    });
  }

  let rawDataString = await getBodyRawData({
    rawBodyDataType,
    bodyType,
    rawData,
  });
  if (rawDataString) {
    if (method.toLowerCase() !== "get") {
      rawDataString = `\t${rawDataString
        .split("\n")
        .map((entry, index) => (index && entry ? `\t${entry}` : entry))
        .join("\n")}`;
      bodyString = "rawData";
    } else {
      rawDataString = "";
      bodyString = "";
    }
  }

  if (bodyType === "form-data") {
    const request = `\tvar request = http.MultipartRequest(
\t\t"${method.toUpperCase()}",
\t\tUri.parse(${JSON.stringify(url)}),
\t);\n\n`;

    const headersString = !headersList.length
      ? ""
      : `${headersList.map(({ key, value }) => `\trequest.headers[${JSON.stringify(key)}] = ${JSON.stringify(value)}`).join(";\n")}\n`;

    const formDataString = !formData.length
      ? ""
      : `${formData
          .map(({ key, value, type }) =>
            type === "text"
              ? `\trequest.fields[${JSON.stringify(key)}] = ${JSON.stringify(value)}`
              : `\trequest.files.add(await http.MultipartFile.fromPath(
\t\t${JSON.stringify(key)},
\t\t${JSON.stringify(value)},
\t))`
          )
          .join(";\n")}\n`;

    const code = `${startString}${request}${headersString}${formDataString}
\tvar streamedResponse = await request.send();
\tvar response = await http.Response.fromStream(streamedResponse);\n${endString}`;

    return generateMaskedAndRealCode({ code, authorization });
  }

  const headersString = !headersList.length
    ? ``
    : `,\n\t\theaders: {\n${headersList
        .map(
          ({ key, value }) =>
            `\t\t\t${JSON.stringify(key)}: ${JSON.stringify(value)}`
        )
        .join(",\n")}\n\t\t},\n`;

  if (
    bodyType === "x-www-form-urlencoded" &&
    method.toLowerCase() !== "get" &&
    xWWWFormUrlencoded.length
  ) {
    bodyString = `{
${xWWWFormUrlencoded.map(({ key, value }) => `\t\t\t${JSON.stringify(key)}: ${JSON.stringify(value)}`).join(",\n")}
      }`;
  }

  let binaryDataString = "";
  if (bodyType === "binary" && method.toLowerCase() !== "get") {
    binaryDataString = `\tvar file = File(${JSON.stringify(binaryData ?? defaultBinaryData)});
\tvar bytes = await file.readAsBytes();\n\n`;
    bodyString = "bytes";
  }

  if (method.toLowerCase() !== "get") {
    bodyString = `\t\tbody: ${bodyString || `""`},\n`;
  }

  const requestString = `\tvar response = await http.${method.toLowerCase()}(
\t\tUri.parse(${JSON.stringify(url)})${headersString}${bodyString}\t)\n`;

  const code = `${startString}${rawDataString}${binaryDataString}${requestString}${endString}`;

  return generateMaskedAndRealCode({ code, authorization });
};

export const generateDartDioCode = async ({
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

export const generateDartCode = async (
  type: TRequestCodeType,
  data: CodeSnippitDataInterface
): Promise<RequestCodeSnippitInterface> => {
  switch (type) {
    case "dart-http":
      return await generateDartHttpCode(data);
    case "dart-dio":
      return await generateDartDioCode(data);
  }
  return requestDefaultCodeSnippit;
};
