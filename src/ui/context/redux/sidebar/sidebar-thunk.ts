import { createAsyncThunk } from "@reduxjs/toolkit";
import type { AppDispatch, RootState } from "@/context/redux/store";
import {
  handleChangeActiveTab,
  handleLocalStorageOnSidebarToggle,
} from "@/context/redux/sidebar/sidebar-slice";
import type { TSidebarTab } from "@/types/sidebar.types";

export const changeActiveTab = createAsyncThunk<
  void,
  TSidebarTab,
  {
    dispatch: AppDispatch;
    state: RootState;
  }
>("sidebar/changeActiveTab", async (tabId, { dispatch, getState }) => {
  dispatch(handleChangeActiveTab(tabId));

  const { activeTab, lastActiveTab } = getState().sidebar;

  handleLocalStorageOnSidebarToggle(activeTab, lastActiveTab);
});
