import type {
  APIPayloadBody,
  ResponseInterface,
} from "@/context/request/RequestResponseProvider";

declare global {
  interface Window {
    electronAPI: {
      getCookiesFromUrl: (url: string) => Promise<string>;
      sayHello: () => void;
      fetchApi: (payload: APIPayloadBody) => Promise<ResponseInterface>;
    };
  }
}

export type TContentType = "text" | "html" | "xml" | "json" | "javascript";
