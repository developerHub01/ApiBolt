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
    electronAPIDB: {
      addBoltCore: (payload: BoltCoreInterface) => Promise<unknown>;
      getAllBoltCore: () => Promise<unknown>;
    };
  }
}

export interface BoltCoreInterface {
  id: string;
  name: string;
  method?: string;
  children?: Array<string>; // if children have then it is a folder
  parent?: string; // if parent dont have then root level
}

export type TWindowControl = "minimize" | "maximize" | "unmaximize" | "close";
export type TContentType = "text" | "html" | "xml" | "json" | "javascript";
export type TAuthType =
  | "no-auth"
  | "basic-auth"
  | "bearer-token"
  | "jwt-bearer"
  | "api-key";
