import { createSelector } from "@reduxjs/toolkit";
import type { RootState } from "@/context/redux/store";

export const selectIsThemeMarketplaceSearchTerm = createSelector(
  [(state: RootState) => state.themeMarketplace.searchTerm],
  searchTerm => searchTerm,
);

export const selectIsThemeMarketplaceSearchFilter = createSelector(
  [(state: RootState) => state.themeMarketplace.searchFilter],
  searchFilter => searchFilter,
);

export const selectIsThemeMarketplaceSelectedThemeId = createSelector(
  [(state: RootState) => state.themeMarketplace.selectedThemeId],
  selectedThemeId => selectedThemeId,
);
