import { createSelector } from "@reduxjs/toolkit";
import type { RootState } from "@/context/redux/store";

export const selectThemesSearchResultLoading = createSelector(
  [(state: RootState) => state.status.isThemesSearchResultLoading],
  isLoading => isLoading,
);

export const selectThemesSearchResultError = createSelector(
  [(state: RootState) => state.status.themesSearchResultError],
  error => error,
);

export const selectThemeMarketplaceThemeDetailsLoading = createSelector(
  [(state: RootState) => state.status.isThemeMarketplaceThemeDetailsLoading],
  isLoading => isLoading,
);

export const selectThemeMarketplaceThemeDetailsError = createSelector(
  [(state: RootState) => state.status.themeMarketplaceThemeDetailsError],
  error => error,
);
export const selectThemeInstallationLoading = createSelector(
  [(state: RootState) => state.status.isThemeInstallationLoading],
  isLoading => isLoading,
);

export const selectThemeUnInstallationLoading = createSelector(
  [(state: RootState) => state.status.isThemeUnInstallationLoading],
  isLoading => isLoading,
);
