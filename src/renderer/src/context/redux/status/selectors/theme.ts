import { createSelector } from "@reduxjs/toolkit";
import type { RootState } from "@/context/redux/store";

export const selectThemeEditingPaletteLoading = createSelector(
  [(state: RootState) => state.status.isThemeEditingPaletteLoading],
  (isLoading) => isLoading
);
