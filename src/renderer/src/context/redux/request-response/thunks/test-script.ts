import { createAsyncThunk } from "@reduxjs/toolkit";
import type { AppDispatch, RootState } from "@/context/redux/store";
import {
  handleLoadTestScript,
  handleUpdateTestScript,
} from "@/context/redux/request-response/request-response-slice";
import { ResponseInterface } from "@shared/types/request-response.types";

/* ==============================
======== Script start ===========
================================= */
export const loadTestScript = createAsyncThunk<
  void,
  void | {
    requestOrFolderId?: string | null | undefined;
    once?: boolean;
  },
  {
    dispatch: AppDispatch;
    state: RootState;
  }
>("test-script/loadTestScript", async (payload, { getState, dispatch }) => {
  try {
    if (!payload) payload = {};

    const state = getState() as RootState;

    const selectedTab =
      payload.requestOrFolderId ?? state.requestResponse.selectedTab;
    const once = payload.once ?? false;

    if (!selectedTab || (state.requestResponse.params[selectedTab] && once))
      return;

    const response =
      await window.electronAPITestScript.getTestScript(selectedTab);
    if (!response) throw new Error();

    dispatch(handleLoadTestScript(response));
  } catch (error) {
    console.error(error);
  }
});

export const updateTestScript = createAsyncThunk<
  boolean,
  {
    id?: string;
    script?: string;
  },
  {
    dispatch: AppDispatch;
    state: RootState;
  }
>("test-script/updateTestScript", async (payload, { dispatch, getState }) => {
  try {
    const state = getState() as RootState;
    const selectedTab = payload?.id ?? state.requestResponse.selectedTab;

    if (!selectedTab) throw new Error();

    dispatch(
      handleUpdateTestScript({
        id: selectedTab,
        script: payload?.script ?? "",
      }),
    );

    const response = await window.electronAPITestScript.updateTestScript({
      requestId: selectedTab,
      script: payload?.script ?? "",
    });

    /* roleback update */
    if (!response) {
      dispatch(loadTestScript());
      throw new Error();
    }

    return true;
  } catch (error) {
    console.error(error);
    return false;
  }
});

export const runTestScript = createAsyncThunk<
  void,
  {
    id?: string;
    response: ResponseInterface;
  },
  {
    dispatch: AppDispatch;
    state: RootState;
  }
>(
  "test-script/runTestScript",
  async ({ id, response: responseBody }, { dispatch, getState }) => {
    try {
      const state = getState() as RootState;
      id = id ?? state.requestResponse.selectedTab ?? undefined;

      if (!id) throw new Error();

      const response = await window.electronAPITestScript.runTestScript({
        requestId: id,
        response: responseBody,
      });

      console.log(response);
    } catch (error) {
      console.error(error);
    }
  },
);
