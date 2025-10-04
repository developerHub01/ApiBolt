import { createSelector } from "@reduxjs/toolkit";
import type { RootState } from "@/context/redux/store";

export const selectSelectedCodeSnippit = createSelector(
  (state: RootState) =>
    state.requestResponse.selectedCodeSnippitType[
      state.requestResponse.selectedTab ?? ""
    ],
  (selectedCodeSnippitType) => selectedCodeSnippitType
);
