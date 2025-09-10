import { createAsyncThunk } from "@reduxjs/toolkit";
import type { AppDispatch, RootState } from "@/context/redux/store";
import { handleLoadBodyBinary } from "@/context/redux/request-response/request-response-slice";

/* ==============================
======== Body binary start =============
================================= */
export const loadRequestBodyBinary = createAsyncThunk<
  void,
  void | { requestId?: string | null | undefined; once?: boolean },
  {
    dispatch: AppDispatch;
    state: RootState;
  }
>(
  "request-response/loadRequestBodyBinary",
  async (payload, { dispatch, getState }) => {
    if (!payload) payload = {};

    const once = payload.once ?? false;
    const state = getState() as RootState;

    const selectedTab = state.requestResponse.selectedTab;
    if (
      !selectedTab ||
      (typeof state.requestResponse.rawData[selectedTab] !== "undefined" &&
        once)
    )
      return;

    const response = await window.electronAPIBodyBinaryDB.getBodyBinary();
    dispatch(handleLoadBodyBinary(response?.file));
  }
);

export const updateRequestBodyBinary = createAsyncThunk<
  void,
  void,
  {
    dispatch: AppDispatch;
    state: RootState;
  }
>("request-response/updateRequestBodyBinary", async (_, { dispatch }) => {
  const response = await window.electronAPIBodyBinaryDB.updateBodyBinary();

  if (response) dispatch(loadRequestBodyBinary());
  return;
});

export const deleteRequestBodyBinary = createAsyncThunk<
  void,
  void,
  {
    dispatch: AppDispatch;
    state: RootState;
  }
>("request-response/deleteRequestBodyBinary", async (_, { dispatch }) => {
  const response = await window.electronAPIBodyBinaryDB.deleteBodyBinary();

  if (response) dispatch(loadRequestBodyBinary());
  return;
});
/* ==============================
======== Body binary end =============
================================= */
