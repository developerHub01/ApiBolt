import { createSelector } from "@reduxjs/toolkit";
import type { RootState } from "@/context/redux/store";
import type { TSidebarTab } from "@/types/sidebar.types";

export const selectSidebarActiveTab = createSelector(
  [(state: RootState) => state.sidebar.activeTab],
  (activeTab: TSidebarTab) => activeTab
);
