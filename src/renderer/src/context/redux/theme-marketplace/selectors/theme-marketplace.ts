import { createSelector } from "@reduxjs/toolkit";
import type { RootState } from "@/context/redux/store";

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
  [(state: RootState) => state.themeMarketplace.themesList],
  themesList => themesList,
);

export const selectSelectedThemeDetails = createSelector(
  [(state: RootState) => state.themeMarketplace.selectedThemeDetails],
  details => details,
);
