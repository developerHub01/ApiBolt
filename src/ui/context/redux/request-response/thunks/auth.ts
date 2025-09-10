import { type AuthorizationPayloadInterface } from "@/types/request-response.types";
import { createAsyncThunk } from "@reduxjs/toolkit";
import type { AppDispatch, RootState } from "@/context/redux/store";
import { handleAuthorizations } from "@/context/redux/request-response/request-response-slice";
import { areSamePayload } from "@/utils/helper";

/* ==============================
===== Auth start =========
================================= */
export const loadAuthorization = createAsyncThunk<
  AuthorizationPayloadInterface,
  void,
  {
    dispatch: AppDispatch;
    state: RootState;
  }
>("request-response/loadAuthorization", async (_, { dispatch }) => {
  const authorizationData = await window.electronAPIAuthorizationDB.getAuth();

  dispatch(handleAuthorizations(authorizationData));

  return authorizationData;
});
export const updateAuthorization = createAsyncThunk<
  boolean,
  Partial<Omit<AuthorizationPayloadInterface, "id">>,
  {
    dispatch: AppDispatch;
    state: RootState;
  }
>(
  "request-response/updateAuthorization",
  async (payload, { dispatch, getState }) => {
    const state = getState() as RootState;
    const selectedTab = state.requestResponse.selectedTab;
    if (!selectedTab) return false;

    const existingPayload: Partial<Omit<AuthorizationPayloadInterface, "id">> =
      {
        type: state.requestResponse.authType,
        apiKeyKey: state.requestResponse.apiKeyAuth.key,
        apiKeyValue: state.requestResponse.apiKeyAuth.value,
        apiKeyAddTo: state.requestResponse.apiKeyAuth.addTo,
        bearerToken: state.requestResponse.bearerTokenAuth,
        basicAuthUsername: state.requestResponse.basicAuth.username,
        basicAuthPassword: state.requestResponse.basicAuth.password,
        jwtAlgo: state.requestResponse.jwtBearerAuth.algo,
        jwtSecret: state.requestResponse.jwtBearerAuth.secret,
        jwtPayload: state.requestResponse.jwtBearerAuth.payload,
        jwtHeaderPrefix: state.requestResponse.jwtBearerAuth.headerPrefix,
        jwtAddTo: state.requestResponse.jwtBearerAuth.addTo,
      };

    const areSame = areSamePayload(payload, existingPayload);
    if (areSame) return true;

    const response = await window.electronAPIAuthorizationDB.updateAuth({
      ...payload,
    });

    if (response) dispatch(loadAuthorization());

    return response;
  }
);
/* ==============================
============== Auth end =========
================================= */
