import { createAsyncThunk } from "@reduxjs/toolkit";
import type { AppDispatch, RootState } from "@/context/redux/store";
import {
  handleAuthorizations,
  handleAuthorizationsInheritedId,
  handleClearHiddenAuthorizationHeaders,
  handleClearHiddenParams,
  handleSetHiddenParams,
  handleUpdateHiddenAuthorizationHeaders,
} from "@/context/redux/request-response/request-response-slice";
import { areSamePayload } from "@/utils/helper";
import {
  AUTH_DEFAULT_HEADER_PREFIX,
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

      dispatch(
        updateHiddenAuthorization({
          requestOrFolderId: requestOrFolderId,
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

export const updateHiddenAuthorization = createAsyncThunk<
  void,
  {
    requestOrFolderId?: string;
    payload: AuthorizationPayloadInterface;
  },
  {
    dispatch: AppDispatch;
    state: RootState;
  }
>(
  "request-response/updateHiddenAuthorization",
  async (
    {
      requestOrFolderId = DEFAULT_AUTHORIZATION_ID,
      payload: authorizationData,
    },
    { dispatch }
  ) => {
    try {
      let shouldClearHiddenAuthParams = false;
      let shouldClearHiddenAuthHeaders = false;

      /* if no-auth then clearn auth related both params and header */
      if (authorizationData.type === "no-auth") {
        shouldClearHiddenAuthParams = true;
        shouldClearHiddenAuthHeaders = true;
        /* if "basic-auth", "bearer-token" type then clearn auth related params and update only authorization header */
      } else if (authorizationData.type === "basic-auth") {
        shouldClearHiddenAuthParams = true;
        dispatch(
          handleUpdateHiddenAuthorizationHeaders({
            id: requestOrFolderId,
            value: `Basic ${authorizationData.basicAuthToken}`,
          })
        );
      } else if (authorizationData.type === "bearer-token") {
        shouldClearHiddenAuthParams = true;
        let value = authorizationData.bearerToken;

        if (
          !authorizationData.bearerToken.trim().toLowerCase().includes("bearer")
        )
          value = `${AUTH_DEFAULT_HEADER_PREFIX} ${authorizationData.bearerToken}`;

        dispatch(
          handleUpdateHiddenAuthorizationHeaders({
            id: requestOrFolderId,
            value,
          })
        );
        /* if "basic-auth", "bearer-token" type then clearn auth related params and update only authorization header */
      } else if (authorizationData.type === "jwt-bearer") {
        if (authorizationData.jwtAddTo === "header") {
          shouldClearHiddenAuthParams = true;
          const prefix = authorizationData.jwtHeaderPrefix
            ? (authorizationData.jwtHeaderPrefix ??
                AUTH_DEFAULT_HEADER_PREFIX) + " "
            : "";
          dispatch(
            handleUpdateHiddenAuthorizationHeaders({
              id: requestOrFolderId,
              value: `${prefix}${authorizationData.jwtAuthToken}`,
            })
          );
        } else {
          shouldClearHiddenAuthHeaders = true;
          dispatch(
            handleSetHiddenParams({
              id: requestOrFolderId,
              param: {
                key: authorizationData.jwtHeaderPrefix ?? "token",
                value: authorizationData.jwtAuthToken ?? "",
              },
            })
          );
        }
      } else if (
        authorizationData.type === "api-key" &&
        (authorizationData.apiKeyKey || authorizationData.apiKeyValue)
      ) {
        if (authorizationData.apiKeyAddTo === "header") {
          shouldClearHiddenAuthParams = true;
          dispatch(
            handleUpdateHiddenAuthorizationHeaders({
              id: requestOrFolderId,
              key: authorizationData.apiKeyKey ?? "",
              value: authorizationData.apiKeyValue ?? "",
            })
          );
        } else {
          shouldClearHiddenAuthHeaders = true;
          dispatch(
            handleSetHiddenParams({
              id: requestOrFolderId,
              param: {
                key: authorizationData.apiKeyKey ?? "",
                value: authorizationData.apiKeyValue ?? "",
              },
            })
          );
        }
      }

      /* clear other auth params or header other then updating one */
      if (shouldClearHiddenAuthParams)
        dispatch(handleClearHiddenParams(requestOrFolderId));
      if (shouldClearHiddenAuthHeaders)
        dispatch(handleClearHiddenAuthorizationHeaders(requestOrFolderId));
    } catch (error) {
      console.log(error);
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
          (state.sidebar.activeTab === "collections" && selectedTab
            ? selectedTab
            : requestOrFolderId) ?? DEFAULT_AUTHORIZATION_ID;
      }

      const tempId = requestOrFolderId ?? DEFAULT_AUTHORIZATION_ID;
      const existingPayload: Partial<
        Omit<AuthorizationPayloadInterface, "id">
      > = {
        type: state.requestResponse.authType[tempId],
        apiKeyKey:
          state.requestResponse.apiKeyAuth[tempId]?.key?.trim() ??
          DEFAULT_API_KEY.key,
        apiKeyValue:
          state.requestResponse.apiKeyAuth[tempId]?.value?.trim() ??
          DEFAULT_API_KEY.value,
        apiKeyAddTo:
          state.requestResponse.apiKeyAuth[tempId]?.addTo ??
          DEFAULT_API_KEY.addTo,
        bearerToken: state.requestResponse.bearerTokenAuth[tempId]?.trim(),
        basicAuthUsername:
          state.requestResponse.basicAuth[tempId]?.username?.trim() ??
          DEFAULT_BASIC_AUTH.username,
        basicAuthPassword:
          state.requestResponse.basicAuth[tempId]?.password?.trim() ??
          DEFAULT_BASIC_AUTH.password,
        jwtAlgo:
          state.requestResponse.jwtBearerAuth[tempId]?.algo?.trim() ??
          DEFAULT_JWT_BEARER_AUTH.algo,
        jwtSecret:
          state.requestResponse.jwtBearerAuth[tempId]?.secret?.trim() ??
          DEFAULT_JWT_BEARER_AUTH.secret,
        jwtPayload:
          state.requestResponse.jwtBearerAuth[tempId]?.payload?.trim() ??
          DEFAULT_JWT_BEARER_AUTH.payload,
        jwtHeaderPrefix:
          state.requestResponse.jwtBearerAuth[tempId]?.headerPrefix?.trim() ??
          DEFAULT_JWT_BEARER_AUTH.headerPrefix,
        jwtAddTo:
          state.requestResponse.jwtBearerAuth[tempId]?.addTo ??
          DEFAULT_JWT_BEARER_AUTH.addTo,
      };

      if (areSamePayload(payload, existingPayload)) return true;

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
        requestOrFolderId !== DEFAULT_AUTHORIZATION_ID &&
        payload.type &&
        (state.requestResponse.authType[requestOrFolderId] !==
          "inherit-parent" ||
          payload.type === "inherit-parent")
      ) {
        await dispatch(loadInheritParentAuthorization(requestOrFolderId));
      }
      /* update hidden auth data */
      if (response && requestOrFolderId) {
        // const updatedState = getState() as RootState;
        // const authorizationData = {
        //   type: updatedState.requestResponse.authType[requestOrFolderId],
        //   basicAuthUsername:
        //     updatedState.requestResponse.basicAuth[requestOrFolderId].username,
        //   basicAuthPassword:
        //     updatedState.requestResponse.basicAuth[requestOrFolderId].password,
        //   bearerToken:
        //     updatedState.requestResponse.bearerTokenAuth[requestOrFolderId],
        //   jwtAlgo:
        //     updatedState.requestResponse.jwtBearerAuth[requestOrFolderId].algo,
        //   jwtSecret:
        //     updatedState.requestResponse.jwtBearerAuth[requestOrFolderId]
        //       .secret,
        //   jwtPayload:
        //     updatedState.requestResponse.jwtBearerAuth[requestOrFolderId]
        //       .payload,
        //   jwtHeaderPrefix:
        //     updatedState.requestResponse.jwtBearerAuth[requestOrFolderId]
        //       .headerPrefix,
        //   jwtAddTo:
        //     updatedState.requestResponse.jwtBearerAuth[requestOrFolderId].addTo,
        //   apiKeyKey:
        //     updatedState.requestResponse.apiKeyAuth[requestOrFolderId].key,
        //   apiKeyValue:
        //     updatedState.requestResponse.apiKeyAuth[requestOrFolderId].value,
        //   apiKeyAddTo:
        //     updatedState.requestResponse.apiKeyAuth[requestOrFolderId].addTo,
        //   bearerTokenAuth: response.basicAuthToken ?? "",
        //   jwtAuthToken: response.jwtAuthToken ?? "",
        // };

        dispatch(
          updateHiddenAuthorization({
            requestOrFolderId: requestOrFolderId,
            /* as AuthorizationPayloadInterface because other properties not need */
            payload: response,
          })
        );
      }

      /* if not success then load again to retrive the changes by calling handleAuthorizations reducer */
      if (!response) {
        await dispatch(
          loadAuthorization({
            requestOrFolderId,
          })
        );
      }

      return Boolean(response);
    } catch (error) {
      console.log(error);
      return false;
    }
  }
);
/* ==============================
============== Auth end =========
================================= */
