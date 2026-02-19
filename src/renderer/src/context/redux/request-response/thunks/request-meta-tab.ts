import { type RequestTabInterface } from "@shared/types/request-response.types";
import { createAsyncThunk } from "@reduxjs/toolkit";
import type { AppDispatch, RootState } from "@/context/redux/store";
import {
  handleLoadReqestMetaTab,
  handleUpdateReqestMetaTab,
} from "@/context/redux/request-response/request-response-slice";

/* ==============================
======== ReqestMetaTab start ====
================================= */
export const loadRequestMetaTab = createAsyncThunk<
  void,
  void | {
    requestOrFolderId?: string | null | undefined;
    once?: boolean;
  },
  {
    dispatch: AppDispatch;
    state: RootState;
  }
>(
  "request-response/loadRequestMetaTab",
  async (payload, { dispatch, getState }) => {
    try {
      if (!payload) payload = {};

      const state = getState() as RootState;
      const once = payload.once ?? false;
      const selectedTab =
        payload.requestOrFolderId ?? state.requestResponse.selectedTab;

      if (
        !selectedTab ||
        ([
          state.requestResponse.activeMetaTab[selectedTab],
          state.requestResponse.requestBodyType[selectedTab],
        ].every(data => typeof data !== "undefined") &&
          once)
      )
        return;

      const response =
        await window.electronAPIRequestMetaTab.getRequestMetaTab(selectedTab);

      dispatch(handleLoadReqestMetaTab(response));
    } catch (error) {
      console.error(error);
    }
  },
);

export const updateRequestMetaTab = createAsyncThunk<
  void,
  Partial<RequestTabInterface>,
  {
    dispatch: AppDispatch;
    state: RootState;
  }
>("request-response/updateRequestMetaTab", async (payload, { dispatch }) => {
  try {
    const response =
      await window.electronAPIRequestMetaTab.updateRequestMetaTab(payload);

    if (response)
      dispatch(
        handleUpdateReqestMetaTab({
          ...payload,
        }),
      );
    return;
  } catch (error) {
    console.error(error);
  }
});

export const duplicateRequestMetaTabByOldNewIds = createAsyncThunk<
  boolean,
  Record<string, string>,
  {
    dispatch: AppDispatch;
    state: RootState;
  }
>("request-response/duplicateRequestMetaTabByOldNewIds", async oldNewIdMap => {
  try {
    const response =
      await window.electronAPIRequestMetaTab.duplicateRequestMetaTab(
        oldNewIdMap,
      );

    return response;
  } catch (error) {
    console.error(error);
    return false;
  }
});
/* ==============================
======== ReqestMetaTab end =============
================================= */
