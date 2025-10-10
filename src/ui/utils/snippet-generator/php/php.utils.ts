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
  getRawData,
  getXWWWFormUrlencodedData,
} from "@/utils/snippet-generator/php/helper.utils";

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
  const xWWWFormUrlencodedString = getXWWWFormUrlencodedData({
    bodyType,
    xWWWFormUrlencoded,
  });
  const formDataString = getFormData({
    bodyType,
    formData,
  });
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

  const code = `${codeStartString}${headersString}${formDataString}${xWWWFormUrlencodedString}${rawDataString ?? ""}${curlInitString}${curlSetoptArrayString}${responseHandlerString}`;
  return generateMaskedAndRealCode({ code, authorization });
};

export const generatePHPFileGetContentsCode = () => {};

export const generatePHPGuzzleCode = () => {};

export const generatePHPCode = async (
  type: TRequestCodeType,
  data: CodeSnippitDataInterface
): Promise<RequestCodeSnippitInterface> => {
  switch (type) {
    case "php-curl":
      return await generatePHPCURLCode(data);
    // case "php-guzzle":
    //   return generatePHPGuzzleCode();
    // case "php-file-get-contents":
    //   return generatePHPFileGetContentsCode();
  }
  return requestDefaultCodeSnippit;
};
