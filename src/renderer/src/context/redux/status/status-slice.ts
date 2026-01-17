import { createSlice, type PayloadAction } from "@reduxjs/toolkit";
import { loadCookies } from "@/context/redux/cookies/thunks/cookies";
import {
  loadKeyboardShortcuts,
  resetKeyboardShortcuts,
  updateKeyboardShortcuts,
} from "@/context/redux/keyboard-shortcuts/thunks/keyboard-shortcuts";
import { loadProjectList } from "@/context/redux/project/thunks/projects";
import { loadActiveTab } from "@/context/redux/sidebar/thunks/sidebar";
import {
  loadRequestHistory,
  loadRequestHistoryMeta,
  replaceCurrentByHistory,
} from "@/context/redux/history/thunks/history";
import { loadThemePalette } from "@/context/redux/theme/thunks/theme";
import { loadRequestList } from "@/context/redux/request-response/thunks/request-list";
import { loadFolder } from "@/context/redux/request-response/thunks/folder";
import { loadLocalPassword } from "@/context/redux/local-password/thunks/local-password";
import {
  installTheme,
  loadThemesDetails,
  loadThemesSearchResult,
  unInstallTheme,
} from "@/context/redux/theme-marketplace/thunks/theme-marketplace";

export interface StatusInterface {
  isLocalPasswordLoading: boolean;
  isProjectLoading: boolean;
  isRequestListLoading: boolean;
  isSidebarActiiveTabLoading: boolean;
  isCookiesLoading: boolean;
  isCookiesError: null | string;
  isKeyboardShortcutLoading: boolean;
  isKeyboardShortcutError: null | string;
  isFetchApiLoading: Record<string, boolean>;
  isHistoryMetaLoading: boolean;
  isHistoryDetailsLoading: boolean;
  isHistoryReplacingLoading: boolean;
  isThemeEditingPaletteLoading: boolean;
  isFolderLoading: boolean;

  isThemesSearchResultLoading: boolean;
  themesSearchResultError: string | null;

  isThemeMarketplaceThemeDetailsLoading: boolean;
  themeMarketplaceThemeDetailsError: string | null;

  isThemeInstallationLoading: boolean;
  isThemeUnInstallationLoading: boolean;
}

// Define the initial state using that type
const initialState: StatusInterface = {
  isLocalPasswordLoading: true,
  isProjectLoading: true,
  isRequestListLoading: true,
  isSidebarActiiveTabLoading: true,
  isCookiesLoading: false,
  isCookiesError: null,
  isKeyboardShortcutLoading: false,
  isKeyboardShortcutError: null,
  isFetchApiLoading: {},
  isHistoryMetaLoading: false,
  isHistoryDetailsLoading: false,
  isHistoryReplacingLoading: false,
  isThemeEditingPaletteLoading: false,
  isFolderLoading: true,

  isThemesSearchResultLoading: true,
  themesSearchResultError: null,

  isThemeMarketplaceThemeDetailsLoading: true,
  themeMarketplaceThemeDetailsError: null,

  isThemeInstallationLoading: false,
  isThemeUnInstallationLoading: false,
};

export const statusSlice = createSlice({
  name: "status",
  // `createSlice` will infer the state type from the `initialState` argument
  initialState,
  reducers: {
    handleChangeIsCookiesError: (
      state,
      action: PayloadAction<string | null | undefined>,
    ) => {
      state.isCookiesError = action.payload ?? null;
    },
    handleIsFetchApiLoading: (
      state,
      action: PayloadAction<{
        requestId: string;
        isLoading: boolean;
      }>,
    ) => {
      if (action.payload.isLoading)
        state.isFetchApiLoading[action.payload.requestId] = true;
      else delete state.isFetchApiLoading[action.payload.requestId];
    },
    handleChangeThemesSearchResultError: (
      state,
      action: PayloadAction<string | null | undefined>,
    ) => {
      state.themesSearchResultError = action.payload ?? null;
    },
  },

  extraReducers: builder => {
    builder
      /**
       * =======================
       * Local password
       * =======================
       */
      .addCase(loadLocalPassword.pending, state => {
        state.isLocalPasswordLoading = true;
      })
      .addCase(loadLocalPassword.fulfilled, state => {
        state.isLocalPasswordLoading = false;
      })
      .addCase(loadLocalPassword.rejected, state => {
        state.isLocalPasswordLoading = false;
      })

      /**
       * =======================
       * Projects
       * =======================
       */
      .addCase(loadProjectList.pending, state => {
        state.isProjectLoading = true;
      })
      .addCase(loadProjectList.fulfilled, state => {
        state.isProjectLoading = false;
      })
      .addCase(loadProjectList.rejected, state => {
        state.isProjectLoading = false;
      })

      /**
       * =======================
       * Request-list
       * =======================
       */
      .addCase(loadRequestList.pending, state => {
        state.isRequestListLoading = true;
      })
      .addCase(loadRequestList.fulfilled, state => {
        state.isRequestListLoading = false;
      })
      .addCase(loadRequestList.rejected, state => {
        state.isRequestListLoading = false;
      })

      /**
       * =======================
       * sidebar active tab
       * =======================
       */
      .addCase(loadActiveTab.pending, state => {
        state.isSidebarActiiveTabLoading = true;
      })
      .addCase(loadActiveTab.fulfilled, state => {
        state.isSidebarActiiveTabLoading = false;
      })
      .addCase(loadActiveTab.rejected, state => {
        state.isSidebarActiiveTabLoading = false;
      })

      /**
       * =======================
       * Cookies
       * =======================
       */
      .addCase(loadCookies.pending, state => {
        state.isCookiesLoading = true;
        state.isCookiesError = null;
      })
      .addCase(loadCookies.fulfilled, state => {
        state.isCookiesLoading = false;
        state.isCookiesError = null;
      })
      .addCase(loadCookies.rejected, (state, action) => {
        state.isCookiesLoading = false;
        state.isCookiesError = action.error?.message ?? null;
      })

      /**
       * =======================
       * keyboard shortcut
       * =======================
       */
      .addCase(loadKeyboardShortcuts.pending, state => {
        state.isKeyboardShortcutLoading = true;
        state.isKeyboardShortcutError = null;
      })
      .addCase(loadKeyboardShortcuts.fulfilled, state => {
        state.isKeyboardShortcutLoading = false;
        state.isKeyboardShortcutError = null;
      })
      .addCase(loadKeyboardShortcuts.rejected, (state, action) => {
        state.isKeyboardShortcutLoading = false;
        state.isKeyboardShortcutError = action.error?.message ?? null;
      })
      .addCase(updateKeyboardShortcuts.pending, state => {
        state.isKeyboardShortcutLoading = true;
        state.isKeyboardShortcutError = null;
      })
      .addCase(updateKeyboardShortcuts.fulfilled, state => {
        state.isKeyboardShortcutLoading = false;
        state.isKeyboardShortcutError = null;
      })
      .addCase(updateKeyboardShortcuts.rejected, (state, action) => {
        state.isKeyboardShortcutLoading = false;
        state.isKeyboardShortcutError = action.error?.message ?? null;
      })
      .addCase(resetKeyboardShortcuts.pending, state => {
        state.isKeyboardShortcutLoading = true;
        state.isKeyboardShortcutError = null;
      })
      .addCase(resetKeyboardShortcuts.fulfilled, state => {
        state.isKeyboardShortcutLoading = false;
        state.isKeyboardShortcutError = null;
      })
      .addCase(resetKeyboardShortcuts.rejected, (state, action) => {
        state.isKeyboardShortcutLoading = false;
        state.isKeyboardShortcutError = action.error?.message ?? null;
      })

      /**
       * =======================
       * load history meta
       * =======================
       */
      .addCase(loadRequestHistoryMeta.pending, state => {
        state.isHistoryMetaLoading = true;
      })
      .addCase(loadRequestHistoryMeta.fulfilled, state => {
        state.isHistoryMetaLoading = false;
      })
      .addCase(loadRequestHistoryMeta.rejected, state => {
        state.isHistoryMetaLoading = false;
      })

      /**
       * =======================
       * load history details
       * =======================
       */
      .addCase(loadRequestHistory.pending, state => {
        state.isHistoryDetailsLoading = true;
      })
      .addCase(loadRequestHistory.fulfilled, state => {
        state.isHistoryDetailsLoading = false;
      })
      .addCase(loadRequestHistory.rejected, state => {
        state.isHistoryDetailsLoading = false;
      })

      /**
       * =======================
       * replace request by history
       * =======================
       */
      .addCase(replaceCurrentByHistory.pending, state => {
        state.isHistoryReplacingLoading = true;
      })
      .addCase(replaceCurrentByHistory.fulfilled, state => {
        state.isHistoryReplacingLoading = false;
      })
      .addCase(replaceCurrentByHistory.rejected, state => {
        state.isHistoryReplacingLoading = false;
      })

      /**
       * =======================
       * theme marketplace
       * =======================
       */
      .addCase(loadThemesSearchResult.pending, state => {
        state.isThemesSearchResultLoading = true;
        state.themesSearchResultError = null;
      })
      .addCase(loadThemesSearchResult.fulfilled, state => {
        state.isThemesSearchResultLoading = false;
        state.themesSearchResultError = null;
      })
      .addCase(loadThemesSearchResult.rejected, (state, action) => {
        state.isThemesSearchResultLoading = false;
        state.themesSearchResultError = action.error?.message ?? null;
      })

      .addCase(loadThemesDetails.pending, state => {
        state.isThemeMarketplaceThemeDetailsLoading = true;
        state.themeMarketplaceThemeDetailsError = null;
      })
      .addCase(loadThemesDetails.fulfilled, state => {
        state.isThemeMarketplaceThemeDetailsLoading = false;
        state.themeMarketplaceThemeDetailsError = null;
      })
      .addCase(loadThemesDetails.rejected, (state, action) => {
        state.isThemeMarketplaceThemeDetailsLoading = false;
        state.themeMarketplaceThemeDetailsError = action.error?.message ?? null;
      })

      .addCase(installTheme.pending, state => {
        state.isThemeInstallationLoading = true;
      })
      .addCase(installTheme.fulfilled, state => {
        state.isThemeInstallationLoading = false;
      })
      .addCase(installTheme.rejected, state => {
        state.isThemeInstallationLoading = false;
      })

      .addCase(unInstallTheme.pending, state => {
        state.isThemeUnInstallationLoading = true;
      })
      .addCase(unInstallTheme.fulfilled, state => {
        state.isThemeUnInstallationLoading = false;
      })
      .addCase(unInstallTheme.rejected, state => {
        state.isThemeUnInstallationLoading = false;
      })

      /**
       * =======================
       * theme editing palette
       * =======================
       */
      .addCase(loadThemePalette.pending, state => {
        state.isThemeEditingPaletteLoading = true;
      })
      .addCase(loadThemePalette.fulfilled, state => {
        state.isThemeEditingPaletteLoading = false;
      })
      .addCase(loadThemePalette.rejected, state => {
        state.isThemeEditingPaletteLoading = false;
      });

    /**
     * =======================
     * load folder
     * =======================
     */
    builder.addCase(loadFolder.pending, state => {
      state.isFolderLoading = true;
    });
    builder.addCase(loadFolder.fulfilled, state => {
      state.isFolderLoading = false;
    });
    builder.addCase(loadFolder.rejected, state => {
      state.isFolderLoading = false;
    });
  },
});

export const {
  handleChangeIsCookiesError,
  handleIsFetchApiLoading,
  handleChangeThemesSearchResultError,
} = statusSlice.actions;

export default statusSlice.reducer;
