import { createSelector } from "@reduxjs/toolkit";
import type { RootState } from "@/context/redux/store";

export const selectKeyboardShortcutsIsLoading = createSelector(
  [(state: RootState) => state.status.isKeyboardShortcutLoading],
  isLoading => isLoading,
);

export const selectKeyboardShortcutsError = createSelector(
  [(state: RootState) => state.status.isKeyboardShortcutError],
  error => error,
);
