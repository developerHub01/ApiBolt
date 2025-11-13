import { createSelector } from "@reduxjs/toolkit";
import type { RootState } from "@/context/redux/store";

export const selectThemePalette = createSelector(
  [(state: RootState) => state.theme.palette],
  (palette) => palette
);

export const selectThemeMetaLoaded = createSelector(
  [(state: RootState) => state.theme.themeMetaList.length],
  (haveLoaded) => Boolean(haveLoaded)
);

export const selectThemeMetaList = createSelector(
  [(state: RootState) => state.theme.themeMetaList],
  (list) => list
);

export const selectThemeActiveId = createSelector(
  [(state: RootState) => state.theme.activeThemeId],
  (ids) => ids
);
