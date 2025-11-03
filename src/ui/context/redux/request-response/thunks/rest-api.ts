import { createAsyncThunk } from "@reduxjs/toolkit";
import type { AppDispatch, RootState } from "@/context/redux/store";
import {
  selectParsedRequestUrl,
  selectRequestUrl,
} from "@/context/redux/request-url/selectors/url";
import { selectIsHttpMethodType } from "@/context/redux/request-response/selectors/request-list";
import { selectMetaData } from "@/context/redux/request-response/selectors/meta-request";
import {
  selectRawData,
  selectRawRequestBodyType,
  selectRequestBodyType,
} from "@/context/redux/request-response/selectors/body-raw";
import type {
  APIPayloadBody,
  ParamInterface,
} from "@/types/request-response.types";
import { filterAndUniqueMetaData } from "@/context/redux/request-response/utils";
import {
  handleChangeIsLoading,
  handleSetResponse,
} from "@/context/redux/request-response/request-response-slice";
import type { CreateHistoryItemInterface } from "@/types/history.types";
import { handleAddHistoryByRequestId } from "@/context/redux/history/history-slice";

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

    const payload: APIPayloadBody = {
      url: "",
      method: "get",
      headers: {},
      bodyType: "none",
    };

    payload.url = selectParsedRequestUrl(state);
    payload.method = selectIsHttpMethodType(state);
    const rawHeaders = filterAndUniqueMetaData(
      selectMetaData({
        type: "headers",
      })(state) ?? []
    );
    const rawHiddenHeaders = filterAndUniqueMetaData(
      selectMetaData({
        type: "hiddenHeaders",
      })(state) ?? []
    );

    rawHeaders
      .concat(rawHiddenHeaders)
      .forEach(
        (header) => (payload.headers[header.key] = header.value as string)
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
            selectMetaData({ type: "x-www-form-urlencoded" })(state) ?? []
          ) as APIPayloadBody["xWWWformDataUrlencoded"];
          break;

        case "form-data":
          payload.formData = filterAndUniqueMetaData(
            selectMetaData({ type: "form-data" })(state) ?? []
          );
          break;

        default:
          /* binary or unknown handled elsewhere */
          break;
      }
    }

    dispatch(
      handleChangeIsLoading({
        id: requestId,
        value: true,
      })
    );
    const response = (await window.electronAPI.fetchApi(payload)) ?? null;
    dispatch(
      handleChangeIsLoading({
        id: requestId,
        value: false,
      })
    );

    dispatch(
      handleSetResponse({
        id: requestId,
        response,
      })
    );

    /***
     * ====================================
     * ========= History process ==========
     * ====================================
     * ***/
    const rawHeaderData = (
      selectMetaData({
        type: "headers",
      })(state) ?? []
    ).concat(
      selectMetaData({
        type: "hiddenHeaders",
      })(state) ?? []
    ) as Array<ParamInterface>;

    const rawFormData = (selectMetaData({
      type: "form-data",
    })(state) ?? []) as Array<ParamInterface>;

    const xWWWFormUrlencoded = (selectMetaData({
      type: "x-www-form-urlencoded",
    })(state) ?? []) as Array<ParamInterface>;

    const historyPayload: CreateHistoryItemInterface = {
      request: requestId,
      url: selectRequestUrl(state),
      method: payload.method,
      name: state.requestResponse.requestList[requestId].name,
      params: state.requestResponse.params[requestId],
      headers: rawHeaderData,
      formData: rawFormData,
      xWWWFormUrlencoded: xWWWFormUrlencoded,
      requestBodyType: payload.bodyType,
      rawType: payload.rawSubType,
      raw: payload.rawData,
      responseStatus: `${response.status} ${response.statusText}`,
      responseSize: {
        requestSize: response.requestSize,
        responseSize: response.responseSize,
      },
    };

    if (state.requestResponse.authType[requestId])
      historyPayload.authorization = {
        type: state.requestResponse.authType[requestId],
        inheritedId: state.requestResponse.authInheritedId[requestId],
        basicAuth: state.requestResponse.basicAuth[requestId],
        bearerAuth: state.requestResponse.bearerTokenAuth[requestId],
        jwtAuth: state.requestResponse.jwtBearerAuth[requestId],
        apiKeyAuth: state.requestResponse.apiKeyAuth[requestId],
      };

    if (payload.binaryData) historyPayload.binaryData = payload.binaryData;

    const historyResponse = await window.electronAPIHistory.createHistory({
      ...historyPayload,
    });

    if (historyResponse)
      dispatch(
        handleAddHistoryByRequestId({
          requestId,
          payload: historyResponse,
        })
      );
  } catch (error) {
    console.error(error);
  }
});
