import { createSlice, type PayloadAction } from "@reduxjs/toolkit";
import { loadCookies } from "@/context/redux/cookies/thunks/cookies";
import {
  loadKeyboardShortcuts,
  resetKeyboardShortcuts,
  updateKeyboardShortcuts,
} from "@/context/redux/keyboard-shortcuts/thunks/keyboard-shortcuts";

interface StatusInterface {
  isCookiesLoading: boolean;
  isCookiesError: null | string;
  isKeyboardShortcutLoading: boolean;
  isKeyboardShortcutError: null | string;
}

// Define the initial state using that type
const initialState: StatusInterface = {
  isCookiesLoading: false,
  isCookiesError: null,
  isKeyboardShortcutLoading: false,
  isKeyboardShortcutError: null,
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
  },

  extraReducers: (builder) => {
    builder
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
      });
  },
});

export const { handleChangeIsCookiesError } = statusSlice.actions;

export default statusSlice.reducer;
