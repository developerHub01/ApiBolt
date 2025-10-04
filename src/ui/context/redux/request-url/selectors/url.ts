import { createSelector } from "@reduxjs/toolkit";
import type { RootState } from "@/context/redux/store";
import type { UrlTokenInterface } from "@/types/request-url.types";
import { decodeApiUrl } from "@/utils/request-url.utils";
import type { ParamInterface } from "@/types/request-response.types";
import {
  paramsTableToString,
  paramsTableToStringParsedFromEnvs,
} from "@/utils/request-response.utils";
import { INITIAL_URL_TOKENS_VALUE } from "@/constant/request-url.constant";
import { removeDuplicateEnvs } from "@/utils/environments.utils";

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

export const selectParsedRequestUrl = createSelector(
  (state: RootState) =>
    state.requestUrl.tokens[state.requestResponse.selectedTab ?? ""],
  (state: RootState) =>
    state.requestResponse.params[state.requestResponse.selectedTab ?? ""],
  (state: RootState) => state.requestResponse.environmentsList,
  (
    tokens: Array<UrlTokenInterface>,
    params: Array<ParamInterface>,
    environmentsList
  ): string => {
    const envMap = removeDuplicateEnvs(environmentsList);
    tokens = tokens ?? [...INITIAL_URL_TOKENS_VALUE];

    tokens = tokens.map((token) => {
      if (token.type !== "env") return token;

      return {
        ...token,
        type: "text",
        value: envMap.get(token.value)?.value || "",
      };
    });

    const queryParams = paramsTableToStringParsedFromEnvs(params, envMap);
    try {
      return decodeApiUrl(tokens) + queryParams;
    } catch (error) {
      console.log(error);
      return queryParams;
    }
  }
);
