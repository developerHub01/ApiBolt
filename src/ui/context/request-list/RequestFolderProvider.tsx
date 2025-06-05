import React, { createContext, useCallback, useContext, useState } from "react";
import { useAppDispatch } from "@/context/redux/hooks";
import { changeRequestName } from "@/context/redux/request-response/request-response-thunk";

interface RequestFolderContext {
  isContextMenuOpen: boolean;
  handleToggleContextMenu: (value?: boolean) => void;
  isRenameActive: boolean;
  handleRenameAction: () => void;
  handleChangeName: (id: string, name: string) => void;
}

const RequestFolderContext = createContext<RequestFolderContext | null>(null);

// eslint-disable-next-line react-refresh/only-export-components
export const useRequestFolder = () => {
  const context = useContext(RequestFolderContext);

  if (!context) {
    throw new Error(
      "useRequestFolder must be used within a RequestFolderProvider."
    );
  }

  return context;
};

interface RequestFolderProviderProps {
  children: React.ReactNode;
}

const RequestFolderProvider = ({ children }: RequestFolderProviderProps) => {
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
      dispatch(changeRequestName({ id, name }));
    },
    [dispatch]
  );

  return (
    <RequestFolderContext.Provider
      value={{
        isContextMenuOpen,
        handleToggleContextMenu,
        isRenameActive,
        handleRenameAction,
        handleChangeName,
      }}
    >
      {children}
    </RequestFolderContext.Provider>
  );
};

export default RequestFolderProvider;
