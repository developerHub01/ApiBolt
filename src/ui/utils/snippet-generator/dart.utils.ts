import type { TRequestCodeType } from "@/types/request-code.type";

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
