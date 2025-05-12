import type {
  APIPayloadBody,
  JWTBearerAuthInterface,
  ResponseInterface,
} from "@/context/request/RequestResponseProvider";

declare global {
  interface Window {
    electronAPI: {
      getCookiesFromUrl: (url: string) => Promise<string>;
      fetchApi: (payload: APIPayloadBody) => Promise<ResponseInterface>;

      getAllCookies: () => Promise<unknown>;
      getCookieByDomain: (url: string) => Promise<unknown>;
      getCookieStringByDomain: (url: string) => Promise<unknown>;

      windowControls: (type: TWindowControl) => Promise<void>;
      isWindowMaximized: () => Promise<boolean>;

      generateJWTToken: (
        data: Omit<
          JWTBearerAuthInterface,
          "headerPrefix" | "algo" | "addTo"
        > & {
          algorithm: string;
        }
      ) => Promise<string>;
    };
  }
}

export type TWindowControl = "minimize" | "maximize" | "unmaximize" | "close";
export type TContentType = "text" | "html" | "xml" | "json" | "javascript";
export type TAuthType =
  | "no-auth"
  | "basic-auth"
  | "bearer-token"
  | "jwt-bearer"
  | "api-key";
