import { createAsyncThunk } from "@reduxjs/toolkit";
import type { AppDispatch, RootState } from "@/context/redux/store";
import {
  handleReplaceShortcuts,
  handleUpdateKeyboardShortcuts,
} from "@/context/redux/keyboard-shortcuts/keyboard-shortcuts-slice";
import type { TKeyboardShortcutsTab } from "@/context/keyboard-shortcuts/KeyboardShortcutsProvider";
import type { TShortcutKey } from "@shared/types/keyboard-shortcut.types";

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
    if (!list) throw new Error();
    dispatch(handleReplaceShortcuts(list));
  } catch (error) {
    console.error(error);
  }
});

export const updateKeyboardShortcuts = createAsyncThunk<
  boolean,
  {
    type: TKeyboardShortcutsTab;
    key: TShortcutKey;
  },
  {
    dispatch: AppDispatch;
    state: RootState;
  }
>(
  "keyboard-shortcuts/updateKeyboardShortcuts",
  async ({ type, key }, { dispatch, getState }) => {
    try {
      const state = getState() as RootState;
      const activeProjectId = state.project.activeProjectId;
      const editingKeyId = state.keyboardShortcuts.editingId;

      if (!editingKeyId) return false;

      const payload = {
        id: editingKeyId,
        projectId: type === "local" && activeProjectId ? activeProjectId : null,
        key,
      };

      dispatch(
        handleUpdateKeyboardShortcuts({
          ...payload,
        }),
      );

      const response =
        await window.electronAPIKeyboardShortcut.updateKeyboardShortcuts({
          ...payload,
        });

      if (response) return true;

      /* if not successfull then rollback */
      const rollbackData =
        await window.electronAPIKeyboardShortcut.getKeyboardShortcutsById({
          id: editingKeyId,
          projectId: activeProjectId,
        });

      if (!rollbackData) return false;

      dispatch(
        handleUpdateKeyboardShortcuts({
          ...rollbackData,
        }),
      );
      return false;
    } catch (error) {
      console.error(error);
      return false;
    }
  },
);

export const resetKeyboardShortcuts = createAsyncThunk<
  boolean,
  {
    id: string;
    type: TKeyboardShortcutsTab;
  },
  {
    dispatch: AppDispatch;
    state: RootState;
  }
>(
  "keyboard-shortcuts/resetKeyboardShortcuts",
  async ({ id, type }, { dispatch, getState }) => {
    try {
      const state = getState() as RootState;
      const activeProjectId = state.project.activeProjectId;

      const payload = {
        id,
        projectId: type === "local" && activeProjectId ? activeProjectId : null,
      };

      const response =
        await window.electronAPIKeyboardShortcut.resetKeyboardShortcuts({
          ...payload,
        });
      if (!response) return false;

      dispatch(
        handleUpdateKeyboardShortcuts({
          ...response,
        }),
      );

      return true;
    } catch (error) {
      console.error(error);
      return false;
    }
  },
);
/* ==============================
========== Keyboard Shortcuts end =========
================================= */
