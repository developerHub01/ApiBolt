import { createAsyncThunk } from "@reduxjs/toolkit";
import type { AppDispatch, RootState } from "@/context/redux/store";
import { handleChangeActiveTab } from "@/context/redux/sidebar/sidebar-slice";
import type { TSidebarTab } from "@shared/types/sidebar.types";
import { ALLOWED_TABS_WHEN_NO_ACTIVE_PROJECT } from "@/constant/sidebar.constant";

export const loadActiveTab = createAsyncThunk<
  void,
  void,
  {
    dispatch: AppDispatch;
    state: RootState;
  }
>("sidebar/loadActiveTab", async (_, { dispatch }) => {
  try {
    let response =
      await window.electronAPIActiveSidebarTab.getActiveSidebarTab();

    /**
     * =============== SAFTY POURPOSE MOSTLY NOT TRIGGER ================
     * - when no active project and if tab is other then projects then dont allow to set instead set "projects" as default
     */
    if (!response) response = "navigate_projects";
    dispatch(handleChangeActiveTab(response));
  } catch (error) {
    console.error(error);
  }
});

export const changeActiveTab = createAsyncThunk<
  void,
  TSidebarTab,
  {
    dispatch: AppDispatch;
    state: RootState;
  }
>("sidebar/changeActiveTab", async (tabId, { dispatch, getState }) => {
  try {
    const state = getState() as RootState;

    /**
     * =============== SAFTY POURPOSE MOSTLY NOT TRIGGER ================
     * - when no active project and if tab is other then projects then dont allow to set.
     */
    if (
      state.sidebar.activeTab === tabId ||
      /* when no project active then only allow allowedTabsWhenNoActiveProject */
      (!state.project.activeProjectId &&
        !ALLOWED_TABS_WHEN_NO_ACTIVE_PROJECT.has(tabId))
    )
      return;

    dispatch(handleChangeActiveTab(tabId));
    const response =
      await window.electronAPIActiveSidebarTab.updateActiveSidebarTab(tabId);

    if (!response) await dispatch(loadActiveTab());
  } catch (error) {
    console.error(error);
  }
});
