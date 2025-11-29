import { createSelector } from "@reduxjs/toolkit";
import type { RootState } from "@/context/redux/store";

export const selectMetaBodyIsLoading = createSelector(
  [(state: RootState) => state.status.isMetaBodyLoading],
  (isLoading) => isLoading
);
