import type {
  CodeSnippitDataInterface,
  TRequestCodeType,
} from "@/types/code-snippit.types";
import {
  defaultBinaryData,
  generateMaskedAndRealCode,
  getBodyType,
  getHeadersList,
} from "@/utils/snippet-generator/helper.utils";
import { requestDefaultCodeSnippit } from "@/constant/code-snippit.constant";
import mime from "mime";

export const generateJavaOkhttpCode = async ({
  url,
  method,
  headers = [],
  authorization,
  formData,
  xWWWFormUrlencoded,
  rawBodyDataType,
  bodyType,
  binaryData,
  rawData,
}: CodeSnippitDataInterface) => {
  const headersList = getHeadersList({
    headers,
    authorization,
    rawBodyDataType,
    bodyType,
  });
  const bodyTypeString = getBodyType({
    bodyType,
    rawBodyDataType,
  });

  const importString = "";

  const startString = `public class Main {
\tpublic static void main(String[] args) throws IOException {
\t\tString url = "${url}";\n\n`;

  let headersString = "";
  if (headersList.length)
    headersString = `\t\tHeaders headers = new Headers.Builder()\n${headersList.map(({ key, value }) => `\t\t\t.add(${JSON.stringify(key)}, ${JSON.stringify(value)})`).join("\n")}
\t\t\t.build();\n\n`;

  let requestOptionString = "";

  let formDataString = "";
  if (
    formData.length &&
    bodyType === "form-data" &&
    method.toLowerCase() !== "get"
  ) {
    let normalFormDataString = "";
    if (formData.some((entry) => entry.type === "text")) {
      normalFormDataString = `${formData
        .filter((entry) => entry.type === "text")
        .map(
          ({ key, value }) =>
            `\t\tform.addFormDataPart(${JSON.stringify(key)}, ${JSON.stringify(value)});`
        )
        .join("\n")}\n`;
    }
    let fileFormDataString = "";
    if (formData.some((entry) => entry.type === "file")) {
      fileFormDataString = `${formData
        .filter((entry) => entry.type === "file")
        .map(
          ({ key, value }) =>
            `\t\tform.addFormDataPart(${JSON.stringify(key)}, ${JSON.stringify(value)}, \n\t\t\tRequestBody.create(new File(${JSON.stringify(value)}), MediaType.parse(${JSON.stringify(mime.getType(value))})));`
        )
        .join("\n")}\n`;
    }

    formDataString = `\t\tMultipartBody.Builder form = new MultipartBody.Builder().setType(MultipartBody.FORM);\n${normalFormDataString}${fileFormDataString}\n\n`;
    requestOptionString = `form.build()`;
  }

  let xWWWFormUrlencodedString = "";
  if (
    xWWWFormUrlencoded.length &&
    bodyType === "x-www-form-urlencoded" &&
    method.toLowerCase() !== "get"
  ) {
    xWWWFormUrlencodedString = `\t\tString data = ${JSON.stringify(xWWWFormUrlencoded.map(({ key, value }) => `${key}=${value}`).join("&"))};\n\n`;
    requestOptionString = `RequestBody.create(data, MediaType.parse("${bodyTypeString}"))`;
  }

  let binaryString = "";
  if (method.toLowerCase() !== "get" && bodyType === "binary") {
    binaryString = `\t\tbyte[] fileBytes = Files.readAllBytes(new File(${JSON.stringify(binaryData) ?? `"${defaultBinaryData}"`}).toPath());\n\n`;
    requestOptionString = `RequestBody.create(fileBytes, MediaType.parse("application/octet-stream"))`;
  }

  let rawDataString = "";
  if (bodyType === "raw" && method.toLowerCase() !== "get") {
    rawDataString = `\t\tString data = ${JSON.stringify(rawData)};\n\n`;
    requestOptionString = `RequestBody.create(data, MediaType.parse("${bodyTypeString}"))`;
  }

  if (!requestOptionString)
    requestOptionString = "RequestBody.create(new byte[0])";

  const headerOptionString = headersString ? `\n\t\t\t.headers(headers)` : "";

  const requestString = `\t\tOkHttpClient client = new OkHttpClient();
\t\tRequest request = new Request.Builder()
\t\t\t.url(url)${headerOptionString}
\t\t\t.${method.toLowerCase()}(${requestOptionString})
\t\t\t.build();\n\n`;

  const endString = `\t\tResponse response = client.newCall(request).execute();
\t\tSystem.out.println(response.body().string());
\t\tresponse.close();
\t}
}`;

  const code = `${importString}${startString}${headersString}${formDataString}${xWWWFormUrlencodedString}${binaryString}${rawDataString}${requestString}${endString}`;

  return generateMaskedAndRealCode({ code, authorization });
};

export const generateJavaApacheHttpClientCode = () => {};

export const generateJavaHttpURLConnectionCode = () => {};

export const generateJavaUnirestCode = async ({
  url,
  method,
  headers = [],
  authorization,
  formData,
  xWWWFormUrlencoded,
  rawBodyDataType,
  bodyType,
  binaryData,
  rawData,
}: CodeSnippitDataInterface) => {
  const startString = `import kong.unirest.*;
import java.nio.file.*;

public class Main {
\tpublic static void main(String[] args) {
\t\tString url = "${url}";\n\n`;

  const headersList = getHeadersList({
    headers,
    authorization,
    rawBodyDataType,
    bodyType,
  });

  /* if binary type and not get method and not have content type then add content type manually */
  if (
    bodyType === "binary" &&
    method.toLowerCase() !== "get" &&
    !headersList.some((header) => header.key === "Content-Type")
  ) {
    headersList.push({
      key: "Content-Type",
      value: "application/octet-stream",
    });
  }

  let headersString = "";
  if (headersList.length)
    headersString = `${headersList.map(({ key, value }) => `\t\t\theader(${JSON.stringify(key)}, ${JSON.stringify(value)})`).join("\n")}\n`;

  let bodyDataString = "";

  let formDataString = "";
  if (
    bodyType === "form-data" &&
    formData.length &&
    method.toLowerCase() !== "get"
  )
    formDataString = `${formData.map(({ key, value, type }) => `\t\t\t.field(${JSON.stringify(key)}, ${type === "text" ? JSON.stringify(value) : `new java.io.File(${JSON.stringify(value)})`})`).join("\n")}\n`;

  if (bodyType === "x-www-form-urlencoded" && method !== "get")
    bodyDataString = `\t\t\t.body(${JSON.stringify(xWWWFormUrlencoded.map(({ key, value }) => `${key}=${value}`).join("&"))})\n`;

  let rawDataString = "";
  if (bodyType === "raw" && method.toLowerCase() !== "get") {
    rawDataString = `\t\tString data = ${JSON.stringify(rawData)};\n\n`;
    bodyDataString = `\t\t\t.body(data)\n`;
  }

  let binaryDataString = "";
  if (bodyType === "binary" && method.toLowerCase() !== "get") {
    binaryDataString = `\t\tbyte[] bytes = Files.readAllBytes(Paths.get(${JSON.stringify(binaryData) ?? `"${defaultBinaryData}"`}));\n\n`;
    bodyDataString = `\t\t\t.body(bytes)\n`;
  }

  const requestString = `\t\tHttpResponse<String> response = Unirest.${method}(url)\n${headersString}${formDataString}${bodyDataString}\t\t\t.asString();\n\n`;

  const endString = `\t\tSystem.out.println(response.getBody());
\t}
}`;

  const code = `${startString}${binaryDataString}${rawDataString}${requestString}${endString}`;

  return generateMaskedAndRealCode({ code, authorization });
};

export const generateJavaCode = async (
  type: TRequestCodeType,
  data: CodeSnippitDataInterface
) => {
  switch (type) {
    case "java-okhttp":
      return await generateJavaOkhttpCode(data);
    // case "java-apache-httpclient":
    //   return generateJavaApacheHttpClientCode();
    // case "java-httpurlconnection":
    //   return generateJavaHttpURLConnectionCode();
    case "java-unirest":
      return generateJavaUnirestCode(data);
  }

  return requestDefaultCodeSnippit;
};
