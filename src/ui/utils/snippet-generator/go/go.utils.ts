import {
  generateMaskedAndRealCode,
  getBodyType,
  jsonFormatter,
} from "@/utils/snippet-generator/helper.utils";
import type {
  CodeSnippitDataInterface,
  RequestCodeSnippitInterface,
  TRequestCodeType,
} from "@/types/code-snippit.types";
import {
  MASKED_AUTHORIZATION,
  requestDefaultCodeSnippit,
} from "@/constant/code-snippit.constant";
import { isStringIsValidObject } from "@/utils/helper";

export const generateGoNetHttpCode = async ({
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
  const packageString = `package main\n\n`;
  const imports: Array<string> = ["fmt", "net/http", "net/url", "io"];

  const codeStartString = `func main() {
\turlStr := "${url}"\n\n`;

  /* ============== FORM DATA ================== */
  let formDataString = "";
  if (
    bodyType === "form-data" &&
    formData.length &&
    method.toLowerCase() !== "get"
  ) {
    const formDataNormalString = formData.some((form) => form.type === "text")
      ? `${formData.map(({ key, value }) => `\twriter.WriteField(${JSON.stringify(key)}, ${JSON.stringify(value)})`).join("\n")}\n\n`
      : "";

    const formDataFilesString = formData.some((form) => form.type === "file")
      ? `${formData
          .map(
            (
              { key, value },
              index
            ) => `\tfile${index + 1}, _ := os.Open(${JSON.stringify(value)})
  \tdefer file${index + 1}.Close()
  \tpart${index + 1}, _ := writer.CreateFormFile(${JSON.stringify(key)}, ${JSON.stringify(value)})
  \tio.Copy(part${index + 1}, file${index + 1})`
          )
          .join("\n\n")}\n`
      : "";

    let formDataReadingString =
      formDataNormalString.concat(formDataFilesString);

    if (formDataReadingString)
      formDataReadingString = `\tvar b bytes.Buffer
  \twriter := multipart.NewWriter(&b)
  ${formDataReadingString}
  \twriter.Close()\n\n`;

    formDataString = formData.length
      ? `\t// ================= FORM DATA =================
  ${formDataReadingString}`
      : "";
  }

  /* ============== XWWWFORMURLENCODED DATA ================== */
  let xWWWFormUrlencodedString = "";
  if (
    bodyType === "x-www-form-urlencoded" &&
    xWWWFormUrlencoded.length &&
    method.toLowerCase() !== "get"
  ) {
    xWWWFormUrlencodedString = `\t// ================= XWWWFORMURLENCODED DATA =================
\tdata := url.Values{}
${xWWWFormUrlencoded.map(({ key, value }) => `\tdata.Set(${JSON.stringify(key)}, ${JSON.stringify(value)})`).join("\n")}\n\n`;
  }

  let binaryDataString = "";
  if (bodyType === "binary" && method.toLowerCase() !== "get") {
    binaryDataString = `\t// ================= BINARY DATA =================
\tbinData, _ := os.ReadFile(${binaryData ? JSON.stringify(binaryData) : JSON.stringify("/your_file_path")})\n\n`;
  }

  let rawDataString = "";
  /* ============== RAW DATA ================== */
  if (bodyType === "raw" && method.toLowerCase() !== "get") {
    if (rawBodyDataType === "json" && isStringIsValidObject(rawData)) {
      const codeString = `${await jsonFormatter(rawData)}`
        .split("\n")
        ?.map((line, index) => (index ? `\t${line}` : line))
        .join("\n");
      rawDataString = `// TODO: convert JSON object to Go map if it is broken.
\tjsonData := map[string]interface{}${codeString}
\tdata, _ := json.Marshal(jsonData)`;
    } else rawDataString = `data := ${JSON.stringify(rawData)}`;

    if (rawDataString)
      rawDataString = `\t// ================= RAW DATA =================\n\t${rawDataString}\n\n`;
  }

  const codeEndingString = `\tresp, _ := http.DefaultClient.Do(req)
\tbody, _ := io.ReadAll(resp.Body)
\tfmt.Println(string(body))
\tresp.Body.Close()
}`;

  let requestDataString: string | null = null;
  if (bodyType === "binary") requestDataString = `bytes.NewBuffer(binData)`;
  else if (bodyType === "form-data") requestDataString = `&b`;
  else if (bodyType === "x-www-form-urlencoded")
    requestDataString = `bytes.NewBufferString(data.Encode())`;
  else if (bodyType === "raw" && rawBodyDataType === "json")
    requestDataString = `bytes.NewBuffer(data)`;
  else if (bodyType === "raw" && rawBodyDataType !== "json")
    requestDataString = `bytes.NewBufferString(data)`;
  if (!requestDataString || method.toLowerCase() === "get")
    requestDataString = "nil";

  const requestString = `\treq, _ := http.NewRequest("${method.toUpperCase()}", urlStr, ${requestDataString})\n`;

  let contentTypeHeader = "";
  if (method.toLowerCase() !== "get") {
    if (bodyType === "x-www-form-urlencoded")
      contentTypeHeader = `req.Header.Set("Content-Type", "application/x-www-form-urlencoded")`;
    else if (bodyType === "form-data")
      contentTypeHeader = `req.Header.Set("Content-Type", writer.FormDataContentType())`;
    else if (bodyType === "raw") {
      const headerContentType = getBodyType({
        bodyType,
        rawBodyDataType,
      });
      if (headerContentType)
        contentTypeHeader = `req.Header.Set("Content-Type", ${JSON.stringify(headerContentType)})`;
    }

    if (contentTypeHeader) contentTypeHeader = `\t${contentTypeHeader}\n`;
  }

  let headersString = "";
  if (headers.length || authorization) {
    if (authorization)
      headers = [
        {
          ...authorization,
          value: MASKED_AUTHORIZATION,
        },
        ...headers,
      ];
    headersString = headers
      .map(
        ({ key, value }) =>
          `\treq.Header.Set(${JSON.stringify(key)}, ${JSON.stringify(value)})`
      )
      .join("\n");
    if (headersString) headersString += "\n\n";
  }

  // Conditionally add packages based on bodyType
  if (formDataString) imports.push("bytes", "mime/multipart", "os");
  else if (binaryDataString) imports.push("bytes", "os");
  else if (xWWWFormUrlencodedString) imports.push("bytes");
  else if (rawDataString) {
    if (rawBodyDataType === "json") imports.push("bytes", "encoding/json");
    else imports.push("bytes");
  }

  // Generate import block
  const importBlock = `import (\n${Array.from(new Set(imports))
    .map((imp) => `\t"${imp}"`)
    .join("\n")}\n)\n\n`;

  const code = `${packageString}${importBlock}${codeStartString}${formDataString}${xWWWFormUrlencodedString}${binaryDataString}${rawDataString}${requestString}${contentTypeHeader}${headersString}${codeEndingString}`;
  return generateMaskedAndRealCode({ code, authorization });
};

export const generateGoFasthttpCode = async ({
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
  const imports: Array<string> = ["fmt"];
  const packageString = `package main\n\n`;
  const codeStartString = `func main() {
\turl := "${url}"

\treq := fasthttp.AcquireRequest()
\tresp := fasthttp.AcquireResponse()
\tdefer fasthttp.ReleaseRequest(req)
\tdefer fasthttp.ReleaseResponse(resp)

\treq.Header.SetMethod("${method.toUpperCase()}")
\treq.SetRequestURI(url)\n\n`;

  let setBodyValueString = "";

  /* ============== FORM DATA ================== */
  let formDataString = "";
  if (
    bodyType === "form-data" &&
    formData.length &&
    method.toLowerCase() !== "get"
  ) {
    const formDataNormalString = formData.some((form) => form.type === "text")
      ? `${formData.map(({ key, value }) => `\twriter.WriteField(${JSON.stringify(key)}, ${JSON.stringify(value)})`).join("\n")}\n\n`
      : "";

    const formDataFilesString = formData.some((form) => form.type === "file")
      ? `${formData
          .map(
            (
              { key, value },
              index
            ) => `\tfile${index + 1}, _ := os.Open(${JSON.stringify(value)})
  \tdefer file${index + 1}.Close()
  \tpart${index + 1}, _ := writer.CreateFormFile(${JSON.stringify(key)}, ${JSON.stringify(value)})
  \tio.Copy(part${index + 1}, file${index + 1})`
          )
          .join("\n\n")}\n`
      : "";

    let formDataReadingString =
      formDataNormalString.concat(formDataFilesString);

    if (formDataReadingString)
      formDataReadingString = `\t// Create multipart writer
\tbody := &bytes.Buffer{}
\twriter := multipart.NewWriter(body)
${formDataReadingString}
\twriter.Close()\n\n`;

    formDataString = formData.length
      ? `\t// ================= FORM-DATA =================
  ${formDataReadingString}`
      : "";

    setBodyValueString = "body.Bytes()";
  }

  /* ============== XWWWFORMURLENCODED DATA ================== */
  let xWWWFormUrlencodedString = "";
  if (
    bodyType === "x-www-form-urlencoded" &&
    xWWWFormUrlencoded.length &&
    method.toLowerCase() !== "get"
  ) {
    const paramsString = xWWWFormUrlencoded
      .map(({ key, value }) => `${key}=${value}`)
      .join("&");

    xWWWFormUrlencodedString = `\t// ================= X-WWW-FORM-URLENCODED =================
\tdata := []byte(${JSON.stringify(paramsString)})\n\n`;

    setBodyValueString = "data";
  }

  let binaryDataString = "";
  if (bodyType === "binary" && method.toLowerCase() !== "get") {
    binaryDataString = `\t// ================= binary =================
\tbinData, _ := os.ReadFile(${binaryData ? JSON.stringify(binaryData) : "/your_file_path"})\n\n`;

    setBodyValueString = "binData";
  }

  let rawDataString = "";
  /* ============== RAW DATA ================== */
  if (bodyType === "raw" && method.toLowerCase() !== "get") {
    if (rawBodyDataType === "json" && isStringIsValidObject(rawData)) {
      const codeString = `${await jsonFormatter(rawData)}`
        .split("\n")
        ?.map((line, index) => (index ? `\t${line}` : line))
        .join("\n");
      rawDataString = `// TODO: convert JSON object to Go map if it is broken.
\tjsonData := map[string]interface{}${codeString}
\tdata, _ := json.Marshal(jsonData)`;
      setBodyValueString = "data";
    } else {
      rawDataString = `data := ${JSON.stringify(rawData)}`;
      setBodyValueString = "[]byte(data)";
    }

    rawDataString = `\t// ================= raw data =================\n\t${rawDataString}\n\n`;
  }

  let contentTypeHeader = "";
  if (method.toLowerCase() !== "get") {
    if (bodyType === "x-www-form-urlencoded")
      contentTypeHeader = `req.Header.Set("Content-Type", "application/x-www-form-urlencoded")`;
    else if (bodyType === "form-data")
      contentTypeHeader = `req.Header.Set("Content-Type", writer.FormDataContentType())`;
    else if (bodyType === "raw") {
      const headerContentType = getBodyType({
        bodyType,
        rawBodyDataType,
      });
      if (headerContentType)
        contentTypeHeader = `req.Header.Set("Content-Type", ${JSON.stringify(headerContentType)})`;
    }

    if (contentTypeHeader) contentTypeHeader = `\t${contentTypeHeader}\n`;
  }

  const setBodyString = setBodyValueString
    ? `\treq.SetBody(${setBodyValueString})\n`
    : "";

  let headersString = "";
  if (headers.length || authorization) {
    if (authorization)
      headers = [
        {
          ...authorization,
          value: MASKED_AUTHORIZATION,
        },
        ...headers,
      ];
    headersString = headers
      .map(
        ({ key, value }) =>
          `\treq.Header.Set(${JSON.stringify(key)}, ${JSON.stringify(value)})`
      )
      .join("\n");
    if (headersString) headersString += "\n\n";
  }

  // Only include packages if they are actually used
  if (formDataString || xWWWFormUrlencodedString || binaryDataString) {
    imports.push("bytes", "io", "mime/multipart", "os");
  }

  imports.push("", "github.com/valyala/fasthttp");

  const importBlock = `import (\n${imports.map((imp) => (imp ? `\t"${imp}"` : "")).join("\n")}\n)\n\n`;

  const codeEndingString = `\t// ================= Send =================
\terr := fasthttp.Do(req, resp)
\tif err != nil {
\t\tfmt.Println("Request failed:", err)
\t\treturn
\t}

\tfmt.Println(string(resp.Body()))
}`;

  const code = `${packageString}${importBlock}${codeStartString}${formDataString}${xWWWFormUrlencodedString}${binaryDataString}${rawDataString}${contentTypeHeader}${setBodyString}${headersString}${codeEndingString}`;
  return generateMaskedAndRealCode({ code, authorization });
};

export const generateGoCode = async (
  type: TRequestCodeType,
  data: CodeSnippitDataInterface
): Promise<RequestCodeSnippitInterface> => {
  switch (type) {
    case "go-net-http":
      return await generateGoNetHttpCode(data);
    case "go-fasthttp":
      return await generateGoFasthttpCode(data);
  }
  return requestDefaultCodeSnippit;
};
