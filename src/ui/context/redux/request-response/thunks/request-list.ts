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
} from "@/context/redux/request-response/request-response-slice";
import { v4 as uuidv4 } from "uuid";
import {
  duplicateRequestOrFolderNode,
  getNestedIds,
  getRequestType,
} from "@/utils/request-response.utils";
import { loadTabsData } from "@/context/redux/request-response/thunks/tab-list";

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
    console.log(error);
  }
});

export const createSingleRequest = createAsyncThunk<
  void,
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
  } catch (error) {
    console.log(error);
  }
});

export const createCollection = createAsyncThunk<
  void,
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
  } catch (error) {
    console.log(error);
  }
});

export const createRestApiBasic = createAsyncThunk<
  void,
  void,
  {
    dispatch: AppDispatch;
    state: RootState;
  }
>("request-response/createSingleRequest", async (_, { dispatch }) => {
  try {
    const parentFolder: RequestListItemInterface = {
      id: uuidv4(),
      name: "REST API basics: CRUD, test & variable",
      children: [],
      createdAt: Date.now(),
    };

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
    await window.electronAPIRequestOrFolderMetaDB.createRequestOrFolderMeta(
      requestList
    );
  } catch (error) {
    console.log(error);
  }
});

/* action by selected tab start =============== */
export const createSingleRequestBySelectedTab = createAsyncThunk<
  void,
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
    } catch (error) {
      console.log(error);
    }
  }
);

export const createCollectionBySelectedTab = createAsyncThunk<
  void,
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
    } catch (error) {
      console.log(error);
    }
  }
);

export const createRestApiBasicBySelectedTab = createAsyncThunk<
  void,
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
        name: "REST API basics: CRUD, test & variable",
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
    } catch (error) {
      console.log(error);
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
    console.log(error);
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
      console.log(error);
    }
  }
);

export const moveRequestOrFolder = createAsyncThunk<
  void,
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
      if (parentId && requestAllChildrenList.includes(parentId)) return;

      if (parentDetails && getRequestType(parentDetails) === "request")
        parentId = parentDetails.parentId;
      if (parentId === requestDetails.parentId) return;

      const response =
        await window.electronAPIRequestOrFolderMetaDB.moveRequestOrFolderMeta({
          id: requestId,
          parentId,
        });
      if (response) await dispatch(expendRequestOrFolder(parentId));
      dispatch(handleChangeIsRequestListLoaded(false));
    } catch (error) {
      console.log(error);
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
    console.log(error);
  }
});

export const deleteRequestOrFolder = createAsyncThunk<
  void,
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
        return;
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
    } catch (error) {
      console.log(error);
    }
  }
);

export const duplicateRequestOrFolder = createAsyncThunk<
  void,
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
      const requestList = state.requestResponse.requestList;

      const { newParentId, nodes: duplicatedNodes } =
        duplicateRequestOrFolderNode({
          source: requestList,
          id,
          parentId: requestList[id]?.parentId,
        });

      if (duplicatedNodes?.[newParentId]?.name) {
        duplicatedNodes[newParentId].name += " copy";

        if (getRequestType(duplicatedNodes[newParentId]) === "folder")
          duplicatedNodes[newParentId].isExpended = false;
      }

      const duplicatedData = Object.values(duplicatedNodes).map(
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        ({ children, createdAt, ...rest }) => rest
      );

      const response =
        await window.electronAPIRequestOrFolderMetaDB.duplicateRequestOrFolderMeta(
          duplicatedData
        );

      if (response) dispatch(handleChangeIsRequestListLoaded(false));
    } catch (error) {
      console.log(error);
    }
  }
);

export const collapseAllRequestOrFolder = createAsyncThunk<
  void,
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
  } catch (error) {
    console.log(error);
  }
});
/* ==============================
======= RequestList end =========
================================= */
