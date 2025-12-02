import { createSelector } from "@reduxjs/toolkit";
import type { RootState } from "@/context/redux/store";

export const selectFolderIsLoading = createSelector(
  [(state: RootState) => state.status.isFolderLoading],
  (isLoading) => isLoading
);
