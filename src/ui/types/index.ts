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
      getAllCookies: () => Promise<unknown>;
      getCookieByDomain: (domain: string) => Promise<unknown>;
      windowControls: (type: TWindowControl) => Promise<void>;
      isWindowMaximized: () => Promise<boolean>;
    };
  }
}

export type TWindowControl = "minimize" | "maximize" | "unmaximize" | "close";
export type TContentType = "text" | "html" | "xml" | "json" | "javascript";
