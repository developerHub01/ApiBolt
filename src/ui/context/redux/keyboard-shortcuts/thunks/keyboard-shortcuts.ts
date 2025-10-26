import { createAsyncThunk } from "@reduxjs/toolkit";
import type { AppDispatch, RootState } from "@/context/redux/store";
import {
  handleChangeEditingId,
  handleReplaceShortcuts,
} from "@/context/redux/keyboard-shortcuts/keyboard-shortcuts-slice";
import type { TKeyboardShortcutsTab } from "@/context/keyboard-shortcuts/KeyboardShortcutsProvider";

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

export const updateKeyboardShortcuts = createAsyncThunk<
  void,
  {
    type: TKeyboardShortcutsTab;
    key: Array<string> | null;
  },
  {
    dispatch: AppDispatch;
    state: RootState;
  }
>(
  "keyboard-shortcuts/updateKeyboardShortcuts",
  async ({ type, key }, { dispatch }) => {
    try {
      console.log({ type, key });
      dispatch(handleChangeEditingId());
    } catch (error) {
      console.error(error);
    }
  }
);
/* ==============================
========== Keyboard Shortcuts end =========
================================= */
