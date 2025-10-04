import { type ParamHeaderBuildPayloadInterface } from "@/types/request-response.types";
import { createAsyncThunk } from "@reduxjs/toolkit";
import type { AppDispatch, RootState } from "@/context/redux/store";
import { handleLoadBodyXWWWFormUrlencoded } from "@/context/redux/request-response/request-response-slice";

/* ==============================
======== BodyXWWWFormUrlencoded start ===========
================================= */
export const loadBodyXWWWFormUrlencoded = createAsyncThunk<
  void,
  void | { requestOrFolderId?: string | null | undefined; once?: boolean },
  {
    dispatch: AppDispatch;
    state: RootState;
  }
>(
  "request-response/loadBodyXWWWFormUrlencoded",
  async (payload, { getState, dispatch }) => {
    try {
      if (!payload) payload = {};

      const state = getState() as RootState;

      const selectedTab =
        payload.requestOrFolderId ?? state.requestResponse.selectedTab;
      const once = payload.once ?? false;

      if (
        !selectedTab ||
        (state.requestResponse.xWWWFormUrlencodedData[selectedTab] && once)
      )
        return;

      const response =
        await window.electronAPIBodyXWWWFormUrlencodedDB.getBodyXWWWFormUrlencoded(
          selectedTab
        );

      dispatch(handleLoadBodyXWWWFormUrlencoded(response));
    } catch (error) {
      console.error(error);
    }
  }
);

export const addBodyXWWWFormUrlencoded = createAsyncThunk<
  boolean,
  Partial<ParamHeaderBuildPayloadInterface> | undefined,
  {
    dispatch: AppDispatch;
    state: RootState;
  }
>(
  "request-response/addBodyXWWWFormUrlencoded",
  async (payload, { getState, dispatch }) => {
    try {
      const state = getState() as RootState;

      const selectedTab = state.requestResponse.selectedTab;
      if (!selectedTab) return false;

      if (!payload) payload = {};
      const response =
        await window.electronAPIBodyXWWWFormUrlencodedDB.createBodyXWWWFormUrlencoded(
          payload
        );

      if (response) dispatch(loadBodyXWWWFormUrlencoded());
      return response;
    } catch (error) {
      console.error(error);
      return false;
    }
  }
);

export const deleteBodyXWWWFormUrlencoded = createAsyncThunk<
  boolean,
  string,
  {
    dispatch: AppDispatch;
    state: RootState;
  }
>(
  "request-response/deleteBodyXWWWFormUrlencoded",
  async (id, { getState, dispatch }) => {
    try {
      const state = getState() as RootState;

      const selectedTab = state.requestResponse.selectedTab;
      if (!selectedTab) return false;

      const response =
        await window.electronAPIBodyXWWWFormUrlencodedDB.deleteBodyXWWWFormUrlencoded(
          id
        );

      if (response) dispatch(loadBodyXWWWFormUrlencoded());
      return response;
    } catch (error) {
      console.error(error);
      return false;
    }
  }
);

export const deleteBodyXWWWFormUrlencodedByRequestMetaId = createAsyncThunk<
  boolean,
  string | undefined | null,
  {
    dispatch: AppDispatch;
    state: RootState;
  }
>(
  "request-response/deleteBodyXWWWFormUrlencodedByRequestMetaId",
  async (id, { getState, dispatch }) => {
    try {
      const state = getState() as RootState;
      if (!id) id = state.requestResponse.selectedTab;

      if (!id) return false;

      const response =
        await window.electronAPIBodyXWWWFormUrlencodedDB.deleteBodyXWWWFormUrlencodedByRequestMetaId(
          id
        );

      if (response) dispatch(handleLoadBodyXWWWFormUrlencoded([]));
      return response;
    } catch (error) {
      console.error(error);
      return false;
    }
  }
);

export const updateBodyXWWWFormUrlencoded = createAsyncThunk<
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
  "request-response/updateBodyXWWWFormUrlencoded",
  async ({ paramId, payload }, { dispatch }) => {
    try {
      const response =
        await window.electronAPIBodyXWWWFormUrlencodedDB.updateBodyXWWWFormUrlencoded(
          paramId,
          payload
        );

      if (response) dispatch(loadBodyXWWWFormUrlencoded());
      return response;
    } catch (error) {
      console.error(error);
      return false;
    }
  }
);

export const checkAllBodyXWWWFormUrlencodedByRequestMetaId = createAsyncThunk<
  boolean,
  string | undefined,
  {
    dispatch: AppDispatch;
    state: RootState;
  }
>(
  "request-response/checkAllBodyXWWWFormUrlencodedByRequestMetaId",
  async (requestOrFolderMetaId, { dispatch }) => {
    try {
      const response =
        await window.electronAPIBodyXWWWFormUrlencodedDB.checkAllBodyXWWWFormUrlencodedByRequestMetaId(
          requestOrFolderMetaId
        );

      if (response) dispatch(loadBodyXWWWFormUrlencoded());
      return response;
    } catch (error) {
      console.error(error);
      return false;
    }
  }
);
/* ==============================
  ======== BodyXWWWFormUrlencoded end =============
================================= */
