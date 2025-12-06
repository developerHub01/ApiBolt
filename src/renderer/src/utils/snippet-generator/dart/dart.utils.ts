import { requestDefaultCodeSnippit } from "@/constant/code-snippit.constant";
import type {
  CodeSnippitDataInterface,
  RequestCodeSnippitInterface,
  TRequestCodeType,
} from "@shared/types/code-snippit.types";
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
    !headersList.some(entry => entry.key === "Content-Type")
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
\t))`,
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
            `\t\t\t${JSON.stringify(key)}: ${JSON.stringify(value)}`,
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
  let bodyString = "";

  const startString = `void main() async {\n`;
  const endString = `
\tprint(response.data);
}`;

  const headersList = getHeadersList({
    headers,
    authorization,
    rawBodyDataType,
    bodyType,
  });

  if (
    headersList.length &&
    bodyType === "binary" &&
    !headersList.some(entry => entry.key === "Content-Type")
  ) {
    headersList.push({
      key: "Content-Type",
      value: "application/octet-stream",
    });
  }

  let headersString = "";
  if (headersList.length) {
    headersString = `\t// headers
\tMap<String, String>? headers = {
${headersList.map(({ key, value }) => `\t\t${JSON.stringify(key)}: ${JSON.stringify(value)}`).join(",\n")}
\t};\n\n`;
  }

  let formDataString = "";
  if (
    bodyType === "form-data" &&
    formData.length &&
    method.toLowerCase() !== "get"
  ) {
    const fieldString = !formData.some(entry => entry.type === "text")
      ? ""
      : `\tMap<String, dynamic> fields = {
${formData
  .filter(entry => entry.type === "text")
  .map(
    ({ key, value }) => `\t\t${JSON.stringify(key)}: ${JSON.stringify(value)}`,
  )
  .join(",\n")}
\t};\n\n`;

    const fileMap: Record<string, Array<string>> = {};
    formData
      .filter(entry => entry.type === "file")
      .forEach(({ key, value }) => {
        if (!fileMap[key]) fileMap[key] = [];
        fileMap[key].push(value);
      });

    const filMapLength = Object.keys(fileMap).length;

    const fileString = !filMapLength
      ? ""
      : `\tMap<String, List<File>> files = {
${Object.entries(fileMap)
  .map(
    ([key, value]) =>
      `\t\t${JSON.stringify(key)}: [${filMapLength ? "\n" : ""}${value.map(entry => `\t\t\tFile(${JSON.stringify(entry)})`).join(",\n")}${filMapLength ? "\n\t\t]" : "]"}`,
  )
  .join(",\n")}
\t};\n`;

    formDataString = `\t// form-data
${fieldString}${fileString}
\t// Create the FormData object
\tFormData formData = FormData();

\t// Add text fields
\tfields.forEach((key, value) {
\t\tformData.fields.add(MapEntry(key, value.toString()));
\t});

\t// Add files (supporting multiple files per field)
\tfor (var entry in files.entries) {
\t\tfor (var file in entry.value) {
\t\t\tformData.files.add(MapEntry(
\t\t\t\tentry.key,
\t\t\t\tawait MultipartFile.fromFile(file.path),
\t\t\t));
\t\t}
\t}\n\n`;

    bodyString = "formData";
  }

  let xWWWFormUrlencodedString = "";
  if (
    bodyType === "x-www-form-urlencoded" &&
    xWWWFormUrlencoded.length &&
    method.toLowerCase() !== "get"
  ) {
    xWWWFormUrlencodedString = `\t// x-www-form-urlencoded form
\tMap<String, dynamic> bodyData = {
  ${xWWWFormUrlencoded.map(({ key, value }) => `\t\t${JSON.stringify(key)}: ${JSON.stringify(value)}`).join(",\n")}
\t};\n\n`;

    bodyString = "FormData.fromMap(bodyData)";
  }

  let binaryDataString = "";
  if (bodyType === "binary" && method.toLowerCase() !== "get") {
    binaryDataString = `\t// binary-data
\tFile file = File(${JSON.stringify(binaryData ?? defaultBinaryData)});
\tList<int> bodyData = file.readAsBytesSync();\n\n`;

    bodyString = "bodyData";
  }

  let rawDataString = await getBodyRawData({
    rawBodyDataType,
    bodyType,
    rawData,
  });
  if (rawDataString) {
    if (method.toLowerCase() !== "get") {
      rawDataString = `\t// raw-data
\t${rawDataString
        .split("\n")
        .map((entry, index) => (index && entry ? `\t${entry}` : entry))
        .join("\n")}`;
      bodyString = "bodyString";
    } else {
      rawDataString = "";
      bodyString = "";
    }
  }

  if (method.toLowerCase() !== "get") {
    bodyString = `\t\tdata: ${bodyString || `""`},\n`;
  }

  const headersOptionString = headersString
    ? "\t\toptions: Options(headers: headers),\n"
    : "";

  const requestString = `\t// Initialize Dio
\tDio dio = Dio();\n
\t// make http request
\tResponse response = await dio.${method.toLowerCase()}(
\t\t${JSON.stringify(url)},\n${bodyString}${headersOptionString}\t);\n`;

  const code = `${startString}${headersString}${formDataString}${xWWWFormUrlencodedString}${binaryDataString}${rawDataString}${requestString}${endString}`;

  return generateMaskedAndRealCode({ code, authorization });
};

export const generateDartCode = async (
  type: TRequestCodeType,
  data: CodeSnippitDataInterface,
): Promise<RequestCodeSnippitInterface> => {
  switch (type) {
    case "dart-http":
      return await generateDartHttpCode(data);
    case "dart-dio":
      return await generateDartDioCode(data);
  }
  return requestDefaultCodeSnippit;
};
