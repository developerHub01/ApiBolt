import { createSelector } from "@reduxjs/toolkit";
import type { RootState } from "@/context/redux/store";

export const selectIsLocalPasswordOpen = createSelector(
  [(state: RootState) => state.localPassword.isLocalPasswordOpen],
  isLocalPasswordOpen => isLocalPasswordOpen ?? false,
);

export const selectHaveLocalPassword = createSelector(
  [(state: RootState) => state.localPassword.haveLocalPassword],
  haveLocalPassword => haveLocalPassword ?? false,
);
