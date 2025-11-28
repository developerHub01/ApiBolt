import {
  type RequestListItemInterface,
  type RequestListItemUpdatePayloadInterface,
  type THTTPMethods,
} from "@/types/request-response.types";
import { createAsyncThunk } from "@reduxjs/toolkit";
import type { AppDispatch, RootState } from "@/context/redux/store";
import {
  handleChangeCollapseAllRequestOrFolder,
  handleChangeDeleteFolderOrRequestId,
  handleChangeIsRequestListLoaded,
  handleCreateRestApiBasic,
  handleCreateSingleRequest,
  handleDeleteAllRequestOrFolder,
  handleLoadRequestList,
  handleUpdateRequestOrFolder,
  handleUpdateRequestOrFolderMeta,
} from "@/context/redux/request-response/request-response-slice";
import { v4 as uuidv4 } from "uuid";
import {
  duplicateRequestOrFolderNode,
  getNestedIds,
  getRequestType,
} from "@/utils/request-response.utils";
import { loadTabsData } from "@/context/redux/request-response/thunks/tab-list";
import { duplicateRequestApiUrlsByOldNewIds } from "@/context/redux/request-url/thunks/request-url";
import { duplicateParamsByOldNewIds } from "@/context/redux/request-response/thunks/params";
import {
  duplicateHeadersByOldNewIds,
  duplicateHiddenHeadersByOldNewIds,
} from "@/context/redux/request-response/thunks/headers";
import { duplicateShowHiddenMetaDataByOldNewIds } from "@/context/redux/request-response/thunks/show-hidden-meta-data";
import { duplicateRequestMetaTabByOldNewIds } from "@/context/redux/request-response/thunks/request-meta-tab";
import { duplicateBodyRawByOldNewIds } from "@/context/redux/request-response/thunks/body-raw";
import { duplicateBodyBinaryByOldNewIds } from "@/context/redux/request-response/thunks/body-binary";
import { duplicateBodyXWWWFormUrlencodedByOldNewIds } from "@/context/redux/request-response/thunks/body-x-www-form-urlencoded";
import { duplicateBodyFormDataByOldNewIds } from "@/context/redux/request-response/thunks/body-form-data";
import { duplicateMetaShowColumnByOldNewIds } from "@/context/redux/request-response/thunks/meta-show-column";
import { duplicateAuthorizationByOldNewIds } from "@/context/redux/request-response/thunks/auth";
import { duplicateFolderByOldNewIds } from "@/context/redux/request-response/thunks/folder";

/* ==============================
===== RequestList start =========
================================= */
export const loadRequestList = createAsyncThunk<
  void,
  void,
  {
    dispatch: AppDispatch;
    state: RootState;
  }
>("request-response/loadRequestList", async (_, { getState, dispatch }) => {
  try {
    const state = getState() as RootState;
    if (state.requestResponse.isRequestListLoaded) return;

    const list =
      await window.electronAPIRequestOrFolderMetaDB.getRequestOrFolderMeta();

    dispatch(handleLoadRequestList(list));
    dispatch(handleChangeIsRequestListLoaded(true));
  } catch (error) {
    console.error(error);
  }
});

export const forceLoadRequestList = createAsyncThunk<
  void,
  void,
  {
    dispatch: AppDispatch;
    state: RootState;
  }
>("request-response/forceLoadRequestList", async (_, { dispatch }) => {
  try {
    const list =
      await window.electronAPIRequestOrFolderMetaDB.getRequestOrFolderMeta();

    dispatch(handleLoadRequestList(list));
  } catch (error) {
    console.error(error);
  }
});

export const loadSingleRequestMeta = createAsyncThunk<
  void,
  string,
  {
    dispatch: AppDispatch;
    state: RootState;
  }
>(
  "request-response/loadSingleRequestMeta",
  async (id, { getState, dispatch }) => {
    try {
      const state = getState() as RootState;
      id = id ?? state.requestResponse.selectedTab;

      const requestMeta =
        await window.electronAPIRequestOrFolderMetaDB.getRequestOrFolderMetaById(
          id
        );

      dispatch(handleUpdateRequestOrFolderMeta(requestMeta));
    } catch (error) {
      console.error(error);
    }
  }
);

export const createSingleRequest = createAsyncThunk<
  boolean,
  string | undefined,
  {
    dispatch: AppDispatch;
    state: RootState;
  }
>("request-response/createSingleRequest", async (parentId, { dispatch }) => {
  try {
    const payload: RequestListItemInterface = {
      id: uuidv4(),
      name: "Request",
      method: "get",
      ...(parentId ? { parentId } : {}),
    };

    dispatch(handleCreateSingleRequest(payload));
    const response =
      await window.electronAPIRequestOrFolderMetaDB.createRequestOrFolderMeta(
        payload
      );
    if (response) await dispatch(expendRequestOrFolder(parentId));
    return response;
  } catch (error) {
    console.error(error);
    return false;
  }
});

export const createCollection = createAsyncThunk<
  boolean,
  string | undefined,
  {
    dispatch: AppDispatch;
    state: RootState;
  }
>("request-response/createCollection", async (parentId, { dispatch }) => {
  try {
    const payload = {
      id: uuidv4(),
      name: parentId ? "Folder" : "Collection",
      ...(parentId ? { parentId } : {}),
    };

    dispatch(handleCreateSingleRequest(payload));

    const response =
      await window.electronAPIRequestOrFolderMetaDB.createRequestOrFolderMeta({
        ...payload,
        children: [],
      });
    if (response) await dispatch(expendRequestOrFolder(parentId));
    return response;
  } catch (error) {
    console.error(error);
    return false;
  }
});

export const createRestApiBasic = createAsyncThunk<
  boolean,
  string | undefined,
  {
    dispatch: AppDispatch;
    state: RootState;
  }
>("request-response/createRestApiBasic", async (parentId, { dispatch }) => {
  try {
    const parentFolder: RequestListItemInterface = {
      id: uuidv4(),
      name: "REST API basics",
      children: [],
      createdAt: Date.now(),
    };

    if (parentId) parentFolder["parentId"] = parentId;

    const payload: Array<RequestListItemInterface> = (
      ["get", "post", "put", "patch", "delete"] as Array<THTTPMethods>
    ).map((method) => ({
      id: uuidv4(),
      name: `${method[0].toUpperCase()}${method.substring(1)} data`,
      method: method as THTTPMethods,
      createdAt: Date.now(),
    }));

    parentFolder.children = payload.map((item) => item.id);

    const requestList = [
      parentFolder,
      ...payload.map((item) => ({
        ...item,
        parentId: parentFolder.id,
      })),
    ];

    dispatch(handleCreateRestApiBasic(requestList));
    const response =
      await window.electronAPIRequestOrFolderMetaDB.createRequestOrFolderMeta(
        requestList
      );

    if (response) await dispatch(expendRequestOrFolder(parentId));
    return response;
  } catch (error) {
    console.error(error);
    return false;
  }
});

/* action by selected tab start =============== */
export const createSingleRequestBySelectedTab = createAsyncThunk<
  boolean,
  void,
  {
    dispatch: AppDispatch;
    state: RootState;
  }
>(
  "request-response/createSingleRequestBySelectedTab",
  async (_, { dispatch, getState }) => {
    try {
      const state = getState() as RootState;
      const selectedTab = state.requestResponse.selectedTab;

      let parentId = selectedTab ?? undefined;
      /* if selected tab exist then check is it a request or not. if then take it's parent else take that */
      if (selectedTab) {
        const selectedDetails = state.requestResponse.requestList[selectedTab];
        if (selectedDetails && getRequestType(selectedDetails) === "request")
          parentId = selectedDetails.parentId;
      }

      const payload: RequestListItemInterface = {
        id: uuidv4(),
        name: "Request",
        method: "get",
        ...(parentId ? { parentId } : {}),
      };

      dispatch(handleCreateSingleRequest(payload));
      const response =
        await window.electronAPIRequestOrFolderMetaDB.createRequestOrFolderMeta(
          payload
        );
      if (response) await dispatch(expendRequestOrFolder(parentId));
      return response;
    } catch (error) {
      console.error(error);
      return false;
    }
  }
);

export const createCollectionBySelectedTab = createAsyncThunk<
  boolean,
  void,
  {
    dispatch: AppDispatch;
    state: RootState;
  }
>(
  "request-response/createCollectionBySelectedTab",
  async (_, { dispatch, getState }) => {
    try {
      const state = getState() as RootState;
      const selectedTab = state.requestResponse.selectedTab;

      let parentId = selectedTab ?? undefined;
      /* if selected tab exist then check is it a request or not. if then take it's parent else take that */
      if (selectedTab) {
        const selectedDetails = state.requestResponse.requestList[selectedTab];
        if (selectedDetails && getRequestType(selectedDetails) === "request")
          parentId = selectedDetails.parentId;
      }

      const payload = {
        id: uuidv4(),
        name: parentId ? "Folder" : "Collection",
        ...(parentId ? { parentId } : {}),
      };

      dispatch(handleCreateSingleRequest(payload));

      const response =
        await window.electronAPIRequestOrFolderMetaDB.createRequestOrFolderMeta(
          {
            ...payload,
            children: [],
          }
        );
      if (response) await dispatch(expendRequestOrFolder(parentId));
      return response;
    } catch (error) {
      console.error(error);
      return false;
    }
  }
);

export const createRestApiBasicBySelectedTab = createAsyncThunk<
  boolean,
  void,
  {
    dispatch: AppDispatch;
    state: RootState;
  }
>(
  "request-response/createRestApiBasicBySelectedTab",
  async (_, { dispatch, getState }) => {
    try {
      const state = getState() as RootState;
      const selectedTab = state.requestResponse.selectedTab;

      let parentId = selectedTab ?? undefined;
      /* if selected tab exist then check is it a request or not. if then take it's parent else take that */
      if (selectedTab) {
        const selectedDetails = state.requestResponse.requestList[selectedTab];
        if (selectedDetails && getRequestType(selectedDetails) === "request")
          parentId = selectedDetails.parentId;
      }

      const newParentFolder: RequestListItemInterface = {
        id: uuidv4(),
        name: "REST API basics",
        children: [],
        createdAt: Date.now(),
        parentId,
      };

      const payload: Array<RequestListItemInterface> = (
        ["get", "post", "put", "patch", "delete"] as Array<THTTPMethods>
      ).map((method) => ({
        id: uuidv4(),
        name: `${method[0].toUpperCase()}${method.substring(1)} data`,
        method: method as THTTPMethods,
        createdAt: Date.now(),
      }));

      newParentFolder.children = payload.map((item) => item.id);

      const requestList = [
        newParentFolder,
        ...payload.map((item) => ({
          ...item,
          parentId: newParentFolder.id,
        })),
      ];

      dispatch(handleCreateRestApiBasic(requestList));

      const response =
        await window.electronAPIRequestOrFolderMetaDB.createRequestOrFolderMeta(
          requestList
        );

      if (response) await dispatch(expendRequestOrFolder(parentId));
      return response;
    } catch (error) {
      console.error(error);
      return false;
    }
  }
);
/* action by selected tab end =============== */

export const updateRequestOrFolder = createAsyncThunk<
  void,
  RequestListItemUpdatePayloadInterface,
  {
    dispatch: AppDispatch;
    state: RootState;
  }
>("request-response/updateRequestOrFolder", async (payload, { dispatch }) => {
  try {
    dispatch(handleUpdateRequestOrFolder(payload));
    await window.electronAPIRequestOrFolderMetaDB.updateRequestOrFolderMeta(
      payload
    );
  } catch (error) {
    console.error(error);
  }
});

export const expendRequestOrFolder = createAsyncThunk<
  void,
  string | undefined,
  {
    dispatch: AppDispatch;
    state: RootState;
  }
>(
  "request-response/expendRequestOrFolder",
  async (id, { dispatch, getState }) => {
    try {
      const state = getState() as RootState;

      if (
        !id ||
        !state.requestResponse.requestList[id] ||
        getRequestType(state.requestResponse.requestList[id]) !== "folder"
      )
        return;

      await dispatch(
        updateRequestOrFolder({
          id,
          isExpended: true,
        })
      );
    } catch (error) {
      console.error(error);
    }
  }
);

export const moveRequestOrFolder = createAsyncThunk<
  boolean,
  { requestId: string; parentId?: string },
  {
    dispatch: AppDispatch;
    state: RootState;
  }
>(
  "request-response/moveRequestOrFolder",
  async ({ requestId, parentId }, { dispatch, getState }) => {
    try {
      const state = getState() as RootState;

      const parentDetails = state.requestResponse.requestList[parentId ?? ""];
      const requestDetails = state.requestResponse.requestList[requestId];

      /**
       * Here first finding the list of children of requested item
       * then checking that is user targetd parent is requested item's child?
       * if child then we are not going further
       */
      const requestAllChildrenList = getNestedIds({
        source: state.requestResponse.requestList,
        id: requestId,
      });
      if (parentId && requestAllChildrenList.includes(parentId)) return false;

      if (parentDetails && getRequestType(parentDetails) === "request")
        parentId = parentDetails.parentId;
      if (parentId === requestDetails.parentId) return false;

      const response =
        await window.electronAPIRequestOrFolderMetaDB.moveRequestOrFolderMeta({
          id: requestId,
          parentId,
        });
      if (response) await dispatch(expendRequestOrFolder(parentId));
      dispatch(handleChangeIsRequestListLoaded(false));

      return response;
    } catch (error) {
      console.error(error);
      return false;
    }
  }
);

export const deleteAllRequestOrFolder = createAsyncThunk<
  void,
  string | undefined,
  {
    dispatch: AppDispatch;
    state: RootState;
  }
>("request-response/deleteAllRequestOrFolder", async (id, { dispatch }) => {
  try {
    dispatch(handleDeleteAllRequestOrFolder());
    await window.electronAPIRequestOrFolderMetaDB.deleteRequestOrFolderMetaByProjectId(
      id
    );
  } catch (error) {
    console.error(error);
  }
});

export const deleteRequestOrFolder = createAsyncThunk<
  boolean,
  boolean | string,
  {
    state: RootState;
    dispatch: AppDispatch;
  }
>(
  "request-response/deleteRequestOrFolder",
  async (payload, { getState, dispatch }) => {
    try {
      const state = getState() as RootState;

      /* if false then cancel the deletion */
      if (!payload) {
        dispatch(handleChangeDeleteFolderOrRequestId(""));
        return false;
      }

      /* if true then get the id else take passed id as payload */
      const rootId =
        payload === true
          ? state.requestResponse.deleteFolderOrRequestId
          : payload;
      dispatch(handleChangeDeleteFolderOrRequestId(""));

      const idsToDelete = getNestedIds({
        source: state.requestResponse.requestList,
        id: rootId,
      });

      const response =
        await window.electronAPIRequestOrFolderMetaDB.deleteRequestOrFolderMetaById(
          idsToDelete
        );
      if (response) {
        dispatch(handleChangeIsRequestListLoaded(false));
        dispatch(loadTabsData());
      }
      return response;
    } catch (error) {
      console.error(error);
      return false;
    }
  }
);

export const duplicateRequestOrFolder = createAsyncThunk<
  boolean,
  string,
  {
    state: RootState;
    dispatch: AppDispatch;
  }
>(
  "request-response/duplicateRequestOrFolder",
  async (id: string, { dispatch, getState }) => {
    try {
      const state = getState() as RootState;
      const projectId = state.project.activeProjectId;
      const requestList = state.requestResponse.requestList;

      if (!projectId) return false;

      const { newParentId, nodes: duplicatedNodes } =
        duplicateRequestOrFolderNode({
          source: requestList,
          id,
          parentId: requestList[id]?.parentId,
        });

      const oldNewIdMap = Object.values(duplicatedNodes).reduce(
        (acc, curr) => {
          acc[curr.oldId] = curr.id;
          return acc;
        },
        {} as Record<string, string>
      );

      if (duplicatedNodes?.[newParentId]?.name) {
        duplicatedNodes[newParentId].name += " copy";

        if (getRequestType(duplicatedNodes[newParentId]) === "folder")
          duplicatedNodes[newParentId].isExpended = false;
      }

      const duplicatedData = Object.values(duplicatedNodes);
      const duplicatedDataFiltered = duplicatedData.map(
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        ({ children, createdAt, oldId, ...rest }) => ({
          ...rest,
          projectId,
        })
      );

      const response =
        await window.electronAPIRequestOrFolderMetaDB.duplicateRequestOrFolderMeta(
          duplicatedDataFiltered
        );

      if (!response) return false;

      await Promise.all([
        /* duplicate urls */
        dispatch(duplicateRequestApiUrlsByOldNewIds(oldNewIdMap)),
        /* duplicate params */
        dispatch(duplicateParamsByOldNewIds(oldNewIdMap)),
        /* duplicate headers */
        dispatch(duplicateHeadersByOldNewIds(oldNewIdMap)),
        /* duplicate hidden headers */
        dispatch(duplicateHiddenHeadersByOldNewIds(oldNewIdMap)),
        /* duplicate show hidden meta-data */
        dispatch(duplicateShowHiddenMetaDataByOldNewIds(oldNewIdMap)),
        /* duplicate request meta tab */
        dispatch(duplicateRequestMetaTabByOldNewIds(oldNewIdMap)),
        /* duplicate request body raw */
        dispatch(duplicateBodyRawByOldNewIds(oldNewIdMap)),
        /* duplicate request body binary */
        dispatch(duplicateBodyBinaryByOldNewIds(oldNewIdMap)),
        /* duplicate request body x-www-url-formencoded */
        dispatch(duplicateBodyXWWWFormUrlencodedByOldNewIds(oldNewIdMap)),
        /* duplicate request body form-data */
        dispatch(duplicateBodyFormDataByOldNewIds(oldNewIdMap)),
        /* duplicate request meta show column */
        dispatch(duplicateMetaShowColumnByOldNewIds(oldNewIdMap)),
        /* duplicate request auth */
        dispatch(duplicateAuthorizationByOldNewIds(oldNewIdMap)),
        /* duplicate folder */
        dispatch(duplicateFolderByOldNewIds(oldNewIdMap)),
      ]);

      dispatch(handleChangeIsRequestListLoaded(false));

      return response;
    } catch (error) {
      console.error(error);
      return false;
    }
  }
);

export const collapseAllRequestOrFolder = createAsyncThunk<
  boolean,
  void,
  {
    state: RootState;
    dispatch: AppDispatch;
  }
>("request-response/collapseAllRequestOrFolder", async (_, { dispatch }) => {
  try {
    const response =
      await window.electronAPIRequestOrFolderMetaDB.collapseAllRequestOrFolderMeta();

    if (response) dispatch(handleChangeCollapseAllRequestOrFolder());
    return response;
  } catch (error) {
    console.error(error);
    return false;
  }
});
/* ==============================
======= RequestList end =========
================================= */
