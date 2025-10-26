import { createAsyncThunk } from "@reduxjs/toolkit";
import type { AppDispatch, RootState } from "@/context/redux/store";
import {
  handleReplaceShortcuts,
  handleUpdateKeyboardShortcuts,
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
  async ({ type, key }, { dispatch, getState }) => {
    try {
      const state = getState() as RootState;
      const activeProjectId = state.project.activeProjectId;
      const editingKeyId = state.keyboardShortcuts.editingId;

      if (!editingKeyId) return;

      const payload = {
        id: editingKeyId,
        projectId:
          type === "project" && activeProjectId ? activeProjectId : null,
        key,
      };

      dispatch(
        handleUpdateKeyboardShortcuts({
          ...payload,
        })
      );

      const response =
        await window.electronAPIKeyboardShortcut.updateKeyboardShortcuts({
          ...payload,
        });

      if (response) return;

      /* if not successfull then rollback */
      const rollbackData =
        await window.electronAPIKeyboardShortcut.getKeyboardShortcutsById({
          id: editingKeyId,
          projectId: activeProjectId,
        });

      if (!rollbackData) return;

      dispatch(
        handleUpdateKeyboardShortcuts({
          ...rollbackData,
        })
      );
    } catch (error) {
      console.error(error);
    }
  }
);
/* ==============================
========== Keyboard Shortcuts end =========
================================= */
