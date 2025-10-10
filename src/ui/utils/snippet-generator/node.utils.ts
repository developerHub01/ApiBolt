import { requestDefaultCodeSnippit } from "@/constant/request-code.constant";
import type { CodeSnippitDataInterface } from "@/types/code-snippit.types";
import type {
  RequestCodeSnippitInterface,
  TRequestCodeType,
} from "@/types/request-code.type";

export const generateNodeHttpCode = ({
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

  return requestDefaultCodeSnippit;
};

export const generateNodeCode = async (
  type: TRequestCodeType,
  data: CodeSnippitDataInterface
): Promise<RequestCodeSnippitInterface> => {
  switch (type) {
    case "node-http":
      return await generateNodeHttpCode(data);
  }
  return requestDefaultCodeSnippit;
};
