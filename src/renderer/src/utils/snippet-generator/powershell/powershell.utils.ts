import { requestDefaultCodeSnippit } from "@/constant/code-snippit.constant";
import type {
  CodeSnippitDataInterface,
  RequestCodeSnippitInterface,
  TRequestCodeType,
} from "@shared/types/code-snippit.types";
import {
  defaultBinaryData,
  generateMaskedAndRealCode,
  getHeadersList,
} from "@/utils/snippet-generator/helper.utils";

export const generatePowerShellInvokeRestMethodCode = async ({
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
  const headersList = getHeadersList({
    headers,
    authorization,
    rawBodyDataType,
    bodyType,
  });

  if (
    headersList.length &&
    bodyType === "binary" &&
    !headersList.some(entry => entry.key === "Content-Type")
  ) {
    headersList.push({
      key: "Content-Type",
      value: "application/octet-stream",
    });
  }

  const headersString = headersList.length
    ? `$headers = @{
${headersList.map(({ key, value }) => `\t${JSON.stringify(key)}=${JSON.stringify(value)}`).join("\n")}
}\n\n`
    : ``;

  let formDataString = "";
  if (
    bodyType === "form-data" &&
    formData.length &&
    method.toLowerCase() !== "get"
  ) {
    const snippitList: Array<string> = [];

    const fieldsString = formData.some(entry => entry.type === "text")
      ? `$fields = @{
${formData
  .filter(entry => entry.type === "text")
  .map(
    ({ key, value }) => `\t${JSON.stringify(key)} = ${JSON.stringify(value)}`,
  )
  .join("\n")}
}`
      : ``;

    if (fieldsString) snippitList.push(fieldsString);

    const fileMap: Record<string, Array<string>> = {};
    formData
      .filter(entry => entry.type === "file")
      .forEach(({ key, value }) => {
        if (!fileMap[key]) fileMap[key] = [];
        fileMap[key].push(value);
      });

    const filesString = formData.some(entry => entry.type === "file")
      ? `$files = @{
${Object.entries(fileMap)
  .map(
    ([key, values]) =>
      `\t${JSON.stringify(key)} = @(${values.map(value => JSON.stringify(value)).join(", ")})`,
  )
  .join("\n")}
}`
      : ``;

    if (filesString) snippitList.push(filesString);

    formDataString = `${snippitList.join("\n\n")}

$client = New-Object System.Net.Http.HttpClient

foreach ($k in $headers.Keys) {
    $client.DefaultRequestHeaders.Add($k, $headers[$k])
}

$multipart = New-Object System.Net.Http.MultipartFormDataContent

# Add text fields
foreach ($k in $fields.Keys) {
    $multipart.Add((New-Object System.Net.Http.StringContent($fields[$k])), $k)
}

# Add multiple files per field
foreach ($fieldName in $files.Keys) {
    foreach ($filePath in $files[$fieldName]) {
        $fileStream = [System.IO.File]::OpenRead($filePath)
        $fileContent = New-Object System.Net.Http.StreamContent($fileStream)
        $fileName = [System.IO.Path]::GetFileName($filePath)
        $multipart.Add($fileContent, $fieldName, $fileName)
    }
}
    
$uri = ${JSON.stringify(url)}
$response = $client.${method[0].toUpperCase() + method.slice(1).toLowerCase()}Async($uri, $multipart).Result
$result = $response.Content.ReadAsStringAsync().Result
Write-Output $result`;

    return generateMaskedAndRealCode({
      code: `${headersString}${formDataString}`,
      authorization,
    });
  }

  let xWWWFormUrlencodedString = "";
  if (
    bodyType === "x-www-form-urlencoded" &&
    xWWWFormUrlencoded.length &&
    method.toLowerCase() !== "get"
  )
    xWWWFormUrlencodedString = `$body = @{
${xWWWFormUrlencoded.map(({ key, value }) => `\t${JSON.stringify(key)} = ${JSON.stringify(value)}`).join("\n")}
}\n\n`;

  let binaryDataString = "";
  if (bodyType === "binary" && method.toLowerCase() !== "get")
    binaryDataString = `$body = [System.IO.File]::ReadAllBytes(${JSON.stringify(binaryData ?? defaultBinaryData)})\n\n`;

  let rawDataString = "";
  if (bodyType === "raw" && method.toLowerCase() !== "get")
    rawDataString =
      rawBodyDataType === "json"
        ? `$body = @'${rawData}'@\n\n`
        : `$body = @"${rawData}"@\n\n`;

  let options = "";
  if (headersString) options = `${options} -Headers $headers`;
  if (
    (xWWWFormUrlencodedString || binaryDataString || rawDataString) &&
    method.toLowerCase() !== "get"
  )
    options = `${options} -Body $body`;

  const responseString = `$response = Invoke-RestMethod -Uri ${JSON.stringify(url)} -Method ${method.toUpperCase()}${options}
Write-Output $response`;

  const code = `${headersString}${formDataString}${xWWWFormUrlencodedString}${rawDataString}${binaryDataString}${responseString}`;

  return generateMaskedAndRealCode({ code, authorization });
};

export const generatePowerShellInvokeWebRequestCode = async ({
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
  const headersList = getHeadersList({
    headers,
    authorization,
    rawBodyDataType,
    bodyType,
  });

  if (
    headersList.length &&
    bodyType === "binary" &&
    !headersList.some(entry => entry.key === "Content-Type")
  ) {
    headersList.push({
      key: "Content-Type",
      value: "application/octet-stream",
    });
  }

  const headersString = headersList.length
    ? `$headers = @{
${headersList
  .map(({ key, value }) => `\t${JSON.stringify(key)}=${JSON.stringify(value)}`)
  .join("\n")}
}\n\n`
    : ``;

  let formDataString = "";
  if (
    bodyType === "form-data" &&
    formData.length &&
    method.toLowerCase() !== "get"
  ) {
    const fieldsString = formData.some(entry => entry.type === "text")
      ? `$fields = @{
${formData
  .filter(entry => entry.type === "text")
  .map(
    ({ key, value }) => `\t${JSON.stringify(key)} = ${JSON.stringify(value)}`,
  )
  .join("\n")}
}\n\n`
      : ``;

    const fileMap: Record<string, Array<string>> = {};
    formData
      .filter(entry => entry.type === "file")
      .forEach(({ key, value }) => {
        if (!fileMap[key]) fileMap[key] = [];
        fileMap[key].push(value);
      });

    const filesString = formData.some(entry => entry.type === "file")
      ? `$files = @{
${Object.entries(fileMap)
  .map(
    ([key, values]) =>
      `\t${JSON.stringify(key)} = @(${values.map(value => JSON.stringify(value)).join(", ")})`,
  )
  .join("\n")}
}\n\n`
      : ``;

    formDataString = `${fieldsString}${filesString}

$client = New-Object System.Net.Http.HttpClient

foreach ($k in $headers.Keys) {
    $client.DefaultRequestHeaders.Add($k, $headers[$k])
}

$multipart = New-Object System.Net.Http.MultipartFormDataContent

# Add text fields
foreach ($k in $fields.Keys) {
    $multipart.Add((New-Object System.Net.Http.StringContent($fields[$k])), $k)
}

# Add multiple files per field
foreach ($fieldName in $files.Keys) {
    foreach ($filePath in $files[$fieldName]) {
        $fileStream = [System.IO.File]::OpenRead($filePath)
        $fileContent = New-Object System.Net.Http.StreamContent($fileStream)
        $fileName = [System.IO.Path]::GetFileName($filePath)
        $multipart.Add($fileContent, $fieldName, $fileName)
    }
}

$uri = ${JSON.stringify(url)}
$response = $client.${method[0].toUpperCase() + method.slice(1).toLowerCase()}Async($uri, $multipart).Result
$result = $response.Content.ReadAsStringAsync().Result
Write-Output $result`;

    return generateMaskedAndRealCode({
      code: `${headersString}${formDataString}`,
      authorization,
    });
  }

  let xWWWFormUrlencodedString = "";
  if (
    bodyType === "x-www-form-urlencoded" &&
    xWWWFormUrlencoded.length &&
    method.toLowerCase() !== "get"
  ) {
    xWWWFormUrlencodedString = `$body = @{
${xWWWFormUrlencoded
  .map(
    ({ key, value }) => `\t${JSON.stringify(key)} = ${JSON.stringify(value)}`,
  )
  .join("\n")}
}\n\n`;
  }

  let binaryDataString = "";
  if (bodyType === "binary" && method.toLowerCase() !== "get") {
    binaryDataString = `$body = [System.IO.File]::ReadAllBytes(${JSON.stringify(binaryData ?? defaultBinaryData)})\n\n`;
  }

  let rawDataString = "";
  if (bodyType === "raw" && method.toLowerCase() !== "get") {
    rawDataString =
      rawBodyDataType === "json"
        ? `$body = @'${rawData}'@\n\n`
        : `$body = @"${rawData}"@\n\n`;
  }

  let options = "";
  if (headersString) options = `${options} -Headers $headers`;
  if (
    (xWWWFormUrlencodedString || binaryDataString || rawDataString) &&
    method.toLowerCase() !== "get"
  )
    options = `${options} -Body $body`;

  const responseString = `$response = Invoke-WebRequest -Uri ${JSON.stringify(url)} -Method ${method.toUpperCase()}${options}
Write-Output $response.Content`;

  const code = `${headersString}${xWWWFormUrlencodedString}${rawDataString}${binaryDataString}${responseString}`;

  return generateMaskedAndRealCode({ code, authorization });
};

export const generatePowerShellCode = async (
  type: TRequestCodeType,
  data: CodeSnippitDataInterface,
): Promise<RequestCodeSnippitInterface> => {
  switch (type) {
    case "powershell-invoke-restmethod":
      return await generatePowerShellInvokeRestMethodCode(data);
    case "powershell-invoke-webrequest":
      return await generatePowerShellInvokeWebRequestCode(data);
  }

  return requestDefaultCodeSnippit;
};
