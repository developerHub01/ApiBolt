import {
  type ParamHeaderBuildPayloadInterface,
  type ParamInterface,
} from "@/types/request-response.types";
import { createAsyncThunk } from "@reduxjs/toolkit";
import type { AppDispatch, RootState } from "@/context/redux/store";
import { handleLoadParams } from "@/context/redux/request-response/request-response-slice";
import { parseUrlParams } from "@/utils";
import { generateNewMetaDataItem } from "@/constant/request-response.constant";
import { detectAndCleanVariable } from "@/utils/request-response.utils";

/* ==============================
======== Params start ===========
================================= */
export const loadParams = createAsyncThunk<
  void,
  void | { requestOrFolderId?: string | null | undefined; once?: boolean },
  {
    dispatch: AppDispatch;
    state: RootState;
  }
>("request-response/loadParams", async (payload, { getState, dispatch }) => {
  try {
    if (!payload) payload = {};

    const state = getState() as RootState;

    const selectedTab =
      payload.requestOrFolderId ?? state.requestResponse.selectedTab;
    const once = payload.once ?? false;

    if (!selectedTab || (state.requestResponse.params[selectedTab] && once))
      return;

    const response = await window.electronAPIParamsDB.getParams(selectedTab);

    dispatch(handleLoadParams(response));
  } catch (error) {
    console.log(error);
  }
});

export const addParams = createAsyncThunk<
  boolean,
  Partial<ParamHeaderBuildPayloadInterface> | undefined,
  {
    dispatch: AppDispatch;
    state: RootState;
  }
>("request-response/addParams", async (payload, { getState, dispatch }) => {
  try {
    const state = getState() as RootState;

    const selectedTab = state.requestResponse.selectedTab;
    if (!selectedTab) return false;

    if (!payload) payload = {};
    const response = await window.electronAPIParamsDB.createParams(payload);

    if (response) dispatch(loadParams());

    return response;
  } catch (error) {
    console.log(error);
    return false;
  }
});

export const deleteParams = createAsyncThunk<
  boolean,
  string,
  {
    dispatch: AppDispatch;
    state: RootState;
  }
>("request-response/deleteParams", async (id, { getState, dispatch }) => {
  try {
    const state = getState() as RootState;

    const selectedTab = state.requestResponse.selectedTab;
    if (!selectedTab) return false;

    const response = await window.electronAPIParamsDB.deleteParams(id);

    if (response) dispatch(loadParams());
    return response;
  } catch (error) {
    console.log(error);
    return false;
  }
});

export const deleteParamsByRequestMetaId = createAsyncThunk<
  boolean,
  string | undefined | null,
  {
    dispatch: AppDispatch;
    state: RootState;
  }
>(
  "request-response/deleteParamsByRequestMetaId",
  async (id, { getState, dispatch }) => {
    try {
      const state = getState() as RootState;
      if (!id) id = state.requestResponse.selectedTab;

      if (!id) return false;

      const response =
        await window.electronAPIParamsDB.deleteParamsByRequestMetaId(id);

      if (response) dispatch(handleLoadParams([]));
      return response;
    } catch (error) {
      console.log(error);
      return false;
    }
  }
);

export const updateParams = createAsyncThunk<
  boolean,
  {
    paramId: string;
    payload: Partial<ParamHeaderBuildPayloadInterface>;
  },
  {
    dispatch: AppDispatch;
    state: RootState;
  }
>(
  "request-response/updateParams",
  async ({ paramId, payload }, { dispatch, getState }) => {
    try {
      const state = getState() as RootState;
      const param = (
        state.requestResponse.params[state.requestResponse.selectedTab ?? ""] ??
        []
      )?.find((param) => param.id === paramId);
      if (!param) return false;

      /* if updating key and in text formate then check is that key actually any variable or not. if then update keyType as env */
      if (payload.key && param.keyType === "text") {
        const keyDetails = detectAndCleanVariable(payload["key"], "keyType");
        payload["key"] = keyDetails.key;
        if (keyDetails.keyType === "env")
          payload["keyType"] = keyDetails.keyType;
      }

      /* if updating value and in text formate then check is that value actually any variable or not. if then update valueType as env */
      if (payload.value && param.valueType === "text") {
        const valueDetails = detectAndCleanVariable(
          payload["value"],
          "valueType"
        );
        payload["value"] = valueDetails.value;
        if (valueDetails.valueType === "env")
          payload["valueType"] = valueDetails.valueType;
      }

      const response = await window.electronAPIParamsDB.updateParams(
        paramId,
        payload
      );

      if (response) dispatch(loadParams());
      return response;
    } catch (error) {
      console.log(error);
      return false;
    }
  }
);

export const checkAllParamsByRequestMetaId = createAsyncThunk<
  boolean,
  string | undefined,
  {
    dispatch: AppDispatch;
    state: RootState;
  }
>(
  "request-response/checkAllParamsByRequestMetaId",
  async (requestOrFolderMetaId, { dispatch }) => {
    try {
      const response =
        await window.electronAPIParamsDB.checkAllParamsByRequestMetaId(
          requestOrFolderMetaId
        );

      if (response) dispatch(loadParams());
      return response;
    } catch (error) {
      console.log(error);
      return false;
    }
  }
);

export const updateParamsFromSearchParams = createAsyncThunk<
  boolean,
  {
    url: string;
    saveBackend?: boolean;
  },
  {
    dispatch: AppDispatch;
    state: RootState;
  }
>(
  "request-response/updateParamsFromSearchParams",
  async ({ url: api, saveBackend = true }, { dispatch, getState }) => {
    try {
      const state = getState() as RootState;

      const selectedTab = state.requestResponse.selectedTab;
      if (!selectedTab) return false;

      const urlParams: Array<{
        key: string;
        value: string;
      }> = parseUrlParams(api).map(([key, value]) => ({
        key,
        value,
      }));

      let updatedParams: Array<ParamInterface> = [];
      /**
       * if new params size less then previous means some of them have to filter out
       *
       * so we keep hidden params as it is but for others we checked that is it exist in new param list
       *
       * if exist then update it
       *
       * else filter out it.
       *
       */
      if (!state.requestResponse.params[selectedTab])
        state.requestResponse.params[selectedTab] = [];

      if (state.requestResponse.params[selectedTab].length < urlParams.length) {
        updatedParams = urlParams.map((param, index) => {
          const payload = {
            ...generateNewMetaDataItem("params"),
            ...(state.requestResponse.params[selectedTab]?.[index] ?? {}),
            ...param,
          };

          const keyDetails = detectAndCleanVariable(payload.key, "keyType");
          const valueDetails = detectAndCleanVariable(
            payload.value,
            "valueType"
          );

          return {
            ...payload,
            isCheck: true,
            ...keyDetails,
            ...valueDetails,
          };
        });
      } else {
        let index = 0;
        try {
          updatedParams = state.requestResponse.params[selectedTab]?.reduce(
            (acc, curr) => {
              if (!curr.isCheck) return [...acc, curr];
              if (!urlParams[index]) return acc;

              const payload = {
                ...curr,
                ...urlParams[index++],
              };

              const keyDetails = detectAndCleanVariable(payload.key, "keyType");
              const valueDetails = detectAndCleanVariable(
                payload.value,
                "valueType"
              );

              return [
                ...acc,
                {
                  ...payload,
                  ...keyDetails,
                  ...valueDetails,
                },
              ];
            },
            [] as Array<ParamInterface>
          );
        } catch (error) {
          console.log(error);
        }
      }

      dispatch(handleLoadParams(updatedParams));

      if (!saveBackend) return true;
      const response = await window.electronAPIParamsDB.replaceParams(
        selectedTab,
        updatedParams
      );

      /* so that if cant update then revert  'handleLoadParams' reducer update*/
      if (!response) await dispatch(loadParams());
      return true;
    } catch (error) {
      console.log(error);
      return false;
    }
  }
);

/* ==============================
======== Params end =============
================================= */
