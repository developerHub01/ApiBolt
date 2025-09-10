import { type ParamHeaderBuildPayloadInterface } from "@/types/request-response.types";
import { createAsyncThunk } from "@reduxjs/toolkit";
import type { AppDispatch, RootState } from "@/context/redux/store";
import { handleLoadBodyFormData } from "@/context/redux/request-response/request-response-slice";

/* ==============================
======== BodyFormData start ===========
================================= */
export const loadBodyFormData = createAsyncThunk<
  void,
  void | { requestId?: string | null | undefined; once?: boolean },
  {
    dispatch: AppDispatch;
    state: RootState;
  }
>(
  "request-response/loadBodyFormData",
  async (payload, { getState, dispatch }) => {
    if (!payload) payload = {};

    let selectedTab = payload.requestId;
    const once = payload.once ?? false;

    const state = getState() as RootState;

    if (!selectedTab) selectedTab = state.requestResponse.selectedTab;
    if (!selectedTab || (state.requestResponse.formData[selectedTab] && once))
      return;

    const response =
      await window.electronAPIBodyFormDataDB.getBodyFormData(selectedTab);

    dispatch(handleLoadBodyFormData(response));
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
    const state = getState() as RootState;

    const selectedTab = state.requestResponse.selectedTab;
    if (!selectedTab) return false;

    if (!payload) payload = {};
    const response =
      await window.electronAPIBodyFormDataDB.createBodyFormData(payload);

    if (response) dispatch(loadBodyFormData());

    return response;
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
  const state = getState() as RootState;

  const selectedTab = state.requestResponse.selectedTab;
  if (!selectedTab) return false;

  const response =
    await window.electronAPIBodyFormDataDB.deleteBodyFormData(id);

  if (response) dispatch(loadBodyFormData());
  return response;
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
    const state = getState() as RootState;
    if (!id) id = state.requestResponse.selectedTab;

    if (!id) return false;

    const response =
      await window.electronAPIBodyFormDataDB.deleteBodyFormDataByRequestMetaId(
        id
      );

    if (response) dispatch(handleLoadBodyFormData([]));
    return response;
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
    const response =
      await window.electronAPIBodyFormDataDB.deleteBodyFormDataFile(id, index);

    if (response) dispatch(loadBodyFormData());
    return response;
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
    const response = await window.electronAPIBodyFormDataDB.updateBodyFormData(
      paramId,
      payload
    );

    if (response) dispatch(loadBodyFormData());
    return response;
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
  const response =
    await window.electronAPIBodyFormDataDB.updateBodyFormDataFile(paramId);

  if (response) dispatch(loadBodyFormData());
  return response;
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
    const response =
      await window.electronAPIBodyFormDataDB.checkAllBodyFormDataByRequestMetaId(
        requestOrFolderMetaId
      );

    if (response) dispatch(loadBodyFormData());
    return response;
  }
);
/* ==============================
======== BodyFormData end =============
================================= */
