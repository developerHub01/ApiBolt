import { createSelector } from "@reduxjs/toolkit";
import type { RootState } from "@/context/redux/store";

export const selectAppInfoIsLoading = createSelector(
  [(state: RootState) => state.status.isAppInfoLoading],
  isLoading => isLoading,
);
