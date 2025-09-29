import { createSelector } from "@reduxjs/toolkit";
import type { RootState } from "@/context/redux/store";
import type { ResponseInterface } from "@/types/request-response.types";

/*
 * ===============================================
 * =========== RESPONSE SELECTORS START ==========
 * ===============================================
 */
export const selectIsResponseCollapsed = createSelector(
  [
    (state: RootState) =>
      state.requestResponse.isResponseCollapsed[
        state.requestResponse.selectedTab!
      ],
  ],
  (isResponseCollapsed): boolean => isResponseCollapsed
);

export const selectIsResponseLoading = createSelector(
  [
    (state: RootState) =>
      state.requestResponse.isLoading[state.requestResponse.selectedTab!],
  ],
  (isLoading): boolean => isLoading
);
export const selectResponse = createSelector(
  [
    (state: RootState) =>
      state.requestResponse.response[state.requestResponse.selectedTab!],
  ],
  (response): ResponseInterface | null => response
);
export const selectRequestSize = createSelector(
  [
    (state: RootState) =>
      state.requestResponse.response[state.requestResponse.selectedTab!]
        ?.requestSize,
  ],
  (requestSize) => requestSize
);
export const selectResponseSize = createSelector(
  [
    (state: RootState) =>
      state.requestResponse.response[state.requestResponse.selectedTab!]
        ?.responseSize,
  ],
  (responseSize) => responseSize
);
/*
 * ===============================================
 * =========== RESPONSE SELECTORS END ============
 * ===============================================
 */
