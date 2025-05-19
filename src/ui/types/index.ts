import type { RequestListItemInterface } from "@/context/request-list/RequestListProvider";
import type {
  APIPayloadBody,
  JWTBearerAuthInterface,
  ResponseInterface,
} from "@/context/request/RequestResponseProvider";
import type { TabsDataInterface } from "@/context/tab-sidebar/TabSidebarProvider";

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
      onWindowMaximizeChange: (
        cb: (value: boolean) => void
      ) => Promise<boolean>;

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
      toggleFolder: (id: string) => Promise<void>;
      getAllOpenFolder: () => Promise<void>;

      addBoltCore: (payload: RequestListItemInterface) => Promise<unknown>;
      addMultipleBoltCore: (
        payload: Array<RequestListItemInterface>
      ) => Promise<unknown>;
      duplicateBoltCore: (id: string) => Promise<unknown>;
      updateBoltCore: (
        id: string,
        payload: Partial<RequestListItemInterface>
      ) => Promise<unknown>;
      deleteBoltCore: (id: string) => Promise<void>;
      moveBoltCore: (
        id: string,
        folderId: string | undefined,
        index: number
      ) => Promise<void>;
      getAllBoltCore: () => Promise<Record<string, RequestListItemInterface>>;
      onBoltCoreChange: (cb: () => void) => void;

      /* Tabs ============== */
      getTabList: () => Promise<TabsDataInterface>;
      changeTabsData: (payload: TabsDataInterface) => Promise<void>;
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

export type TMethod = "get" | "post" | "put" | "patch" | "delete";
