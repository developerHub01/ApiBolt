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
import { loadCurrentTheme } from "@/context/redux/theme/thunks/theme";

interface StatusInterface {
  isProjectLoading: boolean;
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
}

// Define the initial state using that type
const initialState: StatusInterface = {
  isProjectLoading: true,
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
};

export const statusSlice = createSlice({
  name: "status",
  // `createSlice` will infer the state type from the `initialState` argument
  initialState,
  reducers: {
    handleChangeIsCookiesError: (
      state,
      action: PayloadAction<string | null | undefined>
    ) => {
      state.isCookiesError = action.payload ?? null;
    },
    handleIsFetchApiLoading: (
      state,
      action: PayloadAction<{
        requestId: string;
        isLoading: boolean;
      }>
    ) => {
      if (action.payload.isLoading)
        state.isFetchApiLoading[action.payload.requestId] = true;
      else delete state.isFetchApiLoading[action.payload.requestId];
    },
  },

  extraReducers: (builder) => {
    builder
      /**
       * =======================
       * Projects
       * =======================
       */
      .addCase(loadProjectList.pending, (state) => {
        state.isProjectLoading = true;
      })
      .addCase(loadProjectList.fulfilled, (state) => {
        state.isProjectLoading = false;
      })
      .addCase(loadProjectList.rejected, (state) => {
        state.isProjectLoading = false;
      })

      /**
       * =======================
       * sidebar active tab
       * =======================
       */
      .addCase(loadActiveTab.pending, (state) => {
        state.isSidebarActiiveTabLoading = true;
      })
      .addCase(loadActiveTab.fulfilled, (state) => {
        state.isSidebarActiiveTabLoading = false;
      })
      .addCase(loadActiveTab.rejected, (state) => {
        state.isSidebarActiiveTabLoading = false;
      })

      /**
       * =======================
       * Cookies
       * =======================
       */
      .addCase(loadCookies.pending, (state) => {
        state.isCookiesLoading = true;
        state.isCookiesError = null;
      })
      .addCase(loadCookies.fulfilled, (state) => {
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
      .addCase(loadKeyboardShortcuts.pending, (state) => {
        state.isKeyboardShortcutLoading = true;
        state.isKeyboardShortcutError = null;
      })
      .addCase(loadKeyboardShortcuts.fulfilled, (state) => {
        state.isKeyboardShortcutLoading = false;
        state.isKeyboardShortcutError = null;
      })
      .addCase(loadKeyboardShortcuts.rejected, (state, action) => {
        state.isKeyboardShortcutLoading = false;
        state.isKeyboardShortcutError = action.error?.message ?? null;
      })
      .addCase(updateKeyboardShortcuts.pending, (state) => {
        state.isKeyboardShortcutLoading = true;
        state.isKeyboardShortcutError = null;
      })
      .addCase(updateKeyboardShortcuts.fulfilled, (state) => {
        state.isKeyboardShortcutLoading = false;
        state.isKeyboardShortcutError = null;
      })
      .addCase(updateKeyboardShortcuts.rejected, (state, action) => {
        state.isKeyboardShortcutLoading = false;
        state.isKeyboardShortcutError = action.error?.message ?? null;
      })
      .addCase(resetKeyboardShortcuts.pending, (state) => {
        state.isKeyboardShortcutLoading = true;
        state.isKeyboardShortcutError = null;
      })
      .addCase(resetKeyboardShortcuts.fulfilled, (state) => {
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
      .addCase(loadRequestHistoryMeta.pending, (state) => {
        state.isHistoryMetaLoading = true;
      })
      .addCase(loadRequestHistoryMeta.fulfilled, (state) => {
        state.isHistoryMetaLoading = false;
      })
      .addCase(loadRequestHistoryMeta.rejected, (state) => {
        state.isHistoryMetaLoading = false;
      })

      /**
       * =======================
       * load history details
       * =======================
       */
      .addCase(loadRequestHistory.pending, (state) => {
        state.isHistoryDetailsLoading = true;
      })
      .addCase(loadRequestHistory.fulfilled, (state) => {
        state.isHistoryDetailsLoading = false;
      })
      .addCase(loadRequestHistory.rejected, (state) => {
        state.isHistoryDetailsLoading = false;
      })

      /**
       * =======================
       * replace request by history
       * =======================
       */
      .addCase(replaceCurrentByHistory.pending, (state) => {
        state.isHistoryReplacingLoading = true;
      })
      .addCase(replaceCurrentByHistory.fulfilled, (state) => {
        state.isHistoryReplacingLoading = false;
      })
      .addCase(replaceCurrentByHistory.rejected, (state) => {
        state.isHistoryReplacingLoading = false;
      })

      /**
       * =======================
       * theme editing palette
       * =======================
       */
      .addCase(loadCurrentTheme.pending, (state) => {
        state.isThemeEditingPaletteLoading = true;
      })
      .addCase(loadCurrentTheme.fulfilled, (state) => {
        state.isThemeEditingPaletteLoading = false;
      })
      .addCase(loadCurrentTheme.rejected, (state) => {
        state.isThemeEditingPaletteLoading = false;
      });
  },
});

export const { handleChangeIsCookiesError, handleIsFetchApiLoading } =
  statusSlice.actions;

export default statusSlice.reducer;
