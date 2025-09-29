import { createSelector } from "@reduxjs/toolkit";
import type { RootState } from "@/context/redux/store";
import type {
  TContentType,
  TRequestBodyType,
} from "@/types/request-response.types";

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

export const selectRequestAllBodyType = createSelector(
  [(state: RootState) => state.requestResponse.requestBodyType],
  (requestBodyType) => {
    return requestBodyType;
  }
);

export const selectRequestBodyType = createSelector(
  [
    (state: RootState) => state.requestResponse.selectedTab!,
    (state: RootState) => state.requestResponse.requestBodyType,
  ],
  (selectedTab, requestBodyType): TRequestBodyType => {
    if (!selectedTab) return "none";

    return requestBodyType[selectedTab] ?? "none";
  }
);
