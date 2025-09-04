import { createAsyncThunk } from "@reduxjs/toolkit";
import type { AppDispatch, RootState } from "@/context/redux/store";
import type {
  TAPIUrlTokenType,
  UrlTokenInterface,
} from "@/types/request-url.types";
import {
  handleRequestUrlAddToken,
  handleRequestUrlDeleteToken,
  handleRequestUrlUpdateToken,
} from "@/context/redux/request-url/request-url-slice";

export const requestUrlAddToken = createAsyncThunk<
  void,
  {
    type: TAPIUrlTokenType;
    preTokenId: string;
  },
  { dispatch: AppDispatch }
>("request-url/requestUrlAddToken", (payload, { dispatch, getState }) => {
  const state = getState() as RootState;

  const selectedTab = state.requestResponse.selectedTab;
  if (!selectedTab) return;

  dispatch(
    handleRequestUrlAddToken({
      ...payload,
      selectedTab,
    })
  );
});

export const requestUrlUpdateToken = createAsyncThunk<
  void,
  Partial<UrlTokenInterface> & Pick<UrlTokenInterface, "id">,
  { dispatch: AppDispatch }
>("request-url/requestUrlUpdateToken", (payload, { dispatch, getState }) => {
  const state = getState() as RootState;

  const selectedTab = state.requestResponse.selectedTab;

  console.log({ selectedTab, payload });

  if (!selectedTab) return;

  dispatch(
    handleRequestUrlUpdateToken({
      ...payload,
      selectedTab,
    })
  );
});

export const requestUrlDeleteToken = createAsyncThunk<
  void,
  string,
  { dispatch: AppDispatch }
>("request-url/requestUrlDeleteToken", (id, { dispatch, getState }) => {
  const state = getState() as RootState;

  const selectedTab = state.requestResponse.selectedTab;
  if (!selectedTab) return;

  dispatch(
    handleRequestUrlDeleteToken({
      id,
      selectedTab,
    })
  );
});
