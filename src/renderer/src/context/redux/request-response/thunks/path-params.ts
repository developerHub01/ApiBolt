import { PathParamInterface } from "@shared/types/request-response.types";
import { createAsyncThunk } from "@reduxjs/toolkit";
import type { AppDispatch, RootState } from "@/context/redux/store";
import { handleLoadPathParams } from "@/context/redux/request-response/request-response-slice";

/* ==============================
======== PathParams start ===========
================================= */
export const loadPathParams = createAsyncThunk<
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
  "request-response/loadPathParams",
  async (payload, { getState, dispatch }) => {
    try {
      if (!payload) payload = {};

      const state = getState() as RootState;

      const selectedTab =
        payload.requestOrFolderId ?? state.requestResponse.selectedTab;
      const once = payload.once ?? false;

      if (
        !selectedTab ||
        (state.requestResponse.pathParams[selectedTab] && once)
      )
        return;

      const response =
        await window.electronAPIPathParams.getPathParams(selectedTab);

      dispatch(handleLoadPathParams(response));
    } catch (error) {
      console.error(error);
    }
  },
);

export const updatePathParams = createAsyncThunk<
  boolean,
  {
    paramId: string;
    payload: Partial<PathParamInterface[string]>;
  },
  {
    dispatch: AppDispatch;
    state: RootState;
  }
>(
  "request-response/updatePathParams",
  async ({ paramId, payload }, { getState, dispatch }) => {
    try {
      const state = getState();
      const selectedTab = state.requestResponse.selectedTab;

      if (!selectedTab) return false;

      const currentParams =
        state.requestResponse.pathParams?.[selectedTab] ?? {};

      const updatedParam: PathParamInterface[string] = {
        value: payload.value ?? currentParams[paramId]?.value?.trim() ?? "",
        description:
          payload.description ??
          currentParams[paramId]?.description?.trim() ??
          "",
      };

      const updatedParams: PathParamInterface = {
        ...currentParams,
        [paramId]: updatedParam,
      };

      const response = await window.electronAPIPathParams.updatePathParams(
        selectedTab,
        updatedParams,
      );

      if (response) dispatch(loadPathParams());

      return response;
    } catch (error) {
      console.error(error);
      return false;
    }
  },
);

export const deletePathParamsByRequestMetaId = createAsyncThunk<
  boolean,
  string | undefined | null,
  {
    dispatch: AppDispatch;
    state: RootState;
  }
>(
  "request-response/deletePathParamsByRequestMetaId",
  async (id, { getState, dispatch }) => {
    try {
      const state = getState() as RootState;
      if (!id) id = state.requestResponse.selectedTab;

      if (!id) return false;

      const response =
        await window.electronAPIPathParams.deletePathParamsByRequestMetaId(id);

      if (response) dispatch(handleLoadPathParams({}));
      return response;
    } catch (error) {
      console.error(error);
      return false;
    }
  },
);
/* ==============================
======== PathParams end =============
================================= */
