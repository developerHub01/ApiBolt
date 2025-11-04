import { type RequestListItemInterface } from "@/types/request-response.types";
import { createAsyncThunk } from "@reduxjs/toolkit";
import type { AppDispatch, RootState } from "@/context/redux/store";
import {
  handleAddTab,
  handleChangeIsRequestListLoaded,
  handleChangeSelectedTab,
  handleChangeTabList,
  handleCreateSingleRequest,
  handleRemoveTab,
} from "@/context/redux/request-response/request-response-slice";
import { v4 as uuidv4 } from "uuid";
import { getNodeParentsIdList } from "@/utils/request-response.utils";
import { handleClearHistoryCacheByRequestId } from "@/context/redux/history/history-slice";

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
    const tabsListData = await window.electronAPITabsDB.getTabList();

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
    if (previousSelectedTab)
      dispatch(handleClearHistoryCacheByRequestId(previousSelectedTab));
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
    await window.electronAPITabsDB.updateTabList({
      openTabs: state.requestResponse.tabList,
      selectedTab: state.requestResponse.selectedTab,
    });
  } catch (error) {
    console.error(error);
  }
});

export const addNewTabsData = createAsyncThunk<
  void,
  void,
  {
    state: RootState;
    dispatch: AppDispatch;
  }
>("request-response/addNewTabsData", async (_, { dispatch }) => {
  try {
    const newTabId = uuidv4();

    const payload: RequestListItemInterface = {
      id: newTabId,
      name: "Request",
      method: "get",
    };

    dispatch(handleAddTab(newTabId));
    dispatch(handleChangeSelectedTab(newTabId));
    dispatch(handleCreateSingleRequest(payload));
    await window.electronAPIRequestOrFolderMetaDB.createRequestOrFolderMeta(
      payload
    );
  } catch (error) {
    console.error(error);
  }
});

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
        await window.electronAPIRequestOrFolderMetaDB.expendOrCollapseRequestOrFolderMetaAll(
          payload,
          true
        );

      if (response) dispatch(handleChangeIsRequestListLoaded(false));
    } catch (error) {
      console.error(error);
    }
  }
);

export const removeTab = createAsyncThunk<
  void,
  string | undefined,
  {
    state: RootState;
    dispatch: AppDispatch;
  }
>("request-response/removeTab", (id, { dispatch, getState }) => {
  try {
    const state = getState() as RootState;
    const activeTab = state.sidebar.activeTab;

    if (activeTab !== "navigate_collections") return;

    dispatch(handleRemoveTab(id));
  } catch (error) {
    console.error(error);
  }
});
/* ==============================
========= TabList end =========
================================= */
