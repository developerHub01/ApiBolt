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
import {
  selectSelectedTab,
  selectTabList,
} from "@/context/redux/request-response/selectors/tab-list";
import { selectRequestOrFolderList } from "@/context/redux/request-response/selectors/request-list";

interface TabSidebarContext {
  tabList: Array<string>;
  totalTabsOpen: number;
  localTabList: Array<string>;
  isTabListHovering: boolean;
  handleSearch: (searchTerm: string) => void;
  handleChangeIsTabListHovering: (value?: boolean | undefined) => void;
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
  const tabList = useAppSelector(selectTabList);
  const requestList = useAppSelector(selectRequestOrFolderList);
  const selectedTab = useAppSelector(selectSelectedTab);
  const [isTabListHovering, setIsTabListHovering] = useState<boolean>(false);
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

  const handleChangeIsTabListHovering = useCallback(
    (value?: boolean) => setIsTabListHovering((prev) => value ?? !prev),
    []
  );

  return (
    <TabSidebarContext.Provider
      value={{
        tabList,
        totalTabsOpen: tabList.length ?? 0,
        localTabList,
        handleSearch,
        isTabListHovering,
        handleChangeIsTabListHovering,
      }}
    >
      {children}
    </TabSidebarContext.Provider>
  );
};

export default TabSidebarProvider;
