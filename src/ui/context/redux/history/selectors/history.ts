import { createSelector } from "@reduxjs/toolkit";
import type { RootState } from "@/context/redux/store";
import { formatCreatedAt } from "@/utils/history";

export const selectHistoryMetaListIsLoading = createSelector(
  [(state: RootState) => state.history.isMetaLoading],
  (isLoading) => isLoading
);

export const selectSelectedFilterMethod = createSelector(
  [
    (state: RootState) =>
      state.history.selectedFilterMethod[
        state.requestResponse.selectedTab ?? ""
      ],
  ],
  (method) => method ?? "all"
);

export const selectHistoryMetaList = createSelector(
  [
    (state: RootState) =>
      state.history.meta[state.requestResponse.selectedTab ?? ""],
  ],
  (metaList) =>
    (metaList ?? [])?.map((meta) => {
      const data = { ...meta };

      if (data.createdAt) data.createdAt = formatCreatedAt(data.createdAt);

      return data;
    })
);

export const selectHistoryMetaCount = createSelector(
  [
    (state: RootState) =>
      state.history.meta[state.requestResponse.selectedTab ?? ""]?.length,
  ],
  (count) => count ?? 0
);
