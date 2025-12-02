import { createSelector } from "@reduxjs/toolkit";
import type { RootState } from "@/context/redux/store";

export const selectSidebarActiveTabIsLoading = createSelector(
  [(state: RootState) => state.status.isSidebarActiiveTabLoading],
  (isLoading) => isLoading
);
