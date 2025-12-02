import { createSelector } from "@reduxjs/toolkit";
import type { RootState } from "@/context/redux/store";
import type { UrlTokenInterface } from "@shared/types/request-url.types";
import { decodeApiUrl } from "@/utils/request-url.utils";
import type { ParamInterface } from "@shared/types/request-response.types";
import {
  paramsTableToString,
  paramsTableToStringParsedFromEnvs
} from "@/utils/request-response.utils";
import { INITIAL_URL_TOKENS_VALUE } from "@/constant/request-url.constant";
import { removeDuplicateEnvs } from "@/utils/environments.utils";
import { selectAuthorizationParamData } from "@/context/redux/request-response/selectors/meta-request";

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
      console.error(error);
      return queryParams;
    }
  }
);

export const selectParsedRequestUrl = createSelector(
  (state: RootState) =>
    state.requestUrl.tokens[state.requestResponse.selectedTab ?? ""],
  (state: RootState) =>
    state.requestResponse.params[state.requestResponse.selectedTab ?? ""],
  (state: RootState) => selectAuthorizationParamData(state),
  (state: RootState) => state.environments.environmentsList,
  (
    tokens: Array<UrlTokenInterface>,
    params: Array<ParamInterface>,
    authorizationParam,
    environmentsList
  ): string => {
    const paramsCopy = [...(params ?? [])];
    const envMap = removeDuplicateEnvs(environmentsList);
    tokens = tokens ?? [...INITIAL_URL_TOKENS_VALUE];

    tokens = tokens.map(token => {
      if (token.type !== "env") return token;

      return {
        ...token,
        type: "text",
        value: envMap.get(token.value)?.value || ""
      };
    });

    if (authorizationParam) paramsCopy.push(authorizationParam);

    const queryParams = paramsTableToStringParsedFromEnvs(paramsCopy, envMap);
    try {
      return decodeApiUrl(tokens) + queryParams;
    } catch (error) {
      console.error(error);
      return queryParams;
    }
  }
);
