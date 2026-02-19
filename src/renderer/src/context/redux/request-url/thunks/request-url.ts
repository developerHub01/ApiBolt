import { createAsyncThunk } from "@reduxjs/toolkit";
import type { AppDispatch, RootState } from "@/context/redux/store";
import type {
  TAPIUrlOriginTokenType,
  TAPIUrlTokenType,
  UrlTokenInterface,
} from "@shared/types/request-url.types";
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
  getUrlSearchParams,
  isValidApiUrl,
} from "@/utils/request-url.utils";
import { updateParamsFromSearchParams } from "@/context/redux/request-response/thunks/params";
import { paramsTableToString } from "@/utils/request-response.utils";
import { TActiveTabType } from "@shared/types/request-response.types";

const urlBlockDependentTabs = new Set<TActiveTabType>([
  "url",
  "params",
  "path-params",
]);

export const loadApiUrl = createAsyncThunk<
  void,
  void | {
    requestOrFolderId?: string | null | undefined;
    once?: boolean;
  },
  {
    dispatch: AppDispatch;
    state: RootState;
  }
>("request-url/loadApiUrl", async (payload, { dispatch, getState }) => {
  try {
    if (!payload) payload = {};

    const once = payload.once ?? false;
    const state = getState() as RootState;

    const selectedTab =
      payload.requestOrFolderId ?? state.requestResponse.selectedTab;
    if (
      !selectedTab ||
      (typeof state.requestUrl.tokens[selectedTab] !== "undefined" && once)
    )
      return;

    const response = await window.electronAPIApiUrl.getApiUrlDB(selectedTab);
    if (!response) return;

    const tokens = encodeApiUrl(filterUrl(response.url));
    dispatch(
      handleRequestUrlReplaceTokens({
        selectedTab,
        tokens,
      }),
    );
  } catch (error) {
    console.error(error);
  }
});

export const changeRequestApiUrl = createAsyncThunk<
  boolean,
  {
    url: string;
  },
  {
    dispatch: AppDispatch;
    state: RootState;
  }
>(
  "request-url/changeRequestApiUrl",
  async ({ url }, { dispatch, getState }) => {
    try {
      const state = getState() as RootState;

      const selectedTab = state.requestResponse.selectedTab;
      if (!selectedTab || !isValidApiUrl(url)) return false;

      const pureUrl = filterUrl(url);
      const tokens = encodeApiUrl(pureUrl);
      dispatch(
        handleRequestUrlReplaceTokens({
          selectedTab,
          tokens,
        }),
      );

      /* if tab is only url or params then update params.   */
      if (
        !urlBlockDependentTabs.has(
          state.requestResponse.activeMetaTab[
            state.requestResponse.selectedTab!
          ],
        )
      )
        return true;

      /**
       * Need to update checking with before params string and new url params string
       * **/
      const searchParams = getUrlSearchParams(url);
      const paramsString = paramsTableToString(
        state.requestResponse.params[selectedTab],
      );
      if (searchParams !== paramsString)
        await dispatch(
          updateParamsFromSearchParams({
            url,
            saveBackend: false,
          }),
        );

      return true;
    } catch (error) {
      console.error(error);
      return false;
    }
  },
);

export const changeRequestApiUrlWithBackend = createAsyncThunk<
  boolean,
  {
    url: string;
  },
  {
    dispatch: AppDispatch;
    state: RootState;
  }
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

      const tokens = encodeApiUrl(pureApiUrlUpdated);
      dispatch(
        handleRequestUrlReplaceTokens({
          selectedTab,
          tokens,
        }),
      );

      if (pureApiUrlBefore !== pureApiUrlUpdated)
        await window.electronAPIApiUrl.updateApiUrl({
          url: pureApiUrlUpdated,
        });

      /**
       * Need to update checking with before params string and new url params string
       * **/
      const searchParams = getUrlSearchParams(url);
      const paramsString = paramsTableToString(
        state.requestResponse.params[selectedTab],
      );
      if (searchParams !== paramsString)
        await dispatch(
          updateParamsFromSearchParams({
            url,
          }),
        );

      return true;
    } catch (error) {
      console.error(error);
      return false;
    }
  },
);

export const duplicateRequestApiUrlsByOldNewIds = createAsyncThunk<
  boolean,
  Record<string, string>,
  {
    dispatch: AppDispatch;
    state: RootState;
  }
>("request-url/duplicateRequestApiUrlsByOldNewIds", async oldNewIdMap => {
  try {
    const response =
      await window.electronAPIApiUrl.duplicateApiUrl(oldNewIdMap);

    return response;
  } catch (error) {
    console.error(error);
    return false;
  }
});

export const requestUrlAddToken = createAsyncThunk<
  void,
  {
    type: TAPIUrlTokenType;
    preTokenId: string;
  },
  {
    dispatch: AppDispatch;
    state: RootState;
  }
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
      }),
    );

    const updatedState = getState() as RootState;

    const apiUrlAfter = decodeApiUrl(
      updatedState.requestUrl.tokens[selectedTab],
    );
    /* without search params */
    const pureApiUrlAfter = filterUrl(apiUrlAfter);

    if (pureApiUrlBefore !== pureApiUrlAfter)
      await window.electronAPIApiUrl.updateApiUrl({
        url: pureApiUrlAfter,
      });
  } catch (error) {
    console.error(error);
  }
});

export const requestUrlUpdateToken = createAsyncThunk<
  void,
  Partial<UrlTokenInterface> & Pick<UrlTokenInterface, "id">,
  {
    dispatch: AppDispatch;
    state: RootState;
  }
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
        }),
      );

      const updatedState = getState() as RootState;

      const apiUrlAfter = decodeApiUrl(
        updatedState.requestUrl.tokens[selectedTab],
      );
      /* without search params */
      const pureApiUrlAfter = filterUrl(apiUrlAfter);

      if (pureApiUrlBefore !== pureApiUrlAfter)
        await window.electronAPIApiUrl.updateApiUrl({
          url: pureApiUrlAfter,
        });
    } catch (error) {
      console.error(error);
    }
  },
);

export const requestUrlUpdateOriginToken = createAsyncThunk<
  void,
  {
    id: TAPIUrlOriginTokenType;
    value: string;
  },
  {
    dispatch: AppDispatch;
    state: RootState;
  }
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
        }),
      );

      const updatedState = getState() as RootState;

      const apiUrlAfter = decodeApiUrl(
        updatedState.requestUrl.tokens[selectedTab],
      );
      /* without search params */
      const pureApiUrlAfter = filterUrl(apiUrlAfter);

      if (pureApiUrlBefore !== pureApiUrlAfter)
        await window.electronAPIApiUrl.updateApiUrl({
          url: pureApiUrlAfter,
        });
    } catch (error) {
      console.error(error);
    }
  },
);

export const requestUrlDeleteToken = createAsyncThunk<
  void,
  string,
  {
    dispatch: AppDispatch;
    state: RootState;
  }
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
      }),
    );

    const updatedState = getState() as RootState;

    const apiUrlAfter = decodeApiUrl(
      updatedState.requestUrl.tokens[selectedTab],
    );
    /* without search params */
    const pureApiUrlAfter = filterUrl(apiUrlAfter);

    if (pureApiUrlBefore !== pureApiUrlAfter)
      await window.electronAPIApiUrl.updateApiUrl({
        url: pureApiUrlAfter,
      });
  } catch (error) {
    console.error(error);
  }
});
