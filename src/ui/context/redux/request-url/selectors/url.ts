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
      console.error(error);
      return queryParams;
    }
  }
);

export const selectParsedRequestUrl = createSelector(
  (state: RootState) => state.requestResponse.selectedTab,
  (state: RootState) =>
    state.requestUrl.tokens[state.requestResponse.selectedTab ?? ""],
  (state: RootState) =>
    state.requestResponse.params[state.requestResponse.selectedTab ?? ""],
  (state: RootState) => state.requestResponse.authorizationParam,
  (state: RootState) =>
    state.requestResponse.authType[state.requestResponse.selectedTab ?? ""],
  (state: RootState) =>
    state.requestResponse.authInheritedId[
      state.requestResponse.selectedTab ?? ""
    ],
  (state: RootState) => state.requestResponse.environmentsList,
  (
    selectedTab,
    tokens: Array<UrlTokenInterface>,
    params: Array<ParamInterface>,
    authorizationParams,
    authType,
    authInheritedId,
    environmentsList
  ): string => {
    const paramsCopy = [...(params ?? [])];
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

    /* here authHiddenParam will appply based on the authType if authType is anything but inherited-parents then use selectedTab hiddenParam else that inerited-parents meta request hiddenParams */
    const authirizationParam =
      authType === "inherit-parent"
        ? authorizationParams[authInheritedId!]
        : authorizationParams[selectedTab!];
    if (authirizationParam) paramsCopy.push(authirizationParam);

    const queryParams = paramsTableToStringParsedFromEnvs(paramsCopy, envMap);
    try {
      return decodeApiUrl(tokens) + queryParams;
    } catch (error) {
      console.error(error);
      return queryParams;
    }
  }
);
