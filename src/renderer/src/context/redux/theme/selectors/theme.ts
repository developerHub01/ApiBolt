import { createSelector } from "@reduxjs/toolkit";
import type { RootState } from "@/context/redux/store";
import { isValidColor } from "@/utils/color.utils";
import { DEFAULT_THEME_PALETTE } from "@/constant/theme.constant";

export const selectIsThemeListCollapsed = createSelector(
  [(state: RootState) => state.theme.isThemeListCollapsed],
  isCollapsed => isCollapsed,
);

export const selectThemePalette = createSelector(
  [(state: RootState) => state.theme.palette],
  palette => palette ?? DEFAULT_THEME_PALETTE,
);

export const selectThemeMetaLoaded = createSelector(
  [(state: RootState) => state.theme.themeMetaList.length],
  haveLoaded => Boolean(haveLoaded),
);

export const selectThemeMetaList = createSelector(
  [(state: RootState) => state.theme.themeMetaList],
  list => list,
);

export const selectThemeActiveId = createSelector(
  [(state: RootState) => state.theme.activeThemeId],
  ids => ids,
);

export const selectThemeHaveError = createSelector(
  [(state: RootState) => state.theme.palette],
  palette =>
    Object.values(palette ?? DEFAULT_THEME_PALETTE).some(
      item => !isValidColor(item),
    ),
);

export const selectActiveThemeType = createSelector(
  [
    (state: RootState) => state.theme.themeMetaList,
    (state: RootState) => state.theme.activeThemeId,
    (state: RootState) => state.project.activeProjectId,
  ],
  (metaList, activeId, activeProjectId) => {
    const themeId = activeProjectId
      ? (activeId.local ?? activeId.global)
      : activeId.global;
    return metaList.find(item => item.id === themeId)?.type;
  },
);
