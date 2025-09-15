import { createSelector } from "@reduxjs/toolkit";
import type { RootState } from "@/context/redux/store";
import {
  DEFAULT_API_KEY,
  DEFAULT_AUTHORIZATION_ID,
  DEFAULT_BASIC_AUTH,
  DEFAULT_JWT_BEARER_AUTH,
} from "@/constant/authorization.constant";
import type {
  APIKeyInterface,
  BasicAuthInterface,
  JWTBearerAuthInterface,
  TAuthType,
  TBearerToken,
} from "@/types/authorization.types";

export const selectAuthId = createSelector(
  (state: RootState) => state.sidebar.activeTab,
  (state: RootState) => state.requestResponse.selectedTab,
  (activeTab, selectedTab) =>
    activeTab === "collections" && selectedTab
      ? selectedTab
      : DEFAULT_AUTHORIZATION_ID
);

export const selectAuthType = createSelector(
  [selectAuthId, (state: RootState) => state.requestResponse.authType],
  (id, authType): TAuthType =>
    authType[id] ??
    (id === DEFAULT_AUTHORIZATION_ID ? "no-auth" : "inherit-parent")
);

export const selectAuthTypeById = (id: string) =>
  createSelector(
    [(state: RootState) => state.requestResponse.authType[id]],
    (authType): TAuthType =>
      authType ??
      (id === DEFAULT_AUTHORIZATION_ID ? "no-auth" : "inherit-parent")
  );

export const selectAuthInheritedId = createSelector(
  [selectAuthId, (state: RootState) => state.requestResponse.authInheritedId],
  (id, inheritedIds): string | null => inheritedIds[id]
);

export const selectAuthInheritedIdById = (id: string) =>
  createSelector(
    [(state: RootState) => state.requestResponse.authInheritedId[id]],
    (inheritedId): string | null => inheritedId
  );

export const selectAuthApiKey = (id: string) =>
  createSelector(
    [(state: RootState) => state.requestResponse.apiKeyAuth[id]],
    (authData): APIKeyInterface => authData ?? DEFAULT_API_KEY
  );

export const selectAuthBasicAuth = (id: string) =>
  createSelector(
    [(state: RootState) => state.requestResponse.basicAuth[id]],
    (authData): BasicAuthInterface => authData ?? DEFAULT_BASIC_AUTH
  );

export const selectAuthBearerTokenAuth = (id: string) =>
  createSelector(
    [(state: RootState) => state.requestResponse.bearerTokenAuth[id]],
    (authData): TBearerToken => authData ?? ""
  );

export const selectAuthJWTBearerAuth = (id: string) =>
  createSelector(
    [(state: RootState) => state.requestResponse.jwtBearerAuth[id]],
    (authData): JWTBearerAuthInterface => authData ?? DEFAULT_JWT_BEARER_AUTH
  );
