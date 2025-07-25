import type { TabsDataInterface } from "@/context/tab-sidebar/TabSidebarProvider";
import type {
  APIPayloadBody,
  AuthorizationPayloadInterface,
  EnvironmentInterface,
  EnvironmentPayloadInterface,
  JWTBearerAuthInterface,
  ProjectInterface,
  RequestListItemInterface,
  RequestListItemUpdatePayloadInterface,
  ResponseInterface,
} from "@/types/request-response.types";
import type {
  SettingsInterface,
  SettingsTotalInterface,
} from "@/types/setting.types";

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

    electronAPIZoom: {
      setZoom: (factor: number) => void;
      getZoom: () => number;
    };

    electronAPIDB: {
      toggleFolder(id: string): Promise<void>;
      getAllOpenFolder(): Promise<Array<string>>;

      addBoltCore(payload: RequestListItemInterface): Promise<unknown>;
      addMultipleBoltCore(
        payload: Array<RequestListItemInterface>
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

    electronAPIProjectsDB: {
      getProjects(): Promise<Array<ProjectInterface>>;
      createProjects(payload: { name: string }): Promise<boolean>;
      updateProjects(
        id: string,
        payload: Omit<ProjectInterface, "id">
      ): Promise<boolean>;
      deleteProjects(id: string): Promise<boolean>;
      changeActiveProject(id: string): Promise<boolean>;
      getActiveProject(): Promise<string | null>;
    };

    electronAPISettingsDB: {
      getSettings(): Promise<SettingsTotalInterface>;
      updateSettings(payload: Partial<SettingsInterface>): Promise<boolean>;
    };

    electronAPIEnvironmentsDB: {
      getAllEnvironments(id?: string): Promise<Array<EnvironmentInterface>>;
      getEnvironments(id?: string): Promise<Array<EnvironmentInterface>>;
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

    electronAPIAuthorizationDB: {
      getAuth(): Promise<AuthorizationPayloadInterface>;
      createAuth(): Promise<boolean>;
      updateAuth(
        payload: Partial<Omit<AuthorizationPayloadInterface, "id">>
      ): Promise<boolean>;
      deleteAuth(id?: string): Promise<boolean>;
    };

    electronAPIRequestOrFolderMetaDB: {
      getRequestOrFolderMeta(): Promise<
        Record<string, RequestListItemInterface>
      >;
      createRequestOrFolderMeta(
        payload: RequestListItemInterface | Array<RequestListItemInterface>
      ): Promise<boolean>;
      updateRequestOrFolderMeta(
        payload: RequestListItemUpdatePayloadInterface
      ): Promise<boolean>;
      moveRequestOrFolderMeta(id: string, parentId?: string): Promise<boolean>;
      deleteRequestOrFolderMetaById(
        id?: string | Array<string>
      ): Promise<boolean>;
      duplicateRequestOrFolderMeta(
        payload: Array<Omit<RequestListItemInterface, "children" | "createdAt">>
      ): Promise<boolean>;
      deleteRequestOrFolderMetaByProjectId(id?: string): Promise<boolean>;
      expendOrCollapseRequestOrFolderMetaAll(
        id?: string | Array<string>,
        isExpended?: boolean
      ): Promise<boolean>;
    };

    electronAPITabsDB: {
      getTabList(): Promise<{
        openTabs: Array<string>;
        selectedTab: string | null;
      }>;
      updateTabList(payload: {
        openTabs: Array<string>;
        selectedTab: string | null;
      }): Promise<boolean>;
      deleteAllTabList(): Promise<boolean>;
      deleteTabListByProjectId(id?: string): Promise<boolean>;
    };

    electronAPIFolderDB: {
      getFolder(requestOrFolderMetaId: string): Promise<{
        title: string;
        description: string;
      }>;
      updateFolder(payload: {
        title?: string;
        description?: string;
        requestOrFolderMetaId: string;
      }): Promise<boolean>;
    };
  }
}

export type TWindowControl = "minimize" | "maximize" | "unmaximize" | "close";
