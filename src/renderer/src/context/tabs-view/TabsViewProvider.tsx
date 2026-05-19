import React, {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import {
  TLayoutSetting,
  TTabsLayoutSetting,
} from "@shared/types/setting.types";
import { normalizeText } from "@/utils";
import { RequestListInterface } from "@shared/types/request-response.types";
import {
  TTabsAddNewTOLeftOrRightType,
  TTabsRemoveType,
} from "@shared/types/tabs";

interface TabsViewContext {
  selectedTab: string | null;
  tabListLayoutType: TTabsLayoutSetting;
  layoutTypes: TLayoutSetting;
  tabList: Array<string>;
  totalTabsOpen: number;
  haveAnyTabsOpen: boolean;
  localTabList: Array<string>;
  requestList: RequestListInterface;
  isTabListOpen: boolean;
  isCollapsed: boolean;
  isTabListHovering: boolean;
  handleSearch: (searchTerm: string) => void;
  handleChangeIsTabListHovering: (value?: boolean) => void;
  handleChangeIsContextMenuOpen: (value?: boolean) => void;
  handleAdd: () => void;
  handleClearAllTabs: () => void;
  handleMoveTab: (payload: { id: string; index?: number }) => void;
  handleRemove: (payload: { id: string; type: TTabsRemoveType }) => void;
  handleChangeSelectedTab: (id: string) => void;
  handleExpendParentsOnSelectedChangeTabsData: (id: string) => void;
  handleToggleTabsCollapse: () => void;
  handleAddNewtabsToLeftOrRight: (payload: {
    id: string;
    type: TTabsAddNewTOLeftOrRightType;
  }) => void;
  noTabsOpenEmptyContent: {
    label: string;
    description: string;
  };
  noTabsSearchResultEmptyContent: {
    label: string;
    description: string;
  };
}

const TabsViewContext = createContext<TabsViewContext | null>(null);

export const useTabsView = () => {
  const context = useContext(TabsViewContext);

  if (!context) {
    throw new Error("useTabsView must be used within a TabsViewProvider.");
  }

  return context;
};

interface TabsViewProviderProps {
  selectedTab: TabsViewContext["selectedTab"];
  tabListLayoutType: TTabsLayoutSetting;
  layoutTypes: TLayoutSetting;
  tabList: Array<string>;
  isCollapsed: boolean;
  requestList: RequestListInterface;
  noTabsOpenEmptyContent: TabsViewContext["noTabsOpenEmptyContent"];
  noTabsSearchResultEmptyContent: TabsViewContext["noTabsSearchResultEmptyContent"];
  children: React.ReactNode;
  handleLoadTabsData: () => void;
  handleAdd: () => void;
  handleClearAllTabs: () => void;
  handleChangeTabsData: () => void;
  handleMoveTab: (payload: { id: string; index?: number }) => void;
  handleRemove: (payload: { id: string; type: TTabsRemoveType }) => void;
  handleChangeSelectedTab: (id: string) => void;
  handleExpendParentsOnSelectedChangeTabsData: (id: string) => void;
  handleToggleTabsCollapse: () => void;
  handleAddNewtabsToLeftOrRight: TabsViewContext["handleAddNewtabsToLeftOrRight"];
}

const TabsViewProvider = ({
  selectedTab,
  tabListLayoutType,
  layoutTypes,
  tabList,
  isCollapsed,
  requestList,
  children,
  noTabsOpenEmptyContent,
  noTabsSearchResultEmptyContent,
  handleLoadTabsData,
  handleChangeTabsData,
  handleAdd,
  handleClearAllTabs,
  handleMoveTab,
  handleRemove,
  handleChangeSelectedTab,
  handleExpendParentsOnSelectedChangeTabsData,
  handleToggleTabsCollapse,
  handleAddNewtabsToLeftOrRight,
}: TabsViewProviderProps) => {
  const [isTabListHovering, setIsTabListHovering] = useState<boolean>(false);
  const [isContextMenuOpen, setIsContextMenuOpen] = useState<boolean>(false);
  const [searchTerm, setSearchTerm] = useState<string>("");

  const localTabList = useMemo(() => {
    if (!searchTerm) return tabList;

    return tabList.filter(tab => {
      const tabDetails = requestList[tab];
      if (!tabDetails) return false;

      return normalizeText(tabDetails.name).includes(searchTerm);
    });
  }, [requestList, searchTerm, tabList]);

  const isTabListOpen = useMemo(
    () => (isCollapsed ? false : isContextMenuOpen ? true : isTabListHovering),
    [isCollapsed, isContextMenuOpen, isTabListHovering],
  );
  const changeTabDataTimeout = useRef<NodeJS.Timeout>(null);

  /* load tabsList */
  useEffect(() => {
    handleLoadTabsData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleSearch = useCallback(
    (searchTerm: string) => setSearchTerm(normalizeText(searchTerm)),
    [],
  );

  useEffect(() => {
    if (changeTabDataTimeout.current)
      clearTimeout(changeTabDataTimeout.current);

    changeTabDataTimeout.current = setTimeout(
      () => handleChangeTabsData(),
      500,
    );

    return () => {
      if (changeTabDataTimeout.current)
        clearTimeout(changeTabDataTimeout.current);
    };
  }, [tabList, selectedTab, changeTabDataTimeout, handleChangeTabsData]);

  const handleChangeIsTabListHovering = useCallback(
    (value?: boolean) =>
      !isCollapsed && setIsTabListHovering(prev => value ?? !prev),
    [isCollapsed],
  );

  const handleChangeIsContextMenuOpen = useCallback(
    (value?: boolean) => setIsContextMenuOpen(prev => value ?? !prev),
    [],
  );

  const value = useMemo(
    () => ({
      selectedTab,
      tabListLayoutType,
      layoutTypes,
      tabList,
      totalTabsOpen: tabList.length ?? 0,
      haveAnyTabsOpen: Boolean(tabList.length ?? 0),
      localTabList,
      requestList,
      handleSearch,
      isTabListHovering,
      isTabListOpen,
      isCollapsed,
      handleChangeIsTabListHovering,
      handleChangeIsContextMenuOpen,
      handleAdd,
      handleClearAllTabs,
      handleMoveTab,
      handleRemove,
      handleChangeSelectedTab,
      handleExpendParentsOnSelectedChangeTabsData,
      handleToggleTabsCollapse,
      handleAddNewtabsToLeftOrRight,
      noTabsOpenEmptyContent,
      noTabsSearchResultEmptyContent,
    }),
    [
      selectedTab,
      tabListLayoutType,
      layoutTypes,
      tabList,
      localTabList,
      requestList,
      handleSearch,
      isTabListHovering,
      isTabListOpen,
      isCollapsed,
      handleChangeIsTabListHovering,
      handleChangeIsContextMenuOpen,
      handleAdd,
      handleClearAllTabs,
      handleMoveTab,
      handleRemove,
      handleChangeSelectedTab,
      handleExpendParentsOnSelectedChangeTabsData,
      handleToggleTabsCollapse,
      handleAddNewtabsToLeftOrRight,
      noTabsOpenEmptyContent,
      noTabsSearchResultEmptyContent,
    ],
  );

  return (
    <TabsViewContext.Provider value={value}>
      {children}
    </TabsViewContext.Provider>
  );
};

export default TabsViewProvider;
