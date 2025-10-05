import type { TRequestCodeType } from "@/types/request-code.type";

export const generatePythonRequestsCode = () => {};

export const generatePythonHttpClientCode = () => {};

export const generatePythonUrllib3Code = () => {};

export const generatePythonAiohttpCode = () => {};

export const generatePythonCode = (type: TRequestCodeType) => {
  switch (type) {
    case "python-requests":
      return generatePythonRequestsCode();
    case "python-http-client":
      return generatePythonHttpClientCode();
    case "python-aiohttp":
      return generatePythonAiohttpCode();
    case "python-urllib3":
      return generatePythonUrllib3Code();
  }
};
