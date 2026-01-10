import { createAsyncThunk } from "@reduxjs/toolkit";
import type { AppDispatch, RootState } from "@/context/redux/store";
import {
  handleLoadSettingsRequest,
  handleUpdateSettingsRequest,
} from "@/context/redux/setting-request/setting-request-slice";
import {
  SettingsRequestInterface,
  UpdateSettingsRequestInterface,
} from "@shared/types/setting-request.types";

export const loadSettingsRequest = createAsyncThunk<
  void,
  void,
  {
    dispatch: AppDispatch;
    state: RootState;
  }
>("setting-request/loadSettingsRequest", async (_, { dispatch }) => {
  try {
    const response =
      await window.electronAPISettingsRequest.getSettingsRequest();
    dispatch(handleLoadSettingsRequest(response));
  } catch (error) {
    console.error(error);
  }
});

export const updateSettingsRequest = createAsyncThunk<
  boolean,
  UpdateSettingsRequestInterface,
  {
    dispatch: AppDispatch;
    state: RootState;
  }
>("setting-request/updateSettingsRequest", async (payload, { dispatch }) => {
  try {
    const response =
      await window.electronAPISettingsRequest.updateSettingsRequest(payload);

    dispatch(
      handleUpdateSettingsRequest({
        type: payload.projectId ? "project" : "global",
        payload: payload as SettingsRequestInterface,
      }),
    );

    return response;
  } catch (error) {
    console.error(error);
    return false;
  }
});
