import { createSelector } from "@reduxjs/toolkit";
import type {
  FormDataInterface,
  ParamInterface,
  TActiveTabType,
} from "@/context/redux/request-response/request-response-slice";
import type { RootState } from "@/context/redux/store";
import type { TMetaTableType } from "@/context/request/RequestMetaTableProvider";

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

export const selectMetaData = (type: TMetaTableType | null) =>
  createSelector(
    [
      (state: RootState) => state.requestResponse.selectedTab,
      (state: RootState) => state.requestResponse.params,
      (state: RootState) => state.requestResponse.hiddenParams,
      (state: RootState) => state.requestResponse.headers,
      (state: RootState) => state.requestResponse.hiddenHeaders,
      (state: RootState) => state.requestResponse.formData,
      (state: RootState) => state.requestResponse.xWWWFormUrlencodedData,
    ],
    (
      selectedTab,
      params,
      hiddenParams,
      headers,
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
          return hiddenHeaders[selectedTab] ?? [];
        case "form-data":
          return formData[selectedTab] ?? [];
        case "x-www-form-urlencoded":
          return xWWWFormUrlencodedData[selectedTab] ?? [];
      }

      return [];
    }
  );
