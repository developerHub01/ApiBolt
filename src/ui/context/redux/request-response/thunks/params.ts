import { type ParamHeaderBuildPayloadInterface } from "@/types/request-response.types";
import { createAsyncThunk } from "@reduxjs/toolkit";
import type { AppDispatch, RootState } from "@/context/redux/store";
import { handleLoadParams } from "@/context/redux/request-response/request-response-slice";

/* ==============================
======== Params start ===========
================================= */
export const loadParams = createAsyncThunk<
  void,
  void | { requestId?: string | null | undefined; once?: boolean },
  { dispatch: AppDispatch; state: RootState }
>("request-response/loadParams", async (payload, { getState, dispatch }) => {
  if (!payload) payload = {};

  let selectedTab = payload.requestId;
  const once = payload.once ?? false;

  const state = getState() as RootState;

  if (!selectedTab) selectedTab = state.requestResponse.selectedTab;
  if (!selectedTab || (state.requestResponse.params[selectedTab] && once))
    return;

  const response = await window.electronAPIParamsDB.getParams(selectedTab);

  dispatch(handleLoadParams(response));
});

export const addParams = createAsyncThunk<
  boolean,
  Partial<ParamHeaderBuildPayloadInterface> | undefined,
  { dispatch: AppDispatch; state: RootState }
>("request-response/addParams", async (payload, { getState, dispatch }) => {
  const state = getState() as RootState;

  const selectedTab = state.requestResponse.selectedTab;
  if (!selectedTab) return false;

  if (!payload) payload = {};
  const response = await window.electronAPIParamsDB.createParams(payload);

  if (response) dispatch(loadParams());

  return response;
});

export const deleteParams = createAsyncThunk<
  boolean,
  string,
  { dispatch: AppDispatch; state: RootState }
>("request-response/deleteParams", async (id, { getState, dispatch }) => {
  const state = getState() as RootState;

  const selectedTab = state.requestResponse.selectedTab;
  if (!selectedTab) return false;

  const response = await window.electronAPIParamsDB.deleteParams(id);

  if (response) dispatch(loadParams());
  return response;
});

export const deleteParamsByRequestMetaId = createAsyncThunk<
  boolean,
  string | undefined | null,
  { dispatch: AppDispatch; state: RootState }
>(
  "request-response/deleteParamsByRequestMetaId",
  async (id, { getState, dispatch }) => {
    const state = getState() as RootState;
    if (!id) id = state.requestResponse.selectedTab;

    if (!id) return false;

    const response =
      await window.electronAPIParamsDB.deleteParamsByRequestMetaId(id);

    if (response) dispatch(handleLoadParams([]));
    return response;
  }
);

export const updateParams = createAsyncThunk<
  boolean,
  {
    paramId: string;
    payload: Partial<ParamHeaderBuildPayloadInterface>;
  },
  { dispatch: AppDispatch; state: RootState }
>(
  "request-response/updateParams",
  async ({ paramId, payload }, { dispatch }) => {
    const response = await window.electronAPIParamsDB.updateParams(
      paramId,
      payload
    );

    if (response) dispatch(loadParams());
    return response;
  }
);

export const checkAllParamsByRequestMetaId = createAsyncThunk<
  boolean,
  string | undefined,
  { dispatch: AppDispatch; state: RootState }
>(
  "request-response/checkAllParamsByRequestMetaId",
  async (requestOrFolderMetaId, { dispatch }) => {
    const response =
      await window.electronAPIParamsDB.checkAllParamsByRequestMetaId(
        requestOrFolderMetaId
      );

    if (response) dispatch(loadParams());
    return response;
  }
);

/* ==============================
======== Params end =============
================================= */
