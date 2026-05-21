import { createSelector } from "@reduxjs/toolkit";
import type { RootState } from "@/context/redux/store";

export const selectIsAppInfoOpen = createSelector(
  [(state: RootState) => state.appInfo.isOpen],
  isOpen => isOpen,
);

export const selectAppInfo = createSelector(
  [(state: RootState) => state.appInfo.info],
  info => info,
);

export const selectAppVersion = createSelector(
  [(state: RootState) => state.appInfo.info],
  info => info.version,
);
