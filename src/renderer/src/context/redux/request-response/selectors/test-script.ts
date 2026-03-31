import { createSelector } from "@reduxjs/toolkit";
import type { RootState } from "@/context/redux/store";

export const selectSelectedScript = createSelector(
  [
    (state: RootState) =>
      state.requestResponse.testScript[state.requestResponse.selectedTab ?? ""],
  ],
  script => script,
);

export const selectTestIsSuccess = createSelector(
  [
    (state: RootState) =>
      state.requestResponse.testIsSuccess[
        state.requestResponse.selectedTab ?? ""
      ],
  ],
  isSuccess => isSuccess,
);

export const selectTestResult = createSelector(
  [
    (state: RootState) =>
      state.requestResponse.testResult[state.requestResponse.selectedTab ?? ""],
  ],
  result => result ?? [],
);

export const selectTestError = createSelector(
  [
    (state: RootState) =>
      state.requestResponse.testError[state.requestResponse.selectedTab ?? ""],
  ],
  message => message,
);
