import { createSelector } from "@reduxjs/toolkit";
import type { RootState } from "@/context/redux/store";
import type { UrlTokenInterface } from "@shared/types/request-url.types";
import { INITIAL_URL_TOKENS_VALUE } from "@/constant/request-url.constant";

export const selectRequestUrlTokens = createSelector(
  [
    (state: RootState) =>
      state.requestUrl.tokens[state.requestResponse.selectedTab ?? ""]
  ],
  (tokens: Array<UrlTokenInterface>): Array<UrlTokenInterface> =>
    tokens ?? [...INITIAL_URL_TOKENS_VALUE]
);

export const selectRequestUrlTokenById = createSelector(
  [
    (state: RootState) =>
      state.requestUrl.tokens[state.requestResponse.selectedTab ?? ""],
    (_, id: string) => id
  ],
  (tokens: Array<UrlTokenInterface>, id): string | null => {
    return (tokens ?? []).find(token => token.id === id)?.value ?? null;
  }
);
