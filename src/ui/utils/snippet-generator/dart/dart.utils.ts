import type { TRequestCodeType } from "@/types/code-snippit.types";

export const generateDartHttpCode = () => {};

export const generateDartDioCode = () => {};

export const generateDartCode = (type: TRequestCodeType) => {
  switch (type) {
    case "dart-http":
      return generateDartHttpCode();
    case "dart-dio":
      return generateDartDioCode();
  }
};
