import { createAsyncThunk } from "@reduxjs/toolkit";
import type { AppDispatch, RootState } from "@/context/redux/store";
import type {
  TAPIUrlOriginTokenType,
  TAPIUrlTokenType,
  UrlTokenInterface,
} from "@/types/request-url.types";
import {
  handleRequestUrlAddToken,
  handleRequestUrlDeleteToken,
  handleRequestUrlReplaceTokens,
  handleRequestUrlUpdateToken,
} from "@/context/redux/request-url/request-url-slice";
import {
  decodeApiUrl,
  encodeApiUrl,
  filterUrl,
  isValidApiUrl,
} from "@/utils/request-url.utils";
import { updateParamsFromSearchParams } from "@/context/redux/request-response/thunks/params";

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

    const response = await window.electronAPIApiUrl.getApiUrlDB();
    if (!response) return;

    const tokens = encodeApiUrl(filterUrl(response.url));

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

    const tokens = encodeApiUrl(url);

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
  "request-url/changeRequestApiUrlWithBackend",
  async ({ url }, { dispatch, getState }) => {
    try {
      const state = getState() as RootState;

      const selectedTab = state.requestResponse.selectedTab;
      if (!selectedTab || !isValidApiUrl(url)) return false;

      const apiUrlBefore = decodeApiUrl(state.requestUrl.tokens[selectedTab]);
      /* without search params */
      const pureApiUrlBefore = filterUrl(apiUrlBefore);

      const pureApiUrlUpdated = filterUrl(url);
      const response = await window.electronAPIApiUrl.updateApiUrl({
        url: pureApiUrlUpdated,
      });
      if (!response) return false;

      const tokens = encodeApiUrl(url);
      dispatch(
        handleRequestUrlReplaceTokens({
          selectedTab,
          tokens,
        })
      );

      if (pureApiUrlBefore !== pureApiUrlUpdated)
        await window.electronAPIApiUrl.updateApiUrl({
          url: pureApiUrlUpdated,
        });

      if (apiUrlBefore !== url)
        await dispatch(updateParamsFromSearchParams(url));

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
>("request-url/requestUrlAddToken", async (payload, { dispatch, getState }) => {
  try {
    const state = getState() as RootState;

    const selectedTab = state.requestResponse.selectedTab;
    if (!selectedTab) return;

    const apiUrlBefore = decodeApiUrl(state.requestUrl.tokens[selectedTab]);
    /* without search params */
    const pureApiUrlBefore = filterUrl(apiUrlBefore);

    dispatch(
      handleRequestUrlAddToken({
        ...payload,
        selectedTab,
      })
    );

    const updatedState = getState() as RootState;

    const apiUrlAfter = decodeApiUrl(
      updatedState.requestUrl.tokens[selectedTab]
    );
    /* without search params */
    const pureApiUrlAfter = filterUrl(apiUrlAfter);

    if (pureApiUrlBefore !== pureApiUrlAfter)
      await window.electronAPIApiUrl.updateApiUrl({
        url: pureApiUrlAfter,
      });

    if (apiUrlBefore !== apiUrlAfter)
      await dispatch(updateParamsFromSearchParams(apiUrlAfter));
  } catch (error) {
    console.log(error);
  }
});

export const requestUrlUpdateToken = createAsyncThunk<
  void,
  Partial<UrlTokenInterface> & Pick<UrlTokenInterface, "id">,
  { dispatch: AppDispatch; state: RootState }
>(
  "request-url/requestUrlUpdateToken",
  async (payload, { dispatch, getState }) => {
    try {
      const state = getState() as RootState;

      const selectedTab = state.requestResponse.selectedTab;
      if (!selectedTab) return;

      const apiUrlBefore = decodeApiUrl(state.requestUrl.tokens[selectedTab]);
      /* without search params */
      const pureApiUrlBefore = filterUrl(apiUrlBefore);

      dispatch(
        handleRequestUrlUpdateToken({
          ...payload,
          selectedTab,
        })
      );

      const updatedState = getState() as RootState;

      const apiUrlAfter = decodeApiUrl(
        updatedState.requestUrl.tokens[selectedTab]
      );
      /* without search params */
      const pureApiUrlAfter = filterUrl(apiUrlAfter);

      if (pureApiUrlBefore !== pureApiUrlAfter)
        await window.electronAPIApiUrl.updateApiUrl({
          url: pureApiUrlAfter,
        });

      if (apiUrlBefore !== apiUrlAfter)
        await dispatch(updateParamsFromSearchParams(apiUrlAfter));
    } catch (error) {
      console.log(error);
    }
  }
);

export const requestUrlUpdateOriginToken = createAsyncThunk<
  void,
  {
    id: TAPIUrlOriginTokenType;
    value: string;
  },
  { dispatch: AppDispatch; state: RootState }
>(
  "request-url/requestUrlUpdateToken",
  async ({ id, value }, { dispatch, getState }) => {
    try {
      const state = getState() as RootState;

      const selectedTab = state.requestResponse.selectedTab;
      if (!selectedTab) return;

      const apiUrlBefore = decodeApiUrl(state.requestUrl.tokens[selectedTab]);
      /* without search params */
      const pureApiUrlBefore = filterUrl(apiUrlBefore);

      dispatch(
        handleRequestUrlUpdateToken({
          id,
          type: id,
          value,
          selectedTab,
        })
      );

      const updatedState = getState() as RootState;

      const apiUrlAfter = decodeApiUrl(
        updatedState.requestUrl.tokens[selectedTab]
      );
      /* without search params */
      const pureApiUrlAfter = filterUrl(apiUrlAfter);

      if (pureApiUrlBefore !== pureApiUrlAfter)
        await window.electronAPIApiUrl.updateApiUrl({
          url: pureApiUrlAfter,
        });
    } catch (error) {
      console.log(error);
    }
  }
);

export const requestUrlDeleteToken = createAsyncThunk<
  void,
  string,
  { dispatch: AppDispatch; state: RootState }
>("request-url/requestUrlDeleteToken", async (id, { dispatch, getState }) => {
  try {
    const state = getState() as RootState;

    const selectedTab = state.requestResponse.selectedTab;
    if (!selectedTab) return;

    const apiUrlBefore = decodeApiUrl(state.requestUrl.tokens[selectedTab]);
    /* without search params */
    const pureApiUrlBefore = filterUrl(apiUrlBefore);

    dispatch(
      handleRequestUrlDeleteToken({
        id,
        selectedTab,
      })
    );

    const updatedState = getState() as RootState;

    const apiUrlAfter = decodeApiUrl(
      updatedState.requestUrl.tokens[selectedTab]
    );
    /* without search params */
    const pureApiUrlAfter = filterUrl(apiUrlAfter);

    if (pureApiUrlBefore !== pureApiUrlAfter)
      await window.electronAPIApiUrl.updateApiUrl({
        url: pureApiUrlAfter,
      });

    if (apiUrlBefore !== apiUrlAfter)
      await dispatch(updateParamsFromSearchParams(apiUrlAfter));
  } catch (error) {
    console.log(error);
  }
});
