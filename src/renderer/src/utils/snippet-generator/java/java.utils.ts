import type {
  CodeSnippitDataInterface,
  TRequestCodeType
} from "@shared/types/code-snippit.types";
import {
  defaultBinaryData,
  generateMaskedAndRealCode,
  getBodyType,
  getHeadersList
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
  rawData
}: CodeSnippitDataInterface) => {
  const headersList = getHeadersList({
    headers,
    authorization,
    rawBodyDataType,
    bodyType
  });
  const bodyTypeString = getBodyType({
    bodyType,
    rawBodyDataType
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
    if (formData.some(entry => entry.type === "text")) {
      normalFormDataString = `${formData
        .filter(entry => entry.type === "text")
        .map(
          ({ key, value }) =>
            `\t\tform.addFormDataPart(${JSON.stringify(key)}, ${JSON.stringify(value)});`
        )
        .join("\n")}\n`;
    }
    let fileFormDataString = "";
    if (formData.some(entry => entry.type === "file")) {
      fileFormDataString = `${formData
        .filter(entry => entry.type === "file")
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
    binaryString = `\t\tbyte[] fileBytes = Files.readAllBytes(new File(${JSON.stringify(binaryData ?? defaultBinaryData)}).toPath());\n\n`;
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
  rawData
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
    bodyType
  });

  /* if binary type and not get method and not have content type then add content type manually */
  if (
    bodyType === "binary" &&
    method.toLowerCase() !== "get" &&
    !headersList.some(header => header.key === "Content-Type")
  ) {
    headersList.push({
      key: "Content-Type",
      value: "application/octet-stream"
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
    binaryDataString = `\t\tbyte[] bytes = Files.readAllBytes(Paths.get(${JSON.stringify(binaryData ?? defaultBinaryData)}));\n\n`;
    bodyDataString = `\t\t\t.body(bytes)\n`;
  }

  const requestString = `\t\tHttpResponse<String> response = Unirest.${method}(url)\n${headersString}${formDataString}${bodyDataString}\t\t\t.asString();\n\n`;

  const endString = `\t\tSystem.out.println(response.getBody());
\t}
}`;

  const code = `${startString}${binaryDataString}${rawDataString}${requestString}${endString}`;

  return generateMaskedAndRealCode({ code, authorization });
};

export const generateJavaHttpURLConnectionCode = async ({
  url,
  method,
  headers = [],
  authorization,
  formData,
  xWWWFormUrlencoded,
  rawBodyDataType,
  bodyType,
  binaryData,
  rawData
}: CodeSnippitDataInterface) => {
  const startString = `public class Main {
\tpublic static void main(String[] args) throws IOException {
\t\tString url = "${url}";
\t\tURL obj = new URL(url);${bodyType === "form-data" ? `\n\t\tString boundary = "===" + System.currentTimeMillis() + "===";` : ""}
\t\tHttpURLConnection con = (HttpURLConnection) obj.openConnection();${bodyType === "form-data" ? `\n\t\tcon.setRequestProperty("Content-Type", "multipart/form-data; boundary=" + boundary);` : ""}
\t\tcon.setRequestMethod("${method.toUpperCase()}");${bodyType !== "none" && method.toLowerCase() !== "get" ? `\n\t\tcon.setDoOutput(true);` : ""}\n`;

  const endString = `\t\tBufferedReader in = new BufferedReader(new InputStreamReader(con.getInputStream()));
\t\tString inputLine;
\t\tStringBuilder response = new StringBuilder();
\t\twhile ((inputLine = in.readLine()) != null) {
\t\t\t response.append(inputLine);
\t\t}
\t\tin.close();
\t\tSystem.out.println(response.toString());
\t}
}`;

  const headersList = getHeadersList({
    headers,
    authorization,
    rawBodyDataType,
    bodyType
  });

  /* if binary type and not get method and not have content type then add content type manually */
  if (
    bodyType === "binary" &&
    method.toLowerCase() !== "get" &&
    !headersList.some(header => header.key === "Content-Type")
  ) {
    headersList.push({
      key: "Content-Type",
      value: "application/octet-stream"
    });
  }

  let headersString = "";
  if (headersList.length)
    headersString = `${headersList.map(({ key, value }) => `\t\tcon.setRequestProperty(${JSON.stringify(key)}, ${JSON.stringify(value)});`).join("\n")}\n\n`;
  else headersString = "\n";

  let formDataString = "";
  if (
    bodyType === "form-data" &&
    formData.length &&
    method.toLowerCase() !== "get"
  ) {
    const filedString = formData.some(entry => entry.type === "text")
      ? `${formData
          .filter(({ type }) => type === "text")
          .map(
            (
              { key, value },
              index
            ) => `\t\t\t// ===== Text Field ${index + 1} =====
\t\t\tString key${index + 1} = ${JSON.stringify(key)};
\t\t\tString value${index + 1} = ${JSON.stringify(value)};
\t\t\tos.write(("--" + boundary + "\\r\\n").getBytes());
\t\t\tos.write(("Content-Disposition: form-data; name=\\"" + key${index + 1} + "\\"\\r\\n\\r\\n").getBytes());
\t\t\tos.write((value${index + 1} + "\\r\\n").getBytes());`
          )
          .join("\n\n")}\n\n`
      : "";

    const fileString = formData.some(entry => entry.type === "file")
      ? `${formData
          .filter(({ type }) => type === "file")
          .map(
            ({ key, value }, index) => `\t\t\t// ===== File ${index + 1} =====
\t\t\tFile file${index + 1} = new File(${JSON.stringify(value)});
\t\t\tos.write(("--" + boundary + "\r\n").getBytes());
\t\t\tos.write(("Content-Disposition: form-data; name=\\"${key}\\"; filename=\\"" + file${index + 1}.getName() + "\\"\\r\\n").getBytes());
\t\t\tos.write(("Content-Type: " + Files.probeContentType(file${index + 1}.toPath()) + "\\r\\n\\r\\n").getBytes());
\t\t\tFiles.copy(file${index + 1}.toPath(), os);
\t\t\tos.write("\\r\\n".getBytes());`
          )
          .join("\n\n")}\n`
      : "";

    formDataString = `\t\ttry (OutputStream os = con.getOutputStream()) {
${filedString}${fileString}
\t\t\tos.write(("--" + boundary + "--\\r\\n").getBytes());
\t\t}\n\n`;
  }

  let xWWWFormUrlencodedString = "";
  if (
    bodyType === "x-www-form-urlencoded" &&
    xWWWFormUrlencoded.length &&
    method.toLowerCase() !== "get"
  ) {
    xWWWFormUrlencodedString = `\t\t/* ========= XWWW-Form-Urlencoded ========= */
\t\tString data = ${JSON.stringify(xWWWFormUrlencoded.map(({ key, value }) => `${key}=${value}`).join("&"))};

\t\ttry (OutputStream os = con.getOutputStream()) {
\t\t\tbyte[] input = data.getBytes(StandardCharsets.UTF_8);
\t\t\tos.write(input, 0, input.length);
\t\t}\n\n`;
  }

  let binaryDataString = "";
  if (bodyType === "binary" && method.toLowerCase() !== "get") {
    binaryDataString = `\t\t/* ========= Binary-data ========= */
\t\tbyte[] fileBytes = Files.readAllBytes(new File(${JSON.stringify(binaryData ?? defaultBinaryData)}).toPath());

\t\ttry (OutputStream os = con.getOutputStream()) {
\t\t\tos.write(fileBytes);
\t\t}\n\n`;
  }

  let rawDataString = "";
  if (bodyType === "raw" && method.toLowerCase() !== "get") {
    rawDataString = `\t\t/* ========= Raw-data ========= */
\t\tString data = ${JSON.stringify(rawData)};

\t\ttry (OutputStream os = con.getOutputStream()) {
\t\t\tbyte[] input = data.getBytes(StandardCharsets.UTF_8);
\t\t\tos.write(input, 0, input.length);
\t\t}\n\n`;
  }

  const code = `${startString}${headersString}${formDataString}${xWWWFormUrlencodedString}${binaryDataString}${rawDataString}${endString}`;

  return generateMaskedAndRealCode({ code, authorization });
};

export const generateJavaApacheHttpClientCode = async ({
  url,
  method,
  headers = [],
  authorization,
  formData,
  xWWWFormUrlencoded,
  rawBodyDataType,
  bodyType,
  binaryData,
  rawData
}: CodeSnippitDataInterface) => {
  const startString = `public class Main {
\tpublic static void main(String[] args) throws Exception {
\t\tString url = "${url}";

\t\tCloseableHttpClient client = HttpClients.createDefault();
\t\tHttp${method[0].toUpperCase() + method.slice(1).toLowerCase()} request = new Http${method[0].toUpperCase() + method.slice(1).toLowerCase()}(url);\n\n`;

  const endString = `\t\tHttpResponse response = client.execute(request);
\t\tString result = EntityUtils.toString(response.getEntity());
\t\tSystem.out.println(result);

\t\tclient.close();
\t}
}`;

  const headersList = getHeadersList({
    headers,
    authorization,
    rawBodyDataType,
    bodyType
  });

  /* if binary type and not get method and not have content type then add content type manually */
  if (
    bodyType === "binary" &&
    method.toLowerCase() !== "get" &&
    !headersList.some(header => header.key === "Content-Type")
  ) {
    headersList.push({
      key: "Content-Type",
      value: "application/octet-stream"
    });
  }

  let headersString = "";
  if (headersList.length)
    headersString = `${headersList.map(({ key, value }) => `\t\trequest.setHeader(${JSON.stringify(key)}, ${JSON.stringify(value)});`).join("\n")}\n\n`;

  let formDataString = "";
  if (
    bodyType === "form-data" &&
    formData.length &&
    method.toLowerCase() !== "get"
  )
    formDataString = `\t\tMultipartEntityBuilder builder = MultipartEntityBuilder.create();\n${formData.map(({ key, value, type }) => `\t\tbuilder.addPart(${JSON.stringify(key)}, ${type === "text" ? `new StringBody(${JSON.stringify(value)})` : `new FileBody(new File(${JSON.stringify(value)}))`});`).join("\n")}
\t\trequest.setEntity(builder.build());\n\n`;

  let xWWWFormUrlencodedString = "";
  if (
    bodyType === "x-www-form-urlencoded" &&
    xWWWFormUrlencoded.length &&
    method.toLowerCase() !== "get"
  )
    xWWWFormUrlencodedString = `\t\tList<BasicNameValuePair> params = new ArrayList<>();\n${xWWWFormUrlencoded.map(({ key, value }) => `\t\tparams.add(new BasicNameValuePair(${JSON.stringify(key)}, ${JSON.stringify(value)}));`).join("\n")}
\t\trequest.setEntity(new UrlEncodedFormEntity(params));\n\n`;

  let binaryDataString = "";
  if (bodyType === "binary" && method.toLowerCase() !== "get")
    binaryDataString = `\t\tbyte[] fileBytes = Files.readAllBytes(Paths.get(${JSON.stringify(binaryData ?? defaultBinaryData)}));
\t\trequest.setEntity(new ByteArrayEntity(fileBytes));\n\n`;

  let rawDataString = "";
  if (bodyType === "raw" && method.toLowerCase() !== "get") {
    rawDataString = `\t\t/* ========= Raw-data ========= */
\t\tString data = ${JSON.stringify(rawData)};
\t\trequest.setEntity(new StringEntity(data));\n\n`;
  }

  const requestString = ``;

  const code = `${startString}${headersString}${formDataString}${xWWWFormUrlencodedString}${binaryDataString}${rawDataString}${requestString}${endString}`;
  return generateMaskedAndRealCode({ code, authorization });
};

export const generateJavaCode = async (
  type: TRequestCodeType,
  data: CodeSnippitDataInterface
) => {
  switch (type) {
    case "java-okhttp":
      return await generateJavaOkhttpCode(data);
    case "java-unirest":
      return await generateJavaUnirestCode(data);
    case "java-httpurlconnection":
      return await generateJavaHttpURLConnectionCode(data);
    case "java-apache-httpclient":
      return await generateJavaApacheHttpClientCode(data);
  }

  return requestDefaultCodeSnippit;
};
