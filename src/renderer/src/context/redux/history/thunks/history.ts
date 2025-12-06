import { createAsyncThunk } from "@reduxjs/toolkit";
import type { AppDispatch, RootState } from "@/context/redux/store";
import {
  handleChangeFilterMethod,
  handleChangeOpenedHistory,
  handleClearHistoryCache,
  handleDeleteHistory,
  handleLoadHistory,
  handleReplaceHistoryDetails,
} from "@/context/redux/history/history-slice";
import type { THistoryFilter } from "@shared/types/history.types";
import { loadParams } from "@/context/redux/request-response/thunks/params";
import { loadBodyXWWWFormUrlencoded } from "@/context/redux/request-response/thunks/body-x-www-form-urlencoded";
import { loadBodyFormData } from "@/context/redux/request-response/thunks/body-form-data";
import { loadRequestBodyBinary } from "@/context/redux/request-response/thunks/body-binary";
import { loadRequestBodyRaw } from "@/context/redux/request-response/thunks/body-raw";
import { loadRequestMetaTab } from "@/context/redux/request-response/thunks/request-meta-tab";
import { updateAuthorization } from "@/context/redux/request-response/thunks/auth";
import { changeRequestApiUrlWithBackend } from "@/context/redux/request-url/thunks/request-url";
import { updateRequestOrFolder } from "@/context/redux/request-response/thunks/request-list";
import {
  loadHeaders,
  loadHiddenHeaders,
} from "@/context/redux/request-response/thunks/headers";
import type { HiddenHeadersCheckInterface } from "@shared/types/request-response.types";
import { HEADERS_HIDDEN_IDS } from "@/constant/request-response.constant";

export const loadRequestHistoryMeta = createAsyncThunk<
  void,
  string | void | null,
  {
    dispatch: AppDispatch;
    state: RootState;
  }
>("history/loadRequestHistoryMeta", async (id, { dispatch, getState }) => {
  try {
    const state = getState() as RootState;
    if (!id) id = state.requestResponse.selectedTab;
    if (!id) return;

    const response = await window.electronAPIHistory.getHistoryByRequestId(id);

    dispatch(handleLoadHistory(response));
  } catch (error) {
    console.error(error);
  }
});

export const loadRequestHistory = createAsyncThunk<
  void,
  void,
  {
    dispatch: AppDispatch;
    state: RootState;
  }
>("history/loadRequestHistory", async (_, { dispatch, getState }) => {
  try {
    const state = getState() as RootState;
    const id = state.history.openedHistory;
    if (!id || !id.id) return;

    const response = await window.electronAPIHistory.getHistoryById(id.id);
    dispatch(handleReplaceHistoryDetails(response));
  } catch (error) {
    console.error(error);
  }
});

export const deleteRequestHistoryById = createAsyncThunk<
  boolean,
  string | void | undefined | null,
  {
    dispatch: AppDispatch;
    state: RootState;
  }
>("history/deleteRequestHistoryById", async (id, { dispatch, getState }) => {
  try {
    const state = getState() as RootState;
    const requestId = state.requestResponse.selectedTab;
    if (!id || !requestId) return false;

    dispatch(handleDeleteHistory(id));

    const response = await window.electronAPIHistory.deleteHistoryById(id);

    if (response) return true;

    dispatch(loadRequestHistoryMeta(requestId));
    return false;
  } catch (error) {
    console.error(error);
    return false;
  }
});

export const deleteRequestHistoryByRequestId = createAsyncThunk<
  boolean,
  string | void | undefined | null,
  {
    dispatch: AppDispatch;
    state: RootState;
  }
>(
  "history/deleteRequestHistoryByRequestId",
  async (requestId, { dispatch, getState }) => {
    try {
      const state = getState() as RootState;
      if (!requestId) requestId = state.requestResponse.selectedTab;
      if (!requestId) return false;

      dispatch(handleClearHistoryCache());

      const response =
        await window.electronAPIHistory.deleteHistoryByRequestId(requestId);

      if (response) return true;

      dispatch(loadRequestHistoryMeta(requestId));
      return false;
    } catch (error) {
      console.error(error);
      return false;
    }
  },
);

export const changeHistoryFilterMethod = createAsyncThunk<
  void,
  {
    requestId?: string;
    method: THistoryFilter;
  },
  {
    dispatch: AppDispatch;
    state: RootState;
  }
>(
  "history/changeHistoryFilterMethod",
  async ({ requestId, method }, { dispatch, getState }) => {
    try {
      const state = getState() as RootState;

      if (!requestId)
        requestId = state.requestResponse.selectedTab ?? undefined;
      if (!requestId) return;

      dispatch(
        handleChangeFilterMethod({
          requestId,
          method,
        }),
      );
    } catch (error) {
      console.error(error);
    }
  },
);

export const changeOpenedHistory = createAsyncThunk<
  void,
  string | undefined | null,
  {
    dispatch: AppDispatch;
    state: RootState;
  }
>("history/changeOpenedHistory", async (id, { dispatch, getState }) => {
  try {
    const state = getState() as RootState;
    const requestId = state.requestResponse.selectedTab ?? undefined;

    if (!id || !requestId) {
      dispatch(handleChangeOpenedHistory());
      return;
    }

    dispatch(
      handleChangeOpenedHistory({
        id,
        requestId,
      }),
    );
  } catch (error) {
    console.error(error);
  }
});

export const replaceCurrentByHistory = createAsyncThunk<
  boolean,
  string | undefined | null,
  {
    dispatch: AppDispatch;
    state: RootState;
  }
>("history/replaceCurrentByHistory", async (_, { dispatch, getState }) => {
  try {
    const state = getState() as RootState;
    const historyDetails = state.history.historyDetails;
    const requestId = state.history.openedHistory?.requestId;
    if (!requestId || !historyDetails) return false;

    const { url, method, name, headers, params, body, authorization } =
      historyDetails;

    /**
     * =================
     *  Headers
     * =================
     */
    if (headers?.length) {
      const headersResponse = await window.electronAPIHeaders.replaceHeaders(
        requestId,
        headers.filter(header => !header.prevent),
      );

      const checkList = headers
        .filter(header => header.prevent || HEADERS_HIDDEN_IDS.has(header.id))
        .reduce((acc, curr) => {
          acc[curr.id] = curr.isCheck;
          return acc;
        }, {} as Partial<HiddenHeadersCheckInterface>);

      const headerCheckResponse =
        await window.electronAPIHiddenHeadersCheck.updateHiddenHeadersCheck(
          checkList,
        );

      if (headersResponse) dispatch(loadHeaders());
      if (headerCheckResponse) dispatch(loadHiddenHeaders());
    }

    /**
     * =================
     *  Params
     * =================
     */
    {
      const paramsResponse = await window.electronAPIParams.replaceParams(
        requestId,
        params ?? [],
      );
      if (paramsResponse)
        dispatch(
          loadParams({
            requestOrFolderId: requestId,
          }),
        );
    }

    /**
     * =================
     *  url
     * =================
     */
    dispatch(changeRequestApiUrlWithBackend({ url }));

    /**
     * =================
     *  request meta data
     * =================
     */
    dispatch(
      updateRequestOrFolder({
        id: requestId,
        method,
        name,
      }),
    );

    /**
     * =================
     *  Authorization
     * =================
     */
    if (authorization) {
      dispatch(
        updateAuthorization({
          requestOrFolderId: requestId,
          payload: authorization,
        }),
      );
    }

    /**
     * =================
     *  Body type
     * =================
     */
    if (body?.type) {
      const bodyTypeResponse =
        await window.electronAPIRequestMetaTab.replaceRequestMetaTab({
          requestOrFolderMetaId: requestId,
          requestBodyType: historyDetails.body?.type,
        });
      if (bodyTypeResponse)
        dispatch(
          loadRequestMetaTab({
            requestOrFolderId: requestId,
          }),
        );
    }

    /**
     * =================
     *  form-data
     * =================
     */
    if (body?.type === "form-data") {
      const formDataResponse =
        await window.electronAPIBodyFormData.replaceFullBodyFormData(
          requestId,
          historyDetails?.body?.formData?.map(form => ({
            ...form,
            value: Array.isArray(form.value)
              ? JSON.stringify(form.value.map(item => item.path))
              : form.value,
          })),
        );

      if (formDataResponse)
        dispatch(
          loadBodyFormData({
            requestOrFolderId: requestId,
          }),
        );
    }

    /**
     * =================
     *  x-www-form-urlencoded
     * =================
     */
    if (body?.type === "x-www-form-urlencoded") {
      const xWWWFormUrlencodedResponse =
        await window.electronAPIBodyXWWWFormUrlencoded.replaceBodyXWWWFormUrlencoded(
          requestId,
          historyDetails?.body?.xWWWFormUrlencoded,
        );
      if (xWWWFormUrlencodedResponse)
        dispatch(
          loadBodyXWWWFormUrlencoded({
            requestOrFolderId: requestId,
          }),
        );
    }

    /**
     * =================
     *  binary
     * =================
     */
    if (body?.type === "binary") {
      const binaryResponse =
        await window.electronAPIBodyBinary.replaceBodyBinary({
          requestOrFolderMetaId: requestId,
          path: historyDetails?.body?.binaryData?.path,
        });
      if (binaryResponse)
        dispatch(
          loadRequestBodyBinary({
            requestOrFolderId: requestId,
          }),
        );
    }

    /**
     * =================
     *  raw
     * =================
     */
    if (body?.type === "raw") {
      const rawResponse = await window.electronAPIBodyRaw.replaceBodyRaw({
        requestOrFolderMetaId: requestId,
        rawData: body.raw,
        type: body.rawType,
      });
      if (rawResponse)
        dispatch(
          loadRequestBodyRaw({
            requestOrFolderId: requestId,
          }),
        );
    }

    return true;
  } catch (error) {
    console.error(error);
    return false;
  }
});
