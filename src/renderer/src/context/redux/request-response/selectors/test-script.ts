import { createSelector } from "@reduxjs/toolkit";
import type { RootState } from "@/context/redux/store";

export const selectSelectedScript = createSelector(
  [
    (state: RootState) =>
      state.requestResponse.testScript[state.requestResponse.selectedTab ?? ""],
  ],
  script => script,
);
