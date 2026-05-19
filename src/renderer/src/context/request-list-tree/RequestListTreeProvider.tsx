import React, { createContext, useCallback, useContext, useMemo } from "react";
import { useAppDispatch, useAppSelector } from "@/context/redux/hooks";
import {
  createSingleRequest,
  moveRequestOrFolder,
  updateRequestOrFolder,
} from "@/context/redux/request-response/thunks/request-list";
import type { RequestListInterface } from "@shared/types/request-response.types";
import { selectSelectedTab } from "@/context/redux/request-response/selectors/tab-list";
import { changeSelectedTab } from "@/context/redux/request-response/thunks/tab-list";
import { selectRequestOrFolderList } from "@/context/redux/request-response/selectors/request-list";

interface RequestListTreeContext {
  selectedTab: string | null;
  requestList: RequestListInterface;
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

const RequestListTreeContext = createContext<RequestListTreeContext | null>(
  null,
);

export const useRequestListTree = () => {
  const context = useContext(RequestListTreeContext);

  if (!context) {
    throw new Error(
      "useRequestListTree must be used within a RequestListTreeProvider.",
    );
  }

  return context;
};

interface RequestListTreeProviderProps {
  children: React.ReactNode;
}

const RequestListTreeProvider = ({
  children,
}: RequestListTreeProviderProps) => {
  const dispatch = useAppDispatch();
  const selectedTab = useAppSelector(selectSelectedTab);
  const requestList = useAppSelector(selectRequestOrFolderList);

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

  const handleChangeName = useCallback(
    async ({ id, name }: { id: string; name: string }) => {
      await dispatch(
        updateRequestOrFolder({
          id,
          name,
        }),
      );
    },
    [dispatch],
  );

  const handleToggleExpended = useCallback(
    async ({ id, isExpended }: { id: string; isExpended: boolean }) => {
      await dispatch(
        updateRequestOrFolder({
          id,
          isExpended,
        }),
      );
    },
    [dispatch],
  );

  const value = useMemo(
    () => ({
      selectedTab,
      handleMoveItem,
      handleChangeSelectedTab,
      requestList,
      handleAddSingleItem,
      handleChangeName,
      handleToggleExpended,
    }),
    [
      selectedTab,
      handleMoveItem,
      handleChangeSelectedTab,
      requestList,
      handleAddSingleItem,
      handleChangeName,
      handleToggleExpended,
    ],
  );

  return (
    <RequestListTreeContext.Provider value={value}>
      {children}
    </RequestListTreeContext.Provider>
  );
};

export default RequestListTreeProvider;
