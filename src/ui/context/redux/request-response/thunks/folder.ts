import { type ResponseFolderDataInterface } from "@/types/request-response.types";
import { createAsyncThunk } from "@reduxjs/toolkit";
import type { AppDispatch, RootState } from "@/context/redux/store";
import {
  handleLoadFolder,
  handleUpdateFolder,
} from "@/context/redux/request-response/request-response-slice";
import { areSamePayload } from "@/utils/helper";

/* ==============================
======== Folder start ===========
================================= */
export const loadFolder = createAsyncThunk<
  void,
  void | { requestId?: string | null | undefined; once?: boolean },
  { dispatch: AppDispatch; state: RootState }
>("request-response/loadFolder", async (payload, { getState, dispatch }) => {
  if (!payload) payload = {};

  let selectedTab = payload.requestId;
  const once = payload.once ?? false;

  const state = getState() as RootState;

  if (!selectedTab) selectedTab = state.requestResponse.selectedTab;
  if (
    !selectedTab ||
    /* if that requestOrFolder have a method means that is a request so no need to call folder details */
    state.requestResponse.requestList[selectedTab]?.method ||
    (state.requestResponse.loadedRequestList[selectedTab] && once)
  )
    return;

  const response = await window.electronAPIFolderDB.getFolder(selectedTab);

  dispatch(
    handleLoadFolder({
      id: selectedTab,
      payload: response,
    })
  );
});

export const updateFolder = createAsyncThunk<
  boolean,
  Partial<ResponseFolderDataInterface> & {
    requestOrFolderMetaId?: string;
  },
  { dispatch: AppDispatch; state: RootState }
>("request-response/updateFolder", async (payload, { dispatch, getState }) => {
  let selectedTab = payload.requestOrFolderMetaId;

  const state = getState() as RootState;

  selectedTab = selectedTab ?? state.requestResponse.selectedTab ?? undefined;
  if (!selectedTab) return false;

  const existingData = {
    title: state.requestResponse.folderTitle[selectedTab],
    description: state.requestResponse.folderDescription[selectedTab],
  };
  const areSame = areSamePayload(payload, existingData);
  if (areSame) return true;

  const response = await window.electronAPIFolderDB.updateFolder(payload);

  delete payload["requestOrFolderMetaId"];

  if (response) {
    dispatch(
      handleUpdateFolder({
        id: selectedTab,
        payload,
      })
    );
  }

  return response;
});

/* ==============================
======== Folder end =============
================================= */
