import { createAsyncThunk } from "@reduxjs/toolkit";
import type { AppDispatch, RootState } from "@/context/redux/store";
import {
  handleLoadHttpStatus,
  handleUpdateHttpStatus,
} from "@/context/redux/http-status/http-status-slice";
import type { HttpStatusUpdatePayloadInterface } from "@/types/http-status.type";

export const loadHttpStatus = createAsyncThunk<
  void,
  void | { once?: boolean },
  {
    dispatch: AppDispatch;
    state: RootState;
  }
>("request-url/loadHttpStatus", async (payload, { dispatch, getState }) => {
  try {
    const once = payload?.once ?? false;
    const state = getState() as RootState;

    if (Object.keys(state.httpStatus.httpStatus).length && once) return;

    const response = await window.electronAPIHttpStatusDB.getHttpStatus();

    if (!response) return;

    dispatch(handleLoadHttpStatus(response));
  } catch (error) {
    console.log(error);
  }
});

export const updateHttpStatus = createAsyncThunk<
  void,
  HttpStatusUpdatePayloadInterface,
  {
    dispatch: AppDispatch;
    state: RootState;
  }
>("request-url/updateHttpStatus", async (payload, { dispatch }) => {
  try {
    const response =
      await window.electronAPIHttpStatusDB.updateHttpStatus(payload);
    if (!response) return;

    dispatch(handleUpdateHttpStatus(response));
  } catch (error) {
    console.log(error);
  }
});
