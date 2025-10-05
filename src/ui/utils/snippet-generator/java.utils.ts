import type { TRequestCodeType } from "@/types/request-code.type";

export const generateJavaOkhttpCode = () => {};

export const generateJavaHttpURLConnectionCode = () => {};

export const generateJavaApacheHttpClientCode = () => {};

export const generateJavaUnirestCode = () => {};

export const generateJavaCode = (type: TRequestCodeType) => {
  switch (type) {
    case "java-apache-httpclient":
      return generateJavaApacheHttpClientCode();
    case "java-okhttp":
      return generateJavaOkhttpCode();
    case "java-httpurlconnection":
      return generateJavaHttpURLConnectionCode();
    case "java-unirest":
      return generateJavaUnirestCode();
  }
};
