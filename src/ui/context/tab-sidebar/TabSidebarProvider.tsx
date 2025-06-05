import React, {
  createContext,
  useContext,
  useEffect,
} from "react";
import { useNavigate } from "react-router";
import { useAppDispatch, useAppSelector } from "@/context/redux/hooks";
import type { THTTPMethods } from "@/context/redux/request-response/request-response-slice";
import {
  changeTabsData,
  loadTabList,
} from "@/context/redux/request-response/request-response-thunk";

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

// interface TabSidebarContext {
  
// }

// const TabSidebarContext = createContext<TabSidebarContext | null>(null);
const TabSidebarContext = createContext<undefined>(undefined);

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
  const tabList = useAppSelector((state) => state.requestResponse.tabList);
  const requestList = useAppSelector((state) => state.requestResponse.requestList);
  const selectedTab = useAppSelector((state) => state.requestResponse.selectedTab);
  const navigate = useNavigate();

  useEffect(() => {
    dispatch(loadTabList());
  }, [dispatch]);

  let changeTabDataTimeout;
  useEffect(() => {
    clearTimeout(changeTabDataTimeout);
    setTimeout(() => {
      dispatch(changeTabsData());
    }, 500);
  }, [tabList, selectedTab, changeTabDataTimeout, dispatch]);

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
  }, [selectedTab, tabList, requestList, navigate]);

  return (
    <TabSidebarContext.Provider
      value={undefined}
    >
      {children}
    </TabSidebarContext.Provider>
  );
};

export default TabSidebarProvider;
