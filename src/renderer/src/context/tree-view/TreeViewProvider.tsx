import React, {
  createContext,
  useCallback,
  useContext,
  useMemo,
  type ComponentType,
} from "react";
import type {
  RequestListInterface,
  RequestListItemInterface,
} from "@shared/types/request-response.types";
import {
  checkPermissionToAddFolderAsChildren,
  getRequestNodeLevel,
  getRequestType,
} from "@/utils/request-response.utils";

interface TreeItemProps {
  id: string;
  level: number;
  isLastChild: boolean;
  isRootLastChild?: boolean;
}

interface TreeViewContext {
  selectedTab: string | null;
  requestList: RequestListInterface;
  itemComponent: ComponentType<TreeItemProps>;
  emtpyFolderContent: {
    startText: string;
    actionText: string;
    endText: string;
  };
  getRequestlevel: (id: string) => number;
  getRequestDetails: (id: string) => RequestListItemInterface;
  getRequestTypeById: (id: string) => "folder" | "request";
  checkIsRequestDropable: (payload: {
    dragRequestId: string;
    dropRequestId: string;
    level?: number;
  }) => boolean;
  checkIsFolderAddable: (payload: { id?: string }) => boolean;
  handleMoveItem: (payload: {
    requestId: string;
    parentId?: string;
  }) => Promise<void>;
  handleChangeSelectedTab: (id: string) => Promise<void>;
  handleAddSingleItem: (id: string) => Promise<void>;
  handleChangeName: (payload: { id: string; name: string }) => Promise<void>;
  handleToggleExpended: (payload: {
    id: string;
    isExpended: boolean;
  }) => Promise<void>;
}

const TreeViewContext = createContext<TreeViewContext | null>(null);

export const useTreeView = () => {
  const context = useContext(TreeViewContext);

  if (!context) {
    throw new Error("useTreeView must be used within a TreeViewProvider.");
  }

  return context;
};

interface TreeViewProviderProps {
  selectedTab: TreeViewContext["selectedTab"];
  children: React.ReactNode;
  requestList: TreeViewContext["requestList"];
  handleMoveItem: TreeViewContext["handleMoveItem"];
  handleChangeSelectedTab: TreeViewContext["handleChangeSelectedTab"];
  handleAddSingleItem: TreeViewContext["handleAddSingleItem"];
  handleChangeName: TreeViewContext["handleChangeName"];
  handleToggleExpended: TreeViewContext["handleToggleExpended"];
  itemComponent: ComponentType<TreeItemProps>;
  emtpyFolderContent?: Partial<TreeViewContext["emtpyFolderContent"]>;
}

const TreeViewProvider = ({
  children,
  requestList,
  selectedTab,
  itemComponent,
  emtpyFolderContent = {},
  handleAddSingleItem,
  handleChangeSelectedTab,
  handleMoveItem,
  handleChangeName,
  handleToggleExpended,
}: TreeViewProviderProps) => {
  /* tracker start ======================*/
  const getRequestlevel = useCallback(
    (id: string) =>
      getRequestNodeLevel({
        id,
        source: requestList,
      }),
    [requestList],
  );

  const getRequestDetails = useCallback(
    (id: string) => requestList[id],
    [requestList],
  );

  const getRequestTypeById = useCallback(
    (id: string) => getRequestType(requestList[id]),
    [requestList],
  );

  const checkIsRequestDropable = useCallback(
    ({
      dragRequestId,
      dropRequestId,
      level,
    }: {
      dragRequestId: string;
      dropRequestId: string;
      level?: number;
    }) => {
      if (getRequestTypeById(dragRequestId) === "request") return true;

      if (typeof level === "undefined") level = getRequestlevel(dropRequestId);

      return checkPermissionToAddFolderAsChildren(level);
    },
    [getRequestlevel, getRequestTypeById],
  );

  const checkIsFolderAddable = useCallback(
    ({ id }: { id?: string } = {}) => {
      // if both are missing, allow adding at root
      if (!id && !selectedTab) return true;

      // If id is missing but selectedTab exists, use it
      if (!id && selectedTab) id = selectedTab;

      // fallback safety check
      if (!id) return true;

      return checkPermissionToAddFolderAsChildren(getRequestlevel(id));
    },
    [getRequestlevel, selectedTab],
  );
  /* tracker end ======================*/

  const value = useMemo(
    () => ({
      requestList,
      selectedTab,
      handleMoveItem,
      handleChangeSelectedTab,
      getRequestlevel,
      getRequestDetails,
      getRequestTypeById,
      checkIsRequestDropable,
      checkIsFolderAddable,
      itemComponent,
      handleAddSingleItem,
      handleChangeName,
      handleToggleExpended,
      emtpyFolderContent: {
        startText: "This folder is empty",
        actionText: "Add a item",
        endText: "to get started",
        ...emtpyFolderContent,
      },
    }),
    [
      requestList,
      selectedTab,
      handleMoveItem,
      handleChangeSelectedTab,
      getRequestlevel,
      getRequestDetails,
      getRequestTypeById,
      checkIsRequestDropable,
      checkIsFolderAddable,
      itemComponent,
      handleAddSingleItem,
      emtpyFolderContent,
      handleChangeName,
      handleToggleExpended,
    ],
  );

  return (
    <TreeViewContext.Provider value={value}>
      {children}
    </TreeViewContext.Provider>
  );
};

export default TreeViewProvider;
