import { createAsyncThunk } from "@reduxjs/toolkit";
import type { AppDispatch, RootState } from "@/context/redux/store";
import { selectRequestUrl } from "@/context/redux/request-url/selectors/url";
import { selectIsHttpMethodType } from "@/context/redux/request-response/selectors/request-list";
import { selectMetaData } from "@/context/redux/request-response/selectors/meta-request";
import {
  selectRawData,
  selectRawRequestBodyType,
  selectRequestBodyType,
} from "@/context/redux/request-response/selectors/body-raw";
import type { APIPayloadBody } from "@/types/request-response.types";
import { filterAndUniqueMetaData } from "@/context/redux/request-response/utils";

export const fetchApi = createAsyncThunk<
  void,
  void,
  {
    dispatch: AppDispatch;
    state: RootState;
  }
>("request-response/fetchApi", async (_, { getState }) => {
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

    payload.url = selectRequestUrl(state);
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

    const response = await window.electronAPI.fetchApi(payload);
    console.log(response);
  } catch (error) {
    console.log(error);
  }
});
