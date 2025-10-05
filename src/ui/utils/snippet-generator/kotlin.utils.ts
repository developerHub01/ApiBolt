import type { TRequestCodeType } from "@/types/request-code.type";

export const generateKotlinOkHttpCode = () => {};

export const generateKotlinRetrofitCode = () => {};

export const generateKotlinCode = (type: TRequestCodeType) => {
  switch (type) {
    case "kotlin-okhttp":
      return generateKotlinOkHttpCode();
    case "kotlin-retrofit":
      return generateKotlinRetrofitCode();
  }
};
