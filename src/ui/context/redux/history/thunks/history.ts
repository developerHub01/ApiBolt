import { createAsyncThunk } from "@reduxjs/toolkit";
import type { AppDispatch, RootState } from "@/context/redux/store";
import {
  handleChangeFilterMethod,
  handleChangeOpenedHistory,
  handleClearHistoryCacheByRequestId,
  handleDeleteHistoryByRequestId,
  handleLoadHistoryByRequestId,
} from "@/context/redux/history/history-slice";
import type { THistoryFilter } from "@/types/history.types";

export const loadRequestHistoryMeta = createAsyncThunk<
  void,
  string | void | null,
  {
    dispatch: AppDispatch;
    state: RootState;
  }
>("history/loadRequestHistoryMeta", async (id, { dispatch, getState }) => {
  try {
    const state = getState() as RootState;
    if (!id) id = state.requestResponse.selectedTab;

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
  string | void | undefined | null,
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

export const deleteRequestHistoryByRequestId = createAsyncThunk<
  boolean,
  string | void | undefined | null,
  {
    dispatch: AppDispatch;
    state: RootState;
  }
>(
  "history/deleteRequestHistoryByRequestId",
  async (requestId, { dispatch, getState }) => {
    try {
      const state = getState() as RootState;
      if (!requestId) requestId = state.requestResponse.selectedTab;
      if (!requestId) return false;

      dispatch(handleClearHistoryCacheByRequestId(requestId));

      const response =
        await window.electronAPIHistory.deleteHistoryByRequestId(requestId);

      if (response) return true;

      dispatch(loadRequestHistoryMeta(requestId));
      return false;
    } catch (error) {
      console.error(error);
      return false;
    }
  }
);

export const changeHistoryFilterMethod = createAsyncThunk<
  void,
  {
    requestId?: string;
    method: THistoryFilter;
  },
  {
    dispatch: AppDispatch;
    state: RootState;
  }
>(
  "history/changeHistoryFilterMethod",
  async ({ requestId, method }, { dispatch, getState }) => {
    try {
      const state = getState() as RootState;

      if (!requestId)
        requestId = state.requestResponse.selectedTab ?? undefined;
      if (!requestId) return;

      dispatch(
        handleChangeFilterMethod({
          requestId,
          method,
        })
      );
    } catch (error) {
      console.error(error);
    }
  }
);

export const changeOpenedHistory = createAsyncThunk<
  void,
  string | undefined | null,
  {
    dispatch: AppDispatch;
    state: RootState;
  }
>("history/changeOpenedHistory", async (id, { dispatch, getState }) => {
  try {
    const state = getState() as RootState;
    const requestId = state.requestResponse.selectedTab ?? undefined;

    if (!id || !requestId) {
      dispatch(handleChangeOpenedHistory());
      return;
    }

    dispatch(
      handleChangeOpenedHistory({
        id,
        requestId,
      })
    );
  } catch (error) {
    console.error(error);
  }
});
