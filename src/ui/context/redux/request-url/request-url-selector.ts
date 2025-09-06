import { createSelector } from "@reduxjs/toolkit";
import type { RootState } from "@/context/redux/store";
import type { THostType, UrlTokenInterface } from "@/types/request-url.types";
import { decodeApiUrl } from "@/utils/request-url.utils";
import type { ParamInterface } from "@/types/request-response.types";
import { paramsTableToString } from "@/utils/request-response.utils";
import { v4 as uuidv4 } from "uuid";

export const selectRequestUrlTokens = createSelector(
  [
    (state: RootState) =>
      state.requestUrl.tokens[state.requestResponse.selectedTab ?? ""],
    (state: RootState) =>
      state.requestResponse.params[state.requestResponse.selectedTab ?? ""],
  ],
  (
    tokens: Array<UrlTokenInterface>,
    params: Array<ParamInterface>
  ): Array<UrlTokenInterface> => {
    try {
      const newTokens = tokens ? tokens.map((t) => ({ ...t })) : [];
      const searchQuery = paramsTableToString(params);

      /* if no query params exist then return the unmodified tokens */
      if (!searchQuery) return newTokens;

      /* if in last token no text token exist then add one */
      if (!newTokens.length || newTokens.at(-1)?.type !== "text") {
        newTokens.push({
          id: uuidv4(),
          type: "text",
          value: "",
        });
      }

      const lastIndex = newTokens.length ? newTokens.length - 1 : 0;
      const url = new URL(decodeApiUrl(newTokens));

      if (url.search)
        newTokens[lastIndex].value =
          newTokens[lastIndex].value?.split("?", 2)[0] ?? "";

      newTokens[lastIndex].value += searchQuery;
      return newTokens;
    } catch (error) {
      console.log(error);
      return [];
    }
  }
);

export const selectRequestUrl = createSelector(
  [selectRequestUrlTokens],
  (tokens: Array<UrlTokenInterface>): string => {
    if (!tokens) return "";
    return decodeApiUrl(tokens);
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
