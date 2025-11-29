import { createSelector } from "@reduxjs/toolkit";
import type { RootState } from "@/context/redux/store";

export const selectParamsIsLoading = createSelector(
  [(state: RootState) => state.status.isParamsLoading],
  (isLoading) => isLoading
);
