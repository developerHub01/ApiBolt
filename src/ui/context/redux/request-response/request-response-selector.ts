import { createSelector } from "@reduxjs/toolkit";
import type { RootState } from "@/context/redux/store";
import type {
  FormDataInterface,
  MetaShowColumnInterface,
  ParamInterface,
  ProjectInterface,
  TActiveTabType,
  TAuthType,
  TMetaTableType,
  TRequestBodyType,
} from "@/types/request-response.types";

export const selectActiveProjectId = createSelector(
  [(state: RootState) => state.requestResponse.activeProjectId],
  (activeProjectId): string | null => {
    if (!activeProjectId) return null;

    return activeProjectId;
  }
);

export const selectActiveProject = createSelector(
  [
    (state: RootState) => state.requestResponse.activeProjectId,
    (state: RootState) => state.requestResponse.projectList,
  ],
  (activeProjectId, projectList): ProjectInterface | null => {
    if (!activeProjectId) return null;

    return (
      projectList.find((project) => project.id === activeProjectId) ?? null
    );
  }
);

export const selectActiveTabList = createSelector(
  [
    (state: RootState) => state.requestResponse.selectedTab,
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

export const selectProjectById = (id?: string | null) =>
  createSelector(
    [(state: RootState) => state.requestResponse.projectList],
    (projectList): ProjectInterface | null => {
      if (!id) return null;

      return projectList.find((project) => project.id === id) ?? null;
    }
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
    if (!selectedTab) return "params";

    return activeMetaTab[selectedTab];
  }
);

export const selectParams = createSelector(
  [
    (state: RootState) => state.requestResponse.selectedTab!,
    (state: RootState) => state.requestResponse.params,
  ],
  (selectedTab, params): Array<ParamInterface> => {
    if (!selectedTab) return [];

    return params[selectedTab];
  }
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
  (authType): TAuthType => {
    return authType;
  }
);
