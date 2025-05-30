import React, {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useState,
} from "react";
import { useNavigate } from "react-router";
import type { THTTPMethods } from "@/context/request/RequestResponseProvider";
import { useRequestList } from "@/context/request-list/RequestListProvider";

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
  tabListState: Array<string>;
  selectedTab: string | null;
  isTabListHovering: boolean;
  handleTabListHovering: (value: boolean) => void;
  addTab: (id: string) => void;
  removeTab: (id: string) => void;
  moveTab: (id: string, index?: number) => void;
  changeSelectedTab: (id: string) => void;
  changeTabsData: () => Promise<void>;
}

const TabSidebarContext = createContext<TabSidebarContext | null>(null);

// const tabList: Array<TabInterface> = [
//   {
//     id: "1",
//     method: "get",
//     name: "Request name Request name Request name Request name Request name Request name",
//   },
//   {
//     id: "2",
//     method: "post",
//     name: "Request name",
//   },
//   {
//     id: "3",
//     name: "Folder",
//     children: [],
//   },
//   {
//     id: "4",
//     method: "put",
//     name: "Request name",
//   },
//   {
//     id: "5",
//     method: "patch",
//     name: "Request name",
//   },
//   {
//     id: "6",
//     method: "delete",
//     name: "Request name",
//   },
//   {
//     id: "7",
//     method: "get",
//     name: "Request name",
//   },
//   {
//     id: "8",
//     name: "Folder",
//     children: [],
//   },
//   {
//     id: "9",
//     method: "get",
//     name: "Request name",
//   },
//   {
//     id: "10",
//     name: "Folder",
//     children: [],
//   },
//   {
//     id: "11",
//     method: "get",
//     name: "Request name",
//   },
//   {
//     id: "12",
//     method: "post",
//     name: "Request name",
//   },
//   {
//     id: "13",
//     name: "Folder",
//     children: [],
//   },
//   {
//     id: "14",
//     method: "put",
//     name: "Request name",
//   },
//   {
//     id: "15",
//     method: "patch",
//     name: "Request name",
//   },
//   {
//     id: "16",
//     method: "delete",
//     name: "Request name",
//   },
//   {
//     id: "17",
//     method: "get",
//     name: "Request name",
//   },
//   {
//     id: "18",
//     name: "Folder",
//     children: [],
//   },
//   {
//     id: "19",
//     method: "get",
//     name: "Request name",
//   },
//   {
//     id: "20",
//     name: "Folder",
//     children: [],
//   },
//   {
//     id: "21",
//     method: "get",
//     name: "Request name",
//   },
//   {
//     id: "22",
//     method: "post",
//     name: "Request name",
//   },
//   {
//     id: "23",
//     name: "Folder",
//     children: [],
//   },
//   {
//     id: "24",
//     method: "put",
//     name: "Request name",
//   },
//   {
//     id: "25",
//     method: "patch",
//     name: "Request name",
//   },
//   {
//     id: "26",
//     method: "delete",
//     name: "Request name",
//   },
//   {
//     id: "27",
//     method: "get",
//     name: "Request name",
//   },
//   {
//     id: "28",
//     name: "Folder",
//     children: [],
//   },
//   {
//     id: "29",
//     method: "get",
//     name: "Request name",
//   },
//   {
//     id: "30",
//     name: "Folder",
//     children: [],
//   },
// ];

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
  const [tabListState, setTabListState] = useState<Array<string>>([]);
  const [selectedTab, setSelectedTab] = useState<string | null>(null);
  const [isTabListHovering, setIsTabListHovering] = useState<boolean>(false);
  const { listData } = useRequestList();
  const navigate = useNavigate();

  useEffect(() => {
    if (isTabListHovering) setIsTabListHovering(false);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    (async () => {
      const tabsListData = await window.electronAPIDB.getTabList();

      setTabListState(tabsListData.openTabs ?? []);
      setSelectedTab(tabsListData.selectedTab ?? null);
    })();
  }, []);

  let changeTabDataTimeout;
  useEffect(() => {
    clearTimeout(changeTabDataTimeout);
    setTimeout(() => {
      (async () => changeTabsData())();
    }, 500);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [tabListState, selectedTab]);

  const handleTabListHovering = useCallback(
    (value: boolean) => {
      if (isTabListHovering !== value) setIsTabListHovering(value);
    },
    [isTabListHovering]
  );

  useEffect(() => {
    const defaultPath = "/";

    if (!selectedTab || !tabListState.length) {
      navigate(defaultPath);
      return;
    }

    const tabDetails = listData[selectedTab];

    if (!tabDetails) navigate(defaultPath);
    else
      navigate(`/${tabDetails.children ? "folder" : "request"}/${selectedTab}`);

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selectedTab, tabListState]);

  const addTab = useCallback(
    (id: string) => {
      let addIndex = tabListState.length;

      const selectedIdIndex = tabListState.findIndex(
        (tabId) => tabId === selectedTab
      );

      if (selectedIdIndex >= 0) addIndex = selectedIdIndex + 1;

      if (tabListState.includes(id)) return;

      setTabListState((prev) => {
        const newList = prev;
        newList.splice(addIndex, 0, id);
        return newList;
      });
    },
    [tabListState, selectedTab]
  );

  const removeTab = useCallback(
    (id: string) => {
      const newTabList = tabListState.filter((tabId) => tabId !== id);
      setTabListState(newTabList);

      if (id !== selectedTab) return;

      const idIndex = tabListState.findIndex((tabId) => tabId === id);

      let nextSelectedTabIndex = Math.max(
        Math.min(idIndex, newTabList.length - 1),
        0
      );

      if (tabListState.length <= 1) nextSelectedTabIndex = -1;

      const nextSelectedTabId = newTabList[nextSelectedTabIndex] ?? null;
      setSelectedTab(nextSelectedTabId);
    },
    [selectedTab, tabListState]
  );

  const moveTab = useCallback((id: string, index?: number) => {
    setTabListState((prev) => {
      const idIndex = prev.findIndex((tabId) => tabId === id);
      if (idIndex >= 0) prev = prev.filter((tabId) => tabId !== id);

      prev.splice(index ?? prev.length, 0, id);
      return [...prev];
    });
  }, []);

  const changeSelectedTab = useCallback(
    (id: string) => {
      const newSelectedTabIndex = tabListState.findIndex(
        (tabId) => tabId === id
      );
      const oldSelectedTabIndex = tabListState.findIndex(
        (tabId) => tabId === selectedTab
      );

      /* if new selected tab index doesnt exist in tabList (in open tabs) then add it next to old selected tab if old exist else last */
      if (newSelectedTabIndex < 0)
        setTabListState((prev) => {
          const newTabList = prev;
          newTabList.splice(
            oldSelectedTabIndex < 0
              ? tabListState.length
              : oldSelectedTabIndex + 1,
            0,
            id
          );
          return newTabList;
        });

      setSelectedTab(id);
    },
    [tabListState, selectedTab]
  );

  const changeTabsData = useCallback(async () => {
    await window.electronAPIDB.changeTabsData({
      openTabs: tabListState,
      selectedTab,
    });
  }, [tabListState, selectedTab]);

  return (
    <TabSidebarContext.Provider
      value={{
        tabListState,
        selectedTab,
        isTabListHovering,
        handleTabListHovering,
        addTab,
        removeTab,
        moveTab,
        changeSelectedTab,
        changeTabsData,
      }}
    >
      {children}
    </TabSidebarContext.Provider>
  );
};

export default TabSidebarProvider;
