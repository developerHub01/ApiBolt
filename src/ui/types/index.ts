import type {
  APIPayloadBody,
  AuthorizationPayloadInterface,
  BodyBinaryInterface,
  BodyRawInterface,
  EnvironmentInterface,
  EnvironmentPayloadInterface,
  FormDataPayloadInterface,
  HiddenHeadersCheckInterface,
  JWTBearerAuthInterface,
  MetaShowColumnInterface,
  ParamHeaderBuildPayloadInterface,
  ParamHeaderPayloadInterface,
  ProjectInterface,
  RequestListItemInterface,
  RequestListItemUpdatePayloadInterface,
  RequestTabInterface,
  ResponseFolderDataInterface,
  ResponseInterface,
} from "@/types/request-response.types";
import type {
  ProjectSettingsInterface,
  SettingsInterface,
  SettingsTotalInterface,
  UpdateBackgroundImagePayloadInterface,
} from "@/types/setting.types";
import type { ApiUrlPayload } from "@/types/request-url.types";

declare global {
  interface Window {
    electronAPI: {
      getCookiesFromUrl(url: string): Promise<string>;
      fetchApi(payload: APIPayloadBody): Promise<ResponseInterface>;

      getAllCookies(): Promise<unknown>;
      getCookieByDomain(url: string): Promise<unknown>;
      getCookieStringByDomain(url: string): Promise<unknown>;

      // window controls
      windowMinimize(): Promise<void>;
      windowMaximize(): Promise<void>;
      windowUnmaximize(): Promise<void>;
      windowClose(): Promise<void>;
      isWindowMaximized(): Promise<boolean>;

      onWindowMaximizeChange(cb: (isMaximized: boolean) => void): void;
      removeWindowMaximizeChange(): void;

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
      collapseAllRequestOrFolderMeta(projectId?: string): Promise<boolean>;
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
      getFolder(
        requestOrFolderMetaId?: string
      ): Promise<ResponseFolderDataInterface>;
      updateFolder(
        payload: Partial<ResponseFolderDataInterface> & {
          requestOrFolderMetaId?: string;
        }
      ): Promise<boolean>;
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
      replaceParams(
        requestOrFolderMetaId: string,
        payload: Array<Partial<ParamHeaderBuildPayloadInterface>>
      ): Promise<boolean>;
      checkAllParamsByRequestMetaId(
        requestOrFolderMetaId?: string
      ): Promise<boolean>;
    };

    electronAPIHeadersDB: {
      getHeaders(
        requestOrFolderMetaId?: string
      ): Promise<Array<ParamHeaderPayloadInterface>>;
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
      replaceHeaders(
        requestOrFolderMetaId: string,
        payload: Array<Partial<ParamHeaderBuildPayloadInterface>>
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

    electronAPIBodyXWWWFormUrlencodedDB: {
      getBodyXWWWFormUrlencoded(
        requestOrFolderMetaId?: string
      ): Promise<Array<ParamHeaderPayloadInterface>>;
      deleteBodyXWWWFormUrlencoded(formId: string): Promise<boolean>;
      deleteBodyXWWWFormUrlencodedByRequestMetaId(
        requestOrFolderMetaId?: string
      ): Promise<boolean>;
      createBodyXWWWFormUrlencoded(
        payload: Partial<ParamHeaderBuildPayloadInterface>
      ): Promise<boolean>;
      updateBodyXWWWFormUrlencoded(
        formId: string,
        payload: Partial<ParamHeaderBuildPayloadInterface>
      ): Promise<boolean>;
      replaceBodyXWWWFormUrlencoded(
        requestOrFolderMetaId: string,
        payload: Array<Partial<FormDataPayloadInterface>>
      ): Promise<boolean>;
      checkAllBodyXWWWFormUrlencodedByRequestMetaId(
        requestOrFolderMetaId?: string
      ): Promise<boolean>;
    };

    electronAPIBodyFormDataDB: {
      getBodyFormData(
        requestOrFolderMetaId?: string
      ): Promise<Array<ParamHeaderPayloadInterface>>;
      deleteBodyFormData(formId: string): Promise<boolean>;
      deleteBodyFormDataByRequestMetaId(
        requestOrFolderMetaId?: string
      ): Promise<boolean>;
      deleteBodyFormDataFile(formId: string, index: number): Promise<boolean>;
      createBodyFormData(
        payload: Partial<FormDataPayloadInterface>
      ): Promise<boolean>;
      updateBodyFormData(
        formId: string,
        payload: Partial<FormDataPayloadInterface>
      ): Promise<boolean>;
      updateBodyFormDataFile(formId: string): Promise<boolean>;
      replaceBodyFormData(
        requestOrFolderMetaId: string,
        payload: Array<Partial<FormDataPayloadInterface>>
      ): Promise<boolean>;
      checkAllBodyFormDataByRequestMetaId(
        requestOrFolderMetaId?: string
      ): Promise<boolean>;
    };

    electronAPIMetaShowColumnDB: {
      getMetaShowColumn(
        requestOrFolderMetaId?: string
      ): Promise<MetaShowColumnInterface>;
      createMetaShowColumn(
        payload: Partial<MetaShowColumnInterface>
      ): Promise<boolean>;
      updateMetaShowColumn(
        payload: Partial<MetaShowColumnInterface>
      ): Promise<boolean>;
      deleteMetaShowColumn(requestOrFolderMetaId?: string): Promise<boolean>;
    };

    electronAPIApiUrl: {
      getApiUrlDB(requestOrFolderMetaId?: string): Promise<ApiUrlPayload>;
      createApiUrl(payload: Partial<ApiUrlPayload>): Promise<boolean>;
      updateApiUrl(payload: Partial<ApiUrlPayload>): Promise<boolean>;
    };
  }
}

export type TWindowControl = "minimize" | "maximize" | "unmaximize" | "close";
