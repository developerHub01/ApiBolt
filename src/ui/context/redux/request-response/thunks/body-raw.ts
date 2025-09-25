import { type BodyRawInterface } from "@/types/request-response.types";
import { createAsyncThunk } from "@reduxjs/toolkit";
import type { AppDispatch, RootState } from "@/context/redux/store";
import { handleLoadBodyRaw } from "@/context/redux/request-response/request-response-slice";

/* ==============================
======== Body raw start =============
================================= */
export const loadRequestBodyRaw = createAsyncThunk<
  void,
  void | { requestOrFolderId?: string | null | undefined; once?: boolean },
  {
    dispatch: AppDispatch;
    state: RootState;
  }
>(
  "request-response/loadRequestBodyRaw",
  async (payload, { dispatch, getState }) => {
    try {
      if (!payload) payload = {};

      const state = getState() as RootState;

      const once = payload.once ?? false;
      const selectedTab =
        payload.requestOrFolderId ?? state.requestResponse.selectedTab;

      if (
        !selectedTab ||
        (typeof state.requestResponse.rawData[selectedTab] !== "undefined" &&
          once)
      )
        return;

      const response =
        await window.electronAPIBodyRawDB.getBodyRaw(selectedTab);

      if (response) dispatch(handleLoadBodyRaw(response));
      return;
    } catch (error) {
      console.log(error);
    }
  }
);
export const updateRequestBodyRaw = createAsyncThunk<
  void,
  Omit<Partial<BodyRawInterface>, "requestOrFolderMetaId">,
  {
    dispatch: AppDispatch;
    state: RootState;
  }
>(
  "request-response/updateRequestBodyRaw",
  async (payload, { dispatch, getState }) => {
    try {
      if (!payload) payload = {};

      const state = getState() as RootState;

      const selectedTab = state.requestResponse.selectedTab;

      const response = await window.electronAPIBodyRawDB.updateBodyRaw({
        ...payload,
        ...(selectedTab
          ? {
              requestOrFolderMetaId: selectedTab,
            }
          : {}),
      });

      if (response) dispatch(loadRequestBodyRaw());
      return;
    } catch (error) {
      console.log(error);
    }
  }
);
/* ==============================
======== Body raw end =============
================================= */
