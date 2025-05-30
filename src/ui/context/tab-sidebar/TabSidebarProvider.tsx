/* eslint-disable react-hooks/exhaustive-deps */
import React, {
  createContext,
  useCallback,
  useContext,
  useEffect,
} from "react";
import { useNavigate } from "react-router";
import type { THTTPMethods } from "@/context/request/RequestResponseProvider";
import { useAppDispatch, useAppSelector } from "@/context/redux/hooks";
import {
  handleChangeSelectedTab,
  handleChangeTabList,
} from "@/context/redux/tab-sidebar-slice";

export interface TabInterface {
  id: string;
  name: string;
  method?: THTTPMethods;
  children?: Array<string>;
}

export interface TabsDataInterface {
  openTabs: Array<string>;
  selectedTab?: string | null;
}

interface TabSidebarContext {
  changeTabsData: () => Promise<void>;
}

const TabSidebarContext = createContext<TabSidebarContext | null>(null);

// eslint-disable-next-line react-refresh/only-export-components
export const useTabSidebar = () => {
  const context = useContext(TabSidebarContext);

  if (!context) {
    throw new Error("useTabSidebar must be used within a TabSidebarProvider.");
  }

  return context;
};

interface TabSidebarProviderProps {
  children: React.ReactNode;
}

const TabSidebarProvider = ({ children }: TabSidebarProviderProps) => {
  const dispatch = useAppDispatch();
  const tabList = useAppSelector((state) => state.tabSidebar.tabList);
  const requestList = useAppSelector((state) => state.requestList.requestList);
  const selectedTab = useAppSelector((state) => state.tabSidebar.selectedTab);
  const navigate = useNavigate();

  useEffect(() => {
    (async () => {
      const tabsListData = await window.electronAPIDB.getTabList();

      dispatch(handleChangeTabList(tabsListData.openTabs ?? []));
      dispatch(handleChangeSelectedTab(tabsListData.selectedTab ?? null));
    })();
  }, []);

  let changeTabDataTimeout;
  useEffect(() => {
    clearTimeout(changeTabDataTimeout);
    setTimeout(() => {
      (async () => changeTabsData())();
    }, 500);
  }, [tabList, selectedTab]);

  useEffect(() => {
    const defaultPath = "/";

    if (!selectedTab || !tabList.length) {
      navigate(defaultPath);
      return;
    }

    const tabDetails = requestList[selectedTab];

    if (!tabDetails) navigate(defaultPath);
    else
      navigate(`/${tabDetails.children ? "folder" : "request"}/${selectedTab}`);
  }, [selectedTab, tabList, requestList]);

  const changeTabsData = useCallback(async () => {
    await window.electronAPIDB.changeTabsData({
      openTabs: tabList,
      selectedTab,
    });
  }, [tabList, selectedTab]);

  return (
    <TabSidebarContext.Provider
      value={{
        changeTabsData,
      }}
    >
      {children}
    </TabSidebarContext.Provider>
  );
};

export default TabSidebarProvider;
