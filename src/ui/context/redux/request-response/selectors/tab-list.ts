import { createSelector } from "@reduxjs/toolkit";
import type { RootState } from "@/context/redux/store";

export const selectSelectedTab = createSelector(
  [(state: RootState) => state.requestResponse.selectedTab],
  (selectedTab): string | null => selectedTab
);

export const selectIsTabListHovering = createSelector(
  [(state: RootState) => state.requestResponse.isTabListHovering],
  (isTabListHovering): boolean => isTabListHovering ?? false
);

export const selectTabList = createSelector(
  [(state: RootState) => state.requestResponse.tabList],
  (tabList): Array<string> => tabList
);
