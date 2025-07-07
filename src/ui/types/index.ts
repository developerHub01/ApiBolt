import type {
  APIPayloadBody,
  EnvironmentInterface,
  EnvironmentPayloadInterface,
  JWTBearerAuthInterface,
  ProjectInterface,
  RequestListItemInterface,
  ResponseDataBackendInterface,
  ResponseFolderDataInterface,
  ResponseInterface,
} from "@/context/redux/request-response/request-response-slice";
import type { TabsDataInterface } from "@/context/tab-sidebar/TabSidebarProvider";

declare global {
  interface Window {
    electronAPI: {
      getCookiesFromUrl(url: string): Promise<string>;
      fetchApi(payload: APIPayloadBody): Promise<ResponseInterface>;

      getAllCookies(): Promise<unknown>;
      getCookieByDomain(url: string): Promise<unknown>;
      getCookieStringByDomain(url: string): Promise<unknown>;

      windowControls(type: TWindowControl): Promise<void>;
      isWindowMaximized(): Promise<boolean>;
      onWindowMaximizeChange(cb: (value: boolean) => void): Promise<boolean>;

      generateJWTToken(
        data: Omit<
          JWTBearerAuthInterface,
          "headerPrefix" | "algo" | "addTo"
        > & {
          algorithm: string;
        }
      ): Promise<string>;
    };

    electronAPIDB: {
      toggleFolder(id: string): Promise<void>;
      getAllOpenFolder(): Promise<string[]>;

      addBoltCore(payload: RequestListItemInterface): Promise<unknown>;
      addMultipleBoltCore(
        payload: RequestListItemInterface[]
      ): Promise<unknown>;
      duplicateBoltCore(id: string, newId?: string): Promise<unknown>;
      updateBoltCore(
        id: string,
        payload: Partial<RequestListItemInterface>
      ): Promise<unknown>;
      deleteBoltCore(id: string): Promise<void>;
      moveBoltCore(
        id: string,
        folderId: string | undefined,
        index: number
      ): Promise<void>;
      getAllBoltCore(): Promise<Record<string, RequestListItemInterface>>;
      onBoltCoreChange(cb: () => void): void;

      /* Tabs ============== */
      getTabList(): Promise<TabsDataInterface>;
      changeTabsData(payload: TabsDataInterface): Promise<void>;
    };

    electronAPIRequestAndFolderDB: {
      findRequestOrFolderById(
        id: string
      ): Promise<
        ResponseDataBackendInterface | undefined | Record<string, unknown>
      >;
      updateRequestOrFolderById(
        id: string,
        payload: ResponseDataBackendInterface | ResponseFolderDataInterface
      ): Promise<void>;
      deleteRequestOrFolderById(id: string): Promise<void>;
    };

    electronAPIProjectsDB: {
      getProjects(): Promise<ProjectInterface[]>;
      createProjects(payload: { name: string }): Promise<boolean>;
      updateProjects(
        id: string,
        payload: Omit<ProjectInterface, "id">
      ): Promise<boolean>;
      deleteProjects(id: string): Promise<boolean>;
      changeActiveProject(id: string): Promise<boolean>;
      getActiveProject(): Promise<string | null>;
    };

    electronAPIEnvironmentsDB: {
      getAllEnvironments(id?: string): Promise<EnvironmentInterface[]>;
      getEnvironments(id?: string): Promise<EnvironmentInterface[]>;
      createEnvironments(
        payload: Partial<EnvironmentPayloadInterface> &
          Required<Pick<EnvironmentPayloadInterface, "id">>
      ): Promise<boolean>;
      updateEnvironments(
        payload: Partial<EnvironmentPayloadInterface> &
          Required<Pick<EnvironmentPayloadInterface, "id">>
      ): Promise<boolean>;
      deleteAllEnvironments(): Promise<boolean>;
      deleteEnvironments(id: string): Promise<boolean>;
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
