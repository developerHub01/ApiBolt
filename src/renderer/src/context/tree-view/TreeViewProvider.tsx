import React, {
  createContext,
  useCallback,
  useContext,
  useMemo,
  type ComponentType,
} from "react";
import { useAppDispatch, useAppSelector } from "@/context/redux/hooks";
import {
  createSingleRequest,
  moveRequestOrFolder,
} from "@/context/redux/request-response/thunks/request-list";
import type {
  RequestListInterface,
  RequestListItemInterface,
} from "@shared/types/request-response.types";
import {
  checkPermissionToAddFolderAsChildren,
  getRequestNodeLevel,
  getRequestType,
} from "@/utils/request-response.utils";
import { selectSelectedTab } from "@/context/redux/request-response/selectors/tab-list";
import { changeSelectedTab } from "@/context/redux/request-response/thunks/tab-list";

interface TreeItemProps {
  id: string;
  lavel: number;
  isLastChild: boolean;
  isRootLastChild?: boolean;
}

interface TreeViewContext {
  selectedTab: string | null;
  itemComponent: ComponentType<TreeItemProps>;
  emtpyFolderContent: {
    startText: string;
    actionText: string;
    endText: string;
  };
  getRequestLavel: (id: string) => number;
  getRequestDetails: (id: string) => RequestListItemInterface;
  getRequestTypeById: (id: string) => "folder" | "request";
  checkIsRequestDropable: (payload: {
    dragRequestId: string;
    dropRequestId: string;
    lavel?: number;
  }) => boolean;
  checkIsFolderAddable: (payload: { id?: string }) => boolean;
  handleMoveItem: (payload: {
    requestId: string;
    parentId?: string;
  }) => Promise<void>;
  handleChangeSelectedTab: (id: string) => Promise<void>;
  handleAddSingleItem: (id: string) => Promise<void>;
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
  children: React.ReactNode;
  requestList: RequestListInterface;
  itemComponent: ComponentType<TreeItemProps>;
  emtpyFolderContent?: {
    startText?: string;
    actionText?: string;
    endText?: string;
  };
}

const TreeViewProvider = ({
  children,
  requestList,
  itemComponent,
  emtpyFolderContent = {},
}: TreeViewProviderProps) => {
  const dispatch = useAppDispatch();
  const selectedTab = useAppSelector(selectSelectedTab);

  const handleMoveItem = useCallback(
    async ({
      requestId,
      parentId,
    }: {
      requestId: string;
      parentId?: string;
    }) => {
      await dispatch(
        moveRequestOrFolder({
          requestId,
          parentId,
        }),
      );
    },
    [dispatch],
  );

  const handleChangeSelectedTab = useCallback(
    async (id: string) => {
      await dispatch(changeSelectedTab(id));
    },
    [dispatch],
  );

  const handleAddSingleItem = useCallback(
    async (id: string) => {
      await dispatch(createSingleRequest(id));
    },
    [dispatch],
  );

  /* tracker start ======================*/
  const getRequestLavel = useCallback(
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
      lavel,
    }: {
      dragRequestId: string;
      dropRequestId: string;
      lavel?: number;
    }) => {
      if (getRequestTypeById(dragRequestId) === "request") return true;

      if (typeof lavel === "undefined") lavel = getRequestLavel(dropRequestId);

      return checkPermissionToAddFolderAsChildren(lavel);
    },
    [getRequestLavel, getRequestTypeById],
  );

  const checkIsFolderAddable = useCallback(
    ({ id }: { id?: string } = {}) => {
      // if both are missing, allow adding at root
      if (!id && !selectedTab) return true;

      // If id is missing but selectedTab exists, use it
      if (!id && selectedTab) id = selectedTab;

      // fallback safety check
      if (!id) return true;

      return checkPermissionToAddFolderAsChildren(getRequestLavel(id));
    },
    [getRequestLavel, selectedTab],
  );
  /* tracker end ======================*/

  const value = useMemo(
    () => ({
      selectedTab,
      handleMoveItem,
      handleChangeSelectedTab,
      getRequestLavel,
      getRequestDetails,
      getRequestTypeById,
      checkIsRequestDropable,
      checkIsFolderAddable,
      itemComponent,
      handleAddSingleItem,
      emtpyFolderContent: {
        startText: "This folder is empty",
        actionText: "Add a item",
        endText: "to get started",
        ...emtpyFolderContent,
      },
    }),
    [
      selectedTab,
      handleMoveItem,
      handleChangeSelectedTab,
      getRequestLavel,
      getRequestDetails,
      getRequestTypeById,
      checkIsRequestDropable,
      checkIsFolderAddable,
      itemComponent,
      handleAddSingleItem,
      emtpyFolderContent,
    ],
  );

  return (
    <TreeViewContext.Provider value={value}>
      {children}
    </TreeViewContext.Provider>
  );
};

export default TreeViewProvider;
