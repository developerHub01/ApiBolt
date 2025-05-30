import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";

// Define a type for the slice state
interface RequestListState {
  tabList: Array<string>;
  selectedTab: string | null;
  isTabListHovering: boolean;
}

// Define the initial state using that type
const initialState: RequestListState = {
  tabList: [],
  selectedTab: null,
  isTabListHovering: false,
};

export const tabSidebarSlice = createSlice({
  name: "tab-sidebar",
  // `createSlice` will infer the state type from the `initialState` argument
  initialState,
  reducers: {
    handleChangeIsTabListHovering: (
      state,
      action: PayloadAction<boolean | undefined>
    ) => {
      if (state.isTabListHovering === action.payload) return;

      state.isTabListHovering = action.payload ?? !state.isTabListHovering;
    },
    handleChangeTabList: (state, action: PayloadAction<Array<string>>) => {
      state.tabList = action.payload;
    },
    handleAddTab: (state, action: PayloadAction<string | undefined>) => {
      const id = action.payload ?? "";

      let addIndex = state.tabList.length;

      const selectedIdIndex = state.tabList.findIndex(
        (tabId) => tabId === state.selectedTab
      );

      if (selectedIdIndex >= 0) addIndex = selectedIdIndex + 1;

      if (state.tabList.includes(id)) return;

      const newList = state.tabList;
      newList.splice(addIndex, 0, id);
      state.tabList = newList;
    },
    handleRemoveTab: (state, action: PayloadAction<string>) => {
      const id = action.payload;
      const newTabList = state.tabList.filter((tabId) => tabId !== id);
      state.tabList = newTabList;

      if (id !== state.selectedTab) return;

      const idIndex = state.tabList.findIndex((tabId) => tabId === id);

      let nextSelectedTabIndex = Math.max(
        Math.min(idIndex, newTabList.length - 1),
        0
      );

      if (state.tabList.length <= 1) nextSelectedTabIndex = -1;

      state.selectedTab = newTabList[nextSelectedTabIndex] ?? null;
    },
    handleMoveTab: (
      state,
      action: PayloadAction<{
        id: string;
        index?: number;
      }>
    ) => {
      const { id, index = 0 } = action.payload;

      let tabList = state.tabList;

      const idIndex = tabList.findIndex((tabId) => tabId === id);
      if (idIndex >= 0) tabList = tabList.filter((tabId) => tabId !== id);

      tabList.splice(index ?? tabList.length, 0, id);
      state.tabList = [...tabList];
    },
    handleChangeSelectedTab: (
      state,
      action: PayloadAction<string | undefined | null>
    ) => {
      const id = action.payload;

      if (!id) {
        state.selectedTab = null;
        return;
      }

      const newSelectedTabIndex = state.tabList.findIndex(
        (tabId) => tabId === id
      );
      const oldSelectedTabIndex = state.tabList.findIndex(
        (tabId) => tabId === state.selectedTab
      );

      /* if new selected tab index doesnt exist in tabList (in open tabs) then add it next to old selected tab if old exist else last */
      if (newSelectedTabIndex < 0) {
        const newTabList = state.tabList;
        newTabList.splice(
          oldSelectedTabIndex < 0
            ? state.tabList.length
            : oldSelectedTabIndex + 1,
          0,
          id
        );
        state.tabList = newTabList;
      }

      state.selectedTab = id;
    },
  },
});

export const {
  handleChangeTabList,
  handleChangeIsTabListHovering,
  handleAddTab,
  handleRemoveTab,
  handleMoveTab,
  handleChangeSelectedTab,
} = tabSidebarSlice.actions;

export default tabSidebarSlice.reducer;
