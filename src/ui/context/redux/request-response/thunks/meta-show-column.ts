import { type ParamHeaderBuildPayloadInterface } from "@/types/request-response.types";
import { createAsyncThunk } from "@reduxjs/toolkit";
import type { AppDispatch, RootState } from "@/context/redux/store";
import { handleLoadMetaShowColumn } from "@/context/redux/request-response/request-response-slice";

/* ==============================
======== MetaShowColumn start ===========
================================= */
export const loadMetaShowColumn = createAsyncThunk<
  void,
  void | { requestId?: string | null | undefined; once?: boolean },
  {
    dispatch: AppDispatch;
    state: RootState;
  }
>(
  "request-response/loadMetaShowColumn",
  async (payload, { getState, dispatch }) => {
    if (!payload) payload = {};

    let selectedTab = payload.requestId;
    const once = payload.once ?? false;

    const state = getState() as RootState;

    if (!selectedTab) selectedTab = state.requestResponse.selectedTab;
    if (
      !selectedTab ||
      (state.requestResponse.metaShowColumn[selectedTab] && once)
    )
      return;

    const response =
      await window.electronAPIMetaShowColumnDB.getMetaShowColumn(selectedTab);

    dispatch(handleLoadMetaShowColumn(response));
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
  const response =
    await window.electronAPIMetaShowColumnDB.updateMetaShowColumn(payload);

  if (response) dispatch(loadMetaShowColumn());
  return response;
});
/* ==============================
======== MetaShowColumn end =============
================================= */
