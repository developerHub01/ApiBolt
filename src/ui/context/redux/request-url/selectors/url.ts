import { createSelector } from "@reduxjs/toolkit";
import type { RootState } from "@/context/redux/store";
import type { UrlTokenInterface } from "@/types/request-url.types";
import { decodeApiUrl } from "@/utils/request-url.utils";
import type { ParamInterface } from "@/types/request-response.types";
import { paramsTableToString } from "@/utils/request-response.utils";
import { INITIAL_URL_TOKENS_VALUE } from "@/constant/request-url.constant";

export const selectRequestUrl = createSelector(
  (state: RootState) =>
    state.requestUrl.tokens[state.requestResponse.selectedTab ?? ""],
  (state: RootState) =>
    state.requestResponse.params[state.requestResponse.selectedTab ?? ""],
  (tokens: Array<UrlTokenInterface>, params: Array<ParamInterface>): string => {
    tokens = tokens ?? [...INITIAL_URL_TOKENS_VALUE];
    const queryParams = paramsTableToString(params);
    try {
      return decodeApiUrl(tokens) + queryParams;
    } catch (error) {
      console.log(error);
      return queryParams;
    }
  }
);
