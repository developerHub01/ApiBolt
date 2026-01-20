import { createAsyncThunk } from "@reduxjs/toolkit";
import type { AppDispatch, RootState } from "@/context/redux/store";
import { handleSetResponse } from "@/context/redux/request-response/request-response-slice";

export const clearResponse = createAsyncThunk<
  boolean,
  void | string,
  {
    dispatch: AppDispatch;
    state: RootState;
  }
>("request-response/clearResponse", async (id, { getState, dispatch }) => {
  try {
    const state = getState() as RootState;
    const requestId = id ?? state.requestResponse.selectedTab;
    if (!requestId || !state.requestResponse.requestList[requestId]?.method)
      throw new Error();

    dispatch(
      handleSetResponse({
        id: requestId,
        response: null,
      }),
    );

    return true;
  } catch (error) {
    console.error(error);
    return false;
  }
});

export const saveResponse = createAsyncThunk<
  boolean,
  void | string,
  {
    dispatch: AppDispatch;
    state: RootState;
  }
>("request-response/saveResponse", async (id, { getState }) => {
  try {
    const state = getState() as RootState;
    const requestId = id ?? state.requestResponse.selectedTab;
    if (!requestId || !state.requestResponse.requestList[requestId]?.method)
      throw new Error();

    const response = state.requestResponse.response[requestId];

    return await window.electronAPIResponse.saveResponse({
      data: response?.data,
      contentType: response?.headers["content-type"] as string,
    });
  } catch (error) {
    console.error(error);
    return false;
  }
});
