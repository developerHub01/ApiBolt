import type { SidebarState, TSidebarTab } from "@shared/types/sidebar.types";
import { createSlice, type PayloadAction } from "@reduxjs/toolkit";

// Define the initial state using that type
const initialState: SidebarState = {
  activeTab: "navigate_collections"
};

export const sidebarSlice = createSlice({
  name: "sidebar",
  // `createSlice` will infer the state type from the `initialState` argument
  initialState,
  reducers: {
    handleChangeActiveTab: (
      state,
      action: PayloadAction<TSidebarTab | null>
    ) => {
      const id = action.payload ?? "navigate_projects";
      if (id === state.activeTab) return;
      state.activeTab = id;
    }
  }
});

export const { handleChangeActiveTab } = sidebarSlice.actions;

export default sidebarSlice.reducer;
