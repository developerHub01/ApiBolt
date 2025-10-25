import { createSelector } from "@reduxjs/toolkit";
import type { RootState } from "@/context/redux/store";

export const selectKeyboardShortcutEditingId = createSelector(
  [(state: RootState) => state.keyboardShortcuts.editingId],
  (editingId) => editingId ?? null
);
