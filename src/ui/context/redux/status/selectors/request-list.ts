import { createSelector } from "@reduxjs/toolkit";
import type { RootState } from "@/context/redux/store";

export const selectRequestListIsLoading = createSelector(
  [(state: RootState) => state.status.isRequestListLoading],
  (isLoading) => isLoading
);
