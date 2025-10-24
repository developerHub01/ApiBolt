import { createAsyncThunk } from "@reduxjs/toolkit";
import type { AppDispatch, RootState } from "@/context/redux/store";
import { handleLoadBodyBinary } from "@/context/redux/request-response/request-response-slice";

/* ==============================
======== Body binary start =============
================================= */
export const loadRequestBodyBinary = createAsyncThunk<
  void,
  void | { requestOrFolderId?: string | null | undefined; once?: boolean },
  {
    dispatch: AppDispatch;
    state: RootState;
  }
>(
  "request-response/loadRequestBodyBinary",
  async (payload, { dispatch, getState }) => {
    try {
      if (!payload) payload = {};

      const state = getState() as RootState;

      const once = payload.once ?? false;
      const selectedTab =
        payload.requestOrFolderId ?? state.requestResponse.selectedTab;
      if (
        !selectedTab ||
        (typeof state.requestResponse.rawData[selectedTab] !== "undefined" &&
          once)
      )
        return;

      const response =
        await window.electronAPIBodyBinaryDB.getBodyBinary(selectedTab);

      dispatch(
        handleLoadBodyBinary(
          response?.file
            ? {
                path: response.path,
                file: response.file,
              }
            : null
        )
      );
    } catch (error) {
      console.error(error);
    }
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
  try {
    const response = await window.electronAPIBodyBinaryDB.updateBodyBinary();

    if (response) dispatch(loadRequestBodyBinary());
    return;
  } catch (error) {
    console.error(error);
  }
});

export const deleteRequestBodyBinary = createAsyncThunk<
  void,
  void,
  {
    dispatch: AppDispatch;
    state: RootState;
  }
>("request-response/deleteRequestBodyBinary", async (_, { dispatch }) => {
  try {
    const response = await window.electronAPIBodyBinaryDB.deleteBodyBinary();

    if (response) dispatch(loadRequestBodyBinary());
    return;
  } catch (error) {
    console.error(error);
  }
});

export const duplicateBodyBinaryByOldNewIds = createAsyncThunk<
  boolean,
  Record<string, string>,
  {
    dispatch: AppDispatch;
    state: RootState;
  }
>("request-response/duplicateBodyBinaryByOldNewIds", async (oldNewIdMap) => {
  try {
    const response =
      await window.electronAPIBodyBinaryDB.duplicateBodyBinary(oldNewIdMap);

    return response;
  } catch (error) {
    console.error(error);
    return false;
  }
});

/* ==============================
======== Body binary end =============
================================= */
