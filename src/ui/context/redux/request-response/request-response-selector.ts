import { createSelector } from "@reduxjs/toolkit";
import type { RootState } from "@/context/redux/store";
import type {
  APIKeyInterface,
  BasicAuthInterface,
  EnvironmentInterface,
  FormDataInterface,
  JWTBearerAuthInterface,
  MetaShowColumnInterface,
  ParamInterface,
  ProjectInterface,
  RequestListInterface,
  RequestListItemInterface,
  RequestResponseSizeInterface,
  ResponseInterface,
  TActiveTabType,
  TAuthType,
  TBearerToken,
  TContentType,
  THTTPMethods,
  TMetaTableType,
  TRequestBodyType,
  TRequestFolderDescriptionTab,
} from "@/types/request-response.types";
import {
  defaultApiKey,
  defaultBasicAuth,
  defaultJWTBearerAuth,
} from "@/constant/request-response.constant";

export const selectIsRequestListCollapsed = createSelector(
  [(state: RootState) => state.requestResponse.requestListCollapsed],
  (requestListCollapsed): boolean => requestListCollapsed ?? false
);

export const selectIsResponseCollapsed = createSelector(
  [
    (state: RootState) =>
      state.requestResponse.isResponseCollapsed[
        state.requestResponse.selectedTab!
      ],
  ],
  (isResponseCollapsed): boolean => isResponseCollapsed
);

export const selectActiveProjectId = createSelector(
  [(state: RootState) => state.requestResponse.activeProjectId],
  (activeProjectId): string | null => (activeProjectId ? activeProjectId : null)
);

export const selectProjectList = createSelector(
  [(state: RootState) => state.requestResponse.projectList],
  (projectList): Array<ProjectInterface> => projectList ?? []
);

export const selectActiveProject = createSelector(
  [selectActiveProjectId, selectProjectList],
  (activeProjectId, projectList): ProjectInterface | null => {
    if (!activeProjectId) return null;

    return (
      projectList.find((project) => project.id === activeProjectId) ?? null
    );
  }
);

export const selectActiveProjectName = createSelector(
  [selectActiveProjectId, selectProjectList],
  (projectId, projectList): string =>
    projectList.find((project) => project.id === projectId)?.name ?? ""
);

export const selectProjectById = (id?: string | null) =>
  createSelector(selectProjectList, (projectList): ProjectInterface | null => {
    if (!id) return null;

    return projectList.find((project) => project.id === id) ?? null;
  });

export const selectSelectedTab = createSelector(
  [(state: RootState) => state.requestResponse.selectedTab],
  (selectedTab): string | null => selectedTab
);

export const selectIsTabListHovering = createSelector(
  [(state: RootState) => state.requestResponse.isTabListHovering],
  (isTabListHovering): boolean => isTabListHovering ?? false
);

export const selectRequestOrFolderList = createSelector(
  [(state: RootState) => state.requestResponse.requestList],
  (requestOrFolder): RequestListInterface => requestOrFolder
);

export const selectActiveRequestOrFolder = createSelector(
  [
    (state: RootState) =>
      state.requestResponse.requestList?.[
        state.requestResponse.selectedTab ?? ""
      ] ?? null,
  ],
  (requestOrFolder): RequestListItemInterface | null => requestOrFolder
);

export const selectRequestOrFolderById = (id: string) =>
  createSelector(
    [(state: RootState) => state.requestResponse.requestList[id]],
    (request): RequestListItemInterface => request
  );

export const selectTabList = createSelector(
  [(state: RootState) => state.requestResponse.tabList],
  (tabList): Array<string> => tabList
);

export const selectActiveMetaTabList = createSelector(
  [
    selectSelectedTab,
    (state: RootState) => state.requestResponse.params,
    (state: RootState) => state.requestResponse.headers,
    (state: RootState) => state.requestResponse.formData,
    (state: RootState) => state.requestResponse.xWWWFormUrlencodedData,
    (state: RootState) => state.requestResponse.rawData,
    (state: RootState) => state.requestResponse.binaryData,
  ],
  (
    selectedTab,
    params,
    headers,
    formData,
    xWWWFormUrlencodedData,
    rawData,
    binaryData
  ): Partial<Record<TActiveTabType, boolean>> => {
    if (!selectedTab) return {};

    const tabList: Partial<Record<TActiveTabType, boolean>> = {};

    tabList["params"] = !!params[selectedTab]?.length;
    tabList["headers"] = !!headers[selectedTab]?.length;
    tabList["body"] =
      !!formData[selectedTab]?.length ||
      !!xWWWFormUrlencodedData[selectedTab]?.length ||
      !!rawData[selectedTab] ||
      !!binaryData[selectedTab];

    return tabList;
  }
);

export const selectRequestFolderTitle = createSelector(
  [
    (state: RootState) =>
      state.requestResponse.folderTitle[
        state.requestResponse.selectedTab! ?? ""
      ],
  ],
  (folderTitle): string | undefined => folderTitle
);

export const selectRequestFolderDescription = createSelector(
  [
    (state: RootState) =>
      state.requestResponse.folderDescription[
        state.requestResponse.selectedTab! ?? ""
      ],
  ],
  (folderDescription): string | undefined => folderDescription
);

export const selectRequestFolderDescriptionActiveTab = createSelector(
  [
    (state: RootState) =>
      state.requestResponse.folderDescriptionActiveTab[
        state.requestResponse.selectedTab! ?? ""
      ] ?? "markdown",
  ],
  (folderDescriptionActiveTab): TRequestFolderDescriptionTab =>
    folderDescriptionActiveTab
);

export const selectIsHttpMethodType = createSelector(
  [
    (state: RootState) =>
      state.requestResponse.requestList[state.requestResponse.selectedTab!]
        ?.method ?? "get",
  ],
  (httpMethodType): THTTPMethods => httpMethodType
);

export const selectIsFolderLoading = createSelector(
  [
    (state: RootState) =>
      state.requestResponse.isLoadingFolder[
        state.requestResponse.selectedTab! ?? ""
      ] ?? "markdown",
  ],
  (folderDescriptionActiveTab): boolean => folderDescriptionActiveTab
);

export const selectMetaData = (type: TMetaTableType | null) =>
  createSelector(
    [
      (state: RootState) => state.requestResponse.selectedTab,
      (state: RootState) => state.requestResponse.params,
      (state: RootState) => state.requestResponse.hiddenParams,
      (state: RootState) => state.requestResponse.headers,
      (state: RootState) => state.requestResponse.hiddenCookie,
      (state: RootState) => state.requestResponse.hiddenHeaders,
      (state: RootState) => state.requestResponse.formData,
      (state: RootState) => state.requestResponse.xWWWFormUrlencodedData,
    ],
    (
      selectedTab,
      params,
      hiddenParams,
      headers,
      hiddenCookie,
      hiddenHeaders,
      formData,
      xWWWFormUrlencodedData
    ): Array<ParamInterface | FormDataInterface> | null => {
      if (!selectedTab) return null;

      switch (type) {
        case "params":
          return params[selectedTab] ?? [];
        case "hiddenParams":
          return hiddenParams[selectedTab] ?? [];
        case "headers":
          return headers[selectedTab] ?? [];
        case "hiddenHeaders":
          return [hiddenCookie, ...(hiddenHeaders[selectedTab] ?? [])];
        case "form-data":
          return formData[selectedTab] ?? [];
        case "x-www-form-urlencoded":
          return xWWWFormUrlencodedData[selectedTab] ?? [];
      }
      return [];
    }
  );

export const selectActiveMetaTab = createSelector(
  [
    (state: RootState) => state.requestResponse.selectedTab!,
    (state: RootState) => state.requestResponse.activeMetaTab,
  ],
  (selectedTab, activeMetaTab): TActiveTabType => {
    if (!selectedTab) return "url";

    return activeMetaTab[selectedTab];
  }
);

export const selectEnvironmentsList = createSelector(
  [(state: RootState) => state.requestResponse.environmentsList],
  (environmentsList: Record<string, EnvironmentInterface>) => environmentsList
);

export const selectEnvironmentsVariableList = createSelector(
  [(state: RootState) => state.requestResponse.environmentsList],
  (
    environmentsList: Record<string, EnvironmentInterface>
  ): Array<EnvironmentInterface> => Object.values(environmentsList)
);

export const selectEnvironmentsVariableListUnique = createSelector(
  [(state: RootState) => state.requestResponse.environmentsList],
  (
    environmentsList: Record<string, EnvironmentInterface>
  ): Array<EnvironmentInterface> => {
    const map = new Map<string, EnvironmentInterface>();

    Object.values(environmentsList).forEach((env) => {
      const existing = map.get(env.variable);
      if (!existing || new Date(env.createdAt) > new Date(existing.createdAt))
        map.set(env.variable, env);
    });

    return Array.from(map.values());
  }
);

export const selectRequestName = createSelector(
  [
    (state: RootState) =>
      state.requestResponse.requestList[state.requestResponse.selectedTab!]
        ?.name ?? "Request",
  ],
  (name): string => name
);

export const selectParams = createSelector(
  [
    (state: RootState) =>
      state.requestResponse.params[state.requestResponse.selectedTab ?? ""],
  ],
  (params): Array<ParamInterface> => (!params ? [] : params)
);

export const selectCheckedParams = createSelector(
  [
    (state: RootState) =>
      state.requestResponse.params[state.requestResponse.selectedTab ?? ""],
  ],
  (params): Array<ParamInterface> =>
    (!params ? [] : params).filter((param) => param.isCheck)
);

export const selectHiddenHeaders = createSelector(
  [
    (state: RootState) => state.requestResponse.selectedTab!,
    (state: RootState) => state.requestResponse.hiddenCookie,
    (state: RootState) => state.requestResponse.hiddenHeaders,
  ],
  (selectedTab, hiddenCookie, hiddenHeaders): Array<ParamInterface> => {
    if (!selectedTab) return [];

    return [hiddenCookie, ...(hiddenHeaders[selectedTab] ?? [])];
  }
);

export const selectHeaders = createSelector(
  [
    (state: RootState) => state.requestResponse.selectedTab!,
    (state: RootState) => state.requestResponse.headers,
  ],
  (selectedTab, headers): Array<ParamInterface> => {
    if (!selectedTab) return [];

    return headers[selectedTab];
  }
);

export const selectRequestBodyType = createSelector(
  [
    (state: RootState) => state.requestResponse.selectedTab!,
    (state: RootState) => state.requestResponse.requestBodyType,
  ],
  (selectedTab, requestBodyType): TRequestBodyType => {
    if (!selectedTab) return "none";

    return requestBodyType[selectedTab];
  }
);

export const selectMetaBulkEditOpen = createSelector(
  [
    (state: RootState) => state.requestResponse.selectedTab!,
    (state: RootState) =>
      state.requestResponse.activeMetaTab[
        state.requestResponse.selectedTab ?? ""
      ],
    (state: RootState) =>
      state.requestResponse.requestBodyType[
        state.requestResponse.selectedTab ?? ""
      ],
    (state: RootState) =>
      state.requestResponse.paramsBulkEditOpen[
        state.requestResponse.selectedTab ?? ""
      ],
    (state: RootState) =>
      state.requestResponse.headersBulkEditOpen[
        state.requestResponse.selectedTab ?? ""
      ],
    (state: RootState) =>
      state.requestResponse.formDataBulkEditOpen[
        state.requestResponse.selectedTab ?? ""
      ],
    (state: RootState) =>
      state.requestResponse.xWWWFormEncodedBulkEditOpen[
        state.requestResponse.selectedTab ?? ""
      ],
  ],
  (
    selectedTab,
    activeMetaTab,
    requestBodyType,
    paramsBulkEditOpen,
    headersBulkEditOpen,
    formDataBulkEditOpen,
    xWWWFormEncodedBulkEditOpen
  ): boolean => {
    if (!selectedTab) return false;

    if (activeMetaTab === "params") return paramsBulkEditOpen;
    else if (activeMetaTab === "headers") return headersBulkEditOpen;
    if (activeMetaTab === "body" && requestBodyType === "form-data")
      return formDataBulkEditOpen;
    if (activeMetaTab === "body" && requestBodyType === "x-www-form-urlencoded")
      return xWWWFormEncodedBulkEditOpen;

    return false;
  }
);

export const selectMetaBulkData = createSelector(
  [
    (state: RootState) => state.requestResponse.selectedTab!,
    (state: RootState) =>
      state.requestResponse.activeMetaTab[
        state.requestResponse.selectedTab ?? ""
      ],
    (state: RootState) =>
      state.requestResponse.requestBodyType[
        state.requestResponse.selectedTab ?? ""
      ],
    (state: RootState) =>
      state.requestResponse.params[state.requestResponse.selectedTab ?? ""],
    (state: RootState) =>
      state.requestResponse.headers[state.requestResponse.selectedTab ?? ""],
    (state: RootState) =>
      state.requestResponse.formData[state.requestResponse.selectedTab ?? ""],
    (state: RootState) =>
      state.requestResponse.xWWWFormUrlencodedData[
        state.requestResponse.selectedTab ?? ""
      ],
  ],
  (
    selectedTab,
    activeMetaTab,
    requestBodyType,
    params,
    headers,
    formData,
    xWWWFormUrlencodedData
  ): Array<ParamInterface | FormDataInterface> => {
    if (!selectedTab) return [];

    if (activeMetaTab === "params") return params;
    else if (activeMetaTab === "headers") return headers;
    if (activeMetaTab === "body" && requestBodyType === "form-data")
      return formData?.filter((form) => !Array.isArray(form.value));
    if (activeMetaTab === "body" && requestBodyType === "x-www-form-urlencoded")
      return xWWWFormUrlencodedData;

    return [];
  }
);

export const selectRequestMetaShowColumn = createSelector(
  [
    (state: RootState) => state.requestResponse.selectedTab!,
    (state: RootState) => state.requestResponse.metaShowColumn,
  ],
  (selectedTab, metaShowColumn): MetaShowColumnInterface | null => {
    if (!selectedTab) return null;

    return metaShowColumn[selectedTab];
  }
);

export const selectAuthType = createSelector(
  [(state: RootState) => state.requestResponse.authType ?? "no-auth"],
  (authType): TAuthType => authType
);

export const selectAuthApiKey = createSelector(
  [(state: RootState) => state.requestResponse.apiKeyAuth ?? defaultApiKey],
  (authData): APIKeyInterface => authData
);

export const selectAuthBasicAuth = createSelector(
  [(state: RootState) => state.requestResponse.basicAuth ?? defaultBasicAuth],
  (authData): BasicAuthInterface => authData
);

export const selectAuthBearerTokenAuth = createSelector(
  [(state: RootState) => state.requestResponse.bearerTokenAuth ?? ""],
  (authData): TBearerToken => authData
);

export const selectAuthJWTBearerAuth = createSelector(
  [
    (state: RootState) =>
      state.requestResponse.jwtBearerAuth ?? defaultJWTBearerAuth,
  ],
  (authData): JWTBearerAuthInterface => authData
);

export const selectCodeLineWrap = createSelector(
  [
    (state: RootState) =>
      state.requestResponse.rawDataLineWrap[
        state.requestResponse.selectedTab ?? ""
      ],
  ],
  (rawDataLineWrap): boolean => rawDataLineWrap ?? true
);

export const selectRawRequestBodyType = createSelector(
  [
    (state: RootState) =>
      state.requestResponse.rawRequestBodyType[
        state.requestResponse.selectedTab ?? ""
      ],
  ],
  (bodyType): TContentType => bodyType ?? "json"
);

export const selectRawData = createSelector(
  [
    (state: RootState) =>
      state.requestResponse.rawData[state.requestResponse.selectedTab ?? ""],
  ],
  (rawData): string => rawData ?? ""
);

export const selectBinaryData = createSelector(
  [
    (state: RootState) =>
      state.requestResponse.binaryData[state.requestResponse.selectedTab!],
  ],
  (binaryData): string | null => binaryData
);

/*
 * ===============================================
 * =========== RESPONSE SELECTORS START ==========
 * ===============================================
 */
export const selectIsResponseLoading = createSelector(
  [
    (state: RootState) =>
      state.requestResponse.isLoading[state.requestResponse.selectedTab!],
  ],
  (isLoading): boolean => isLoading
);
export const selectResponse = createSelector(
  [
    (state: RootState) =>
      state.requestResponse.response[state.requestResponse.selectedTab!],
  ],
  (response): ResponseInterface | null => response
);
export const selectRequestSize = createSelector(
  [
    (state: RootState) =>
      state.requestResponse.requestSize[state.requestResponse.selectedTab!],
  ],
  (requestSize): RequestResponseSizeInterface => requestSize
);
export const selectResponseSize = createSelector(
  [
    (state: RootState) =>
      state.requestResponse.responseSize[state.requestResponse.selectedTab!],
  ],
  (responseSize): RequestResponseSizeInterface => responseSize
);
/*
 * ===============================================
 * =========== RESPONSE SELECTORS END ============
 * ===============================================
 */
