import type {
  RequestListInterface,
  RequestListItemInterface,
  RequestListItemUpdatePayloadInterface,
} from "@shared/types/request-response.types";
import { createSlice, type PayloadAction } from "@reduxjs/toolkit";
import { v4 as uuidv4 } from "uuid";

export interface MockState {
  requestList: RequestListInterface;
  loadedRequestList: Record<string, boolean>;
  isRequestListLoaded: boolean;
  deleteFolderOrRequestId: string;
  isClearingRequestOrFolderId: string | null;
  requestListCollapsed: boolean;

  tabList: Array<string>;
  selectedTab: string | null /* selectedTabId in tabList */;
  isTabListCollapsed: boolean;
}

// Define the initial state using that type
const initialState: MockState = {
  requestList: {},
  loadedRequestList: {},
  isRequestListLoaded: false,
  deleteFolderOrRequestId: "",
  isClearingRequestOrFolderId: null,
  requestListCollapsed: false,

  tabList: [],
  selectedTab: null,
  isTabListCollapsed: false,
};

const mockSlice = createSlice({
  name: "mock",
  // `createSlice` will infer the state type from the `initialState` argument
  initialState,
  reducers: {
    /* ================ Requestlist start =================== */
    handleLoadRequestList: (
      state,
      action: PayloadAction<RequestListInterface>,
    ) => {
      state.requestList = action.payload;
    },
    handleUpdateRequestOrFolderMeta: (
      state,
      action: PayloadAction<
        Partial<RequestListItemInterface> & Pick<RequestListItemInterface, "id">
      >,
    ) => {
      const id = action.payload.id;

      state.requestList[id] = {
        ...(state.requestList[id] ?? {}),
        ...action.payload,
      };
    },
    handleChangeIsRequestListLoaded: (
      state,
      action: PayloadAction<boolean | undefined>,
    ) => {
      state.isRequestListLoaded = action.payload ?? !state.isRequestListLoaded;
    },
    handleToggleRequestList: (
      state,
      action: PayloadAction<boolean | undefined>,
    ) => {
      if (action.payload === state.requestListCollapsed) return;

      state.requestListCollapsed =
        action.payload ?? !state.requestListCollapsed;
    },
    handleCreateSingleRequest: (
      state,
      action: PayloadAction<RequestListItemInterface>,
    ) => {
      const payload = action.payload;

      if (!payload.id) return;

      const { parentId } = payload;

      if (parentId && state.requestList[parentId]) {
        const parentData = state.requestList[parentId];
        if (!parentData.children) parentData.children = [];
        parentData.children.push(payload.id);
      }

      state.requestList[payload.id] = payload;
    },
    handleCreateRestApiBasic: (
      state,
      action: PayloadAction<Array<RequestListItemInterface>>,
    ) => {
      const payload = (action.payload ?? [])?.reduce(
        (acc, curr) => {
          acc[curr.id] = curr;
          return acc;
        },
        {} as Record<string, RequestListItemInterface>,
      );

      Object.assign(state.requestList, payload);

      /* update if parent exist then that's children list */

      /* though not necessary but checking if first requestOrFolder is not folder then return */
      if (
        !action.payload[0].children ||
        !action.payload[0].parentId ||
        state.requestList[action.payload[0].parentId].method
      )
        return;

      /* if children not exist in parent then update with payload folder id as children  */
      /* if children exist in parent then add the payload folder id in children list  */
      if (!state.requestList[action.payload[0].parentId].children)
        state.requestList[action.payload[0].parentId].children = [
          action.payload[0].id,
        ];
      else
        state.requestList[action.payload[0].parentId].children?.push(
          action.payload[0].id,
        );
    },
    handleUpdateRequestOrFolder: (
      state,
      action: PayloadAction<RequestListItemUpdatePayloadInterface>,
    ) => {
      const { id } = action.payload;

      if (!state.requestList[id]) return;

      state.requestList[id] = {
        ...state.requestList[id],
        ...action.payload,
      };
    },
    handleDeleteAllRequestOrFolder: state => {
      state.requestList = {};
    },
    handleChangeDeleteFolderOrRequestId: (
      state,
      action: PayloadAction<string>,
    ) => {
      state.deleteFolderOrRequestId = action.payload;
    },
    handleChangeIsClearingRequestOrFolderId: (
      state,
      action: PayloadAction<string | null | undefined>,
    ) => {
      state.isClearingRequestOrFolderId = action.payload ?? null;
    },
    handleChangeCollapseAllRequestOrFolder: state => {
      Object.keys(state.requestList).forEach(id => {
        state.requestList[id].isExpended = false;
      });
    },
    /* ================ Requestlist end =================== */

    /* ================ TabList start =================== */
    handleClearTabList: state => {
      state.tabList = [];
      state.selectedTab = null;
    },
    handleChangeTabList: (state, action: PayloadAction<Array<string>>) => {
      state.tabList = action.payload;
    },
    handleAddTab: (
      state,
      action: PayloadAction<{ id?: string; index?: number } | undefined>,
    ) => {
      const id = action.payload?.id ?? uuidv4();
      const index = action.payload?.index;

      /** prevent duplicates */
      if (state.tabList.includes(id)) return;

      let addIndex = state.tabList.length;

      /** if index is provided -> highest priority */
      if (typeof index === "number")
        addIndex = Math.max(0, Math.min(index, state.tabList.length));
      else {
        const selectedIdIndex = state.tabList.findIndex(
          tabId => tabId === state.selectedTab,
        );

        /** insert after selected tab if exists */
        if (selectedIdIndex >= 0) addIndex = selectedIdIndex + 1;
      }

      /** insert tab */
      state.tabList.splice(addIndex, 0, id);
    },

    handleRemoveTab: (state, action: PayloadAction<string | undefined>) => {
      const id = action.payload ?? state.selectedTab;
      if (!id) return;

      const idIndex = state.tabList.findIndex(tabId => tabId === id);
      const newTabList = state.tabList.filter(tabId => tabId !== id);
      state.tabList = newTabList;

      // If the removed tab isn't the selected one, no need to touch selectedTab
      if (id !== state.selectedTab) return;

      const nextSelectedTabIndex = Math.max(
        Math.min(idIndex, newTabList.length - 1),
        0,
      );

      // If no tabs left, set to null
      state.selectedTab =
        newTabList.length === 0 ? null : newTabList[nextSelectedTabIndex];
    },
    handleRemoveOtherTabs: (
      state,
      action: PayloadAction<string | undefined>,
    ) => {
      const id = action.payload ?? state.selectedTab;
      if (!id) return;

      state.tabList = state.tabList.filter(tabId => tabId === id);
    },
    handleRemoveAllRightTabs: (
      state,
      action: PayloadAction<string | undefined>,
    ) => {
      const id = action.payload ?? state.selectedTab;
      if (!id) return;

      const idIndex = state.tabList.findIndex(tabId => tabId === id);
      if (idIndex === -1) return;

      /* Keep LEFT + the selected one */
      state.tabList = state.tabList.slice(0, idIndex + 1);
    },
    handleRemoveAllLeftTabs: (
      state,
      action: PayloadAction<string | undefined>,
    ) => {
      const id = action.payload ?? state.selectedTab;
      if (!id) return;

      const idIndex = state.tabList.findIndex(tabId => tabId === id);
      if (idIndex === -1) return;

      /* Keep RIGHT */
      state.tabList = state.tabList.slice(idIndex);
    },
    handleMoveTab: (
      state,
      action: PayloadAction<{
        id: string;
        index?: number;
      }>,
    ) => {
      const { id, index } = action.payload;

      let tabList = state.tabList;

      const idIndex = tabList.findIndex(tabId => tabId === id);
      if (idIndex >= 0) tabList = tabList.filter(tabId => tabId !== id);

      tabList.splice(index ?? tabList.length, 0, id);
      state.tabList = [...tabList];
    },
    handleChangeSelectedTab: (
      state,
      action: PayloadAction<string | undefined | null>,
    ) => {
      const id = action.payload;

      if (!id) {
        state.selectedTab = null;
        return;
      }

      const newSelectedTabIndex = state.tabList.findIndex(
        tabId => tabId === id,
      );
      const oldSelectedTabIndex = state.tabList.findIndex(
        tabId => tabId === state.selectedTab,
      );

      /* if new selected tab index doesnt exist in tabList (in open tabs) then add it next to old selected tab if old exist else last */
      if (newSelectedTabIndex < 0) {
        const newTabList = state.tabList;
        newTabList.splice(
          oldSelectedTabIndex < 0
            ? state.tabList.length
            : oldSelectedTabIndex + 1,
          0,
          id,
        );
        state.tabList = newTabList;
      }

      state.selectedTab = id;
    },
    handleToggleTabListCollapse: (
      state,
      action: PayloadAction<boolean | undefined>,
    ) => {
      state.isTabListCollapsed = action.payload ?? !state.isTabListCollapsed;
    },
    /* ================ TabsList end =================== */

    handleKeepOnlyWindowedRequests: (
      state,
      action: PayloadAction<Array<string>>,
    ) => {
      const windowedRequest = new Set(action.payload);
      const extraRequest = Object.keys(state.requestList).filter(
        id => !windowedRequest.has(id),
      );

      const keysToDelete = [
        "loadedRequestList",
        "isResponseCollapsed",
        "activeMetaTab",
        "metaShowColumn",
        "paramsBulkEditOpen",
        "headersBulkEditOpen",
        "formDataBulkEditOpen",
        "xWWWFormEncodedBulkEditOpen",
        "rawData",
        "rawDataLineWrap",
        "response",
        "isResposneError",
        "requestBodyType",
        "rawRequestBodyType",
        "params",
        "showHiddenParams",
        "headers",
        "hiddenCookie",
        "hiddenHeaders",
        "authorizationHeader",
        "authorizationParam",
        "showHiddenHeaders",
        "binaryData",
        "formData",
        "xWWWFormUrlencodedData",
        "isDownloadRequestWithBase64",
        "authType",
        "authInheritedId",
        "apiKeyAuth",
        "basicAuth",
        "bearerTokenAuth",
        "jwtBearerAuth",
        "activeResponseMetaTab",
        "activeResponseDataTab",
        "responseCodeWrap",
        "folderTitle",
        "folderDescription",
        "folderDescriptionActiveTab",
        "folderDescriptionLineWrap",
      ];

      extraRequest.forEach(requestId => {
        keysToDelete.forEach(key => {
          if (state[key as keyof typeof state]?.[requestId])
            delete state[key as keyof typeof state]?.[requestId];
        });
      });
    },
  },
});

export const {
  handleLoadRequestList,
  handleUpdateRequestOrFolderMeta,
  handleChangeIsRequestListLoaded,
  handleToggleRequestList,
  handleUpdateRequestOrFolder,
  handleDeleteAllRequestOrFolder,
  handleChangeDeleteFolderOrRequestId,
  handleChangeIsClearingRequestOrFolderId,
  handleChangeCollapseAllRequestOrFolder,
  handleCreateSingleRequest,
  handleCreateRestApiBasic,

  handleChangeTabList,
  handleClearTabList,
  handleAddTab,
  handleRemoveTab,
  handleRemoveOtherTabs,
  handleRemoveAllRightTabs,
  handleRemoveAllLeftTabs,
  handleMoveTab,
  handleChangeSelectedTab,
  handleToggleTabListCollapse,

  handleKeepOnlyWindowedRequests,
} = mockSlice.actions;

export default mockSlice.reducer;
