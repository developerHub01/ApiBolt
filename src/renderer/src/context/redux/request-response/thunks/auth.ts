import { createAsyncThunk } from "@reduxjs/toolkit";
import type { AppDispatch, RootState } from "@/context/redux/store";
import {
  handleAuthorizations,
  handleAuthorizationsDefault,
  handleAuthorizationsInheritedId,
  handleClearHiddenAuthorizationHeaders,
  handleClearHiddenAuthorizationParams,
  handleUpdateHiddenAuthorizationHeaders,
  handleUpdateHiddenAuthorizationParams,
} from "@/context/redux/request-response/request-response-slice";
import { areSamePayload } from "@/utils/helper";
import {
  AUTH_DEFAULT_HEADER_PREFIX,
  DEFAULT_API_KEY,
  DEFAULT_AUTHORIZATION_ID,
  DEFAULT_BASIC_AUTH,
  DEFAULT_JWT_BEARER_AUTH,
} from "@/constant/authorization.constant";
import type { AuthorizationPayloadInterface } from "@shared/types/authorization.types";

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
          state.sidebar.activeTab === "navigate_collections" && selectedTab
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
        await window.electronAPIAuthorization.getAuth(requestOrFolderId);

      if (!authorizationData) {
        if (requestOrFolderId)
          dispatch(handleAuthorizationsDefault(requestOrFolderId));
        return;
      }

      dispatch(
        handleAuthorizations({
          id: requestOrFolderId,
          payload: authorizationData,
        }),
      );

      dispatch(
        updateHiddenAuthorization({
          requestOrFolderId: requestOrFolderId,
          payload: authorizationData,
        }),
      );
    } catch (error) {
      console.error(error);
    }
  },
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
        await window.electronAPIAuthorization.getInheritedAuthFromId(id);

      if (!authorizationData) return null;
      if (!authorizationData.requestOrFolderMetaId)
        authorizationData.requestOrFolderMetaId = DEFAULT_AUTHORIZATION_ID;

      dispatch(
        handleAuthorizations({
          id: authorizationData.requestOrFolderMetaId,
          payload: authorizationData,
        }),
      );
      dispatch(
        handleAuthorizationsInheritedId({
          requestId: selectedTab,
          inheritedId: authorizationData.requestOrFolderMetaId,
        }),
      );

      dispatch(
        updateHiddenAuthorization({
          requestOrFolderId: authorizationData.requestOrFolderMetaId,
          payload: authorizationData,
        }),
      );

      return authorizationData.requestOrFolderMetaId;
    } catch (error) {
      console.error(error);
      return null;
    }
  },
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
    { dispatch, getState },
  ) => {
    try {
      const payload = {
        requestOrFolderId,
        payload: authorizationData,
      };

      if (authorizationData.type === "no-auth")
        dispatch(updateHiddenAuthorizationNoAuth(payload));
      else if (authorizationData.type === "basic-auth")
        dispatch(updateHiddenAuthorizationBasicAuth(payload));
      else if (authorizationData.type === "bearer-token")
        dispatch(updateHiddenAuthorizationBearerToken(payload));
      else if (authorizationData.type === "jwt-bearer")
        dispatch(updateHiddenAuthorizationJwtBearer(payload));
      else if (authorizationData.type === "api-key")
        dispatch(updateHiddenAuthorizationApiKey(payload));
      else if (authorizationData.type === "inherit-parent") {
        if (!authorizationData.requestOrFolderMetaId) return;
        const inheritedParentId = await dispatch(
          loadInheritParentAuthorization(
            authorizationData.requestOrFolderMetaId,
          ),
        ).unwrap();
        if (!inheritedParentId) return;

        const state = getState() as RootState;
        switch (state.requestResponse.authType[inheritedParentId]) {
          case "no-auth":
            dispatch(updateHiddenAuthorizationNoAuth(payload));
            break;
          case "basic-auth":
            dispatch(updateHiddenAuthorizationBasicAuth(payload));
            break;
          case "bearer-token":
            dispatch(updateHiddenAuthorizationBearerToken(payload));
            break;
          case "jwt-bearer":
            dispatch(updateHiddenAuthorizationJwtBearer(payload));
            break;
          case "api-key":
            dispatch(updateHiddenAuthorizationApiKey(payload));
            break;
        }
      }
    } catch (error) {
      console.error(error);
    }
  },
);

export const updateHiddenAuthorizationNoAuth = createAsyncThunk<
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
  "request-response/updateHiddenAuthorizationNoAuth",
  async ({ requestOrFolderId = DEFAULT_AUTHORIZATION_ID }, { dispatch }) => {
    try {
      /* if no-auth then clearn auth related both params and header */
      dispatch(handleClearHiddenAuthorizationParams(requestOrFolderId));
      dispatch(handleClearHiddenAuthorizationHeaders(requestOrFolderId));
    } catch (error) {
      console.error(error);
    }
  },
);

export const updateHiddenAuthorizationBasicAuth = createAsyncThunk<
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
  "request-response/updateHiddenAuthorizationBasicAuth",
  async (
    {
      requestOrFolderId = DEFAULT_AUTHORIZATION_ID,
      payload: authorizationData,
    },
    { dispatch },
  ) => {
    try {
      let shouldClearHiddenAuthHeaders = false;

      if (
        authorizationData.basicAuthUsername &&
        authorizationData.basicAuthPassword
      ) {
        dispatch(
          handleUpdateHiddenAuthorizationHeaders({
            id: requestOrFolderId,
            value: `Basic ${authorizationData.basicAuthToken}`,
          }),
        );
      } else shouldClearHiddenAuthHeaders = true;

      /* clear other auth params or header other then updating one */
      dispatch(handleClearHiddenAuthorizationParams(requestOrFolderId));
      if (shouldClearHiddenAuthHeaders)
        dispatch(handleClearHiddenAuthorizationHeaders(requestOrFolderId));
    } catch (error) {
      console.error(error);
    }
  },
);

export const updateHiddenAuthorizationBearerToken = createAsyncThunk<
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
  "request-response/updateHiddenAuthorizationBearerToken",
  async (
    {
      requestOrFolderId = DEFAULT_AUTHORIZATION_ID,
      payload: authorizationData,
    },
    { dispatch },
  ) => {
    try {
      let shouldClearHiddenAuthHeaders = false;

      if (authorizationData.bearerToken) {
        let value = authorizationData.bearerToken;

        if (
          !authorizationData.bearerToken.trim().toLowerCase().includes("bearer")
        )
          value = `${AUTH_DEFAULT_HEADER_PREFIX} ${authorizationData.bearerToken}`;

        dispatch(
          handleUpdateHiddenAuthorizationHeaders({
            id: requestOrFolderId,
            value,
          }),
        );
      } else shouldClearHiddenAuthHeaders = true;

      /* clear other auth params or header other then updating one */
      dispatch(handleClearHiddenAuthorizationParams(requestOrFolderId));
      if (shouldClearHiddenAuthHeaders)
        dispatch(handleClearHiddenAuthorizationHeaders(requestOrFolderId));
    } catch (error) {
      console.error(error);
    }
  },
);

export const updateHiddenAuthorizationJwtBearer = createAsyncThunk<
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
  "request-response/updateHiddenAuthorizationJwtBearer",
  async (
    {
      requestOrFolderId = DEFAULT_AUTHORIZATION_ID,
      payload: authorizationData,
    },
    { dispatch },
  ) => {
    try {
      let shouldClearHiddenAuthParams = false;
      let shouldClearHiddenAuthHeaders = false;

      if (
        authorizationData.jwtAlgo &&
        authorizationData.jwtPayload &&
        authorizationData.jwtSecret
      ) {
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
            }),
          );
        } else {
          shouldClearHiddenAuthHeaders = true;
          dispatch(
            handleUpdateHiddenAuthorizationParams({
              id: requestOrFolderId,
              key: authorizationData.jwtHeaderPrefix ?? "token",
              value: authorizationData.jwtAuthToken ?? "",
            }),
          );
        }
      } else {
        shouldClearHiddenAuthParams = true;
        shouldClearHiddenAuthHeaders = true;
      }

      /* clear other auth params or header other then updating one */
      if (shouldClearHiddenAuthParams)
        dispatch(handleClearHiddenAuthorizationParams(requestOrFolderId));
      if (shouldClearHiddenAuthHeaders)
        dispatch(handleClearHiddenAuthorizationHeaders(requestOrFolderId));
    } catch (error) {
      console.error(error);
    }
  },
);

export const updateHiddenAuthorizationApiKey = createAsyncThunk<
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
  "request-response/updateHiddenAuthorizationApiKey",
  async (
    {
      requestOrFolderId = DEFAULT_AUTHORIZATION_ID,
      payload: authorizationData,
    },
    { dispatch },
  ) => {
    try {
      if (!authorizationData.apiKeyKey && !authorizationData.apiKeyValue)
        return;

      let shouldClearHiddenAuthParams = false;
      let shouldClearHiddenAuthHeaders = false;

      if (authorizationData.apiKeyKey && authorizationData.apiKeyValue) {
        if (authorizationData.apiKeyAddTo === "header") {
          shouldClearHiddenAuthParams = true;
          dispatch(
            handleUpdateHiddenAuthorizationHeaders({
              id: requestOrFolderId,
              key: authorizationData.apiKeyKey ?? "",
              value: authorizationData.apiKeyValue ?? "",
            }),
          );
        } else {
          shouldClearHiddenAuthHeaders = true;
          dispatch(
            handleUpdateHiddenAuthorizationParams({
              id: requestOrFolderId,
              key: authorizationData.apiKeyKey ?? "",
              value: authorizationData.apiKeyValue ?? "",
            }),
          );
        }
      } else {
        shouldClearHiddenAuthParams = true;
        shouldClearHiddenAuthHeaders = true;
      }

      /* clear other auth params or header other then updating one */
      if (shouldClearHiddenAuthParams)
        dispatch(handleClearHiddenAuthorizationParams(requestOrFolderId));
      if (shouldClearHiddenAuthHeaders)
        dispatch(handleClearHiddenAuthorizationHeaders(requestOrFolderId));
    } catch (error) {
      console.error(error);
    }
  },
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
          (state.sidebar.activeTab === "navigate_collections" && selectedTab
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
        }),
      );

      const response = await window.electronAPIAuthorization.updateAuth({
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
        dispatch(
          updateHiddenAuthorization({
            requestOrFolderId: requestOrFolderId,
            /* as AuthorizationPayloadInterface because other properties not need */
            payload: response,
          }),
        );
      }

      /* if not success then load again to retrive the changes by calling handleAuthorizations reducer */
      if (!response) {
        await dispatch(
          loadAuthorization({
            requestOrFolderId,
          }),
        );
      }

      return Boolean(response);
    } catch (error) {
      console.error(error);
      return false;
    }
  },
);

export const duplicateAuthorizationByOldNewIds = createAsyncThunk<
  boolean,
  Record<string, string>,
  {
    dispatch: AppDispatch;
    state: RootState;
  }
>("request-response/duplicateAuthorizationByOldNewIds", async oldNewIdMap => {
  try {
    const response =
      await window.electronAPIAuthorization.duplicateAuth(oldNewIdMap);

    return response;
  } catch (error) {
    console.error(error);
    return false;
  }
});

/* ==============================
============== Auth end =========
================================= */
