import { requestDefaultCodeSnippit } from "@/constant/code-snippit.constant";
import type {
  CodeSnippitDataInterface,
  TRequestCodeType,
} from "@/types/code-snippit.types";
import {
  defaultBinaryData,
  generateMaskedAndRealCode,
  getHeadersList,
} from "@/utils/snippet-generator/helper.utils";

export const generateSwiftURLSessionCode = async ({
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
  const endString = `\nlet task = URLSession.shared.dataTask(with: request) { data, response, error in 
\tguard let data = data else {
\t\tprint(String(describing: error))
\t\treturn
\t}
\tprint(String(data: data, encoding: .utf8)!)
}

task.resume()`;

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

  let headersString = "";
  if (headersList.length) {
    headersString =
      headersList
        .map(
          ({ key, value }) =>
            `request.addValue(${JSON.stringify(value)}, forHTTPHeaderField: ${JSON.stringify(key)})`
        )
        .join("\n") + "\n";
  }

  if (
    bodyType === "form-data" &&
    formData.length &&
    method.toLowerCase() !== "get"
  ) {
    const code = `let parameters = [
${formData
  .map(
    ({ key, value, type }) => `\t[
\t\t"key": ${JSON.stringify(key)},
\t\t"src": ${JSON.stringify(value)},
\t\t"type": ${type}
\t]`
  )
  .join(",\n")}
] as [[String: Any]]

let boundary = "Boundary-\\(UUID().uuidString)"
var body = Data()
var error: Error? = nil
for param in parameters {
\tif param["disabled"] != nil { continue }
\tlet paramName = param["key"]!
\tbody += Data("--\\(boundary)\\r\\".utf8)
\tbody += Data("Content-Disposition:form-data; name=\\"\\(paramName)\\"".utf8)
\tif param["contentType"] != nil {
\t\tbody += Data("\\r\\nContent-Type: \\(param["contentType"] as! String)".utf8)
\t}
\tlet paramType = param["type"] as! String
\tif paramType == "text" {
\t\tlet paramValue = param["value"] as! String
\t\tbody += Data("\\r\\n\\r\\n\\(paramValue)\\r\\n".utf8)
\t} else {
\t\tlet paramSrc = param["src"] as! String
\t\tlet fileURL = URL(fileURLWithPath: paramSrc)
\t\tif let fileContent = try? Data(contentsOf: fileURL) {
\t\t\tbody += Data("; filename=\\"\\(paramSrc)\\"\\r\\n".utf8)
\t\t\tbody += Data("Content-Type: \\"content-type header\\"\\r\\n".utf8)
\t\t\tbody += Data("\\r\\n".utf8)
\t\t\tbody += fileContent
\t\t\tbody += Data("\\r\\n".utf8)
\t\t}
\t}
}
body += Data("--\\(boundary)--\\r\\n".utf8);
let postData = body

var request = URLRequest(url: URL(string: ${JSON.stringify(url)})!,timeoutInterval: Double.infinity)
${headersString}
request.addValue("multipart/form-data; boundary=\\(boundary)", forHTTPHeaderField: "Content-Type")

request.httpMethod = "${method.toUpperCase()}"
request.httpBody = postData
${endString}`;

    return generateMaskedAndRealCode({ code, authorization });
  }

  let postDataString = "";

  if (
    bodyType === "x-www-form-urlencoded" &&
    xWWWFormUrlencoded.length &&
    method.toLowerCase() !== "get"
  ) {
    postDataString = `let parameters = ${JSON.stringify(xWWWFormUrlencoded.map(({ key, value }) => `${key}=${value}`).join("&"))}
let postData =  parameters.data(using: .utf8)\n\n`;
  }

  if (bodyType === "binary" && method.toLowerCase() !== "get") {
    postDataString = `let parameters = ${JSON.stringify(binaryData ?? defaultBinaryData)}
let postData =  parameters.data(using: .utf8)\n\n`;
  }

  if (bodyType === "raw" && method.toLowerCase() !== "get") {
    postDataString = `let parameters = ${JSON.stringify(rawData)}
let postData =  parameters.data(using: .utf8)\n\n`;
  }

  const requestString = `var request = URLRequest(url: URL(string: ${JSON.stringify(url)})!,timeoutInterval: Double.infinity)\n\n`;

  const requestOptionsString = `\nrequest.httpMethod = "${method.toUpperCase()}"${postDataString ? `\nrequest.httpBody = postData` : ""}\n`;

  const code = `${postDataString}${requestString}${headersString}${requestOptionsString}${endString}`;
  return generateMaskedAndRealCode({ code, authorization });
};

export const generateSwiftAlamofireCode = async ({
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
  console.log({
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
  });

  const code = ``;
  return generateMaskedAndRealCode({ code, authorization });
};

export const generateSwiftCode = async (
  type: TRequestCodeType,
  data: CodeSnippitDataInterface
) => {
  switch (type) {
    case "swift-urlsession":
      return await generateSwiftURLSessionCode(data);
  }

  return requestDefaultCodeSnippit;
};
