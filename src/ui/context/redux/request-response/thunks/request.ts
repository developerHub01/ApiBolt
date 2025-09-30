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
  handleUpdateRequestOrFolderMeta,
} from "@/context/redux/request-response/request-response-slice";
import { handleRequestUrlClearTokens } from "@/context/redux/request-url/request-url-slice";
import { loadAuthorization } from "@/context/redux/request-response/thunks/auth";

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
      })
    );
    dispatch(handleRequestUrlClearTokens(requestId));
    await dispatch(
      loadAuthorization({
        requestOrFolderId: requestId,
      })
    );
  } catch (error) {
    console.log(error);
  }
});
