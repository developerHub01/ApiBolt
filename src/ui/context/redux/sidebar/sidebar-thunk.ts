import { createAsyncThunk } from "@reduxjs/toolkit";
import type { AppDispatch, RootState } from "@/context/redux/store";
import { handleChangeActiveTab } from "@/context/redux/sidebar/sidebar-slice";
import type { TSidebarTab } from "@/types/sidebar.types";

export const loadActiveTab = createAsyncThunk<
  void,
  void,
  {
    dispatch: AppDispatch;
    state: RootState;
  }
>("sidebar/loadActiveTab", async (_, { dispatch, getState }) => {
  try {
    const state = getState() as RootState;
    let response =
      await window.electronAPIActiveSidebarTabDB.getActiveSidebarTab();

    /**
     * =============== SAFTY POURPOSE MOSTLY NOT TRIGGER ================
     * - when no active project and if tab is other then projects then dont allow to set instead set "projects" as default
     */
    if (!state.project.activeProjectId && response !== "projects")
      response = "projects";

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
      (!state.project.activeProjectId && tabId !== "projects")
    )
      return;

    dispatch(handleChangeActiveTab(tabId));
    const response =
      await window.electronAPIActiveSidebarTabDB.updateActiveSidebarTab(tabId);

    if (!response) await dispatch(loadActiveTab());
  } catch (error) {
    console.error(error);
  }
});
