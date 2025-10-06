import { createSelector } from "@reduxjs/toolkit";
import type { RootState } from "@/context/redux/store";
import { codeSnippitTypes } from "@/constant/request-code.constant";

export const selectSelectedCodeSnippit = createSelector(
  (state: RootState) =>
    state.requestResponse.selectedCodeSnippitType[
      state.requestResponse.selectedTab ?? ""
    ],
  (selectedCodeSnippitType) => selectedCodeSnippitType ?? codeSnippitTypes[0]
);
