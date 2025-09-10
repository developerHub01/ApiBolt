import { type RequestListItemInterface } from "@/types/request-response.types";
import { createAsyncThunk } from "@reduxjs/toolkit";
import type { AppDispatch, RootState } from "@/context/redux/store";
import {
  handleAddTab,
  handleChangeIsRequestListLoaded,
  handleChangeSelectedTab,
  handleChangeTabList,
  handleCreateSingleRequest,
} from "@/context/redux/request-response/request-response-slice";
import { v4 as uuidv4 } from "uuid";
import { getNodeParentsIdList } from "@/utils/request-response.utils";

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
    console.log(error);
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
    console.log(error);
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
    console.log(error);
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
      console.log(error);
    }
  }
);
/* ==============================
========= TabList end =========
================================= */
