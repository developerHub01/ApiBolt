import React, { createContext, useCallback, useContext } from "react";
import { useAppDispatch, useAppSelector } from "@/context/redux/hooks";
import {
  addNewTabsData,
  addNewTabsToLeftOrRight,
  changeSelectedTab,
  changeTabsData,
  expendParentsOnSelectedChangeTabsData,
  loadTabsData,
  removeTab,
} from "@/context/redux/request-response/thunks/tab-list";
import {
  selectIsTabListCollapsed,
  selectSelectedTab,
  selectTabList,
} from "@/context/redux/request-response/selectors/tab-list";
import { selectRequestOrFolderList } from "@/context/redux/request-response/selectors/request-list";
import {
  handleClearTabList,
  handleMoveTab,
  handleToggleTabListCollapse,
} from "@/context/redux/request-response/request-response-slice";
import { RequestListInterface } from "@shared/types/request-response.types";
import {
  TTabsAddNewTOLeftOrRightType,
  TTabsRemoveType,
} from "@shared/types/tabs";

interface RequestTabSidebarContext {
  selectedTab: string | null;
  tabList: Array<string>;
  isCollapsed: boolean;
  requestList: RequestListInterface;
  handleChangeTabsData: () => void;
  handleLoadsTabsData: () => void;
  handleAdd: () => void;
  handleClearAllTabs: () => void;
  handleMoveTabInIndex: (payload: { id: string; index?: number }) => void;
  handleRemove: (payload: { id: string; type: TTabsRemoveType }) => void;
  handleChangeSelectedTab: (id: string) => void;
  handleExpendParentsOnSelectedChangeTabsData: (id: string) => void;
  handleToggleTabsCollapse: () => void;
  handleAddNewtabsToLeftOrRight: (payload: {
    id: string;
    type: TTabsAddNewTOLeftOrRightType;
  }) => void;
}

const RequestTabSidebarContext = createContext<RequestTabSidebarContext | null>(
  null,
);

export const useRequestTabSidebar = () => {
  const context = useContext(RequestTabSidebarContext);

  if (!context) {
    throw new Error(
      "useRequestTabSidebar must be used within a RequestTabSidebarProvider.",
    );
  }

  return context;
};

interface RequestTabSidebarProviderProps {
  children: React.ReactNode;
}

const RequestTabSidebarProvider = ({
  children,
}: RequestTabSidebarProviderProps) => {
  const dispatch = useAppDispatch();
  const tabList = useAppSelector(selectTabList);
  const requestList = useAppSelector(selectRequestOrFolderList);
  const selectedTab = useAppSelector(selectSelectedTab);
  const isCollapsed = useAppSelector(selectIsTabListCollapsed);

  const handleLoadsTabsData = useCallback(() => {
    dispatch(loadTabsData());
  }, [dispatch]);

  const handleChangeTabsData = useCallback(() => {
    dispatch(changeTabsData());
  }, [dispatch]);

  const handleAdd = useCallback(() => {
    dispatch(
      addNewTabsData({
        autoSelect: true,
      }),
    );
  }, [dispatch]);

  const handleRemove = useCallback(
    (payload: { id: string; type: TTabsRemoveType }) => {
      dispatch(removeTab(payload));
    },
    [dispatch],
  );

  const handleAddNewtabsToLeftOrRight = useCallback(
    (payload: { id: string; type: TTabsAddNewTOLeftOrRightType }) => {
      dispatch(addNewTabsToLeftOrRight(payload));
    },
    [dispatch],
  );

  const handleClearAllTabs = useCallback(() => {
    dispatch(handleClearTabList());
  }, [dispatch]);

  const handleMoveTabInIndex = useCallback(
    ({ id, index }: { id: string; index?: number }) => {
      dispatch(
        handleMoveTab({
          id,
          index,
        }),
      );
    },
    [dispatch],
  );

  const handleChangeSelectedTab = useCallback(
    (id: string) => {
      dispatch(changeSelectedTab(id));
    },
    [dispatch],
  );

  const handleExpendParentsOnSelectedChangeTabsData = useCallback(
    (id: string) => {
      dispatch(expendParentsOnSelectedChangeTabsData(id));
    },
    [dispatch],
  );

  const handleToggleTabsCollapse = useCallback(
    () => dispatch(handleToggleTabListCollapse()),
    [dispatch],
  );

  return (
    <RequestTabSidebarContext.Provider
      value={{
        selectedTab,
        tabList,
        isCollapsed,
        requestList,
        handleChangeTabsData,
        handleLoadsTabsData,
        handleAdd,
        handleClearAllTabs,
        handleMoveTabInIndex,
        handleRemove,
        handleChangeSelectedTab,
        handleExpendParentsOnSelectedChangeTabsData,
        handleToggleTabsCollapse,
        handleAddNewtabsToLeftOrRight,
      }}
    >
      {children}
    </RequestTabSidebarContext.Provider>
  );
};

export default RequestTabSidebarProvider;
