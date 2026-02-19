import { createSelector } from "@reduxjs/toolkit";
import type { RootState } from "@/context/redux/store";
import type { UrlTokenInterface } from "@shared/types/request-url.types";
import { decodeApiUrl } from "@/utils/request-url.utils";
import type {
  ParamInterface,
  PathParamInterface,
} from "@shared/types/request-response.types";
import {
  paramsTableToString,
  paramsTableToStringParsedFromEnvs,
} from "@/utils/request-response.utils";
import { INITIAL_URL_TOKENS_VALUE } from "@/constant/request-url.constant";
import { removeDuplicateEnvs } from "@/utils/environments.utils";
import { selectAuthorizationParamData } from "@/context/redux/request-response/selectors/meta-request";
import { GLOBAL_ENVS_SET } from "@/constant/global-envs.constant";
import { generateFake } from "@/utils/global-envs.utils";

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
  },
);

export const selectParsedRequestUrl = createSelector(
  (state: RootState) =>
    state.requestUrl.tokens[state.requestResponse.selectedTab ?? ""],
  (state: RootState) =>
    state.requestResponse.params[state.requestResponse.selectedTab ?? ""],
  (state: RootState) =>
    state.requestResponse.pathParams[state.requestResponse.selectedTab ?? ""],
  (state: RootState) => selectAuthorizationParamData(state),
  (state: RootState) => state.environments.environmentsList,
  (
    tokens: Array<UrlTokenInterface>,
    params: Array<ParamInterface>,
    pathParams: PathParamInterface = {},
    authorizationParam,
    environmentsList,
  ): string => {
    const paramsCopy = [...(params ?? [])];
    const envMap = removeDuplicateEnvs(environmentsList);
    tokens = tokens ?? [...INITIAL_URL_TOKENS_VALUE];

    tokens = tokens.map(token => {
      if (token.type === "path-params")
        return {
          ...token,
          type: "text",
          value: pathParams[token.value]?.value ?? token.value,
        };
      else if (token.type === "env") {
        const isGlobalEnv = GLOBAL_ENVS_SET.has(token.value);
        const globalValue = generateFake(token.value).toString();
        const envValue = envMap.get(token.value)?.value;

        const value = isGlobalEnv ? globalValue : envValue ? envValue : "";

        return {
          ...token,
          type: "text",
          value,
        };
      } else return token;
    });

    if (authorizationParam) paramsCopy.push(authorizationParam);

    const queryParams = paramsTableToStringParsedFromEnvs(paramsCopy, envMap);
    try {
      return decodeApiUrl(tokens) + queryParams;
    } catch (error) {
      console.error(error);
      return queryParams;
    }
  },
);
