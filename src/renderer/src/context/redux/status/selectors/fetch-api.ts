import { createSelector } from "@reduxjs/toolkit";
import type { RootState } from "@/context/redux/store";

export const selectIsFetchApiLoading = createSelector(
  [
    (state: RootState) =>
      Boolean(
        state.status.isFetchApiLoading[state.requestResponse.selectedTab ?? ""],
      ),
  ],
  isLoading => isLoading,
);
