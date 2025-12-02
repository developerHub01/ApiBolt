import React, { createContext, useCallback, useContext, useState } from "react";
import { useAppDispatch, useAppSelector } from "@/context/redux/hooks";
import { updateRequestOrFolder } from "@/context/redux/request-response/thunks/request-list";
import type { TRequestListItemType } from "@shared/types/request-list";
import type { RequestListItemInterface } from "@shared/types/request-response.types";
import {
  getFolderChildren,
  getRequestType,
} from "@/utils/request-response.utils";

interface RequestListItemContext
  extends Pick<
    RequestListItemInterface,
    "id" | "name" | "method" | "parentId" | "isExpended" | "children"
  > {
  type: TRequestListItemType;
  isContextMenuOpen: boolean;
  isRenameActive: boolean;
  isRootLastChild?: boolean;
  isLastChild?: boolean;
  lavel: number;
  handleToggleContextMenu: (value?: boolean) => void;
  handleRenameAction: () => void;
  handleChangeName: (id: string, name: string) => void;
}

const RequestListItemContext = createContext<RequestListItemContext | null>(
  null
);

// eslint-disable-next-line react-refresh/only-export-components
export const useRequestListItem = () => {
  const context = useContext(RequestListItemContext);

  if (!context) {
    throw new Error(
      "useRequestListItem must be used within a RequestListItemProvider."
    );
  }

  return context;
};

interface RequestListItemProviderProps {
  id: string;
  children: React.ReactNode;
  isRootLastChild?: boolean;
  isLastChild?: boolean;
  lavel?: number;
}

const RequestListItemProvider = ({
  id,
  children,
  isRootLastChild = false,
  isLastChild = false,
  lavel = 0,
}: RequestListItemProviderProps) => {
  const dispatch = useAppDispatch();

  const requestDetails = useAppSelector(
    (state) => state.requestResponse.requestList[id]
  );

  /* if have children then as usual but if not and not have method means folder so add and empty children else children will be undefined means acutally it is a request*/
  const childrenElements = getFolderChildren(requestDetails) ?? undefined;
  const type = getRequestType(requestDetails);

  const [isContextMenuOpen, setIsContextMenuOpen] = useState<boolean>(false);
  const [isRenameActive, setIsRenameActive] = useState<boolean>(false);

  const handleToggleContextMenu = useCallback(
    (value?: boolean) =>
      setIsContextMenuOpen((prev) => (value === undefined ? !prev : value)),
    []
  );

  const handleRenameAction = useCallback(() => {
    setIsRenameActive(true);
  }, []);

  const handleChangeName = useCallback(
    (id: string, name: string) => {
      setIsRenameActive(false);
      dispatch(updateRequestOrFolder({ id, name }));
    },
    [dispatch]
  );

  if (!requestDetails) return null;

  return (
    <RequestListItemContext.Provider
      value={{
        type,
        isContextMenuOpen,
        isRenameActive,
        isRootLastChild,
        isLastChild,
        lavel,
        children: childrenElements,
        ...requestDetails,
        ...(!requestDetails.name
          ? {
              name: requestDetails.method ? "Request" : "Folder",
            }
          : {}),
        handleToggleContextMenu,
        handleRenameAction,
        handleChangeName,
      }}
    >
      {children}
    </RequestListItemContext.Provider>
  );
};

export default RequestListItemProvider;
