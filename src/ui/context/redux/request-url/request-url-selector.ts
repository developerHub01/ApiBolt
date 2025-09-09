import { createSelector } from "@reduxjs/toolkit";
import type { RootState } from "@/context/redux/store";
import type { THostType, UrlTokenInterface } from "@/types/request-url.types";
import { decodeApiUrl } from "@/utils/request-url.utils";
import type { ParamInterface } from "@/types/request-response.types";
import { paramsTableToString } from "@/utils/request-response.utils";
import { initialUrlTokensValue } from "@/constant/request-url.constant";

export const selectRequestUrlTokens = createSelector(
  [
    (state: RootState) =>
      state.requestUrl.tokens[state.requestResponse.selectedTab ?? ""],
  ],
  (tokens: Array<UrlTokenInterface>): Array<UrlTokenInterface> =>
    tokens ?? [...initialUrlTokensValue]
);

export const selectRequestUrl = createSelector(
  (state: RootState) =>
    state.requestUrl.tokens[state.requestResponse.selectedTab ?? ""],
  (state: RootState) =>
    state.requestResponse.params[state.requestResponse.selectedTab ?? ""],
  (tokens: Array<UrlTokenInterface>, params: Array<ParamInterface>): string => {
    tokens = tokens ?? [...initialUrlTokensValue];
    const queryParams = paramsTableToString(params);
    try {
      return decodeApiUrl(tokens) + queryParams;
    } catch (error) {
      console.log(error);
      return queryParams;
    }
  }
);

export const selectRequestUrlTokenProtocol = createSelector(
  [
    (state: RootState) =>
      state.requestUrl.tokens[state.requestResponse.selectedTab ?? ""],
  ],
  (tokens: Array<UrlTokenInterface>): string => {
    return (
      (tokens ?? []).find((token) => token.id === "protocol")?.value ??
      initialUrlTokensValue[0].value
    );
  }
);

export const selectRequestUrlTokenHost = createSelector(
  [
    (state: RootState) =>
      state.requestUrl.tokens[state.requestResponse.selectedTab ?? ""],
  ],
  (tokens: Array<UrlTokenInterface>): string => {
    return (
      (tokens ?? []).find((token) => token.id === "host")?.value ??
      initialUrlTokensValue[1].value
    );
  }
);

export const selectRequestUrlTokenHostType = createSelector(
  [
    (state: RootState) =>
      state.requestUrl.tokens[state.requestResponse.selectedTab ?? ""],
  ],
  (tokens: Array<UrlTokenInterface>): THostType => {
    const host =
      (tokens ?? []).find((token) => token.id === "host")?.value ?? "localhost";

    if (["localhost", "127.0.0.1"].includes(host)) return host as THostType;

    return "custom";
  }
);

export const selectRequestUrlTokenPort = createSelector(
  [
    (state: RootState) =>
      state.requestUrl.tokens[state.requestResponse.selectedTab ?? ""],
  ],
  (tokens: Array<UrlTokenInterface>): string => {
    return (
      (tokens ?? []).find((token) => token.id === "port")?.value ??
      initialUrlTokensValue[2].value
    );
  }
);

export const selectRequestUrlTokenById = (id: string) =>
  createSelector(
    [
      (state: RootState) =>
        state.requestUrl.tokens[state.requestResponse.selectedTab ?? ""],
    ],
    (tokens: Array<UrlTokenInterface>): string | null => {
      return (tokens ?? []).find((token) => token.id === id)?.value ?? null;
    }
  );
