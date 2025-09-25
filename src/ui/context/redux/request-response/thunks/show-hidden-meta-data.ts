import { type ShowHiddenMetaInterface } from "@/types/request-response.types";
import { createAsyncThunk } from "@reduxjs/toolkit";
import type { AppDispatch, RootState } from "@/context/redux/store";
import { handleSetShowHiddenMetaData } from "@/context/redux/request-response/request-response-slice";

/* ==============================
======== show-hidden-meta-data start ===========
================================= */
export const loadShowHiddenMetaData = createAsyncThunk<
  void,
  void | { requestOrFolderId?: string | null | undefined; once?: boolean },
  {
    dispatch: AppDispatch;
    state: RootState;
  }
>(
  "request-response/loadShowHiddenMetaData",
  async (payload, { getState, dispatch }) => {
    try {
      if (!payload) payload = {};

      const state = getState() as RootState;

      const selectedTab =
        payload.requestOrFolderId ?? state.requestResponse.selectedTab;
      const once = payload.once ?? false;

      if (
        !selectedTab ||
        (state.requestResponse.metaShowColumn[selectedTab] && once)
      )
        return;

      const response =
        await window.electronAPIShowHiddenMetaDataDB.getShowHiddenMetaData(
          selectedTab
        );

      if (response)
        dispatch(
          handleSetShowHiddenMetaData({
            id: selectedTab,
            payload: response,
          })
        );
    } catch (error) {
      console.log(error);
    }
  }
);

export const updateShowHiddenMetaData = createAsyncThunk<
  boolean,
  { id?: string; payload: Partial<ShowHiddenMetaInterface> },
  {
    dispatch: AppDispatch;
    state: RootState;
  }
>(
  "request-response/updateShowHiddenMetaData",
  async ({ id, payload }, { dispatch, getState }) => {
    try {
      const state = getState() as RootState;

      const selectedTab = id ?? state.requestResponse.selectedTab ?? undefined;

      const response =
        await window.electronAPIShowHiddenMetaDataDB.updateShowHiddenMetaData({
          requestOrFolderMetaId: selectedTab,
          ...payload,
        });

      if (response)
        dispatch(
          handleSetShowHiddenMetaData({
            id: selectedTab,
            payload: response,
          })
        );

      return Boolean(response);
    } catch (error) {
      console.log(error);
      return false;
    }
  }
);

export const toggleShowHiddenMetaData = createAsyncThunk<
  boolean,
  { id?: string; type: "header" | "param" },
  {
    dispatch: AppDispatch;
    state: RootState;
  }
>(
  "request-response/toggleShowHiddenMetaData",
  async ({ id, type }, { dispatch, getState }) => {
    try {
      const state = getState() as RootState;
      const selectedTab = id ?? state.requestResponse.selectedTab ?? undefined;
      if (!selectedTab) return false;

      const key = type === "param" ? "showHiddenParams" : "showHiddenHeaders";

      const newValue = !state.requestResponse[key][selectedTab];

      const response =
        await window.electronAPIShowHiddenMetaDataDB.updateShowHiddenMetaData({
          requestOrFolderMetaId: selectedTab,
          [key]: newValue,
        });

      if (response)
        dispatch(
          handleSetShowHiddenMetaData({
            id: selectedTab,
            payload: {
              [key]: newValue,
            },
          })
        );

      return Boolean(response);
    } catch (error) {
      console.log(error);
      return false;
    }
  }
);
/* ==============================
======== show-hidden-meta-data end =============
================================= */
