import { createAsyncThunk } from "@reduxjs/toolkit";
import type { AppDispatch, RootState } from "@/context/redux/store";
import {
  handleLoadHttpStatus,
  handleLoadSingleHttpStatus,
  handleUpdateHttpStatus,
} from "@/context/redux/http-status/http-status-slice";
import type { HttpStatusUpdatePayloadInterface } from "@shared/types/http-status.type";

export const loadHttpStatus = createAsyncThunk<
  void,
  void | { once?: boolean },
  {
    dispatch: AppDispatch;
    state: RootState;
  }
>("http-status/loadHttpStatus", async (payload, { dispatch, getState }) => {
  try {
    const once = payload?.once ?? false;
    const state = getState() as RootState;

    if (Object.keys(state.httpStatus.httpStatus).length && once) return;

    const response = await window.electronAPIHttpStatus.getHttpStatus();
    if (!response) return;

    dispatch(handleLoadHttpStatus(response));
  } catch (error) {
    console.error(error);
  }
});

export const loadHttpStatusByCode = createAsyncThunk<
  void,
  string,
  {
    dispatch: AppDispatch;
    state: RootState;
  }
>("http-status/loadHttpStatusByCode", async (code, { dispatch }) => {
  try {
    const response =
      await window.electronAPIHttpStatus.getHttpStatusByCode(code);

    if (!response) return;

    dispatch(handleLoadSingleHttpStatus(response));
  } catch (error) {
    console.error(error);
  }
});

export const updateHttpStatus = createAsyncThunk<
  void,
  HttpStatusUpdatePayloadInterface,
  {
    dispatch: AppDispatch;
    state: RootState;
  }
>("http-status/updateHttpStatus", async (payload, { dispatch }) => {
  try {
    const response =
      await window.electronAPIHttpStatus.updateHttpStatus(payload);
    if (!response) return;

    dispatch(handleUpdateHttpStatus(response));
  } catch (error) {
    console.error(error);
  }
});
