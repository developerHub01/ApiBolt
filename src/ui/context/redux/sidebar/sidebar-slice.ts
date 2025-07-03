import { createSlice, type PayloadAction } from "@reduxjs/toolkit";

export type TSidebarTab = "projects" | "collections" | "environments" | null;

interface SidebarState {
  activeTab: TSidebarTab;
  lastActiveTab: TSidebarTab;
}

// Define the initial state using that type
const initialState: SidebarState = {
  activeTab: "collections",
  lastActiveTab: "collections",
};

const localStorageSidebarActiveTabKey = "sidebar-active-tab";
const localStorageSidebarLastActiveTabKey = "sidebar-last-active-tab";

const handleLocalStorageOnSidebarToggle = (
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
      const id = action.payload;
      state.lastActiveTab = state.activeTab;

      let currentActiveTab = id;
      if (id === state.activeTab) currentActiveTab = null;
      state.activeTab = currentActiveTab;

      handleLocalStorageOnSidebarToggle(currentActiveTab, id);
    },
    handleToggleSidebar: (state) => {
      let currentActiveTab: TSidebarTab = null;

      if (!state.activeTab)
        currentActiveTab = state.lastActiveTab ?? "collections";

      state.lastActiveTab = state.activeTab;
      state.activeTab = currentActiveTab;

      handleLocalStorageOnSidebarToggle(currentActiveTab, state.activeTab);
    },
  },
});

export const {
  handleInitActiveTab,
  handleChangeActiveTab,
  handleToggleSidebar,
} = sidebarSlice.actions;

export default sidebarSlice.reducer;
