import {
  type FormDataPayloadInterface,
  type ParamHeaderBuildPayloadInterface,
} from "@/types/request-response.types";
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
  Array<Partial<ParamHeaderBuildPayloadInterface>>,
  { dispatch: AppDispatch; state: RootState }
>(
  "request-response/replaceMetaTableData",
  async (payload, { dispatch, getState }) => {
    const state = getState() as RootState;

    const selectedTab = state.requestResponse.selectedTab;
    if (!selectedTab) return false;
    const activeMetaTab = state.requestResponse.activeMetaTab[selectedTab];
    const requestBodyType = state.requestResponse.requestBodyType[selectedTab];

    let response = false;

    let handler:
      | ((
          requestOrFolderMetaId: string,
          payload: Array<Partial<FormDataPayloadInterface>>
        ) => Promise<boolean>)
      | null = null;

    let loader: LoaderThunk | null = null;

    if (activeMetaTab === "params") {
      handler = window.electronAPIParamsDB.replaceParams;
      loader = loadParams;
    } else if (activeMetaTab === "headers") {
      handler = window.electronAPIHeadersDB.replaceHeaders;
      loader = loadHeaders;
    } else if (activeMetaTab === "body" && requestBodyType === "form-data") {
      handler = window.electronAPIBodyFormDataDB.replaceBodyFormData;
      loader = loadBodyFormData;
    } else if (
      activeMetaTab === "body" &&
      requestBodyType === "x-www-form-urlencoded"
    ) {
      handler =
        window.electronAPIBodyXWWWFormUrlencodedDB
          .replaceBodyXWWWFormUrlencoded;
      loader = loadBodyXWWWFormUrlencoded;
    }

    if (handler) response = await handler(selectedTab, payload);

    if (response && loader) dispatch(loader());

    return response;
  }
);
/* ==============================
======== meta-table-data end =============
================================= */
