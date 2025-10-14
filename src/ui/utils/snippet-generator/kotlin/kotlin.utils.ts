import { requestDefaultCodeSnippit } from "@/constant/code-snippit.constant";
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
import mime from "mime";

export const generateKotlinOkHttpCode = async ({
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
  const bodyTypeString = getBodyType({
    bodyType,
    rawBodyDataType,
  });

  const startString = `val client = OkHttpClient()\n\n`;
  const endString = `val response = client.newCall(request).execute()
println(response.body?.string())`;

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

  const headersString = !headersList.length
    ? ``
    : `\n${headersList
        .map(
          ({ key, value }) =>
            `\t.addHeader(${JSON.stringify(key)}, ${JSON.stringify(value)})`
        )
        .join("\n")}\n`;

  let bodyContent = "";
  let bodyVariableName = "";
  if (method.toLowerCase() !== "get") {
    bodyContent = `val emptyBody = ByteArray(0).toRequestBody(null)\n\n`;
    bodyVariableName = "emptyBody";
  }

  if (
    bodyType === "form-data" &&
    formData.length &&
    method.toLowerCase() !== "get"
  ) {
    const fileDataString = !formData.some((entry) => entry.type === "file")
      ? ``
      : `${formData
          .filter((entry) => entry.type === "file")
          .map(
            (
              { value },
              index
            ) => `val file${index + 1} = File(${JSON.stringify(value)})
val fileBody${index + 1} = file${index + 1}.asRequestBody(${JSON.stringify(mime.getType(value))}.toMediaType())`
          )
          .join("\n")}\n\n`;

    const bodyData = `val body = MultipartBody.Builder().setType(MultipartBody.FORM)
${formData.map(({ key, value, type }, index) => `\t.addFormDataPart(${type === "text" ? `${JSON.stringify(key)}, ${JSON.stringify(value)}` : `${JSON.stringify(key)}, file${index + 1}.name, fileBody${index + 1}`})`).join("\n")}
\t.build()\n\n`;

    bodyContent = `${fileDataString}${bodyData}`;
    bodyVariableName = "formBody";
  }

  if (
    bodyType === "x-www-form-urlencoded" &&
    xWWWFormUrlencoded.length &&
    method.toLowerCase() !== "get"
  ) {
    bodyContent = `val formBody = FormBody.Builder()
  ${xWWWFormUrlencoded.map(({ key, value }) => `\t.add(${JSON.stringify(key)},${JSON.stringify(value)})`).join("\n")}\n\n`;
    bodyVariableName = "formBody";
  }

  if (bodyType === "raw" && method.toLowerCase() !== "get") {
    bodyContent = `val body = """${rawData}""".toRequestBody(${JSON.stringify(bodyTypeString)}.toMediaType())\n\n`;
    bodyVariableName = "body";
  }

  if (bodyType === "binary" && method.toLowerCase() !== "get") {
    bodyContent = `val file = File("/path/to/data.bin")
val body = file.asRequestBody(${JSON.stringify(binaryData ?? defaultBinaryData)}.toMediaType())\n\n`;
    bodyVariableName = "body";
  }

  const requestString = `val request = Request.Builder()
\t.url(${JSON.stringify(url)})
\t.${method.toLowerCase()}(${bodyVariableName})${headersString}\t.build()\n\n`;

  const code = `${startString}${bodyContent}${requestString}${endString}`;
  return generateMaskedAndRealCode({ code, authorization });
};

export const generateKotlinRetrofitCode = async ({
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

export const generateKotlinCode = async (
  type: TRequestCodeType,
  data: CodeSnippitDataInterface
): Promise<RequestCodeSnippitInterface> => {
  switch (type) {
    case "kotlin-okhttp":
      return await generateKotlinOkHttpCode(data);
    case "kotlin-retrofit":
      return await generateKotlinRetrofitCode(data);
  }
  return requestDefaultCodeSnippit;
};
