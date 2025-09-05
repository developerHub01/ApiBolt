import { createAsyncThunk } from "@reduxjs/toolkit";
import type { AppDispatch, RootState } from "@/context/redux/store";
import type {
  TAPIUrlTokenType,
  UrlTokenInterface,
} from "@/types/request-url.types";
import {
  handleRequestUrlAddToken,
  handleRequestUrlDeleteToken,
  handleRequestUrlReplaceTokens,
  handleRequestUrlUpdateToken,
} from "@/context/redux/request-url/request-url-slice";
import { decodeApiUrl, isValidApiUrl } from "@/utils/request-url.utils";

export const loadApiUrl = createAsyncThunk<
  void,
  void | { requestId?: string | null | undefined; once?: boolean },
  { dispatch: AppDispatch }
>("request-url/loadApiUrl", async (payload, { dispatch, getState }) => {
  try {
    if (!payload) payload = {};

    const once = payload.once ?? false;
    const state = getState() as RootState;

    const selectedTab = state.requestResponse.selectedTab;
    if (
      !selectedTab ||
      (typeof state.requestUrl.tokens[selectedTab] !== "undefined" && once)
    )
      return;

    // const response =
    await window.electronAPIApiUrl.getApiUrlDB();

    const tokens = decodeApiUrl(
      "http://facebook.com/absdfsdf/abc/ddee{{xyz}}mnop{{ijkl}}pqr?a=10&password=123"
    );

    dispatch(
      handleRequestUrlReplaceTokens({
        selectedTab,
        tokens,
      })
    );
  } catch (error) {
    console.log(error);
  }
});

export const changeRequestApiUrl = createAsyncThunk<
  boolean,
  { url: string },
  { dispatch: AppDispatch; state: RootState }
>("request-url/changeRequestApiUrl", ({ url }, { dispatch, getState }) => {
  try {
    const state = getState() as RootState;

    const selectedTab = state.requestResponse.selectedTab;
    if (!selectedTab || !isValidApiUrl(url)) return false;

    const tokens = decodeApiUrl(url);

    dispatch(
      handleRequestUrlReplaceTokens({
        selectedTab,
        tokens,
      })
    );

    return true;
  } catch (error) {
    console.log(error);
    return false;
  }
});

export const changeRequestApiUrlWithBackend = createAsyncThunk<
  boolean,
  { url: string },
  { dispatch: AppDispatch; state: RootState }
>(
  "request-url/changeRequestApiUrl",
  async ({ url }, { dispatch, getState }) => {
    try {
      const state = getState() as RootState;

      const selectedTab = state.requestResponse.selectedTab;
      if (!selectedTab || !isValidApiUrl(url)) return false;

      const response = await window.electronAPIApiUrl.updateApiUrl({
        url,
      });
      if (!response) return false;

      const tokens = decodeApiUrl(url);

      dispatch(
        handleRequestUrlReplaceTokens({
          selectedTab,
          tokens,
        })
      );

      return true;
    } catch (error) {
      console.log(error);
      return false;
    }
  }
);

export const requestUrlAddToken = createAsyncThunk<
  void,
  {
    type: TAPIUrlTokenType;
    preTokenId: string;
  },
  { dispatch: AppDispatch; state: RootState }
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
  { dispatch: AppDispatch; state: RootState }
>("request-url/requestUrlUpdateToken", (payload, { dispatch, getState }) => {
  const state = getState() as RootState;

  const selectedTab = state.requestResponse.selectedTab;
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
  { dispatch: AppDispatch; state: RootState }
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
