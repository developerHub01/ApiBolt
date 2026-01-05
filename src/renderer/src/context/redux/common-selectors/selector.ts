import type { RootState } from "@/context/redux/store";
import { createSelector } from "@reduxjs/toolkit";

export const selectIsSettingButtonEnabled = createSelector(
  [
    (state: RootState) => state.localPassword.isLocalPasswordOpen,
    (state: RootState) => state.setting.isSettingOpen,
    (state: RootState) => state.cookies.isCookiesOpen,
    (state: RootState) => state.keyboardShortcuts.isKeyboardShortcutPanelOpen,
  ],
  (
    isLocalPasswordOpen,
    isSettingOpen,
    isCookiesOpen,
    isKeyboardShortcutPanelOpen,
  ) =>
    !(
      isLocalPasswordOpen ||
      isSettingOpen ||
      isCookiesOpen ||
      isKeyboardShortcutPanelOpen
    ),
);
