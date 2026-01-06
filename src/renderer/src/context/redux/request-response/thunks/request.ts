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
import type { ElectronResponseInterface } from "@shared/types";
import { loadParams } from "@/context/redux/request-response/thunks/params";
import {
  loadHeaders,
  loadHiddenHeaders,
} from "@/context/redux/request-response/thunks/headers";
import { loadRequestMetaTab } from "@/context/redux/request-response/thunks/request-meta-tab";
import { loadMetaShowColumn } from "@/context/redux/request-response/thunks/meta-show-column";
import { loadShowHiddenMetaData } from "@/context/redux/request-response/thunks/show-hidden-meta-data";
import { loadBodyFormData } from "@/context/redux/request-response/thunks/body-form-data";
import { loadBodyXWWWFormUrlencoded } from "@/context/redux/request-response/thunks/body-x-www-form-urlencoded";
import { loadRequestBodyRaw } from "@/context/redux/request-response/thunks/body-raw";
import { loadRequestBodyBinary } from "@/context/redux/request-response/thunks/body-binary";
import { loadApiUrl } from "@/context/redux/request-url/thunks/request-url";
import {
  forceLoadRequestList,
  loadSingleRequestMeta,
} from "@/context/redux/request-response/thunks/request-list";

export const clearRequest = createAsyncThunk<
  ElectronResponseInterface,
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
      return {
        success: false,
        message: "No request active",
      };

    const response = await window.electronAPIRequest.clearRequest(requestId);
    if (!response) return response;

    dispatch(
      handleSetParams({
        id: requestId,
        params: [],
      }),
    );
    dispatch(
      handleSetHeaders({
        id: requestId,
        headers: [],
      }),
    );
    dispatch(
      handleSetBodyFormData({
        id: requestId,
        formData: [],
      }),
    );
    dispatch(
      handleSetBodyXWWWFormUrlencoded({
        id: requestId,
        bodyXWWWFormUrlencoded: [],
      }),
    );
    dispatch(handleClearBodyRaw(requestId));
    dispatch(handleClearBodyBinary(requestId));
    dispatch(handleClearReqestMetaTab(requestId));
    dispatch(
      handleUpdateRequestOrFolderMeta({
        id: requestId,
        name: undefined,
        method: "get",
      }),
    );
    dispatch(handleRequestUrlClearTokens(requestId));
    dispatch(
      handleSetResponse({
        id: requestId,
        response: null,
      }),
    );
    await dispatch(
      loadAuthorization({
        requestOrFolderId: requestId,
      }),
    );

    return response;
  } catch (error) {
    console.error(error);
    return {
      success: false,
      message: "Something went wrong while clearing the request.",
    };
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

export const importRequest = createAsyncThunk<
  ElectronResponseInterface,
  void | string | null,
  {
    dispatch: AppDispatch;
    state: RootState;
  }
>(
  "request-response/importRequest",
  async (requestId, { getState, dispatch }) => {
    try {
      const state = getState() as RootState;
      /**
       * if requestId exist then check do it have in requestlist
       * and if requestId dont have means have to import in root
       */
      const meta = requestId
        ? state.requestResponse.requestList[requestId]
        : null;
      if (requestId && !meta)
        return {
          success: false,
          message: "Request not found.",
        };

      const response = await window.electronAPIRequest.importRequest(
        requestId ?? null,
      );

      if (!response.success) return response;

      /**
       * if requestId have and it is a request not folder then again load everything of the request
       * ***/
      if (requestId && meta?.method) {
        await Promise.all([
          dispatch(loadSingleRequestMeta(requestId)),
          dispatch(
            loadAuthorization({
              requestOrFolderId: requestId,
            }),
          ),
          dispatch(
            loadParams({
              requestOrFolderId: requestId,
            }),
          ),
          dispatch(
            loadHeaders({
              requestOrFolderId: requestId,
            }),
          ),
          dispatch(
            loadHiddenHeaders({
              requestOrFolderId: requestId,
            }),
          ),
          dispatch(
            loadRequestMetaTab({
              requestOrFolderId: requestId,
            }),
          ),
          dispatch(
            loadMetaShowColumn({
              requestOrFolderId: requestId,
            }),
          ),
          dispatch(
            loadShowHiddenMetaData({
              requestOrFolderId: requestId,
            }),
          ),
          dispatch(
            loadBodyFormData({
              requestOrFolderId: requestId,
            }),
          ),
          dispatch(
            loadBodyXWWWFormUrlencoded({
              requestOrFolderId: requestId,
            }),
          ),
          dispatch(
            loadRequestBodyRaw({
              requestOrFolderId: requestId,
            }),
          ),
          dispatch(
            loadRequestBodyBinary({
              requestOrFolderId: requestId,
            }),
          ),
          dispatch(
            loadApiUrl({
              requestOrFolderId: requestId,
            }),
          ),
        ]);
      } else dispatch(forceLoadRequestList());

      return response;
    } catch (error) {
      console.error(error);
      return {
        success: false,
        message: "Something went wrong while exporting request.",
      };
    }
  },
);

export const exportFolder = createAsyncThunk<
  ElectronResponseInterface,
  string,
  {
    dispatch: AppDispatch;
    state: RootState;
  }
>("request-response/exportFolder", async (id, { getState }) => {
  try {
    const state = getState() as RootState;
    const requestId = id ?? state.requestResponse.selectedTab;
    if (!requestId || state.requestResponse.requestList[requestId].method)
      return {
        success: false,
        message: "No request active",
      };

    const response = await window.electronAPIRequest.exportFolder(requestId);

    return response;
  } catch (error) {
    console.error(error);
    return {
      success: false,
      message: "Something went wrong while exporting request.",
    };
  }
});

export const importFolder = createAsyncThunk<
  ElectronResponseInterface,
  string | undefined | null,
  {
    dispatch: AppDispatch;
    state: RootState;
  }
>("request-response/importFolder", async (id, { dispatch, getState }) => {
  try {
    const state = getState() as RootState;
    /* if pass any request id and if it is not folder then exit */
    if (id && !state.requestResponse.requestList[id])
      return {
        success: false,
        message: "Folder not found.",
      };

    const response = await window.electronAPIRequest.importFolder(id ?? null);
    if (!response.success) return response;

    await dispatch(forceLoadRequestList());
    return response;
  } catch (error) {
    console.error(error);
    return {
      success: false,
      message: "Something went wrong while importing request folder.",
    };
  }
});
