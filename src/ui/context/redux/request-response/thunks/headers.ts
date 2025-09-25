import {
  type HiddenHeadersCheckInterface,
  type ParamHeaderBuildPayloadInterface,
} from "@/types/request-response.types";
import { createAsyncThunk } from "@reduxjs/toolkit";
import type { AppDispatch, RootState } from "@/context/redux/store";
import {
  handleLoadHeaders,
  handleUpdateHiddenHeadersIsCheck,
} from "@/context/redux/request-response/request-response-slice";

/* ==============================
======== Headers start ===========
================================= */
export const loadHeaders = createAsyncThunk<
  void,
  void | { requestOrFolderId?: string | null | undefined; once?: boolean },
  {
    dispatch: AppDispatch;
    state: RootState;
  }
>("request-response/loadHeaders", async (payload, { getState, dispatch }) => {
  try {
    if (!payload) payload = {};

    const state = getState() as RootState;

    const selectedTab =
      payload.requestOrFolderId ?? state.requestResponse.selectedTab;
    const once = payload.once ?? false;

    if (!selectedTab || (state.requestResponse.headers[selectedTab] && once))
      return;

    const response = await window.electronAPIHeadersDB.getHeaders(selectedTab);

    dispatch(handleLoadHeaders(response));
  } catch (error) {
    console.log(error);
  }
});

export const addHeaders = createAsyncThunk<
  boolean,
  Partial<ParamHeaderBuildPayloadInterface> | undefined,
  {
    dispatch: AppDispatch;
    state: RootState;
  }
>("request-response/addHeaders", async (payload, { getState, dispatch }) => {
  try {
    const state = getState() as RootState;

    const selectedTab = state.requestResponse.selectedTab;
    if (!selectedTab) return false;

    if (!payload) payload = {};
    const response = await window.electronAPIHeadersDB.createHeaders(payload);

    if (response) dispatch(loadHeaders());

    return response;
  } catch (error) {
    console.log(error);
    return false;
  }
});

export const deleteHeaders = createAsyncThunk<
  boolean,
  string,
  {
    dispatch: AppDispatch;
    state: RootState;
  }
>("request-response/deleteHeaders", async (id, { getState, dispatch }) => {
  try {
    const state = getState() as RootState;

    const selectedTab = state.requestResponse.selectedTab;
    if (!selectedTab) return false;

    const response = await window.electronAPIHeadersDB.deleteHeaders(id);

    if (response) dispatch(loadHeaders());
    return response;
  } catch (error) {
    console.log(error);
    return false;
  }
});

export const deleteHeadersByRequestMetaId = createAsyncThunk<
  boolean,
  string | undefined | null,
  {
    dispatch: AppDispatch;
    state: RootState;
  }
>(
  "request-response/deleteHeadersByRequestMetaId",
  async (id, { getState, dispatch }) => {
    try {
      const state = getState() as RootState;
      if (!id) id = state.requestResponse.selectedTab;

      if (!id) return false;

      const response =
        await window.electronAPIHeadersDB.deleteHeadersByRequestMetaId(id);

      if (response) dispatch(handleLoadHeaders([]));
      return response;
    } catch (error) {
      console.log(error);
      return false;
    }
  }
);

export const updateHeaders = createAsyncThunk<
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
  "request-response/updateHeaders",
  async ({ paramId, payload }, { dispatch }) => {
    try {
      const response = await window.electronAPIHeadersDB.updateHeaders(
        paramId,
        payload
      );

      if (response) dispatch(loadHeaders());
      return response;
    } catch (error) {
      console.log(error);
      return false;
    }
  }
);

export const checkAllHeadersByRequestMetaId = createAsyncThunk<
  boolean,
  string | undefined,
  {
    dispatch: AppDispatch;
    state: RootState;
  }
>(
  "request-response/checkAllHeadersByRequestMetaId",
  async (requestOrFolderMetaId, { dispatch }) => {
    try {
      const response =
        await window.electronAPIHeadersDB.checkAllHeadersByRequestMetaId(
          requestOrFolderMetaId
        );

      if (response) dispatch(loadHeaders());
      return response;
    } catch (error) {
      console.log(error);
      return false;
    }
  }
);

export const updateHiddenHeaders = createAsyncThunk<
  void,
  {
    keyName: keyof HiddenHeadersCheckInterface;
  },
  {
    dispatch: AppDispatch;
    state: RootState;
  }
>(
  "request-response/updateHiddenHeaders",
  async ({ keyName }, { dispatch, getState }) => {
    try {
      const state = getState() as RootState;

      if (!state.requestResponse.selectedTab) return;

      const newValue = !state.requestResponse.hiddenHeaders?.[
        state.requestResponse.selectedTab!
      ]?.find((header) => header.isCheck);

      const response =
        await window.electronAPIHiddenHeadersCheckDB.updateHiddenHeadersCheck({
          [keyName]: newValue,
        });

      if (response)
        dispatch(
          handleUpdateHiddenHeadersIsCheck({
            keyName,
          })
        );
      return;
    } catch (error) {
      console.log(error);
    }
  }
);

/* ==============================
======== Headers end =============
================================= */
