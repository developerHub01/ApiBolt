import React, { createContext, useCallback, useContext, useState } from "react";

interface RequestFolderContext {
  isFolderOpen: boolean;
  handleToggleFolderOpen: (value?: boolean) => void;
  isContextMenuOpen: boolean;
  handleToggleContextMenu: () => void;
  isRenameActive: boolean;
  handleRenameAction: () => void;
  isExpend: boolean;
  handleToggleExpend: () => void;
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
  const [isFolderOpen, setIsFolderOpen] = useState<boolean>(false);
  const [isExpend, setIsExpend] = useState<boolean>(false);
  const [isContextMenuOpen, setIsContextMenuOpen] = useState<boolean>(false);
  const [isRenameActive, setIsRenameActive] = useState<boolean>(false);

  const handleToggleFolderOpen = useCallback(
    (value?: boolean) =>
      value === undefined ? setIsFolderOpen((prev) => !prev) : value,
    []
  );

  const handleToggleContextMenu = useCallback(
    () => setIsContextMenuOpen((prev) => !prev),
    []
  );

  const handleRenameAction = useCallback(() => {
    setIsRenameActive(true);
  }, []);

  const handleToggleExpend = useCallback(
    () => setIsExpend((prev) => !prev),
    []
  );

  const handleChangeName = useCallback(async (id: string, name: string) => {
    setIsRenameActive(false);
    await window.electronAPIDB.updateBoltCore(id, {
      name,
    });
  }, []);

  return (
    <RequestFolderContext.Provider
      value={{
        isFolderOpen,
        handleToggleFolderOpen,
        isContextMenuOpen,
        handleToggleContextMenu,
        isRenameActive,
        handleRenameAction,
        isExpend,
        handleToggleExpend,
        handleChangeName,
      }}
    >
      {children}
    </RequestFolderContext.Provider>
  );
};

export default RequestFolderProvider;
