import { createSelector } from "@reduxjs/toolkit";
import type { RootState } from "@/context/redux/store";

export const selectTestScriptIsLoading = createSelector(
  [(state: RootState) => state.status.isTestScriptLoading],
  isLoading => isLoading,
);

export const selectTestScriptIsRunning = createSelector(
  [(state: RootState) => state.status.isTestScriptRunning],
  isRunning => isRunning,
);

export const selectTestScriptError = createSelector(
  [(state: RootState) => state.status.testScriptError],
  message => message,
);
