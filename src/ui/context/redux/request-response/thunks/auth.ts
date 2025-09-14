import { createAsyncThunk } from "@reduxjs/toolkit";
import type { AppDispatch, RootState } from "@/context/redux/store";
import { handleAuthorizations } from "@/context/redux/request-response/request-response-slice";
import { areSamePayload } from "@/utils/helper";
import {
  defaultApiKey,
  defaultAuthorizationId,
  defaultBasicAuth,
  defaultJWTBearerAuth,
} from "@/constant/authorization.constant";
import type { AuthorizationPayloadInterface } from "@/types/authorization.types";

/* ==============================
===== Auth start =========
================================= */
export const loadAuthorization = createAsyncThunk<
  void,
  { requestOrFolderId?: string; once?: boolean } | void,
  {
    dispatch: AppDispatch;
    state: RootState;
  }
>(
  "request-response/loadAuthorization",
  async ({ requestOrFolderId, once = false } = {}, { dispatch, getState }) => {
    try {
      const state = getState() as RootState;
      const selectedTab = state.requestResponse.selectedTab;

      if (!requestOrFolderId) {
        /* if not id passed then check is selected tab is collection if then is there any selected tab, if then use that selectedTab as id else passed id */
        requestOrFolderId =
          state.sidebar.activeTab === "collections" && selectedTab
            ? selectedTab
            : requestOrFolderId;
      } else if (requestOrFolderId === defaultAuthorizationId)
        requestOrFolderId = undefined;

      /* following condition means that auth data already loaded */
      if (
        requestOrFolderId &&
        once &&
        state.requestResponse.requestList[requestOrFolderId] &&
        state.requestResponse.authType[requestOrFolderId]
      )
        return;

      const authorizationData =
        await window.electronAPIAuthorizationDB.getAuth(requestOrFolderId);
      if (!authorizationData) return;

      dispatch(
        handleAuthorizations({
          id: requestOrFolderId,
          payload: authorizationData,
        })
      );
    } catch (error) {
      console.log(error);
    }
  }
);

export const loadInheritParentAuthorization = createAsyncThunk<
  string | null,
  string,
  {
    dispatch: AppDispatch;
    state: RootState;
  }
>(
  "request-response/loadInheritParentAuthorization",
  async (id, { getState, dispatch }) => {
    try {
      const state = getState() as RootState;
      const selectedTab = state.requestResponse.selectedTab;
      if (!selectedTab) return null;

      const authorizationData =
        await window.electronAPIAuthorizationDB.getInheritedAuthFromId(id);

      if (!authorizationData || !authorizationData.requestOrFolderMetaId)
        return null;

      dispatch(
        handleAuthorizations({
          id: authorizationData.requestOrFolderMetaId,
          payload: authorizationData,
        })
      );

      return authorizationData.requestOrFolderMetaId;
    } catch (error) {
      console.log(error);
      return null;
    }
  }
);

export const updateAuthorization = createAsyncThunk<
  boolean,
  {
    requestOrFolderId?: string;
    payload: Partial<Omit<AuthorizationPayloadInterface, "id">>;
  },
  {
    dispatch: AppDispatch;
    state: RootState;
  }
>(
  "request-response/updateAuthorization",
  async ({ requestOrFolderId, payload }, { dispatch, getState }) => {
    try {
      const state = getState() as RootState;
      const selectedTab = state.requestResponse.selectedTab;

      if (!requestOrFolderId) {
        /* if not id passed then check is selected tab is collection if then is there any selected tab, if then use that selectedTab as id else passed id */
        requestOrFolderId =
          state.sidebar.activeTab === "collections" && selectedTab
            ? selectedTab
            : requestOrFolderId;
      }

      const tempId = requestOrFolderId ?? defaultAuthorizationId;
      const existingPayload: Partial<
        Omit<AuthorizationPayloadInterface, "id">
      > = {
        type: state.requestResponse.authType[tempId] ?? "no-auth",
        apiKeyKey:
          state.requestResponse.apiKeyAuth[tempId]?.key ?? defaultApiKey.key,
        apiKeyValue:
          state.requestResponse.apiKeyAuth[tempId]?.value ??
          defaultApiKey.value,
        apiKeyAddTo:
          state.requestResponse.apiKeyAuth[tempId]?.addTo ??
          defaultApiKey.addTo,
        bearerToken: state.requestResponse.bearerTokenAuth[tempId],
        basicAuthUsername:
          state.requestResponse.basicAuth[tempId]?.username ??
          defaultBasicAuth.username,
        basicAuthPassword:
          state.requestResponse.basicAuth[tempId]?.password ??
          defaultBasicAuth.password,
        jwtAlgo:
          state.requestResponse.jwtBearerAuth[tempId]?.algo ??
          defaultJWTBearerAuth.algo,
        jwtSecret:
          state.requestResponse.jwtBearerAuth[tempId]?.secret ??
          defaultJWTBearerAuth.secret,
        jwtPayload:
          state.requestResponse.jwtBearerAuth[tempId]?.payload ??
          defaultJWTBearerAuth.payload,
        jwtHeaderPrefix:
          state.requestResponse.jwtBearerAuth[tempId]?.headerPrefix ??
          defaultJWTBearerAuth.headerPrefix,
        jwtAddTo:
          state.requestResponse.jwtBearerAuth[tempId]?.addTo ??
          defaultJWTBearerAuth.addTo,
      };

      const areSame = areSamePayload(payload, existingPayload);
      if (areSame) return true;

      dispatch(
        handleAuthorizations({
          id: requestOrFolderId,
          payload,
        })
      );

      const response = await window.electronAPIAuthorizationDB.updateAuth({
        requestOrFolderId,
        payload,
      });

      /* if not success then load again to retrive the changes by calling handleAuthorizations reducer */
      if (!response)
        await dispatch(
          loadAuthorization({
            requestOrFolderId,
          })
        );

      return response;
    } catch (error) {
      console.log(error);
      return false;
    }
  }
);
/* ==============================
============== Auth end =========
================================= */
