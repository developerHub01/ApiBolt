import { createAsyncThunk } from "@reduxjs/toolkit";
import type { AppDispatch, RootState } from "@/context/redux/store";
import {
  selectParsedRequestUrl,
  selectRequestUrl
} from "@/context/redux/request-url/selectors/url";
import { selectIsHttpMethodType } from "@/context/redux/request-response/selectors/request-list";
import { selectMetaData } from "@/context/redux/request-response/selectors/meta-request";
import {
  selectRawData,
  selectRawRequestBodyType,
  selectRequestBodyType
} from "@/context/redux/request-response/selectors/body-raw";
import type {
  APIPayloadBody,
  ParamInterface
} from "@shared/types/request-response.types";
import { filterAndUniqueMetaData } from "@/context/redux/request-response/utils";
import {
  handleActiveResponseMetaTab,
  handleSetResponse
} from "@/context/redux/request-response/request-response-slice";
import type { CreateHistoryItemInterface } from "@shared/types/history.types";
import {
  handleAddHistory,
  handleReplaceHistory
} from "@/context/redux/history/history-slice";
import { handleIsFetchApiLoading } from "@/context/redux/status/status-slice";

export const fetchApi = createAsyncThunk<
  void,
  void,
  {
    dispatch: AppDispatch;
    state: RootState;
  }
>("request-response/fetchApi", async (_, { getState, dispatch }) => {
  try {
    const state = getState() as RootState;
    const requestId = state.requestResponse.selectedTab;
    if (!requestId || !state.requestResponse.requestList[requestId].method)
      return;

    /* start loading =================== */
    dispatch(
      handleIsFetchApiLoading({
        requestId,
        isLoading: true
      })
    );

    const payload: APIPayloadBody = {
      url: "",
      method: "get",
      headers: {},
      bodyType: "none"
    };

    payload.url = selectParsedRequestUrl(state);
    payload.method = selectIsHttpMethodType(state);
    const rawHeaders = filterAndUniqueMetaData(
      selectMetaData(state, {
        type: "headers"
      }) ?? []
    );
    const rawHiddenHeaders = filterAndUniqueMetaData(
      selectMetaData(state, {
        type: "hiddenHeaders"
      }) ?? []
    );

    rawHeaders
      .concat(rawHiddenHeaders)
      .forEach(
        header => (payload.headers[header.key] = header.value as string)
      );

    payload.bodyType = selectRequestBodyType(state);

    if (payload.bodyType && payload.bodyType !== "none") {
      switch (payload.bodyType) {
        case "raw":
          payload.rawSubType = selectRawRequestBodyType(state);
          payload.rawData = selectRawData(state);
          break;

        case "x-www-form-urlencoded":
          payload.xWWWformDataUrlencoded = filterAndUniqueMetaData(
            selectMetaData(state, { type: "x-www-form-urlencoded" }) ?? []
          ) as APIPayloadBody["xWWWformDataUrlencoded"];
          break;

        case "form-data":
          payload.formData = filterAndUniqueMetaData(
            selectMetaData(state, { type: "form-data" }) ?? []
          );
          break;

        default:
          /* binary or unknown handled elsewhere */
          break;
      }
    }

    const response = (await window.electronAPI.fetchApi(payload)) ?? null;

    dispatch(
      handleSetResponse({
        id: requestId,
        response
      })
    );

    /***
     * ====================================
     * ========= History process ==========
     * ====================================
     * ***/
    const rawHeaderData = (
      selectMetaData(state, {
        type: "hiddenHeaders"
      }) ?? []
    ).concat(
      selectMetaData(state, {
        type: "headers"
      }) ?? []
    ) as Array<ParamInterface>;

    const rawFormData = (selectMetaData(state, {
      type: "form-data"
    }) ?? []) as Array<ParamInterface>;

    const xWWWFormUrlencoded = (selectMetaData(state, {
      type: "x-www-form-urlencoded"
    }) ?? []) as Array<ParamInterface>;

    const historyPayload: CreateHistoryItemInterface = {
      request: requestId,
      url: selectRequestUrl(state),
      method: payload.method,
      name: state.requestResponse.requestList[requestId].name,
      params: state.requestResponse.params[requestId],
      headers: rawHeaderData,
      responseStatus: `${response.status} ${response.statusText}`,
      responseSize: {
        requestSize: response.requestSize,
        responseSize: response.responseSize
      }
    };

    if (state.requestResponse.authType[requestId]) {
      historyPayload.authorization = {
        type: state.requestResponse.authType[requestId]
      };

      /***
       * ============================
       * if inheritedId have that mean inherited type so then type will show inherited authorization type
       * if not inherited then it will show current auth type in type and the details of that type auth only
       * ============================
       * **/
      if (
        state.requestResponse.authType[requestId] === "inherit-parent" &&
        state.requestResponse.authInheritedId[requestId]
      ) {
        /* as inherited then type will be inherited authorization type */
        historyPayload.authorization.type =
          state.requestResponse.authType[
            state.requestResponse.authInheritedId[requestId]
          ];

        historyPayload.authorization.inheritedId =
          state.requestResponse.authInheritedId[requestId];

        /* pick data based on inherited authorization type */
        switch (historyPayload.authorization.type) {
          case "basic-auth":
            historyPayload.authorization.basicAuth =
              state.requestResponse.basicAuth[requestId];
            break;
          case "api-key":
            historyPayload.authorization.apiKeyAuth =
              state.requestResponse.apiKeyAuth[requestId];
            break;
          case "bearer-token":
            historyPayload.authorization.bearerAuth =
              state.requestResponse.bearerTokenAuth[requestId];
            break;
          case "jwt-bearer":
            historyPayload.authorization.jwtAuth =
              state.requestResponse.jwtBearerAuth[requestId];
            break;
        }
      } else {
        historyPayload.authorization.inheritedId = null;

        switch (state.requestResponse.authType[requestId]) {
          case "basic-auth":
            historyPayload.authorization.basicAuth =
              state.requestResponse.basicAuth[requestId];
            break;
          case "api-key":
            historyPayload.authorization.apiKeyAuth =
              state.requestResponse.apiKeyAuth[requestId];
            break;
          case "bearer-token":
            historyPayload.authorization.bearerAuth =
              state.requestResponse.bearerTokenAuth[requestId];
            break;
          case "jwt-bearer":
            historyPayload.authorization.jwtAuth =
              state.requestResponse.jwtBearerAuth[requestId];
            break;
        }
      }
    }

    if (payload.bodyType !== "none") {
      historyPayload.body = {
        type: payload.bodyType
      };

      switch (payload.bodyType) {
        case "binary": {
          historyPayload.body.binaryData =
            state.requestResponse.binaryData[requestId] ?? null;
          break;
        }
        case "form-data": {
          if (rawFormData) historyPayload.body.formData = rawFormData;
          break;
        }
        case "x-www-form-urlencoded": {
          if (xWWWFormUrlencoded)
            historyPayload.body.xWWWFormUrlencoded = xWWWFormUrlencoded;
          break;
        }
        case "raw": {
          if (payload.rawData) {
            historyPayload.body.raw = payload.rawData;
            historyPayload.body.rawType = payload.rawSubType;
          }
          break;
        }
      }
    }

    const historyResponse = await window.electronAPIHistory.createHistory({
      ...historyPayload
    });

    if (historyResponse)
      dispatch(
        /* if array response means history modified so replace full history list */
        Array.isArray(historyResponse)
          ? handleReplaceHistory(historyResponse)
          : /* if not array repsonse means history not modified so just add new history at top */
            handleAddHistory(historyResponse)
      );

    /**
     * ================================
     * Handle response tabs
     * ================================
     */
    const existingActiveTab =
      state.requestResponse.activeResponseMetaTab[requestId];

    if (!response?.status) dispatch(handleActiveResponseMetaTab("error"));
    else if (!existingActiveTab || existingActiveTab === "error")
      dispatch(handleActiveResponseMetaTab("body"));

    /* end loading ================== */
    dispatch(
      handleIsFetchApiLoading({
        requestId,
        isLoading: false
      })
    );
  } catch (error) {
    console.error(error);
  }
});
