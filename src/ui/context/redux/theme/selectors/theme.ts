import { createSelector } from "@reduxjs/toolkit";
import type { RootState } from "@/context/redux/store";
import { isValidColor } from "@/utils/color.utils";

export const selectIsThemeListCollapsed = createSelector(
  [(state: RootState) => state.theme.isThemeListCollapsed],
  (isCollapsed) => isCollapsed
);

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

export const selectThemeHaveError = createSelector(
  [(state: RootState) => state.theme.palette],
  (palette) => Object.values(palette).some((item) => !isValidColor(item))
);
