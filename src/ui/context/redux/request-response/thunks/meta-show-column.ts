import { type ParamHeaderBuildPayloadInterface } from "@/types/request-response.types";
import { createAsyncThunk } from "@reduxjs/toolkit";
import type { AppDispatch, RootState } from "@/context/redux/store";
import { handleLoadMetaShowColumn } from "@/context/redux/request-response/request-response-slice";

/* ==============================
======== MetaShowColumn start ===========
================================= */
export const loadMetaShowColumn = createAsyncThunk<
  void,
  void | { requestOrFolderId?: string | null | undefined; once?: boolean },
  {
    dispatch: AppDispatch;
    state: RootState;
  }
>(
  "request-response/loadMetaShowColumn",
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
        await window.electronAPIMetaShowColumnDB.getMetaShowColumn(selectedTab);

      dispatch(handleLoadMetaShowColumn(response));
    } catch (error) {
      console.error(error);
    }
  }
);

export const updateMetaShowColumn = createAsyncThunk<
  boolean,
  Partial<ParamHeaderBuildPayloadInterface>,
  {
    dispatch: AppDispatch;
    state: RootState;
  }
>("request-response/updateMetaShowColumn", async (payload, { dispatch }) => {
  try {
    const response =
      await window.electronAPIMetaShowColumnDB.updateMetaShowColumn(payload);

    if (response) dispatch(loadMetaShowColumn());
    return response;
  } catch (error) {
    console.error(error);
    return false;
  }
});

export const duplicateMetaShowColumnByOldNewIds = createAsyncThunk<
  boolean,
  Record<string, string>,
  {
    dispatch: AppDispatch;
    state: RootState;
  }
>(
  "request-response/duplicateMetaShowColumnByOldNewIds",
  async (oldNewIdMap) => {
    try {
      const response =
        await window.electronAPIMetaShowColumnDB.duplicateMetaShowColumn(
          oldNewIdMap
        );

      return response;
    } catch (error) {
      console.error(error);
      return false;
    }
  }
);

/* ==============================
  ======== MetaShowColumn end =============
  ================================= */
