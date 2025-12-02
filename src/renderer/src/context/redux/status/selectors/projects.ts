import { createSelector } from "@reduxjs/toolkit";
import type { RootState } from "@/context/redux/store";

export const selectIsPorjectLoading = createSelector(
  [(state: RootState) => state.status.isProjectLoading],
  (isLoading) => isLoading
);
