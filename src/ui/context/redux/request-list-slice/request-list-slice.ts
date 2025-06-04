import type { TMethod } from "@/types";
import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import type { THTTPMethods } from "@/context/redux/request-response/request-response-slice";

export interface RequestListItemInterface {
  id: string;
  name: string;
  method?: TMethod;
  children?: Array<string>;
  parent?: string;
  createdAt?: number;
}

export interface RequestListInterface {
  [key: string]: RequestListItemInterface;
}

// Define a type for the slice state
interface RequestListState {
  requestList: RequestListInterface;
  deleteFolderOrRequestId: string;
  openFolderList: Array<string>;
  isDataLoaded: boolean;
  shouldDataLoad: boolean;
}

// Define the initial state using that type
const initialState: RequestListState = {
  requestList: {},
  deleteFolderOrRequestId: "",
  openFolderList: [],
  isDataLoaded: false,
  shouldDataLoad: false,
};

export const requestListSlice = createSlice({
  name: "request-list",
  // `createSlice` will infer the state type from the `initialState` argument
  initialState,
  reducers: {
    handleChangeIsDataLoaded: (
      state,
      action: PayloadAction<boolean | undefined>
    ) => {
      state.isDataLoaded = action.payload ?? !state.isDataLoaded;
    },
    handleChangeShouldDataLoad: (
      state,
      action: PayloadAction<boolean | undefined>
    ) => {
      state.shouldDataLoad = action.payload ?? !state.shouldDataLoad;
    },
    handleLoadRequestList: (
      state,
      action: PayloadAction<RequestListInterface>
    ) => {
      state.requestList = action.payload;
    },
    handleLoadOpenFolderList: (state, action: PayloadAction<Array<string>>) => {
      state.openFolderList = action.payload;
    },
    handleToggleFolder: (state, action: PayloadAction<string>) => {
      const folderId = action.payload;
      const isOpen = state.openFolderList.includes(folderId);

      state.openFolderList = isOpen
        ? state.openFolderList.filter((id) => id !== folderId)
        : [...state.openFolderList, folderId];
    },
    handleChangeRequestName: (
      state,
      action: PayloadAction<{
        id: string;
        name: string;
      }>
    ) => {
      const { id, name } = action.payload;
      if (state.requestList[id]?.name && name)
        state.requestList[id].name = name;
    },
    handleChangeRequestHTTPMethod: (
      state,
      action: PayloadAction<{
        id: string;
        method: THTTPMethods;
      }>
    ) => {
      const { id, method } = action.payload;
      if (state.requestList[id]?.method) state.requestList[id].method = method;
    },
    handleChangeDeleteFolderOrRequestId: (
      state,
      action: PayloadAction<string>
    ) => {
      state.deleteFolderOrRequestId = action.payload;
    },
    handleCreateSingleRequest: (
      state,
      action: PayloadAction<RequestListItemInterface>
    ) => {
      const payload = action.payload;

      const parentId = payload.parent;

      if (parentId && state.requestList[parentId]) {
        const parentData = state.requestList[parentId];
        parentData.children?.push(payload.id);
      }

      state.requestList[payload.id] = payload;
    },
    handleCreateRestApiBasic: (
      state,
      action: PayloadAction<Array<RequestListItemInterface>>
    ) => {
      const payload = (action.payload ?? [])?.reduce(
        (acc, curr) => {
          acc[curr.id] = curr;
          return acc;
        },
        {} as Record<string, RequestListItemInterface>
      );

      state.requestList = {
        ...state.requestList,
        ...payload,
      };
    },
  },
});

export const {
  handleChangeIsDataLoaded,
  handleChangeShouldDataLoad,
  handleLoadRequestList,
  handleLoadOpenFolderList,
  handleToggleFolder,
  handleChangeRequestName,
  handleChangeRequestHTTPMethod,
  handleChangeDeleteFolderOrRequestId,
  handleCreateSingleRequest,
  handleCreateRestApiBasic,
} = requestListSlice.actions;

export default requestListSlice.reducer;
