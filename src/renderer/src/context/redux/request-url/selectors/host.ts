import { createSelector } from "@reduxjs/toolkit";
import type { RootState } from "@/context/redux/store";
import type {
  THostType,
  UrlTokenInterface
} from "@shared/types/request-url.types";
import { INITIAL_URL_TOKENS_VALUE } from "@/constant/request-url.constant";

export const selectRequestUrlTokenHost = createSelector(
  [
    (state: RootState) =>
      state.requestUrl.tokens[state.requestResponse.selectedTab ?? ""]
  ],
  (tokens: Array<UrlTokenInterface>): string => {
    return (
      (tokens ?? []).find(token => token.id === "host")?.value ??
      INITIAL_URL_TOKENS_VALUE[1].value
    );
  }
);

export const selectRequestUrlTokenHostType = createSelector(
  [
    (state: RootState) =>
      state.requestUrl.tokens[state.requestResponse.selectedTab ?? ""]
  ],
  (tokens: Array<UrlTokenInterface>): THostType => {
    const host =
      (tokens ?? []).find(token => token.id === "host")?.value ?? "localhost";

    if (["localhost", "127.0.0.1"].includes(host)) return host as THostType;

    return "custom";
  }
);
