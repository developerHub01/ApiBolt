import { type ParamHeaderBuildPayloadInterface } from "@/types/request-response.types";
import { createAsyncThunk } from "@reduxjs/toolkit";
import type { AppDispatch, RootState } from "@/context/redux/store";
import { handleLoadBodyFormData } from "@/context/redux/request-response/request-response-slice";

/* ==============================
======== BodyFormData start ===========
================================= */
export const loadBodyFormData = createAsyncThunk<
  void,
  void | { requestOrFolderId?: string | null | undefined; once?: boolean },
  {
    dispatch: AppDispatch;
    state: RootState;
  }
>(
  "request-response/loadBodyFormData",
  async (payload, { getState, dispatch }) => {
    try {
      if (!payload) payload = {};

      const state = getState() as RootState;

      const selectedTab =
        payload.requestOrFolderId ?? state.requestResponse.selectedTab;
      const once = payload.once ?? false;

      if (!selectedTab || (state.requestResponse.formData[selectedTab] && once))
        return;

      const response =
        await window.electronAPIBodyFormDataDB.getBodyFormData(selectedTab);
      dispatch(handleLoadBodyFormData(response));
    } catch (error) {
      console.log(error);
    }
  }
);

export const addBodyFormData = createAsyncThunk<
  boolean,
  Partial<ParamHeaderBuildPayloadInterface> | undefined,
  {
    dispatch: AppDispatch;
    state: RootState;
  }
>(
  "request-response/addBodyFormData",
  async (payload, { getState, dispatch }) => {
    try {
      const state = getState() as RootState;

      const selectedTab = state.requestResponse.selectedTab;
      if (!selectedTab) return false;

      if (!payload) payload = {};
      const response =
        await window.electronAPIBodyFormDataDB.createBodyFormData(payload);

      if (response) dispatch(loadBodyFormData());
      return response;
    } catch (error) {
      console.log(error);
      return false;
    }
  }
);

export const deleteBodyFormData = createAsyncThunk<
  boolean,
  string,
  {
    dispatch: AppDispatch;
    state: RootState;
  }
>("request-response/deleteBodyFormData", async (id, { getState, dispatch }) => {
  try {
    const state = getState() as RootState;

    const selectedTab = state.requestResponse.selectedTab;
    if (!selectedTab) return false;

    const response =
      await window.electronAPIBodyFormDataDB.deleteBodyFormData(id);

    if (response) dispatch(loadBodyFormData());
    return response;
  } catch (error) {
    console.log(error);
    return false;
  }
});

export const deleteBodyFormDataByRequestMetaId = createAsyncThunk<
  boolean,
  string | undefined | null,
  {
    dispatch: AppDispatch;
    state: RootState;
  }
>(
  "request-response/deleteBodyFormDataByRequestMetaId",
  async (id, { getState, dispatch }) => {
    try {
      const state = getState() as RootState;
      if (!id) id = state.requestResponse.selectedTab;

      if (!id) return false;

      const response =
        await window.electronAPIBodyFormDataDB.deleteBodyFormDataByRequestMetaId(
          id
        );

      if (response) dispatch(handleLoadBodyFormData([]));
      return response;
    } catch (error) {
      console.log(error);
      return false;
    }
  }
);

export const deleteBodyFormDataFile = createAsyncThunk<
  boolean,
  {
    id: string;
    index: number;
  },
  {
    dispatch: AppDispatch;
    state: RootState;
  }
>(
  "request-response/deleteBodyFormDataFile",
  async ({ id, index }, { dispatch }) => {
    try {
      const response =
        await window.electronAPIBodyFormDataDB.deleteBodyFormDataFile(
          id,
          index
        );

      if (response) dispatch(loadBodyFormData());
      return response;
    } catch (error) {
      console.log(error);
      return false;
    }
  }
);

export const updateBodyFormData = createAsyncThunk<
  boolean,
  {
    paramId: string;
    payload: Partial<ParamHeaderBuildPayloadInterface>;
  },
  {
    dispatch: AppDispatch;
    state: RootState;
  }
>(
  "request-response/updateBodyFormData",
  async ({ paramId, payload }, { dispatch }) => {
    try {
      const response =
        await window.electronAPIBodyFormDataDB.updateBodyFormData(
          paramId,
          payload
        );

      if (response) dispatch(loadBodyFormData());
      return response;
    } catch (error) {
      console.log(error);
      return false;
    }
  }
);

export const updateBodyFormDataFile = createAsyncThunk<
  boolean,
  string,
  {
    dispatch: AppDispatch;
    state: RootState;
  }
>("request-response/updateBodyFormDataFile", async (paramId, { dispatch }) => {
  try {
    const response =
      await window.electronAPIBodyFormDataDB.updateBodyFormDataFile(paramId);

    if (response) dispatch(loadBodyFormData());
    return response;
  } catch (error) {
    console.log(error);
    return false;
  }
});

export const checkAllBodyFormDataByRequestMetaId = createAsyncThunk<
  boolean,
  string | undefined,
  {
    dispatch: AppDispatch;
    state: RootState;
  }
>(
  "request-response/checkAllBodyFormDataByRequestMetaId",
  async (requestOrFolderMetaId, { dispatch }) => {
    try {
      const response =
        await window.electronAPIBodyFormDataDB.checkAllBodyFormDataByRequestMetaId(
          requestOrFolderMetaId
        );

      if (response) dispatch(loadBodyFormData());
      return response;
    } catch (error) {
      console.log(error);
      return false;
    }
  }
);
/* ==============================
======== BodyFormData end =============
================================= */
