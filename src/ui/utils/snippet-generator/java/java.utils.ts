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

export const generateJavaUnirestCode = () => {};

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
    // case "java-unirest":
    //   return generateJavaUnirestCode();
  }

  return requestDefaultCodeSnippit;
};
