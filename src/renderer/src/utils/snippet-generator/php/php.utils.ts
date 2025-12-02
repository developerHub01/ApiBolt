import { requestDefaultCodeSnippit } from "@/constant/code-snippit.constant";
import type {
  CodeSnippitDataInterface,
  RequestCodeSnippitInterface,
  TRequestCodeType
} from "@shared/types/code-snippit.types";
import { generateMaskedAndRealCode } from "@/utils/snippet-generator/helper.utils";
import {
  getFormData,
  getHeadersData,
  getHeadersDataObject,
  getHttpRequest2FormData,
  getHttpRequest2HeadersData,
  getMultipartData,
  getPeclFormData,
  getRawData,
  getXWWWFormUrlencodedArrData,
  getXWWWFormUrlencodedCurlData
} from "@/utils/snippet-generator/php/helper.utils";

const binaryDataStringValue = `/* binary data ========= */
$binaryData = "raw_binary_string_here";
// or: $binaryData = file_get_contents("path/to/file.bin");\n\n`;

export const generatePHPCURLCode = async ({
  url,
  method,
  headers,
  authorization,
  formData,
  xWWWFormUrlencoded,
  rawBodyDataType,
  bodyType,
  binaryData,
  rawData
}: CodeSnippitDataInterface) => {
  const codeStartString = `<?php\n`;

  const headersString = getHeadersData({
    headers,
    authorization,
    binaryData,
    rawBodyDataType,
    bodyType
  });
  const xWWWFormUrlencodedString = getXWWWFormUrlencodedCurlData({
    bodyType,
    xWWWFormUrlencoded
  });
  const formDataString = getFormData({
    bodyType,
    formData
  });
  const binaryDataString = bodyType === "binary" ? binaryDataStringValue : "";

  const rawDataString = getRawData({
    bodyType,
    rawBodyDataType,
    rawData
  });

  const curlInitString = `$curl = curl_init();\n\n`;

  const curlSetupOptionsArr = [
    {
      key: "CURLOPT_URL",
      value: `"${url}"`
    },
    {
      key: "CURLOPT_RETURNTRANSFER",
      value: "true"
    },
    {
      key: "CURLOPT_CUSTOMREQUEST",
      value: `"${method.toUpperCase()}"`
    }
  ];

  if (rawDataString !== null)
    curlSetupOptionsArr.push({
      key: "CURLOPT_POSTFIELDS",
      value: "$data"
    });

  if (formDataString)
    curlSetupOptionsArr.push({
      key: "CURLOPT_POSTFIELDS",
      value: "$formData"
    });
  if (xWWWFormUrlencodedString)
    curlSetupOptionsArr.push({
      key: "CURLOPT_POSTFIELDS",
      value: "$data"
    });
  if (binaryDataString)
    curlSetupOptionsArr.push({
      key: "CURLOPT_POSTFIELDS",
      value: "$binaryData"
    });

  if (headersString)
    curlSetupOptionsArr.push({
      key: "CURLOPT_HTTPHEADER",
      value: "$headers"
    });

  const curlSetoptArrayString = `curl_setopt_array($curl, [
${curlSetupOptionsArr.map(({ key, value }) => `\t${key} => ${value}`).join(",\n")}
]);\n\n`;

  const responseHandlerString = `$response = curl_exec($curl);

if (curl_errno($curl)) {
\techo "Error: " . curl_error($curl);
} else {
\techo $response;
}

curl_close($curl);
?>`;

  const code = `${codeStartString}${headersString}${formDataString}${xWWWFormUrlencodedString}${binaryDataString}${rawDataString ?? ""}${curlInitString}${curlSetoptArrayString}${responseHandlerString}`;
  return generateMaskedAndRealCode({ code, authorization });
};

export const generatePHPGuzzleCode = async ({
  url,
  method,
  headers,
  authorization,
  formData,
  xWWWFormUrlencoded,
  rawBodyDataType,
  bodyType,
  binaryData,
  rawData
}: CodeSnippitDataInterface) => {
  const codeStartString = `<?php
require 'vendor/autoload.php';
use GuzzleHttp\\Client;

$client = new Client();\n\n`;

  const headersString = getHeadersData({
    headers,
    authorization,
    binaryData,
    rawBodyDataType,
    bodyType
  });
  const xWWWFormUrlencodedString = getXWWWFormUrlencodedArrData({
    bodyType,
    xWWWFormUrlencoded
  });
  const formDataString = getMultipartData({
    bodyType,
    formData
  });
  const rawDataString = getRawData({
    bodyType,
    rawBodyDataType,
    rawData
  });
  const binaryDataString = bodyType === "binary" ? binaryDataStringValue : "";

  const optionsArr: Array<{ key: string; value: string }> = [];

  if (headersString)
    optionsArr.push({
      key: "headers",
      value: "$headers"
    });

  if (bodyType === "form-data" && formDataString)
    optionsArr.push({
      key: "multipart",
      value: "$multipart"
    });
  if (bodyType === "binary" && binaryDataString)
    optionsArr.push({
      key: "body",
      value: "$binaryData"
    });

  if (bodyType === "raw" && rawDataString !== null)
    optionsArr.push({
      key: "body",
      value: "$data"
    });

  if (bodyType === "x-www-form-urlencoded" && xWWWFormUrlencodedString)
    optionsArr.push({
      key: "form_params",
      value: "$data"
    });

  const optionsString = optionsArr.length
    ? `, [
${optionsArr.map(({ key, value }) => `\t\t${JSON.stringify(key)} => ${value}`).join(",\n")}
\t]`
    : "";

  const responseHandlerString = `try {
\t$response = $client->request("${method.toUpperCase()}", "${url}"${optionsString});

\techo $response->getBody();
} catch (Exception $e) {
\techo "Error: " . $e->getMessage();
}
?>`;

  const code = `${codeStartString}${headersString}${formDataString}${xWWWFormUrlencodedString}${binaryDataString}${rawDataString ?? ""}${responseHandlerString}`;
  return generateMaskedAndRealCode({ code, authorization });
};

export const generatePHPPeclHttpCode = async ({
  url,
  method,
  headers,
  authorization,
  formData,
  xWWWFormUrlencoded,
  rawBodyDataType,
  bodyType,
  binaryData,
  rawData
}: CodeSnippitDataInterface) => {
  const codeStartString = `<?php\n\n`;

  const headersString = getHeadersDataObject({
    headers,
    authorization,
    binaryData,
    rawBodyDataType,
    bodyType
  });
  const formDataString = getPeclFormData({
    bodyType,
    formData
  });
  const xWWWFormUrlencodedString = getXWWWFormUrlencodedArrData({
    bodyType,
    xWWWFormUrlencoded
  });
  const rawDataString = getRawData({
    bodyType,
    rawBodyDataType,
    rawData
  });
  const binaryDataString =
    bodyType === "binary"
      ? `/* binary data ========= */
$binaryData = file_get_contents("${binaryData}");
/* or your binary file path */\n\n`
      : "";

  const optionsArr: Array<string> = [`"${method.toUpperCase()}"`, `"${url}"`];
  if (headersString) optionsArr.push("$headers");

  const requestString = `$request = new http\\Client\\Request(${optionsArr.join(", ")});\n\n`;

  let setBodyString = "";
  if (bodyType === "form-data") setBodyString = `$request->setBody($body);`;
  else if (bodyType === "x-www-form-urlencoded")
    setBodyString = `$request->setBody($data);`;
  else if (bodyType === "binary")
    setBodyString = `$request->setBody($binaryData);`;
  else if (bodyType === "raw") setBodyString = `$request->setBody($data);`;

  if (setBodyString) setBodyString = setBodyString.concat("\n\n");

  const responseHandlerString = `$client = new http\\Client;
$client->enqueue($request)->send();

$response = $client->getResponse();

if ($response->getResponseCode() >= 400) {
\techo "Error: " . $response->getResponseStatus();
} else {
\techo $response->getBody();
}
?>`;

  const code = `${codeStartString}${headersString}${formDataString}${xWWWFormUrlencodedString}${binaryDataString}${rawDataString ?? ""}${requestString}${setBodyString}${responseHandlerString}`;
  return generateMaskedAndRealCode({ code, authorization });
};

export const generatePHPHTTPRequest2Code = async ({
  url,
  method,
  headers,
  authorization,
  formData,
  xWWWFormUrlencoded,
  rawBodyDataType,
  bodyType,
  binaryData,
  rawData
}: CodeSnippitDataInterface) => {
  const codeStartString = `<?php
require_once 'HTTP/Request2.php';\n\n`;

  const requestString = `$request = new HTTP_Request2("${url}", HTTP_Request2::METHOD_${method.toUpperCase()});\n\n`;

  const headersString = getHttpRequest2HeadersData({
    headers,
    authorization,
    binaryData,
    rawBodyDataType,
    bodyType
  });
  const xWWWFormUrlencodedString = getXWWWFormUrlencodedCurlData({
    bodyType,
    xWWWFormUrlencoded
  });
  const formDataString = getHttpRequest2FormData({
    bodyType,
    formData
  });
  const rawDataString = getRawData({
    bodyType,
    rawBodyDataType,
    rawData
  });
  const binaryDataString =
    bodyType === "binary"
      ? `/* binary data ========= */
$binaryData = file_get_contents("${binaryData ?? "<file contents here>"}");
/* or your binary file path */\n\n`
      : "";

  let setBodyString = "";
  if (xWWWFormUrlencodedString || rawDataString)
    setBodyString = `$request->setBody($data);`;
  if (binaryDataString) setBodyString = `$request->setBody($binaryData);`;
  if (setBodyString) setBodyString += "\n\n";

  const responseHandlerString = `try {
\t$response = $request->send();
\techo $response->getBody();
} catch (HTTP_Request2_Exception $e) {
\techo "Error: " . $e->getMessage();
}
?>`;

  const code = `${codeStartString}${requestString}${headersString}${formDataString}${xWWWFormUrlencodedString}${binaryDataString}${rawDataString ?? ""}${setBodyString}${responseHandlerString}`;
  return generateMaskedAndRealCode({ code, authorization });
};

export const generatePHPCode = async (
  type: TRequestCodeType,
  data: CodeSnippitDataInterface
): Promise<RequestCodeSnippitInterface> => {
  switch (type) {
    case "php-curl":
      return await generatePHPCURLCode(data);
    case "php-guzzle":
      return generatePHPGuzzleCode(data);
    case "php-pecl_http":
      return generatePHPPeclHttpCode(data);
    case "php-http_request2":
      return generatePHPHTTPRequest2Code(data);
  }
  return requestDefaultCodeSnippit;
};
