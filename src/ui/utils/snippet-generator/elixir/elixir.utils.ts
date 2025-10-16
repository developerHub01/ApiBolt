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
import { getBodyRawData } from "@/utils/snippet-generator/elixir/helper.utils";
import mime from "mime";

export const generateElixirHTTPoisonCode = async ({
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
  const startString = `HTTPoison.${method.toLowerCase()}!(\n`;
  const endString = `)`;

  const snippitList: Array<string> = [`\t${JSON.stringify(url)}`];

  if (method.toLowerCase() !== "get") snippitList.push(`\t""`);

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

  if (
    bodyType === "form-data" &&
    formData.length &&
    method.toLowerCase() !== "get"
  ) {
    snippitList[1] = `\t{:multipart, [
${formData.map(({ key, value, type }) => (type === "text" ? `\t\t{${JSON.stringify(key)}, ${JSON.stringify(value)}}` : `\t\t{:file, "/path/your_path_here", {"form-data", [name: ${JSON.stringify(key + "[]")}, filename: ${JSON.stringify(value)}]}, [{"Content-Type", ${JSON.stringify(mime.getType(value))}}]}`)).join(",\n")}
\t]}`;
  }

  if (
    bodyType === "x-www-form-urlencoded" &&
    xWWWFormUrlencoded.length &&
    method.toLowerCase() !== "get"
  ) {
    snippitList[1] = `\tURI.encode_query(%{${xWWWFormUrlencoded.map(({ key, value }) => `${JSON.stringify(key)}: ${JSON.stringify(value)}`).join(", ")}})`;
  }

  if (bodyType === "binary" && method.toLowerCase() !== "get") {
    snippitList[1] = `\tFile.read!(${JSON.stringify(binaryData ?? defaultBinaryData)})`;
  }

  if (bodyType === "raw" && method.toLowerCase() !== "get") {
    const data = (
      await getBodyRawData({
        rawBodyDataType,
        bodyType,
        rawData,
      })
    )
      .split("\n")
      .map((line, index) => (index ? `\t${line}` : line))
      .join("\n");

    snippitList[1] = `\t${rawBodyDataType === "json" ? `Jason.encode!(%${data})` : `${data}`}`;
  }

  if (headersList.length)
    snippitList.push(
      `\t[
${headersList.map(({ key, value }) => `\t\t{${JSON.stringify(key)}, ${JSON.stringify(value)}}`).join(",\n")}
\t]\n`
    );

  const code = `${startString}${snippitList.join(",\n")}${endString}`;
  return generateMaskedAndRealCode({ code, authorization });
};

export const generateElixirTeslaCode = async ({
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
  const startString = `Tesla.${method.toLowerCase()}(\n`;
  const endString = `
)`;

  const snippitList: Array<string> = [`\t${JSON.stringify(url)}`];

  if (method.toLowerCase() !== "get") snippitList.push(`\t""`);

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

  if (
    bodyType === "form-data" &&
    formData.length &&
    method.toLowerCase() !== "get"
  ) {
    snippitList[1] = `\t{:multipart, [
${formData.map(({ key, value, type }) => (type === "text" ? `\t\t{${JSON.stringify(key)}, ${JSON.stringify(value)}}` : `\t\t{:file, "/path/your_path_here", {"form-data", [name: ${JSON.stringify(key + "[]")}, filename: ${JSON.stringify(value)}]}, [{"Content-Type", ${JSON.stringify(mime.getType(value))}}]}`)).join(",\n")}
\t]}`;
  }

  if (
    bodyType === "x-www-form-urlencoded" &&
    xWWWFormUrlencoded.length &&
    method.toLowerCase() !== "get"
  ) {
    snippitList[1] = `\tURI.encode_query(%{${xWWWFormUrlencoded.map(({ key, value }) => `${JSON.stringify(key)}: ${JSON.stringify(value)}`).join(", ")}})`;
  }

  if (bodyType === "binary" && method.toLowerCase() !== "get") {
    snippitList[1] = `\t{:body, File.read!(${JSON.stringify(binaryData ?? defaultBinaryData)})}`;
  }

  if (bodyType === "raw" && method.toLowerCase() !== "get") {
    const data = (
      await getBodyRawData({
        rawBodyDataType,
        bodyType,
        rawData,
      })
    )
      .split("\n")
      .map((line, index) => (index ? `\t${line}` : line))
      .join("\n");

    snippitList[1] = `\t${rawBodyDataType === "json" ? `Jason.encode!(%${data})` : `${data}`}`;
  }

  if (headersList.length)
    snippitList.push(
      `\theaders: [
${headersList.map(({ key, value }) => `\t\t{${JSON.stringify(key)}, ${JSON.stringify(value)}}`).join(",\n")}
\t]\n`
    );

  const code = `${startString}${snippitList.join(",\n")}${endString}`;
  return generateMaskedAndRealCode({ code, authorization });
};

export const generateElixirCode = async (
  type: TRequestCodeType,
  data: CodeSnippitDataInterface
) => {
  switch (type) {
    case "elixir-httpoison":
      return await generateElixirHTTPoisonCode(data);
    case "elixir-tesla":
      return await generateElixirTeslaCode(data);
  }

  return requestDefaultCodeSnippit;
};
