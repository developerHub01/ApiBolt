import type { RootState } from "@/context/redux/store";
import { createSelector } from "@reduxjs/toolkit";

export const selectIsSettingButtonEnabled = createSelector(
  [
    (state: RootState) => state.setting.isSettingOpen,
    (state: RootState) => state.cookies.isCookiesOpen,
  ],
  (isSettingOpen, isCookiesOpen) => !(isSettingOpen || isCookiesOpen)
);
