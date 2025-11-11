import { createSelector } from "@reduxjs/toolkit";
import type { RootState } from "@/context/redux/store";

export const selectThemePalette = createSelector(
  [(state: RootState) => state.theme.palette],
  (palette) => palette
);
