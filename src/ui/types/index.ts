import type {
  APIPayloadBody,
  BodyBinaryInterface,
  BodyRawInterface,
  FormDataPayloadInterface,
  HiddenHeadersCheckInterface,
  MetaShowColumnInterface,
  ParamHeaderBuildPayloadInterface,
  ParamHeaderPayloadInterface,
  RequestListItemInterface,
  RequestListItemMovePayloadInterface,
  RequestListItemUpdatePayloadInterface,
  RequestTabInterface,
  ResponseFolderDataInterface,
  ResponseInterface,
  ShowHiddenMetaInterface,
} from "@/types/request-response.types";
import type {
  ProjectSettingsInterface,
  SettingsInterface,
  SettingsTotalInterface,
  UpdateBackgroundImagePayloadInterface,
} from "@/types/setting.types";
import type { ApiUrlPayload } from "@/types/request-url.types";
import type {
  AuthorizationPayloadInterface,
  JWTBearerAuthInterface,
} from "@/types/authorization.types";
import type { ProjectInterface } from "@/types/project.types";
import type {
  EnvironmentInterface,
  EnvironmentPayloadInterface,
} from "@/types/environment.types";
import type {
  HttpStatusListInterface,
  HttpStatusSingleInterface,
  HttpStatusUpdatePayloadInterface,
} from "@/types/http-status.type";
import type { TSidebarTab } from "@/types/sidebar.types";
import type { TRequestCodeType } from "@/types/code-snippit.types";
import type { CookiesInterface } from "@/types/cookies.types";
import type {
  KeybaordShortCutInterface,
  KeybaordShortCutReceivePayloadInterface,
  KeybaordShortCutUpdatePayloadInterface,
} from "@/types/keyboard-shortcut.types";
import type {
  CreateHistoryItemInterface,
  HistoryItemInterface,
  HistoryItemMetaInterface,
} from "@/types/history.types";
import type {
  ActiveThemeIdInterface,
  ActiveThemePaletteInterface,
  ChangeActiveThemePayloadInterface,
  ThemeCreatePayloadInterface,
  ThemeInterface,
  ThemeMetaInterface,
} from "@/types/theme.types";

export interface ElectronResponseInterface {
  success: boolean;
  message: string;
}

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

      /* basic zoom handler */
      setZoom: (factor: number) => Promise<void>;
      getZoom: () => Promise<number>;

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

      /***
       * trigger when theme changed
       */
      applyTheme(): Promise<void>;
      applyTestTheme(palette: ThemeInterface["palette"]): Promise<void>;
    };

    electronFileSystem: {
      openFolder: (factor: string) => Promise<boolean>;
    };

    electronAPITheme: {
      getThemeListMeta(): Promise<Array<ThemeMetaInterface>>;
      getThemeById(id: string): Promise<ThemeInterface>;
      getThemePaletteById(id: string): Promise<ThemeInterface["palette"]>;
      createTheme(payload: ThemeCreatePayloadInterface): Promise<boolean>;
      updateTheme(
        payload: Partial<ThemeCreatePayloadInterface>
      ): Promise<boolean>;
      deleteThemeById(id: string): Promise<boolean>;

      saveThemePalette(palette: ThemeInterface["palette"]): Promise<boolean>;
    };

    electronAPIActiveTheme: {
      getActiveThemeId(): Promise<ActiveThemeIdInterface>;
      getActiveThemePalette(): Promise<ActiveThemePaletteInterface>;
      changeActiveTheme(
        payload: ChangeActiveThemePayloadInterface
      ): Promise<boolean>;
    };

    electronAPIHttpStatusDB: {
      getHttpStatus(): Promise<HttpStatusListInterface>;
      getHttpStatusByCode(code: string): Promise<HttpStatusSingleInterface>;
      updateHttpStatus(
        payload: HttpStatusUpdatePayloadInterface
      ): Promise<Required<HttpStatusUpdatePayloadInterface> | null>;
    };

    electronAPIActiveSidebarTabDB: {
      getActiveSidebarTab(): Promise<TSidebarTab>;
      createActiveSidebarTab(tab: TSidebarTab): Promise<boolean>;
      updateActiveSidebarTab(tab: TSidebarTab): Promise<boolean>;
      deleteActiveSidebarTab(): Promise<boolean>;
    };

    electronAPIActiveCodeSnippitTypeDB: {
      getActiveCodeSnippitType(): Promise<TRequestCodeType>;
      createActiveCodeSnippitType(
        languageId: TRequestCodeType
      ): Promise<boolean>;
      updateActiveCodeSnippitType(
        languageId: TRequestCodeType | null
      ): Promise<boolean>;
      deleteActiveCodeSnippitType(): Promise<boolean>;
    };

    electronAPIProjectsDB: {
      getProjects(): Promise<Array<ProjectInterface>>;
      createProjects(payload: { name: string }): Promise<boolean>;
      updateProjects(
        id: string,
        payload: Omit<ProjectInterface, "id">
      ): Promise<boolean>;
      deleteProjects(id: string): Promise<boolean>;
      changeActiveProject(id?: string | null): Promise<boolean>;
      getActiveProject(): Promise<string | null>;
    };

    electronAPICookiesDB: {
      getCookiesByProject(projectId?: string): Promise<string>;
      getParsedCookiesByProject(projectId?: string): Promise<CookiesInterface>;
      createCookiesByProject(payload: { name: string }): Promise<boolean>;
      updateCookiesByProject(payload: {
        projectId?: string;
        cookies: CookiesInterface;
      }): Promise<boolean>;
      deleteCookiesByProject(projectId?: string): Promise<boolean>;
      deleteCookieKeyByProject(payload: {
        key: string;
        projectId?: string;
      }): Promise<boolean>;
      clearCookiesByProject(projectId?: string): Promise<boolean>;
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
      exportEnvironments(id?: string): Promise<ElectronResponseInterface>;
      importEnvironments(id?: string): Promise<ElectronResponseInterface>;
    };

    electronAPIAuthorizationDB: {
      getAuth(requestId?: string): Promise<AuthorizationPayloadInterface>;
      getInheritedAuthFromId(
        requestId: string
      ): Promise<AuthorizationPayloadInterface>;
      createAuth(): Promise<boolean>;
      updateAuth(updatePayload: {
        requestOrFolderId?: string;
        payload: Partial<Omit<AuthorizationPayloadInterface, "id">>;
      }): Promise<AuthorizationPayloadInterface>;
      deleteAuth(id?: string): Promise<boolean>;
      duplicateAuth(payload: Record<string, string>): Promise<boolean>;
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
      moveRequestOrFolderMeta(
        payload: RequestListItemMovePayloadInterface
      ): Promise<boolean>;
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
      duplicateFolder(payload: Record<string, string>): Promise<boolean>;
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
        payload?: Array<Partial<ParamHeaderBuildPayloadInterface>>
      ): Promise<boolean>;
      checkAllParamsByRequestMetaId(
        requestOrFolderMetaId?: string
      ): Promise<boolean>;
      duplicateParams(payload: Record<string, string>): Promise<boolean>;
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
      duplicateHeaders(payload: Record<string, string>): Promise<boolean>;
    };

    electronAPIHiddenHeadersCheckDB: {
      getHiddenHeadersCheck(id?: string): Promise<HiddenHeadersCheckInterface>;
      createHiddenHeadersCheck(
        paramId: string
      ): Promise<Partial<HiddenHeadersCheckInterface>>;
      updateHiddenHeadersCheck(
        payload: Partial<HiddenHeadersCheckInterface>
      ): Promise<Partial<HiddenHeadersCheckInterface>>;
      duplicateHiddenHeadersCheck(
        payload: Record<string, string>
      ): Promise<boolean>;
    };

    electronAPIShowHiddenMetaDataDB: {
      getShowHiddenMetaData(id?: string): Promise<ShowHiddenMetaInterface>;
      createShowHiddenMetaData(
        paramId: string
      ): Promise<Partial<ShowHiddenMetaInterface>>;
      updateShowHiddenMetaData(
        payload: Partial<
          ShowHiddenMetaInterface & {
            requestOrFolderMetaId: string;
          }
        >
      ): Promise<Partial<ShowHiddenMetaInterface>>;
      duplicateShowHiddenMetaData(
        payload: Record<string, string>
      ): Promise<boolean>;
    };

    electronAPIBodyRawDB: {
      getBodyRaw(requestId?: string): Promise<BodyRawInterface>;
      createBodyRaw(
        payload: Partial<BodyRawInterface> &
          Required<Pick<BodyRawInterface, "requestOrFolderMetaId">>
      ): Promise<boolean>;
      /* if in payload requestOrFolderMetaId not exist then it will pick active tab from backend */
      updateBodyRaw(payload: Partial<BodyRawInterface>): Promise<boolean>;
      duplicateBodyRaw(payload: Record<string, string>): Promise<boolean>;
      replaceBodyRaw(payload: Partial<BodyRawInterface>): Promise<boolean>;
    };

    electronAPIBodyBinaryDB: {
      getBodyBinary(requestId?: string): Promise<BodyBinaryInterface>;
      createBodyBinary(): Promise<boolean>;
      updateBodyBinary(requestId?: string): Promise<boolean>;
      deleteBodyBinary(requestId?: string): Promise<boolean>;
      duplicateBodyBinary(payload: Record<string, string>): Promise<boolean>;
      replaceBodyBinary(
        payload: Partial<
          Pick<BodyBinaryInterface, "requestOrFolderMetaId"> & {
            path: BodyBinaryInterface["path"] | null;
          }
        >
      ): Promise<boolean>;
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
      duplicateRequestMetaTab(
        requestId?: Record<string, string>
      ): Promise<boolean>;
      replaceRequestMetaTab(
        payload?: Partial<RequestTabInterface>
      ): Promise<boolean>;
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
        payload?: Array<Partial<FormDataPayloadInterface>>
      ): Promise<boolean>;
      checkAllBodyXWWWFormUrlencodedByRequestMetaId(
        requestOrFolderMetaId?: string
      ): Promise<boolean>;
      duplicateBodyXWWWFormUrlencoded(
        payload: Record<string, string>
      ): Promise<boolean>;
    };

    electronAPIBodyFormDataDB: {
      getBodyFormData(
        requestOrFolderMetaId?: string
      ): Promise<Array<FormDataPayloadInterface>>;
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
        payload?: Array<Partial<FormDataPayloadInterface>>
      ): Promise<boolean>;
      replaceFullBodyFormData(
        requestOrFolderMetaId: string,
        payload?: Array<Partial<FormDataPayloadInterface>>
      ): Promise<boolean>;
      checkAllBodyFormDataByRequestMetaId(
        requestOrFolderMetaId?: string
      ): Promise<boolean>;
      duplicateBodyFormData(payload: Record<string, string>): Promise<boolean>;
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
      duplicateMetaShowColumn(
        payload: Record<string, string>
      ): Promise<boolean>;
    };

    electronAPIApiUrl: {
      getApiUrlDB(requestOrFolderMetaId?: string): Promise<ApiUrlPayload>;
      createApiUrl(payload: Partial<ApiUrlPayload>): Promise<boolean>;
      /* old ids and new ids map */
      duplicateApiUrl(payload: Record<string, string>): Promise<boolean>;
      updateApiUrl(payload: Partial<ApiUrlPayload>): Promise<boolean>;
    };

    electronAPIRequest: {
      clearRequestDB(requestOrFolderMetaId?: string): Promise<boolean>;
    };

    electronAPIKeyboardShortcut: {
      getKeyboardShortcuts(
        projectId?: string
      ): Promise<KeybaordShortCutReceivePayloadInterface>;
      getKeyboardShortcutsById(
        payload: Pick<KeybaordShortCutInterface, "id" | "projectId">
      ): Promise<KeybaordShortCutInterface>;
      updateKeyboardShortcuts(
        payload: KeybaordShortCutUpdatePayloadInterface
      ): Promise<boolean>;
      resetKeyboardShortcuts(
        payload: Pick<KeybaordShortCutInterface, "id" | "projectId">
      ): Promise<KeybaordShortCutInterface>;
    };

    electronAPIHistory: {
      getHistoryById(id: string): Promise<HistoryItemInterface>;
      getHistoryByRequestId(
        requestId: string
      ): Promise<Array<HistoryItemMetaInterface>>;
      createHistory(
        payload: CreateHistoryItemInterface
      ): Promise<
        Array<HistoryItemMetaInterface> | HistoryItemMetaInterface | null
      >;
      deleteHistoryById(id: string): Promise<boolean>;
      deleteHistoryByRequestId(id: string): Promise<boolean>;
    };
  }
}

export type TWindowControl =
  | "minimize"
  | "maximize"
  | "unmaximize"
  | "close"
  | "settings";
