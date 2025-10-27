import { createSelector } from "@reduxjs/toolkit";
import type { RootState } from "@/context/redux/store";
import type { TShortcutKey } from "@/types/keyboard-shortcut.types";

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

export const selectApplyingKeyboardShortcuts = createSelector(
  [
    (state: RootState) => state.project.activeProjectId,
    (state: RootState) => state.keyboardShortcuts.globalShortcuts,
    (state: RootState) => state.keyboardShortcuts.localShortcuts,
  ],
  (activeProjectId, globalShortcuts, localShortcuts) => {
    const global = Object.entries(globalShortcuts).reduce(
      (acc, [id, details]) => {
        acc[id] = details?.key ?? null;
        return acc;
      },
      {} as Record<string, TShortcutKey>
    );
    const local = Object.entries(localShortcuts).reduce(
      (acc, [id, details]) => {
        acc[id] = details?.key ?? null;
        return acc;
      },
      {} as Record<string, TShortcutKey>
    );

    return activeProjectId
      ? {
          ...global,
          ...local,
        }
      : global;
  }
);

export const selectApplyingKeyboardShortcutsById = createSelector(
  [
    (state: RootState) => state.project.activeProjectId,
    (state: RootState) => state.keyboardShortcuts.globalShortcuts,
    (state: RootState) => state.keyboardShortcuts.localShortcuts,
    (_, id) => id,
  ],
  (activeProjectId, globalShortcuts, localShortcuts, id) => {
    return (
      (activeProjectId
        ? (localShortcuts[id] ?? globalShortcuts[id])?.key
        : globalShortcuts[id]?.key) ?? null
    );
  }
);
