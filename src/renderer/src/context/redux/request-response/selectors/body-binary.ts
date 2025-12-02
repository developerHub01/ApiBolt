import { createSelector } from "@reduxjs/toolkit";
import type { RootState } from "@/context/redux/store";

export const selectBinaryData = createSelector(
  [
    (state: RootState) =>
      state.requestResponse.binaryData[state.requestResponse.selectedTab!],
  ],
  (binaryData) => binaryData
);
