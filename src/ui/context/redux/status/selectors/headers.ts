import { createSelector } from "@reduxjs/toolkit";
import type { RootState } from "@/context/redux/store";

export const selectHeadersIsLoading = createSelector(
  [(state: RootState) => state.status.isHeadersLoading],
  (isLoading) => isLoading
);
