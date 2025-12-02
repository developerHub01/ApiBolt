import { createSelector } from "@reduxjs/toolkit";
import type { RootState } from "@/context/redux/store";
import type { ResponseInterface } from "@shared/types/request-response.types";

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
      ]
  ],
  (isResponseCollapsed): boolean => isResponseCollapsed
);

export const selectResponse = createSelector(
  [
    (state: RootState) =>
      state.requestResponse.response[state.requestResponse.selectedTab!]
  ],
  (response): ResponseInterface | null => response
);

export const selectRequestSize = createSelector(
  [
    (state: RootState) =>
      state.requestResponse.response[state.requestResponse.selectedTab!]
        ?.requestSize
  ],
  requestSize => requestSize
);

export const selectResponseSize = createSelector(
  [
    (state: RootState) =>
      state.requestResponse.response[state.requestResponse.selectedTab!]
        ?.responseSize
  ],
  responseSize => responseSize
);

export const selectActiveResponseMetaTab = createSelector(
  [
    (state: RootState) =>
      state.requestResponse.activeResponseMetaTab[
        state.requestResponse.selectedTab ?? ""
      ]
  ],
  activeResponseMetaTab => activeResponseMetaTab
);

export const selectActiveResponseDataTab = createSelector(
  [
    (state: RootState) =>
      state.requestResponse.activeResponseDataTab[
        state.requestResponse.selectedTab ?? ""
      ]
  ],
  activeResponseDataTab => activeResponseDataTab ?? "raw"
);

export const selectResponseCodeWrap = createSelector(
  [
    (state: RootState) =>
      state.requestResponse.responseCodeWrap[
        state.requestResponse.selectedTab ?? ""
      ]
  ],
  codeWrap => codeWrap
);
/*
 * ===============================================
 * =========== RESPONSE SELECTORS END ============
 * ===============================================
 */
