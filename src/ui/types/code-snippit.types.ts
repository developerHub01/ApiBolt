import type {
  TContentType,
  THTTPMethods,
  TRequestBodyType,
} from "@/types/request-response.types";

export interface CodeSnippitDataInterface {
  method: THTTPMethods;
  url: string;
  headers: Array<{
    key: string;
    value?: string;
  }>;
  authorization?: {
    key: string;
    value: string;
  };
  bodyType: TRequestBodyType;
  rawBodyDataType: TContentType;
  rawData: string;
  xWWWFormUrlencoded: Array<{
    key: string;
    value?: string;
  }>;
  formData: Array<{
    key: string;
    value: string;
    type: "file" | "text";
  }>;
  binaryData?: string;
}
