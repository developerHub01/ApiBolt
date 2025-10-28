import { createAsyncThunk } from "@reduxjs/toolkit";
import type { AppDispatch, RootState } from "@/context/redux/store";
import {
  handleChangeIsOpen,
  handleChangeSearchTerm,
} from "@/context/redux/header/header-slice";

export const changeHeaderIsOpen = createAsyncThunk<
  void,
  boolean | undefined,
  {
    dispatch: AppDispatch;
    state: RootState;
  }
>("header/changeHeaderIsOpen", async (value, { dispatch, getState }) => {
  try {
    const state = getState() as RootState;

    /* no in collection route or no project selected then exit */
    if (
      state.sidebar.activeTab !== "navigate_collections" ||
      !state.project.activeProjectId
    )
      return;

    dispatch(handleChangeIsOpen(value));
    if (!value) dispatch(handleChangeSearchTerm(""));
  } catch (error) {
    console.error(error);
    throw new Error("Something went wrong, couldn't load cookies");
  }
});
