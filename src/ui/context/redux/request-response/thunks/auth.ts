import { createAsyncThunk } from "@reduxjs/toolkit";
import type { AppDispatch, RootState } from "@/context/redux/store";
import {
  handleAuthorizations,
  handleAuthorizationsInheritedId,
} from "@/context/redux/request-response/request-response-slice";
import { areSamePayload } from "@/utils/helper";
import {
  DEFAULT_API_KEY,
  DEFAULT_AUTHORIZATION_ID,
  DEFAULT_BASIC_AUTH,
  DEFAULT_JWT_BEARER_AUTH,
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
      } else if (requestOrFolderId === DEFAULT_AUTHORIZATION_ID)
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

      if (!authorizationData) return null;
      if (!authorizationData.requestOrFolderMetaId)
        authorizationData.requestOrFolderMetaId = DEFAULT_AUTHORIZATION_ID;

      dispatch(
        handleAuthorizations({
          id: authorizationData.requestOrFolderMetaId,
          payload: authorizationData,
        })
      );
      dispatch(
        handleAuthorizationsInheritedId({
          requestId: selectedTab,
          inheritedId: authorizationData.requestOrFolderMetaId,
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

      const tempId = requestOrFolderId ?? DEFAULT_AUTHORIZATION_ID;
      const existingPayload: Partial<
        Omit<AuthorizationPayloadInterface, "id">
      > = {
        type: state.requestResponse.authType[tempId] ?? "no-auth",
        apiKeyKey:
          state.requestResponse.apiKeyAuth[tempId]?.key ?? DEFAULT_API_KEY.key,
        apiKeyValue:
          state.requestResponse.apiKeyAuth[tempId]?.value ??
          DEFAULT_API_KEY.value,
        apiKeyAddTo:
          state.requestResponse.apiKeyAuth[tempId]?.addTo ??
          DEFAULT_API_KEY.addTo,
        bearerToken: state.requestResponse.bearerTokenAuth[tempId],
        basicAuthUsername:
          state.requestResponse.basicAuth[tempId]?.username ??
          DEFAULT_BASIC_AUTH.username,
        basicAuthPassword:
          state.requestResponse.basicAuth[tempId]?.password ??
          DEFAULT_BASIC_AUTH.password,
        jwtAlgo:
          state.requestResponse.jwtBearerAuth[tempId]?.algo ??
          DEFAULT_JWT_BEARER_AUTH.algo,
        jwtSecret:
          state.requestResponse.jwtBearerAuth[tempId]?.secret ??
          DEFAULT_JWT_BEARER_AUTH.secret,
        jwtPayload:
          state.requestResponse.jwtBearerAuth[tempId]?.payload ??
          DEFAULT_JWT_BEARER_AUTH.payload,
        jwtHeaderPrefix:
          state.requestResponse.jwtBearerAuth[tempId]?.headerPrefix ??
          DEFAULT_JWT_BEARER_AUTH.headerPrefix,
        jwtAddTo:
          state.requestResponse.jwtBearerAuth[tempId]?.addTo ??
          DEFAULT_JWT_BEARER_AUTH.addTo,
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
        requestOrFolderId:
          requestOrFolderId === DEFAULT_AUTHORIZATION_ID
            ? undefined
            : requestOrFolderId,
        payload,
      });

      /* if update successfully and updating type and in change from inheri-parent type */
      if (
        response &&
        requestOrFolderId &&
        payload.type &&
        (state.requestResponse.authType[requestOrFolderId] !==
          "inherit-parent" ||
          payload.type === "inherit-parent")
      )
        await dispatch(loadInheritParentAuthorization(requestOrFolderId));

      /* if not success then load again to retrive the changes by calling handleAuthorizations reducer */
      if (!response) {
        await dispatch(
          loadAuthorization({
            requestOrFolderId,
          })
        );
      }

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
