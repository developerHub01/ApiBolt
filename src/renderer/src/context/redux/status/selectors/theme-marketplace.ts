import { createSelector } from "@reduxjs/toolkit";
import type { RootState } from "@/context/redux/store";

export const selectThemesSearchResultLoading = createSelector(
  [(state: RootState) => state.status.isThemesSearchResultLoading],
  isLoading => isLoading,
);

export const selectThemeMarketplaceThemeDetailsLoading = createSelector(
  [(state: RootState) => state.status.isThemeMarketplaceThemeDetailsLoading],
  isLoading => isLoading,
);

export const selectThemeInstallationLoading = createSelector(
  [(state: RootState) => state.status.isThemeInstallationLoading],
  isLoading => isLoading,
);
