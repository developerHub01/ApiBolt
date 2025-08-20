import type {
  APIPayloadBody,
  AuthorizationPayloadInterface,
  BodyBinaryInterface,
  BodyRawInterface,
  EnvironmentInterface,
  EnvironmentPayloadInterface,
  HiddenHeadersCheckInterface,
  JWTBearerAuthInterface,
  ParamHeaderBuildPayloadInterface,
  ParamHeaderPayloadInterface,
  ProjectInterface,
  RequestListItemInterface,
  RequestListItemUpdatePayloadInterface,
  RequestTabInterface,
  ResponseInterface,
} from "@/types/request-response.types";
import type {
  ProjectSettingsInterface,
  SettingsInterface,
  SettingsTotalInterface,
  UpdateBackgroundImagePayloadInterface,
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
      setZoom: (factor: number) => Promise<void>;
      getZoom: () => Promise<number>;
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
      updateSettings(
        payload: Partial<SettingsInterface | ProjectSettingsInterface>
      ): Promise<boolean>;
      updateSettingsBackgroundImages(
        payload: UpdateBackgroundImagePayloadInterface
      ): Promise<boolean>;
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

    electronAPIParamsDB: {
      getParams(id?: string): Promise<Array<ParamHeaderPayloadInterface>>;
      deleteParams(paramId: string): Promise<boolean>;
      deleteParamsByRequestMetaId(
        requestOrFolderMetaId?: string
      ): Promise<boolean>;
      createParams(
        payload: Partial<ParamHeaderBuildPayloadInterface>
      ): Promise<boolean>;
      updateParams(
        paramId: string,
        payload: Partial<ParamHeaderBuildPayloadInterface>
      ): Promise<boolean>;
      checkAllParamsByRequestMetaId(
        requestOrFolderMetaId?: string
      ): Promise<boolean>;
    };

    electronAPIHeadersDB: {
      getHeaders(id?: string): Promise<Array<ParamHeaderPayloadInterface>>;
      deleteHeaders(paramId: string): Promise<boolean>;
      deleteHeadersByRequestMetaId(
        requestOrFolderMetaId?: string
      ): Promise<boolean>;
      createHeaders(
        payload: Partial<ParamHeaderBuildPayloadInterface>
      ): Promise<boolean>;
      updateHeaders(
        paramId: string,
        payload: Partial<ParamHeaderBuildPayloadInterface>
      ): Promise<boolean>;
      checkAllHeadersByRequestMetaId(
        requestOrFolderMetaId?: string
      ): Promise<boolean>;
    };

    electronAPIHiddenHeadersCheckTableDB: {
      getHiddenHeadersCheck(id?: string): Promise<HiddenHeadersCheckInterface>;
      createHiddenHeadersCheck(
        paramId: string
      ): Promise<Partial<HiddenHeadersCheckInterface>>;
      updateHiddenHeadersCheck(
        payload: Partial<HiddenHeadersCheckInterface>
      ): Promise<Partial<HiddenHeadersCheckInterface>>;
    };

    electronAPIBodyRawDB: {
      getBodyRaw(requestId?: string): Promise<BodyRawInterface>;
      createBodyRaw(
        payload: Partial<BodyRawInterface> &
          Required<Pick<BodyRawInterface, "requestOrFolderMetaId">>
      ): Promise<boolean>;
      /* if in payload requestOrFolderMetaId not exist then it will pick active tab from backend */
      updateBodyRaw(payload: Partial<BodyRawInterface>): Promise<boolean>;
    };

    electronAPIBodyBinaryDB: {
      getBodyBinary(requestId?: string): Promise<BodyBinaryInterface>;
      createBodyBinary(): Promise<boolean>;
      updateBodyBinary(requestId?: string): Promise<boolean>;
      deleteBodyBinary(requestId?: string): Promise<boolean>;
    };

    electronAPIRequestMetaTabDB: {
      getRequestMetaTab(requestId?: string): Promise<RequestTabInterface>;
      createRequestMetaTab(
        payload: Partial<RequestTabInterface>
      ): Promise<boolean>;
      updateRequestMetaTab(
        payload: Partial<RequestTabInterface>
      ): Promise<boolean>;
      deleteRequestMetaTab(requestId?: string): Promise<boolean>;
    };
  }
}

export type TWindowControl = "minimize" | "maximize" | "unmaximize" | "close";
