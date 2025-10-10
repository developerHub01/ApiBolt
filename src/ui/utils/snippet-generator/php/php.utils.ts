import { requestDefaultCodeSnippit } from "@/constant/request-code.constant";
import type { CodeSnippitDataInterface } from "@/types/code-snippit.types";
import type {
  RequestCodeSnippitInterface,
  TRequestCodeType,
} from "@/types/request-code.type";
import { generateMaskedAndRealCode } from "@/utils/snippet-generator/helper.utils";
import {
  getFormData,
  getHeadersData,
  getMultipartData,
  getRawData,
  getXWWWFormUrlencodedArrData,
  getXWWWFormUrlencodedCurlData,
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
  rawData,
}: CodeSnippitDataInterface) => {
  const codeStartString = `<?php\n`;

  const headersString = getHeadersData({
    headers,
    authorization,
    binaryData,
    rawBodyDataType,
    bodyType,
  });
  const xWWWFormUrlencodedString = getXWWWFormUrlencodedCurlData({
    bodyType,
    xWWWFormUrlencoded,
  });
  const formDataString = getFormData({
    bodyType,
    formData,
  });
  const binaryDataString = bodyType === "binary" ? binaryDataStringValue : "";

  const rawDataString = getRawData({
    bodyType,
    rawBodyDataType,
    rawData,
  });

  const curlInitString = `$curl = curl_init();\n\n`;

  const curlSetupOptionsArr = [
    {
      key: "CURLOPT_URL",
      value: `"${url}"`,
    },
    {
      key: "CURLOPT_RETURNTRANSFER",
      value: "true",
    },
    {
      key: "CURLOPT_CUSTOMREQUEST",
      value: `"${method.toUpperCase()}"`,
    },
  ];

  if (rawDataString !== null)
    curlSetupOptionsArr.push({
      key: "CURLOPT_POSTFIELDS",
      value: "$data",
    });

  if (formDataString)
    curlSetupOptionsArr.push({
      key: "CURLOPT_POSTFIELDS",
      value: "$formData",
    });
  if (xWWWFormUrlencodedString)
    curlSetupOptionsArr.push({
      key: "CURLOPT_POSTFIELDS",
      value: "$data",
    });
  if (binaryDataString)
    curlSetupOptionsArr.push({
      key: "CURLOPT_POSTFIELDS",
      value: "$binaryData",
    });

  if (headersString)
    curlSetupOptionsArr.push({
      key: "CURLOPT_HTTPHEADER",
      value: "$headers",
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

export const generatePHPFileGetContentsCode = () => {};

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
  rawData,
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
    bodyType,
  });
  const xWWWFormUrlencodedString = getXWWWFormUrlencodedArrData({
    bodyType,
    xWWWFormUrlencoded,
  });
  const formDataString = getMultipartData({
    bodyType,
    formData,
  });
  const rawDataString = getRawData({
    bodyType,
    rawBodyDataType,
    rawData,
  });
  const binaryDataString = bodyType === "binary" ? binaryDataStringValue : "";

  const optionsArr: Array<{ key: string; value: string }> = [];

  if (headersString)
    optionsArr.push({
      key: "headers",
      value: "$headers",
    });

  if (bodyType === "form-data" && formDataString)
    optionsArr.push({
      key: "multipart",
      value: "$multipart",
    });
  if (bodyType === "binary" && binaryDataString)
    optionsArr.push({
      key: "body",
      value: "$binaryData",
    });

  if (
    ["raw", "binary"].includes(bodyType) &&
    (rawDataString !== null || xWWWFormUrlencodedString)
  )
    optionsArr.push({
      key: "body",
      value: "$data",
    });

  if (bodyType === "x-www-form-urlencoded" && xWWWFormUrlencodedString)
    optionsArr.push({
      key: "form_params",
      value: "$data",
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

export const generatePHPCode = async (
  type: TRequestCodeType,
  data: CodeSnippitDataInterface
): Promise<RequestCodeSnippitInterface> => {
  switch (type) {
    case "php-curl":
      return await generatePHPCURLCode(data);
    case "php-guzzle":
      return generatePHPGuzzleCode(data);
    // case "php-file-get-contents":
    //   return generatePHPFileGetContentsCode();
  }
  return requestDefaultCodeSnippit;
};
