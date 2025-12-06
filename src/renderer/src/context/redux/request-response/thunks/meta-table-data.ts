import {
  type FormDataPayloadInterface,
  type ParamHeaderBuildPayloadInterface,
} from "@shared/types/request-response.types";
import { createAsyncThunk } from "@reduxjs/toolkit";
import type { AppDispatch, RootState } from "@/context/redux/store";
import { loadParams } from "@/context/redux/request-response/thunks/params";
import { loadHeaders } from "@/context/redux/request-response/thunks/headers";
import { loadBodyFormData } from "@/context/redux/request-response/thunks/body-form-data";
import { loadBodyXWWWFormUrlencoded } from "@/context/redux/request-response/thunks/body-x-www-form-urlencoded";
type LoaderThunk =
  | typeof loadParams
  | typeof loadHeaders
  | typeof loadBodyFormData
  | typeof loadBodyXWWWFormUrlencoded;

/* ==============================
======== meta-table-data start ===========
================================= */
export const replaceMetaTableData = createAsyncThunk<
  boolean,
  | Array<Partial<ParamHeaderBuildPayloadInterface>>
  | Array<Partial<FormDataPayloadInterface>>,
  {
    dispatch: AppDispatch;
    state: RootState;
  }
>(
  "request-response/replaceMetaTableData",
  async (payload, { dispatch, getState }) => {
    try {
      const state = getState() as RootState;

      const selectedTab = state.requestResponse.selectedTab;
      if (!selectedTab) return false;
      const activeMetaTab = state.requestResponse.activeMetaTab[selectedTab];
      const requestBodyType =
        state.requestResponse.requestBodyType[selectedTab];

      let response = false;

      let loader: LoaderThunk | null = null;

      /* ================ if form-data ================ */
      if (activeMetaTab === "body") {
        let handler:
          | ((
              requestOrFolderMetaId: string,
              payload: Array<Partial<FormDataPayloadInterface>>,
            ) => Promise<boolean>)
          | null = null;

        if (activeMetaTab === "body" && requestBodyType === "form-data") {
          handler = window.electronAPIBodyFormData.replaceBodyFormData;
          loader = loadBodyFormData;
        } else if (
          activeMetaTab === "body" &&
          requestBodyType === "x-www-form-urlencoded"
        ) {
          handler =
            window.electronAPIBodyXWWWFormUrlencoded
              .replaceBodyXWWWFormUrlencoded;
          loader = loadBodyXWWWFormUrlencoded;
        }

        if (handler)
          response = await handler(
            selectedTab,
            payload as Array<Partial<FormDataPayloadInterface>>,
          );
      } else {
        /* ================ if params or headers ================ */
        let handler:
          | ((
              requestOrFolderMetaId: string,
              payload: Array<Partial<ParamHeaderBuildPayloadInterface>>,
            ) => Promise<boolean>)
          | null = null;

        if (activeMetaTab === "params") {
          handler = window.electronAPIParams.replaceParams;
          loader = loadParams;
        } else if (activeMetaTab === "headers") {
          handler = window.electronAPIHeaders.replaceHeaders;
          loader = loadHeaders;
        }

        if (handler)
          response = await handler(
            selectedTab,
            payload as Array<Partial<ParamHeaderBuildPayloadInterface>>,
          );
      }

      if (response && loader) dispatch(loader());

      return response;
    } catch (error) {
      console.error(error);
      return false;
    }
  },
);
/* ==============================
======== meta-table-data end =============
================================= */
