import { createSelector } from "@reduxjs/toolkit";
import type { RootState } from "@/context/redux/store";
import type { ParamInterface } from "@shared/types/request-response.types";

export const selectHiddenHeaders = createSelector(
  [
    (state: RootState) => state.requestResponse.selectedTab!,
    (state: RootState) => state.requestResponse.hiddenCookie,
    (state: RootState) => state.requestResponse.hiddenHeaders,
  ],
  (selectedTab, hiddenCookie, hiddenHeaders): Array<ParamInterface> => {
    if (!selectedTab) return [];

    return [hiddenCookie, ...(hiddenHeaders[selectedTab] ?? [])];
  },
);

export const selectShowHiddenHeader = createSelector(
  [
    (state: RootState) => state.requestResponse.selectedTab!,
    (state: RootState) => state.requestResponse.showHiddenHeaders,
  ],
  (selectedTab, showHiddenHeader): boolean => {
    if (!selectedTab) return false;

    return showHiddenHeader[selectedTab] ?? false;
  },
);

export const selectHeaders = createSelector(
  [
    (state: RootState) => state.requestResponse.selectedTab!,
    (state: RootState) => state.requestResponse.headers,
  ],
  (selectedTab, headers): Array<ParamInterface> => {
    if (!selectedTab) return [];

    return headers[selectedTab];
  },
);
