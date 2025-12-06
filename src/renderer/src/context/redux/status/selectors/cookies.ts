import { createSelector } from "@reduxjs/toolkit";
import type { RootState } from "@/context/redux/store";

export const selectCookiesIsLoading = createSelector(
  [(state: RootState) => state.status.isCookiesLoading],
  isLoading => isLoading,
);

export const selectCookiesError = createSelector(
  [(state: RootState) => state.status.isCookiesError],
  error => error,
);
