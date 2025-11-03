import { createAsyncThunk } from "@reduxjs/toolkit";
import type { AppDispatch, RootState } from "@/context/redux/store";
import {
  handleDeleteHistoryByRequestId,
  handleLoadHistoryByRequestId,
} from "@/context/redux/history/history-slice";

export const loadRequestHistoryMeta = createAsyncThunk<
  void,
  string | void,
  {
    dispatch: AppDispatch;
    state: RootState;
  }
>("history/loadRequestHistoryMeta", async (id, { dispatch, getState }) => {
  try {
    const state = getState() as RootState;
    if (!id && state.requestResponse.selectedTab)
      id = state.requestResponse.selectedTab;

    if (!id) return;

    const response = await window.electronAPIHistory.getHistoryByRequestId(id);

    dispatch(
      handleLoadHistoryByRequestId({
        requestId: id,
        payload: response,
      })
    );
  } catch (error) {
    console.error(error);
  }
});

export const deleteRequestHistoryById = createAsyncThunk<
  boolean,
  string | void,
  {
    dispatch: AppDispatch;
    state: RootState;
  }
>("history/deleteRequestHistoryById", async (id, { dispatch, getState }) => {
  try {
    const state = getState() as RootState;
    const requestId = state.requestResponse.selectedTab;
    if (!id || !requestId) return false;

    dispatch(
      handleDeleteHistoryByRequestId({
        id,
        requestId,
      })
    );

    const response = await window.electronAPIHistory.deleteHistoryById(id);

    if (response) return true;

    dispatch(loadRequestHistoryMeta(requestId));
    return false;
  } catch (error) {
    console.error(error);
    return false;
  }
});
