import { type RequestTabInterface } from "@/types/request-response.types";
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
  void | { requestId?: string | null | undefined; once?: boolean },
  { dispatch: AppDispatch; state: RootState }
>(
  "request-response/loadRequestMetaTab",
  async (payload, { dispatch, getState }) => {
    if (!payload) payload = {};

    const once = payload.once ?? false;
    const state = getState() as RootState;

    const selectedTab = state.requestResponse.selectedTab;
    if (
      !selectedTab ||
      ([
        state.requestResponse.activeMetaTab[selectedTab],
        state.requestResponse.requestBodyType[selectedTab],
      ].every((data) => typeof data !== "undefined") &&
        once)
    )
      return;

    const response =
      await window.electronAPIRequestMetaTabDB.getRequestMetaTab();

    dispatch(handleLoadReqestMetaTab(response));
  }
);

export const updateRequestMetaTab = createAsyncThunk<
  void,
  Partial<RequestTabInterface>,
  { dispatch: AppDispatch; state: RootState }
>("request-response/updateRequestMetaTab", async (payload, { dispatch }) => {
  const response =
    await window.electronAPIRequestMetaTabDB.updateRequestMetaTab(payload);

  if (response)
    dispatch(
      handleUpdateReqestMetaTab({
        ...payload,
      })
    );
  return;
});
/* ==============================
======== ReqestMetaTab end =============
================================= */
