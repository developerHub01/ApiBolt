import React, {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useState,
} from "react";
import { useAppDispatch, useAppSelector } from "@/context/redux/hooks";
import { handleChangeRequestName } from "@/context/redux/request-response/request-response-slice";
import { loadRequestList } from "@/context/redux/request-response/request-response-thunk";

interface RequestFolderContext {
  isContextMenuOpen: boolean;
  handleToggleContextMenu: (value?: boolean) => void;
  isRenameActive: boolean;
  handleRenameAction: () => void;
  handleChangeName: (id: string, name: string) => void;
  handleDeleteFolderOrRequest: (id: string) => void;
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
  const isRequestListLoaded = useAppSelector(
    (state) => state.requestResponse.isRequestListLoaded
  );
  const [isContextMenuOpen, setIsContextMenuOpen] = useState<boolean>(false);
  const [isRenameActive, setIsRenameActive] = useState<boolean>(false);

  useEffect(() => {
    if (isRequestListLoaded) return;

    dispatch(loadRequestList());
  }, [dispatch, isRequestListLoaded]);

  const handleToggleContextMenu = useCallback(
    (value?: boolean) =>
      setIsContextMenuOpen((prev) => (value === undefined ? !prev : value)),
    []
  );

  const handleRenameAction = useCallback(() => {
    setIsRenameActive(true);
  }, []);

  const handleChangeName = useCallback(
    async (id: string, name: string) => {
      setIsRenameActive(false);
      dispatch(handleChangeRequestName({ id, name }));
      await window.electronAPIDB.updateBoltCore(id, {
        name,
      });
    },
    [dispatch]
  );

  const handleDeleteFolderOrRequest = useCallback(async (id: string) => {
    setIsRenameActive(false);
    await window.electronAPIDB.deleteBoltCore(id);
  }, []);

  return (
    <RequestFolderContext.Provider
      value={{
        isContextMenuOpen,
        handleToggleContextMenu,
        isRenameActive,
        handleRenameAction,
        handleChangeName,
        handleDeleteFolderOrRequest,
      }}
    >
      {children}
    </RequestFolderContext.Provider>
  );
};

export default RequestFolderProvider;
