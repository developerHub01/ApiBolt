import { createSelector } from "@reduxjs/toolkit";
import type { RootState } from "@/context/redux/store";

export const selectIsKeyboardShortcutPanelOpen = createSelector(
  [(state: RootState) => state.keyboardShortcuts.isKeyboardShortcutPanelOpen],
  (isOpen) => isOpen ?? {}
);

export const selectGlobalKeyboardShortcuts = createSelector(
  [(state: RootState) => state.keyboardShortcuts.globalShortcuts],
  (globalShortcuts) => globalShortcuts ?? {}
);

export const selectLocalKeyboardShortcuts = createSelector(
  [
    (state: RootState) => state.keyboardShortcuts.globalShortcuts,
    (state: RootState) => state.keyboardShortcuts.localShortcuts,
  ],
  (globalShortcuts, localShortcuts) => ({
    ...globalShortcuts,
    ...localShortcuts,
  })
);
