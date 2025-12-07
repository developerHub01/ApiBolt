import React, {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import { useAppDispatch, useAppSelector } from "@/context/redux/hooks";
import {
  changeTabsData,
  loadTabsData,
} from "@/context/redux/request-response/thunks/tab-list";
import { normalizeText } from "@/utils";
import {
  selectIsTabListCollapsed,
  selectSelectedTab,
  selectTabList,
} from "@/context/redux/request-response/selectors/tab-list";
import { selectRequestOrFolderList } from "@/context/redux/request-response/selectors/request-list";

interface TabSidebarContext {
  tabList: Array<string>;
  totalTabsOpen: number;
  localTabList: Array<string>;
  isTabListOpen: boolean;
  isCollapsed: boolean;
  isTabListHovering: boolean;
  handleSearch: (searchTerm: string) => void;
  handleChangeIsTabListHovering: (value?: boolean | undefined) => void;
  handleChangeIsContextMenuOpen: (value?: boolean | undefined) => void;
}

const TabSidebarContext = createContext<TabSidebarContext | null>(null);

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
  const isCollapsed = useAppSelector(selectIsTabListCollapsed);
  const [isTabListHovering, setIsTabListHovering] = useState<boolean>(false);
  const [isContextMenuOpen, setIsContextMenuOpen] = useState<boolean>(false);
  const [localTabList, setLocalTabList] = useState<Array<string>>(
    tabList ?? [],
  );
  const isTabListOpen = useMemo(
    () => (isCollapsed ? false : isContextMenuOpen ? true : isTabListHovering),
    [isCollapsed, isContextMenuOpen, isTabListHovering],
  );
  const changeTabDataTimeout = useRef<NodeJS.Timeout>(null);

  /* load tabsList */
  useEffect(() => {
    dispatch(loadTabsData());
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    setLocalTabList(tabList);
  }, [tabList]);

  useEffect(() => {
    if (changeTabDataTimeout.current)
      clearTimeout(changeTabDataTimeout.current);

    changeTabDataTimeout.current = setTimeout(
      () => dispatch(changeTabsData()),
      500,
    );

    return () => {
      if (changeTabDataTimeout.current)
        clearTimeout(changeTabDataTimeout.current);
    };
  }, [tabList, selectedTab, changeTabDataTimeout, dispatch]);

  const handleSearch = useCallback(
    (searchTerm: string) => {
      searchTerm = normalizeText(searchTerm);
      if (!searchTerm) return setLocalTabList(tabList);

      setLocalTabList(
        tabList.filter(tab => {
          const tabDetails = requestList[tab];
          if (!tabDetails) return false;

          return normalizeText(tabDetails.name).includes(searchTerm);
        }),
      );
    },
    [requestList, tabList],
  );

  const handleChangeIsTabListHovering = useCallback(
    (value?: boolean) =>
      !isCollapsed && setIsTabListHovering(prev => value ?? !prev),
    [isCollapsed],
  );

  const handleChangeIsContextMenuOpen = useCallback(
    (value?: boolean) => setIsContextMenuOpen(prev => value ?? !prev),
    [],
  );

  return (
    <TabSidebarContext.Provider
      value={{
        tabList,
        totalTabsOpen: tabList.length ?? 0,
        localTabList,
        handleSearch,
        isTabListHovering,
        isTabListOpen,
        isCollapsed,
        handleChangeIsTabListHovering,
        handleChangeIsContextMenuOpen,
      }}
    >
      {children}
    </TabSidebarContext.Provider>
  );
};

export default TabSidebarProvider;
