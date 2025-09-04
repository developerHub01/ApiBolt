import { createSelector } from "@reduxjs/toolkit";
import type { RootState } from "@/context/redux/store";
import type { THostType, UrlTokenInterface } from "@/types/request-url.types";

export const selectRequestUrlTokens = createSelector(
  [
    (state: RootState) =>
      state.requestUrl.tokens[state.requestResponse.selectedTab ?? ""],
  ],
  (tokens: Array<UrlTokenInterface>): Array<UrlTokenInterface> => {
    if (!tokens) return [];
    return tokens;
  }
);

export const selectRequestUrlTokenProtocol = createSelector(
  [
    (state: RootState) =>
      state.requestUrl.tokens[state.requestResponse.selectedTab ?? ""],
  ],
  (tokens: Array<UrlTokenInterface>): string => {
    return (
      (tokens ?? []).find((token) => token.id === "protocol")?.value ?? "http"
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
      (tokens ?? []).find((token) => token.id === "host")?.value ?? "localhost"
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
    return (tokens ?? []).find((token) => token.id === "port")?.value ?? "3000";
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
