import type {
  CodeSnippitDataInterface,
  TRequestCodeType,
} from "@/types/code-snippit.types";
import {
  defaultBinaryData,
  generateMaskedAndRealCode,
  getHeadersList,
} from "@/utils/snippet-generator/helper.utils";
import { requestDefaultCodeSnippit } from "@/constant/code-snippit.constant";
import mime from "mime";
import { getBodyRawData } from "@/utils/snippet-generator/ruby/helper.utils";

export const generateRubyNetHttpCode = async ({
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
  const startString = `require "net/http"
require "uri"
require "json"
require "net/http/post/multipart"

uri = URI.parse(${JSON.stringify(url)})\n\n`;

  const endString = `\tresponse = http.request(req)
\tputs response.body
end`;

  const readFormDataFiles =
    bodyType === "form-data" &&
    formData.some((entry) => entry.type === "file") &&
    method.toLowerCase() !== "get"
      ? `${formData
          .filter((entry) => entry.type === "file")
          .map(
            ({ value }, index) =>
              `file${index + 1} = UploadIO.new("/your_file_path_here/${value}", ${JSON.stringify(mime.getType(value))}, ${JSON.stringify(value)})`
          )
          .join("\n")}\n\n`
      : "";

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

  const headersString = headersList.length
    ? `${headersList.map(({ key, value }) => `\treq[${JSON.stringify(key)}] = ${JSON.stringify(value)}`).join("\n")}\n`
    : ``;

  const xWWWFormUrlencodedString =
    bodyType === "x-www-form-urlencoded" &&
    xWWWFormUrlencoded.length &&
    method.toLowerCase() !== "get"
      ? `\treq.set_form_data({${xWWWFormUrlencoded.map(({ key, value }) => `\t${JSON.stringify(key)}: ${JSON.stringify(value)}`).join(", ")}})\n`
      : ``;

  const binaryDataString =
    bodyType === "binary" && method.toLowerCase() !== "get"
      ? `\treq.body = File.read(${JSON.stringify(binaryData ?? defaultBinaryData)})\n`
      : ``;

  let rawDataString = "";
  if (bodyType === "raw" && method.toLowerCase() !== "get") {
    rawDataString = await getBodyRawData({
      rawBodyDataType,
      bodyType,
      rawData,
    });

    rawDataString =
      rawBodyDataType === "json"
        ? `${rawDataString
            .split("\n")
            .map((entry, index) => (index && entry ? `\t${entry}` : entry))
            .join("\n")}.to_json`
        : rawDataString;

    rawDataString = `\treq.body = ${rawDataString}\n`;
  }

  let requestString = `Net::HTTP.start(uri.host, uri.port) do |http|
\treq = Net::HTTP::${method[0].toUpperCase() + method.slice(1).toLowerCase()}.new(uri)\n`;

  if (readFormDataFiles) {
    const formDataPartList: Array<string> = [];

    const fieldString = `${
      formData.some((entry) => entry.type === "text")
        ? `${formData
            .filter((entry) => entry.type === "text")
            .map(
              ({ key, value }) =>
                `\t\t${JSON.stringify(key)} => ${JSON.stringify(value)}`
            )
            .join(",\n")}`
        : ""
    }`;

    if (fieldString) formDataPartList.push(fieldString);

    let fileIndex = 1;
    const filesData = formData
      .filter((entry) => entry.type === "file")
      .reduce(
        (acc, curr) => {
          if (!acc[curr.key]) acc[curr.key] = [];
          acc[curr.key].push(`file${fileIndex++}`);

          return acc;
        },
        {} as Record<string, Array<string>>
      );

    const filesString = formData.some((entry) => entry.type === "file")
      ? `${Object.entries(filesData)
          .map(
            ([key, values]) =>
              `\t\t${JSON.stringify(key + "[]")} => [${values.join(", ")}]`
          )
          .join(",\n")}`
      : "";

    if (filesString) formDataPartList.push(filesString);

    requestString = `Net::HTTP.start(uri.host, uri.port) do |http|
\treq = Net::HTTP::Post::Multipart.new(uri.path,
${formDataPartList.join(",\n")}
\t)\n`;
  }

  const code = `${startString}${readFormDataFiles}${requestString}${xWWWFormUrlencodedString}${binaryDataString}${rawDataString}${headersString}${endString}`;
  return generateMaskedAndRealCode({ code, authorization });
};

export const generateRubyRestClientCode = async ({
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
  const snippitList: Array<string> = [
    `RestClient.${method.toLowerCase()} ${JSON.stringify(url)}`,
  ];

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

  if (
    bodyType === "form-data" &&
    formData.length &&
    method.toLowerCase() !== "get"
  ) {
    const formDataSnippit: Array<string> = [];

    const formDataMap: Record<string, string | Array<string>> = {};

    formData.forEach(({ key, value, type }) => {
      if (type === "file" && !formDataMap[key]) formDataMap[key] = [];
      if (type === "text") formDataMap[key] = value;
      else if (Array.isArray(formDataMap[key])) formDataMap[key].push(value);
    });

    Object.entries(formDataMap).forEach(([key, value]) =>
      formDataSnippit.push(
        `\t\t${JSON.stringify(key)} => ${
          Array.isArray(value)
            ? `[
${value.map((value) => `\t\t\tFile.new(${JSON.stringify(value)})`).join(",\n")}
\t\t]`
            : `${JSON.stringify(value)}`
        }`
      )
    );

    snippitList.push(`\t{
${formDataSnippit.join(",\n")}
\t}`);
  }

  if (
    bodyType === "x-www-form-urlencoded" &&
    xWWWFormUrlencoded.length &&
    method.toLowerCase() !== "get"
  ) {
    snippitList.push(
      `\t{
${xWWWFormUrlencoded.map(({ key, value }) => `\t\t${JSON.stringify(key)} => ${JSON.stringify(value)}`).join(",\n")}
\t}`
    );
  }

  if (bodyType === "binary" && method.toLowerCase() !== "get")
    snippitList.push(
      `\tFile.read(${JSON.stringify(binaryData ?? defaultBinaryData)})`
    );

  if (bodyType === "raw" && method.toLowerCase() !== "get") {
    let rawDataString = await getBodyRawData({
      rawBodyDataType,
      bodyType,
      rawData,
    });

    rawDataString =
      rawBodyDataType === "json"
        ? `'${rawDataString
            .split("\n")
            .map((entry, index) => (index && entry ? `\t${entry}` : entry))
            .join("\n")}'`
        : rawDataString;

    snippitList.push(`\t${rawDataString}`);
  }

  if (headersList.length)
    snippitList.push(
      `\t{\n${headersList.map(({ key, value }) => `\t\t${JSON.stringify(key)} => ${JSON.stringify(value)}`).join(",\n")}\n\t}`
    );

  const code = `${snippitList.join(",\n")}`;
  return generateMaskedAndRealCode({ code, authorization });
};

export const generateRubyHTTPRbCode = async ({
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

export const generateRubyCode = async (
  type: TRequestCodeType,
  data: CodeSnippitDataInterface
) => {
  switch (type) {
    case "ruby-net-http":
      return await generateRubyNetHttpCode(data);
    case "ruby-restclient":
      return await generateRubyRestClientCode(data);
    case "ruby-http.rb":
      return await generateRubyHTTPRbCode(data);
  }

  return requestDefaultCodeSnippit;
};
