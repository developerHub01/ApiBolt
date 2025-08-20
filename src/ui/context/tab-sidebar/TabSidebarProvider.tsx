import React, {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useState,
} from "react";
import { useAppDispatch, useAppSelector } from "@/context/redux/hooks";
import {
  changeTabsData,
  loadTabsData,
} from "@/context/redux/request-response/thunks/tab-list";
import { normalizeText } from "@/utils";

interface TabSidebarContext {
  tabList: Array<string>;
  localTabList: Array<string>;
  handleSearch: (searchTerm: string) => void;
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
  const tabList = useAppSelector((state) => state.requestResponse.tabList);
  const requestList = useAppSelector(
    (state) => state.requestResponse.requestList
  );
  const selectedTab = useAppSelector(
    (state) => state.requestResponse.selectedTab
  );
  const [localTabList, setLocalTabList] = useState<Array<string>>(
    tabList ?? []
  );
  // const navigate = useNavigate();

  /* load tabsList */
  useEffect(() => {
    dispatch(loadTabsData());
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    setLocalTabList(tabList);
  }, [tabList]);

  let changeTabDataTimeout;
  useEffect(() => {
    clearTimeout(changeTabDataTimeout);
    setTimeout(() => {
      dispatch(changeTabsData());
    }, 500);
  }, [tabList, selectedTab, changeTabDataTimeout, dispatch]);

  // useEffect(() => {
  //   const defaultPath = "/";

  //   if (!selectedTab || !tabList.length) {
  //     navigate(defaultPath);
  //     return;
  //   }

  //   const tabDetails = requestList[selectedTab];

  //   if (!tabDetails) navigate(defaultPath);
  //   else
  //     navigate(`/${tabDetails.children ? "folder" : "request"}/${selectedTab}`);
  // }, [selectedTab, tabList, requestList, navigate]);

  const handleSearch = useCallback(
    (searchTerm: string) => {
      searchTerm = normalizeText(searchTerm);
      if (!searchTerm) return setLocalTabList(tabList);

      setLocalTabList(
        tabList.filter((tab) => {
          const tabDetails = requestList[tab];

          if (!tabDetails) return false;

          return normalizeText(tabDetails.name).includes(searchTerm);
        })
      );
    },
    [requestList, tabList]
  );

  return (
    <TabSidebarContext.Provider
      value={{
        tabList,
        localTabList,
        handleSearch,
      }}
    >
      {children}
    </TabSidebarContext.Provider>
  );
};

export default TabSidebarProvider;
