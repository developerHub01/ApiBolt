import {
  localStorageSidebarActiveTabKey,
  localStorageSidebarLastActiveTabKey,
} from "@/constant/sidebar.constant";
import type { SidebarState, TSidebarTab } from "@/types/sidebar.types";
import { createSlice, type PayloadAction } from "@reduxjs/toolkit";

// Define the initial state using that type
const initialState: SidebarState = {
  activeTab: "collections",
  lastActiveTab: "collections",
};

export const handleLocalStorageOnSidebarToggle = (
  currentActiveTab: string | null,
  lastActiveTab: string | null
) => {
  if (currentActiveTab)
    localStorage.setItem(localStorageSidebarActiveTabKey, currentActiveTab);
  else localStorage.removeItem(localStorageSidebarActiveTabKey);
  if (lastActiveTab)
    localStorage.setItem(localStorageSidebarLastActiveTabKey, lastActiveTab);
  else localStorage.removeItem(localStorageSidebarLastActiveTabKey);
};

export const sidebarSlice = createSlice({
  name: "sidebar",
  // `createSlice` will infer the state type from the `initialState` argument
  initialState,
  reducers: {
    handleInitActiveTab: (state) => {
      state.activeTab = localStorage.getItem(
        localStorageSidebarActiveTabKey
      ) as TSidebarTab;
      state.lastActiveTab = localStorage.getItem(
        localStorageSidebarLastActiveTabKey
      ) as TSidebarTab;
    },
    handleChangeActiveTab: (
      state,
      action: PayloadAction<TSidebarTab | null>
    ) => {
      const id = action.payload ?? "projects";
      state.lastActiveTab = state.activeTab ?? "projects";

      if (id === state.activeTab) return;
      state.activeTab = id;
    },
  },
});

export const { handleInitActiveTab, handleChangeActiveTab } =
  sidebarSlice.actions;

export default sidebarSlice.reducer;
