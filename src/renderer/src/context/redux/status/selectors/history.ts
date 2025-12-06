import { createSelector } from "@reduxjs/toolkit";
import type { RootState } from "@/context/redux/store";

export const selectHistoryMetaListIsLoading = createSelector(
  [(state: RootState) => state.status.isHistoryMetaLoading],
  isLoading => isLoading,
);

export const selectHistoryDetailsLoading = createSelector(
  [(state: RootState) => state.status.isHistoryDetailsLoading],
  isLoading => isLoading,
);

export const selectHistoryReplacingIsLoading = createSelector(
  [(state: RootState) => state.status.isHistoryReplacingLoading],
  isLoading => isLoading,
);
