import { createSelector } from "@reduxjs/toolkit";
import type { RootState } from "@/context/redux/store";
import { formatCreatedAt } from "@/utils/history";

export const selectMetaListIsLoading = createSelector(
  [(state: RootState) => state.history.isMetaLoading],
  (isLoading) => isLoading
);

export const selectMetaList = createSelector(
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
