import { createSelector } from "@reduxjs/toolkit";
import type { RootState } from "@/context/redux/store";
import { codeSnippitTypes } from "@/constant/code-snippit.constant";

export const selectSelectedCodeSnippit = createSelector(
  (state: RootState) => state.requestResponse.codeSnippitType,
  codeSnippitType => codeSnippitType ?? codeSnippitTypes[0],
);
