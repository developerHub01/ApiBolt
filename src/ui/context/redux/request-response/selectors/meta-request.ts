import { createSelector } from "@reduxjs/toolkit";
import type { RootState } from "@/context/redux/store";
import type {
  FormDataInterface,
  MetaShowColumnInterface,
  ParamInterface,
  TActiveTabType,
  TMetaTableType,
} from "@/types/request-response.types";
import { selectSelectedTab } from "@/context/redux/request-response/selectors/tab-list";
import { filterAndUniqueMetaData } from "@/context/redux/request-response/utils";

export const selectMetaData = ({
  id,
  type,
}: {
  id?: string;
  type: TMetaTableType | null;
}) =>
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
      const metaId = id ?? selectedTab;
      if (!metaId) return null;

      switch (type) {
        case "params":
          return params[metaId] ?? [];
        case "hiddenParams":
          return hiddenParams[metaId] ? [hiddenParams[metaId]] : [];
        case "headers":
          return headers[metaId] ?? [];
        case "hiddenHeaders":
          return [hiddenCookie, ...(hiddenHeaders[metaId] ?? [])];
        case "form-data":
          return formData[metaId] ?? [];
        case "x-www-form-urlencoded":
          return xWWWFormUrlencodedData[metaId] ?? [];
      }
      return [];
    }
  );

export const selectFilterAndUniqueMetaData = ({
  id,
  type,
}: {
  id?: string;
  type: TMetaTableType | null;
}) =>
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
    ) => {
      const metaId = id ?? selectedTab;
      if (!metaId) return null;

      let data: Array<ParamInterface | FormDataInterface> = [];

      switch (type) {
        case "params":
          data = params[metaId] ?? [];
          break;
        case "hiddenParams":
          data = hiddenParams[metaId] ? [hiddenParams[metaId]] : [];
          break;
        case "headers":
          data = headers[metaId] ?? [];
          break;
        case "hiddenHeaders":
          data = [hiddenCookie, ...(hiddenHeaders[metaId] ?? [])];
          break;
        case "form-data":
          data = formData[metaId] ?? [];
          break;
        case "x-www-form-urlencoded":
          data = xWWWFormUrlencodedData[metaId] ?? [];
          break;
        default:
          data = [];
      }
      return filterAndUniqueMetaData(data ?? []);
    }
  );

export const selectMetaDataByCheckingInheritance = ({
  id,
  type,
}: {
  id?: string;
  type: TMetaTableType | null;
}) =>
  createSelector(
    [
      (state: RootState) => state.requestResponse.selectedTab,
      (state: RootState) => state.requestResponse.authInheritedId,
      (state: RootState) => state,
    ],
    (
      selectedTab,
      authInheritedId,
      state
    ): Array<ParamInterface | FormDataInterface> | null => {
      const metaId = id ?? selectedTab;
      if (!metaId || !authInheritedId[metaId]) return null;

      const innerSelector = selectMetaData({
        id: authInheritedId[metaId],
        type,
      });

      return innerSelector(state);
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

export const selectShowHiddenMetaData = (type: "header" | "param") =>
  createSelector(
    [
      (state: RootState) => state.requestResponse.selectedTab!,
      (state: RootState) => state.requestResponse.showHiddenParams,
      (state: RootState) => state.requestResponse.showHiddenHeaders,
    ],
    (selectedTab, showHiddenParams, showHiddenHeaders): boolean => {
      if (!selectedTab) return false;

      return (
        (type === "header"
          ? showHiddenHeaders[selectedTab]
          : showHiddenParams[selectedTab]) ?? false
      );
    }
  );
