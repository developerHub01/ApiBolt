import { createAsyncThunk } from "@reduxjs/toolkit";
import type { AppDispatch, RootState } from "@/context/redux/store";
import { handleReplaceShortcuts } from "@/context/redux/keyboard-shortcuts/keyboard-shortcuts-slice";

/* ==============================
========== Keyboard Shortcuts start =========
================================= */
export const loadKeyboardShortcuts = createAsyncThunk<
  void,
  void,
  {
    dispatch: AppDispatch;
    state: RootState;
  }
>("keyboard-shortcuts/loadKeyboardShortcuts", async (_, { dispatch }) => {
  try {
    const list =
      await window.electronAPIKeyboardShortcut.getKeyboardShortcuts();
    dispatch(handleReplaceShortcuts(list));
  } catch (error) {
    console.error(error);
  }
});
/* ==============================
========== Keyboard Shortcuts end =========
================================= */
