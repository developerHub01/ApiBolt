import type {
  RequestCodeSnippitInterface,
  TRequestCodeType,
} from "@/types/request-code.type";
import {
  generateMaskedAndRealCode,
  getBodyType,
  jsonFormatter,
} from "@/utils/snippet-generator/helper.utils";
import type { CodeSnippitDataInterface } from "@/types/code-snippit.types";
import {
  MASKED_AUTHORIZATION,
  requestDefaultCodeSnippit,
} from "@/constant/request-code.constant";
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
  const codeStartString = `package main

import (
	"bytes"
	"encoding/json"
	"fmt"
	"io"
	"mime/multipart"
	"net/http"
	"net/url"
	"os"
)

func main() {
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
      ? `\t// ================= form-data =================
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
    xWWWFormUrlencodedString = `\t// ================= x-www-form-urlencoded =================
\tdata := url.Values{}
${xWWWFormUrlencoded.map(({ key, value }) => `\tdata.Set(${JSON.stringify(key)}, ${JSON.stringify(value)})`).join("\n")}\n\n`;
  }

  let binaryDataString = "";
  if (bodyType === "binary" && method.toLowerCase() !== "get") {
    binaryDataString = `\t// ================= binary =================
\tbinData, _ := os.ReadFile(${binaryData ? JSON.stringify(binaryData) : "/your_file_path"})\n\n`;
  }

  let rawDataString = "";
  /* ============== RAW DATA ================== */
  if (bodyType === "raw" && method.toLowerCase() !== "get") {
    if (rawBodyDataType === "json" && isStringIsValidObject(rawData)) {
      const codeString = `${await jsonFormatter(rawData)}`
        .split("\n")
        ?.map((line, index) => (index ? `\t${line}` : line))
        .join("\n");
      rawDataString = `map[string]interface{}${codeString}`;
    } else rawDataString = JSON.stringify(rawData);

    if (rawDataString)
      rawDataString = `\t// ================= raw data =================\n\tdata := ${rawDataString}\n\n`;
  }

  const codeEndingString = `\tresp, _ = http.DefaultClient.Do(req)
\tbody, _ = io.ReadAll(resp.Body)
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

  const requestString = `\treq, _ = http.NewRequest("${method.toUpperCase()}", urlStr, ${requestDataString})\n`;

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

  const code = `${codeStartString}${formDataString}${xWWWFormUrlencodedString}${binaryDataString}${rawDataString}${requestString}${contentTypeHeader}${headersString}${codeEndingString}`;
  return generateMaskedAndRealCode({ code, authorization });
};

export const generateGoFasthttpCode = () => {};

export const generateGoCode = async (
  type: TRequestCodeType,
  data: CodeSnippitDataInterface
): Promise<RequestCodeSnippitInterface> => {
  switch (type) {
    case "go-net-http":
      return await generateGoNetHttpCode(data);
    // case "go-fasthttp":
    //   return await generateGoFasthttpCode();
  }
  return requestDefaultCodeSnippit;
};
