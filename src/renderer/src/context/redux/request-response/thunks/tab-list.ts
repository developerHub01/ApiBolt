import { type RequestListItemInterface } from "@shared/types/request-response.types";
import { createAsyncThunk } from "@reduxjs/toolkit";
import type { AppDispatch, RootState } from "@/context/redux/store";
import {
  handleAddTab,
  handleChangeIsRequestListLoaded,
  handleChangeSelectedTab,
  handleChangeTabList,
  handleCreateSingleRequest,
  handleRemoveAllLeftTabs,
  handleRemoveAllRightTabs,
  handleRemoveOtherTabs,
  handleRemoveTab,
} from "@/context/redux/request-response/request-response-slice";
import { v4 as uuidv4 } from "uuid";
import { getNodeParentsIdList } from "@/utils/request-response.utils";
import { handleClearHistoryCache } from "@/context/redux/history/history-slice";

/* ==============================
========= TabList start =========
================================= */
export const loadTabsData = createAsyncThunk<
  void,
  void,
  {
    dispatch: AppDispatch;
    state: RootState;
  }
>("request-response/loadTabsData", async (_, { dispatch }) => {
  try {
    const tabsListData = await window.electronAPITabs.getTabList();

    dispatch(handleChangeTabList(tabsListData?.openTabs ?? []));
    dispatch(handleChangeSelectedTab(tabsListData?.selectedTab ?? null));
  } catch (error) {
    console.error(error);
  }
});

export const changeSelectedTab = createAsyncThunk<
  void,
  string | undefined | null,
  {
    state: RootState;
  }
>("request-response/changeSelectedTab", async (id, { getState, dispatch }) => {
  try {
    const state = getState() as RootState;
    dispatch(handleChangeSelectedTab(id));

    /***
     * =============================================
     * Clearing history cache for freeing in-memory
     * =============================================
     * **/
    const previousSelectedTab = state.requestResponse.selectedTab;
    if (previousSelectedTab) dispatch(handleClearHistoryCache());
  } catch (error) {
    console.error(error);
  }
});

export const changeTabsData = createAsyncThunk<
  void,
  void,
  {
    state: RootState;
  }
>("request-response/changeTabsData", async (_, { getState }) => {
  const state = getState() as RootState;
  try {
    await window.electronAPITabs.updateTabList({
      openTabs: state.requestResponse.tabList,
      selectedTab: state.requestResponse.selectedTab,
    });
  } catch (error) {
    console.error(error);
  }
});

export const addNewTabsData = createAsyncThunk<
  void,
  | {
      index?: number;
      autoSelect?: boolean;
    }
  | undefined,
  {
    state: RootState;
    dispatch: AppDispatch;
  }
>(
  "request-response/addNewTabsData",
  async (payload, { getState, dispatch }) => {
    try {
      const index = payload?.index;
      const autoSelect = payload?.autoSelect ?? false;
      const state = getState() as RootState;
      const projectId = state.project.activeProjectId;
      if (!projectId) throw new Error();
      const newTabId = uuidv4();

      const createPayload: RequestListItemInterface = {
        id: newTabId,
        name: "Request",
        method: "get",
        projectId,
      };

      dispatch(
        handleAddTab({
          id: newTabId,
          index,
        }),
      );
      if (autoSelect) dispatch(handleChangeSelectedTab(newTabId));
      dispatch(handleCreateSingleRequest(createPayload));
      await window.electronAPIRequestOrFolderMeta.createRequestOrFolderMeta(
        createPayload,
      );
    } catch (error) {
      console.error(error);
    }
  },
);

export const addNewTabsToLeftOrRight = createAsyncThunk<
  void,
  {
    id: string;
    type: "left" | "right";
  },
  {
    state: RootState;
    dispatch: AppDispatch;
  }
>(
  "request-response/addNewTabsToRight",
  async ({ id, type }, { getState, dispatch }) => {
    try {
      const state = getState() as RootState;
      const tabList = state.requestResponse.tabList;
      const tabIndex = tabList.findIndex(item => item === id);
      if (tabIndex < 0) throw new Error();

      dispatch(
        addNewTabsData({
          index: type === "left" ? tabIndex : tabIndex + 1,
        }),
      );
    } catch (error) {
      console.error(error);
    }
  },
);

export const expendParentsOnSelectedChangeTabsData = createAsyncThunk<
  void,
  string,
  {
    state: RootState;
    dispatch: AppDispatch;
  }
>(
  "request-response/expendParentsOnSelectedChangeTabsData",
  async (id, { dispatch, getState }) => {
    try {
      const state = getState() as RootState;
      const requestList = state.requestResponse.requestList;

      const payload = getNodeParentsIdList({
        source: requestList,
        id,
      });

      if (!payload?.length) return;

      const response =
        await window.electronAPIRequestOrFolderMeta.expendOrCollapseRequestOrFolderMetaAll(
          payload,
          true,
        );

      if (response) dispatch(handleChangeIsRequestListLoaded(false));
    } catch (error) {
      console.error(error);
    }
  },
);

export const removeTab = createAsyncThunk<
  void,
  {
    id?: string | null;
    type: "current" | "others" | "all-left" | "all-right";
  },
  {
    state: RootState;
    dispatch: AppDispatch;
  }
>("request-response/removeTab", ({ id, type }, { dispatch, getState }) => {
  try {
    const state = getState() as RootState;
    id = id ?? state.requestResponse.selectedTab;
    const activeTab = state.sidebar.activeTab;
    if (!id) throw new Error();

    if (activeTab !== "navigate_collections") return;
    switch (type) {
      case "current":
        dispatch(handleRemoveTab(id));
        break;
      case "others":
        dispatch(handleRemoveOtherTabs(id));
        break;
      case "all-left":
        dispatch(handleRemoveAllLeftTabs(id));
        break;
      case "all-right":
        dispatch(handleRemoveAllRightTabs(id));
        break;
    }
  } catch (error) {
    console.error(error);
  }
});

/* ==============================
========= TabList end =========
================================= */
