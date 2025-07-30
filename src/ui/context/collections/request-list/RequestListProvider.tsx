import React, { createContext, useCallback, useContext, useState } from "react";
import { useAppDispatch } from "@/context/redux/hooks";
import { updateRequestOrFolder } from "@/context/redux/request-response/request-response-thunk";

interface RequestListContext {
  isContextMenuOpen: boolean;
  handleToggleContextMenu: (value?: boolean) => void;
  isRenameActive: boolean;
  handleRenameAction: () => void;
  handleChangeName: (id: string, name: string) => void;
}

const RequestListContext = createContext<RequestListContext | null>(null);

// eslint-disable-next-line react-refresh/only-export-components
export const useRequestList = () => {
  const context = useContext(RequestListContext);

  if (!context) {
    throw new Error(
      "useRequestList must be used within a RequestListProvider."
    );
  }

  return context;
};

interface RequestListProviderProps {
  children: React.ReactNode;
}

const RequestListProvider = ({ children }: RequestListProviderProps) => {
  const dispatch = useAppDispatch();
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

  return (
    <RequestListContext.Provider
      value={{
        isContextMenuOpen,
        handleToggleContextMenu,
        isRenameActive,
        handleRenameAction,
        handleChangeName,
      }}
    >
      {children}
    </RequestListContext.Provider>
  );
};

export default RequestListProvider;
