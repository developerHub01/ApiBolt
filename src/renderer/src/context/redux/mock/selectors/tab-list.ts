import { createSelector } from "@reduxjs/toolkit";
import type { RootState } from "@/context/redux/store";

export const selectSelectedTab = createSelector(
  [(state: RootState) => state.mock.selectedTab],
  (selectedTab): string | null => selectedTab,
);

export const selectTabList = createSelector(
  [(state: RootState) => state.mock.tabList],
  (tabList): Array<string> => tabList,
);

export const selectIsTabListCollapsed = createSelector(
  [(state: RootState) => state.mock.isTabListCollapsed],
  (isCollapsed): boolean => isCollapsed,
);
