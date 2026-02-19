import { createSelector } from "@reduxjs/toolkit";
import type { RootState } from "@/context/redux/store";

export const selectPathParams = createSelector(
  [
    (state: RootState) => state.requestResponse.selectedTab!,
    (state: RootState) => state.requestResponse.pathParams,
  ],
  (selectedTab, pathParams) => {
    if (!selectedTab) return {};

    return pathParams[selectedTab] ?? {};
  },
);
