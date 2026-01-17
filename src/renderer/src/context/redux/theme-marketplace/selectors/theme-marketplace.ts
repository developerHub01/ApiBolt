import { createSelector } from "@reduxjs/toolkit";
import type { RootState } from "@/context/redux/store";
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

export const selectThemeMarketplaceSearchTotalPages = createSelector(
  [(state: RootState) => state.themeMarketplace.totalPages],
  totalPages => totalPages,
);

export const selectThemeMarketplaceSearchTotalThemes = createSelector(
  [(state: RootState) => state.themeMarketplace.totalThemes],
  totalThemes => totalThemes,
);

export const selectThemeMarketplaceSelectedThemeId = createSelector(
  [(state: RootState) => state.themeMarketplace.selectedThemeId],
  selectedThemeId => selectedThemeId,
);

export const selectThemeMarketplaceDetailsOpen = createSelector(
  [(state: RootState) => state.themeMarketplace.selectedThemeId],
  selectedThemeId => Boolean(selectedThemeId),
);

export const selectThemeMarketplaceThemesListCount = createSelector(
  [(state: RootState) => state.themeMarketplace.themesList],
  themesList => themesList.length ?? 0,
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

export const selectIsInstallMaxCountAlertOpen = createSelector(
  [(state: RootState) => state.themeMarketplace.isInstallMaxCountAlertOpen],
  isOpen => isOpen,
);

/**
 * Checking the selected theme details with installed themes
 * is the selected theme installed or not
 * if installed do need update or not
 * so that we can show CTAs perfectly
 */
export const selectSelectedThemeInstallationOrUpdationMeta = createSelector(
  [
    (state: RootState) => state.project.activeProjectId,
    (state: RootState) => state.themeMarketplace.selectedThemeId,
    (state: RootState) => state.themeMarketplace.selectedThemeDetails,
    (state: RootState) => state.theme.themeMetaList,
    (state: RootState) => state.theme.activeThemeId,
  ],
  (
    activeProjectId,
    selectedThemeId,
    selectedThemeDetails,
    installedThemes,
    activeThemeId,
  ): {
    isInstalled: boolean;
    needUpdate: boolean;
    oldVersion?: number;
    isActivable?: boolean;
    isPreviewable?: boolean;
  } => {
    const { global: globalActiveThemeId, local: localActiveThemeId } =
      activeThemeId;

    const meta = {
      isInstalled: false,
      needUpdate: false,
      isActivable: false,
      isInActivable: false,
      isPreviewable: false,
    };

    if (!selectedThemeId) return meta;
    const installedTheme = installedThemes.find(
      theme => theme.id === selectedThemeId,
    );
    if (!installedTheme)
      return {
        ...meta,
        isPreviewable: true,
      };

    const installedMeta = {
      ...meta,
      isInstalled: true,
      oldVersion: installedTheme.version ?? 1,
    };

    /* checking version */
    if ((installedTheme.version ?? 1) < (selectedThemeDetails!.version ?? 1))
      installedMeta.needUpdate = true;

    /**
     * checking activable
     * if have projectId then check local theme else check global theme
     */
    if (
      (activeProjectId && installedTheme.id !== localActiveThemeId) ||
      (!activeProjectId && installedTheme.id !== globalActiveThemeId)
    )
      installedMeta.isActivable = true;

    /* check if the theme is enabled then no need to show the preview mode */
    if (
      (activeProjectId && installedTheme.id !== localActiveThemeId) ||
      (!activeProjectId && installedTheme.id !== globalActiveThemeId)
    )
      installedMeta.isPreviewable = true;

    return installedMeta;
  },
);
