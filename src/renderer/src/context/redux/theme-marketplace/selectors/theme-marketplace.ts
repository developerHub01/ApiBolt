import { createSelector } from "@reduxjs/toolkit";
import type { RootState } from "@/context/redux/store";
import { THEME_MARKETPLACE_FILTER_LOCAL } from "@renderer/constant/theme.constant";
import ThemeList from "@renderer/components/app/themes/marketplace/[id]/theme-list/ThemeList";
import { ThemeMetaInterface } from "@shared/types/theme.types";

export const selectThemeMarketplaceSearchTerm = createSelector(
  [(state: RootState) => state.themeMarketplace.searchTerm],
  searchTerm => searchTerm,
);

export const selectThemeMarketplaceSearchFilter = createSelector(
  [(state: RootState) => state.themeMarketplace.searchFilter],
  searchFilter => searchFilter,
);

export const selectThemeMarketplaceSearchPage = createSelector(
  [(state: RootState) => state.themeMarketplace.page],
  page => page,
);

export const selectThemeMarketplaceSelectedThemeId = createSelector(
  [(state: RootState) => state.themeMarketplace.selectedThemeId],
  selectedThemeId => selectedThemeId,
);

export const selectThemeMarketplaceDetailsOpen = createSelector(
  [(state: RootState) => state.themeMarketplace.selectedThemeId],
  selectedThemeId => Boolean(selectedThemeId),
);

export const selectThemeMarketplaceThemesList = createSelector(
  [
    (state: RootState) => state.themeMarketplace.searchFilter,
    (state: RootState) => state.themeMarketplace.themesList,
    (state: RootState) => state.theme.themeMetaList,
    (state: RootState) => state.theme.activeThemeId,
  ],
  (searchFilter, themesList, installedThemesList, activeThemeId) => {
    if (searchFilter === "installed") return installedThemesList;
    else if (searchFilter === "active") {
      const themes: Array<ThemeMetaInterface> = [];
      const { global, local } = activeThemeId;
      /* global============ */
      const globalTheme = installedThemesList.find(
        theme => theme.id === global,
      );
      if (globalTheme) themes.push(globalTheme);

      /* local============ */
      const localTheme = installedThemesList.find(theme => theme.id === local);
      if (localTheme) themes.push(localTheme);

      return themes;
    } else return themesList;
  },
);

export const selectSelectedThemeDetails = createSelector(
  [(state: RootState) => state.themeMarketplace.selectedThemeDetails],
  details => details,
);
