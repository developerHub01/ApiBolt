import type { TRequestCodeType } from "@/types/request-code.type";

export const generateCSharpHttpClientCode = () => {};

export const generateCSharpRestSharpCode = () => {};

export const generateCSharpFlurlCode = () => {};

export const generateCSharpCode = (type: TRequestCodeType) => {
  switch (type) {
    case "csharp-flurl":
      return generateCSharpFlurlCode();
    case "csharp-httpclient":
      return generateCSharpHttpClientCode();
    case "csharp-restsharp":
      return generateCSharpRestSharpCode();
  }
};
