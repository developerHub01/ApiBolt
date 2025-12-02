import { createSelector } from "@reduxjs/toolkit";
import type { RootState } from "@/context/redux/store";
import type {
  FormDataInterface,
  MetaShowColumnInterface,
  ParamInterface,
  TActiveTabType,
  TMetaTableType
} from "@shared/types/request-response.types";
import { selectSelectedTab } from "@/context/redux/request-response/selectors/tab-list";
import {
  filterAndUniqueFormData,
  filterAndUniqueMetaData
} from "@/context/redux/request-response/utils";
import { AUTHORIZATION_DATA_ID } from "@/constant/authorization.constant";

export const selectMetaData = createSelector(
  [
    (state: RootState) => state.requestResponse.selectedTab,
    (state: RootState) => state.requestResponse.params,
    (state: RootState) => state.requestResponse.headers,
    (state: RootState) => state.requestResponse.hiddenCookie,
    (state: RootState) => state.requestResponse.hiddenHeaders,
    (state: RootState) => state.requestResponse.formData,
    (state: RootState) => state.requestResponse.xWWWFormUrlencodedData,
    (state: RootState) => state.requestResponse.authType,
    (state: RootState) => state.requestResponse.authInheritedId,
    (state: RootState) => state.requestResponse.authorizationHeader,
    (state: RootState) => state.requestResponse.authorizationParam,
    (
      _,
      payload: {
        id?: string;
        type: TMetaTableType | null;
      }
    ) => payload
  ],
  (
    selectedTab,
    params,
    headers,
    hiddenCookie,
    hiddenHeaders,
    formData,
    xWWWFormUrlencodedData,
    authType,
    authInheritedIds,
    authorizationHeaders,
    authorizationParams,
    { id, type }
  ) => {
    const metaId = id ?? selectedTab;
    if (!metaId) return null;

    const authApplyingMetaId =
      authType[metaId] === "inherit-parent" ? authInheritedIds[metaId] : metaId;
    const authorizationHeader = authApplyingMetaId
      ? authorizationHeaders[authApplyingMetaId]
      : null;
    const authorizationParam = authApplyingMetaId
      ? authorizationParams[authApplyingMetaId]
      : null;

    switch (type) {
      case "params":
        return (params[metaId] ?? []) as Array<ParamInterface>;
      case "hiddenParams":
        return (
          authorizationParam ? [authorizationParam] : []
        ) as Array<ParamInterface>;
      case "headers":
        return (headers[metaId] ?? []) as Array<ParamInterface>;
      case "hiddenHeaders": {
        return [
          ...(authorizationHeader ? [authorizationHeader] : []),
          hiddenCookie,
          ...(hiddenHeaders[metaId] ?? [])
        ] as Array<ParamInterface>;
      }
      case "form-data":
        return formData[metaId] ?? ([] as Array<FormDataInterface>);
      case "x-www-form-urlencoded":
        return (xWWWFormUrlencodedData[metaId] ?? []) as Array<ParamInterface>;
    }
    return [];
  }
);

export const selectFilterAndUniqueMetaData = createSelector(
  [
    (
      state,
      {
        id,
        type
      }: {
        id?: string;
        type: TMetaTableType | null;
      }
    ) =>
      selectMetaData(state, {
        id,
        type
      })
  ],
  metaData => {
    if (!metaData) return null;
    return filterAndUniqueMetaData(metaData);
  }
);

export const selectAuthorizationHeaderData = createSelector(
  [
    (
      state,
      payload?: {
        id?: string;
      } | null
    ) =>
      selectMetaData(state, {
        id: payload?.id,
        type: "hiddenHeaders"
      })
  ],
  metaData => {
    if (!metaData) return null;
    return metaData.find(header => header.id === AUTHORIZATION_DATA_ID);
  }
);

export const selectAuthorizationParamData = createSelector(
  [
    (
      state,
      payload?: {
        id?: string;
      } | null
    ) =>
      selectMetaData(state, {
        id: payload?.id,
        type: "hiddenParams"
      })
  ],
  metaData => {
    if (!metaData) return null;
    return metaData.find(
      header => header.id === AUTHORIZATION_DATA_ID
    ) as ParamInterface<string>;
  }
);

export const selectFilterAndUniqueFormData = createSelector(
  [
    (state: RootState) => state.requestResponse.selectedTab,
    (state: RootState) => state.requestResponse.formData,
    (_, payload: { id?: string } = {}) => payload
  ],
  (selectedTab, formData, { id }) => {
    const metaId = id ?? selectedTab;
    if (!metaId) return null;

    return filterAndUniqueFormData(formData[metaId] ?? []);
  }
);

export const selectActiveMetaTab = createSelector(
  [
    (state: RootState) => state.requestResponse.selectedTab!,
    (state: RootState) => state.requestResponse.activeMetaTab
  ],
  (selectedTab, activeMetaTab): TActiveTabType => {
    if (!selectedTab) return "url";

    return activeMetaTab[selectedTab];
  }
);

export const selectActiveMetaTabList = createSelector(
  [
    selectSelectedTab,
    (state: RootState) => state.requestResponse.params,
    (state: RootState) => state.requestResponse.headers,
    (state: RootState) => state.requestResponse.formData,
    (state: RootState) => state.requestResponse.xWWWFormUrlencodedData,
    (state: RootState) => state.requestResponse.rawData,
    (state: RootState) => state.requestResponse.binaryData
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
      ]
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
      ]
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
      return formData?.filter(form => !Array.isArray(form.value));
    if (activeMetaTab === "body" && requestBodyType === "x-www-form-urlencoded")
      return xWWWFormUrlencodedData;

    return [];
  }
);

export const selectRequestMetaShowColumn = createSelector(
  [
    (state: RootState) => state.requestResponse.selectedTab!,
    (state: RootState) => state.requestResponse.metaShowColumn
  ],
  (selectedTab, metaShowColumn): MetaShowColumnInterface | null => {
    if (!selectedTab) return null;

    return metaShowColumn[selectedTab];
  }
);

export const selectShowHiddenMetaData = createSelector(
  [
    (state: RootState) => state.requestResponse.selectedTab!,
    (state: RootState) => state.requestResponse.showHiddenParams,
    (state: RootState) => state.requestResponse.showHiddenHeaders,
    (_, type: "header" | "param") => type
  ],
  (selectedTab, showHiddenParams, showHiddenHeaders, type): boolean => {
    if (!selectedTab) return false;

    return (
      (type === "header"
        ? showHiddenHeaders[selectedTab]
        : showHiddenParams[selectedTab]) ?? false
    );
  }
);
