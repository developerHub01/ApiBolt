import { createSelector } from "@reduxjs/toolkit";
import type { RootState } from "@/context/redux/store";
import {
  DEFAULT_API_KEY,
  DEFAULT_AUTHORIZATION_ID,
  DEFAULT_BASIC_AUTH,
  DEFAULT_JWT_BEARER_AUTH,
} from "@/constant/authorization.constant";
import type { TAuthType } from "@shared/types/authorization.types";

export const selectAuthId = createSelector(
  (state: RootState) => state.sidebar.activeTab,
  (state: RootState) => state.requestResponse.selectedTab,
  (activeTab, selectedTab) =>
    activeTab === "navigate_collections" && selectedTab
      ? selectedTab
      : DEFAULT_AUTHORIZATION_ID,
);

export const selectAuthType = createSelector(
  [selectAuthId, (state: RootState) => state.requestResponse.authType],
  (id, authType): TAuthType =>
    authType[id] ??
    (id === DEFAULT_AUTHORIZATION_ID ? "no-auth" : "inherit-parent"),
);

export const selectAuthTypeById = createSelector(
  [(state: RootState) => state.requestResponse.authType, (_, id: string) => id],
  (authType, id) =>
    authType[id] ??
    (id === DEFAULT_AUTHORIZATION_ID ? "no-auth" : "inherit-parent"),
);

export const selectAuthInheritedId = createSelector(
  [selectAuthId, (state: RootState) => state.requestResponse.authInheritedId],
  (id, inheritedIds): string | null => inheritedIds[id],
);

export const selectAuthInheritedIdById = createSelector(
  [
    (state: RootState) => state.requestResponse.authInheritedId,
    (_, id: string) => id,
  ],
  (inheritedIds, id): string | null => inheritedIds[id],
);

export const selectAuthApiKey = createSelector(
  [
    (state: RootState) => state.requestResponse.apiKeyAuth,
    (_, id: string) => id,
  ],
  (authData, id) => authData[id] ?? DEFAULT_API_KEY,
);

export const selectAuthBasicAuth = createSelector(
  [
    (state: RootState) => state.requestResponse.basicAuth,
    (_, id: string) => id,
  ],
  (authData, id) => authData[id] ?? DEFAULT_BASIC_AUTH,
);

export const selectAuthBearerTokenAuth = createSelector(
  [
    (state: RootState) => state.requestResponse.bearerTokenAuth,
    (_, id: string) => id,
  ],
  (authData, id) => authData[id] ?? "",
);

export const selectAuthJWTBearerAuth = createSelector(
  [
    (state: RootState) => state.requestResponse.jwtBearerAuth,
    (_, id: string) => id,
  ],
  (authData, id) => authData[id] ?? DEFAULT_JWT_BEARER_AUTH,
);
