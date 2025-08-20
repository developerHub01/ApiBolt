import { type AuthorizationPayloadInterface } from "@/types/request-response.types";
import { createAsyncThunk } from "@reduxjs/toolkit";
import type { AppDispatch, RootState } from "@/context/redux/store";
import { handleAuthorizations } from "@/context/redux/request-response/request-response-slice";

/* ==============================
===== Auth start =========
================================= */
export const loadAuthorization = createAsyncThunk<
  AuthorizationPayloadInterface,
  void,
  { dispatch: AppDispatch; state: RootState }
>("request-response/loadAuthorization", async (_, { dispatch }) => {
  const authorizationData = await window.electronAPIAuthorizationDB.getAuth();

  dispatch(handleAuthorizations(authorizationData));

  return authorizationData;
});
export const updateAuthorization = createAsyncThunk<
  boolean,
  Partial<Omit<AuthorizationPayloadInterface, "id">>,
  { dispatch: AppDispatch; state: RootState }
>("request-response/updateAuthorization", async (payload, { dispatch }) => {
  const response = await window.electronAPIAuthorizationDB.updateAuth({
    ...payload,
  });

  if (response) dispatch(loadAuthorization());

  return response;
});
/* ==============================
============== Auth end =========
================================= */
