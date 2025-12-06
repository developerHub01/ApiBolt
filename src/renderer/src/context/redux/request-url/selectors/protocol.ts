import { createSelector } from "@reduxjs/toolkit";
import type { RootState } from "@/context/redux/store";
import type { UrlTokenInterface } from "@shared/types/request-url.types";
import { INITIAL_URL_TOKENS_VALUE } from "@/constant/request-url.constant";

export const selectRequestUrlTokenProtocol = createSelector(
  [
    (state: RootState) =>
      state.requestUrl.tokens[state.requestResponse.selectedTab ?? ""],
  ],
  (tokens: Array<UrlTokenInterface>): string => {
    return (
      (tokens ?? []).find(token => token.id === "protocol")?.value ??
      INITIAL_URL_TOKENS_VALUE[0].value
    );
  },
);

export const selectRequestUrlTokenPort = createSelector(
  [
    (state: RootState) =>
      state.requestUrl.tokens[state.requestResponse.selectedTab ?? ""],
  ],
  (tokens: Array<UrlTokenInterface>): string => {
    return (
      (tokens ?? []).find(token => token.id === "port")?.value ??
      INITIAL_URL_TOKENS_VALUE[2].value
    );
  },
);
