import type { TRequestCodeType } from "@/types/request-code.type";

export const generateGoNetHttpCode = () => {};

export const generateGoFasthttpCode = () => {};

export const generateGoCode = (type: TRequestCodeType) => {
  switch (type) {
    case "go-fasthttp":
      return generateGoFasthttpCode();
    case "go-net-http":
      return generateGoNetHttpCode();
  }
};
