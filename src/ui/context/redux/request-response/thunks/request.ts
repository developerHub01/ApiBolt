import { createAsyncThunk } from "@reduxjs/toolkit";
import type { AppDispatch, RootState } from "@/context/redux/store";
import {
  handleClearBodyBinary,
  handleClearBodyRaw,
  handleClearReqestMetaTab,
  handleSetBodyFormData,
  handleSetBodyXWWWFormUrlencoded,
  handleSetHeaders,
  handleSetParams,
  handleSetResponse,
  handleUpdateRequestOrFolderMeta,
} from "@/context/redux/request-response/request-response-slice";
import { handleRequestUrlClearTokens } from "@/context/redux/request-url/request-url-slice";
import { loadAuthorization } from "@/context/redux/request-response/thunks/auth";
import type { ElectronResponseInterface } from "@/types";

export const clearRequest = createAsyncThunk<
  void,
  void | string,
  {
    dispatch: AppDispatch;
    state: RootState;
  }
>("request-response/clearRequest", async (id, { getState, dispatch }) => {
  try {
    const state = getState() as RootState;
    const requestId = id ?? state.requestResponse.selectedTab;
    if (!requestId || !state.requestResponse.requestList[requestId].method)
      return;

    const response = await window.electronAPIRequest.clearRequestDB(requestId);

    if (!response) return;
    dispatch(
      handleSetParams({
        id: requestId,
        params: [],
      })
    );
    dispatch(
      handleSetHeaders({
        id: requestId,
        headers: [],
      })
    );
    dispatch(
      handleSetBodyFormData({
        id: requestId,
        formData: [],
      })
    );
    dispatch(
      handleSetBodyXWWWFormUrlencoded({
        id: requestId,
        bodyXWWWFormUrlencoded: [],
      })
    );
    dispatch(handleClearBodyRaw(requestId));
    dispatch(handleClearBodyBinary(requestId));
    dispatch(handleClearReqestMetaTab(requestId));
    dispatch(
      handleUpdateRequestOrFolderMeta({
        id: requestId,
        name: undefined,
        method: "get",
      })
    );
    dispatch(handleRequestUrlClearTokens(requestId));
    dispatch(
      handleSetResponse({
        id: requestId,
        response: null,
      })
    );
    await dispatch(
      loadAuthorization({
        requestOrFolderId: requestId,
      })
    );
  } catch (error) {
    console.error(error);
  }
});

export const exportRequest = createAsyncThunk<
  ElectronResponseInterface,
  void | string,
  {
    dispatch: AppDispatch;
    state: RootState;
  }
>("request-response/exportRequest", async (id, { getState }) => {
  try {
    const state = getState() as RootState;
    const requestId = id ?? state.requestResponse.selectedTab;
    if (!requestId || !state.requestResponse.requestList[requestId].method)
      return {
        success: false,
        message: "No request active",
      };

    const response = await window.electronAPIRequest.exportRequest(requestId);

    return response;
  } catch (error) {
    console.error(error);
    return {
      success: false,
      message: "Something went wrong while exporting request.",
    };
  }
});
