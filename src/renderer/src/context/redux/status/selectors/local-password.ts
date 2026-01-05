import { createSelector } from "@reduxjs/toolkit";
import type { RootState } from "@/context/redux/store";

export const selectLocalPasswordIsLoading = createSelector(
  [(state: RootState) => state.status.isLocalPasswordLoading],
  isLoading => isLoading,
);
