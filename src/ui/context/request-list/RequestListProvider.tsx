import React, {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useState,
} from "react";
import type { TMethod } from "@/types";
import { v4 as uuidv4 } from "uuid";
import { isElectron } from "@/utils/electron";

export interface RequestListItemInterface {
  id: string;
  name: string;
  method?: TMethod;
  children?: Array<string>;
  parent?: string;
}
export interface RequestListInterface {
  [key: string]: RequestListItemInterface;
}

interface RequestListContext {
  listData: Record<string, RequestListItemInterface>;
  createSingleRequest: (parent?: string) => Promise<void>;
  createCollection: (parent?: string) => Promise<void>;
  createRestApiBasic: () => Promise<void>;
  deleteFolderOrRequestId: string;
  handleChangeDeleteFolderOrRequestId: (value: string) => void;
  handleDeleteFolderOrRequest: (value: boolean) => void;
  openFolderList: Set<string>;
  handleToggleOpenFolder: (id: string) => void;
  handleIsFolderOpen: (id: string) => boolean;
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
  const [listData, setListData] = useState<
    Record<string, RequestListItemInterface>
  >({});
  const [deleteFolderOrRequestId, setDeleteFolderOrRequestId] =
    useState<string>("");
  const [openFolderList, setOpenFolder] = useState<Set<string>>(new Set([]));

  useEffect(() => {
    if (!isElectron()) return;

    (async () => await handleLoadList())();
    window.electronAPIDB.onBoltCoreChange(() => {
      (async () => await handleLoadList())();
    });

    (async () => await handleLoadOpenFolderList())();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleLoadList = useCallback(
    async () => setListData(await window.electronAPIDB.getAllBoltCore()),
    []
  );

  const handleToggleFolderInBackend = useCallback(async (id: string) => {
    await window.electronAPIDB.toggleFolder(id);
  }, []);

  const handleLoadOpenFolderList = useCallback(async () => {
    setOpenFolder(
      new Set((await window.electronAPIDB.getAllOpenFolder()) ?? [])
    );
  }, []);

  const handleChangeDeleteFolderOrRequestId = useCallback(
    (value: string) => setDeleteFolderOrRequestId(value),
    []
  );

  const handleDeleteFolderOrRequest = useCallback(
    async (value: boolean) => {
      if (value)
        await window.electronAPIDB.deleteBoltCore(deleteFolderOrRequestId);

      return setDeleteFolderOrRequestId("");
    },
    [deleteFolderOrRequestId]
  );

  const createSingleRequest = async (parent?: string) => {
    const payload: RequestListItemInterface = {
      id: uuidv4(),
      name: "Request",
      method: "get",
      ...(parent ? { parent } : {}),
    };
    await window.electronAPIDB.addBoltCore(payload);
  };

  const createCollection = async (parent?: string) => {
    const payload = {
      id: uuidv4(),
      name: "Collection",
      children: [],
      ...(parent ? { parent } : {}),
    };
    await window.electronAPIDB.addBoltCore(payload);
  };
  const createRestApiBasic = async () => {
    const parentFolder: RequestListItemInterface = {
      id: uuidv4(),
      name: "REST API basics: CRUD, test & variable",
      method: "get",
      children: [],
    };

    const payload: Array<RequestListItemInterface> = [
      {
        id: uuidv4(),
        name: "Get data",
        method: "get",
      },
      {
        id: uuidv4(),
        name: "Post data",
        method: "post",
      },
      {
        id: uuidv4(),
        name: "Update data",
        method: "put",
      },
      {
        id: uuidv4(),
        name: "Update data",
        method: "patch",
      },
      {
        id: uuidv4(),
        name: "Delete data",
        method: "delete",
      },
    ];
    parentFolder.children = payload.map((item) => item.id);

    await window.electronAPIDB.addMultipleBoltCore([
      parentFolder,
      ...payload.map((item) => ({
        ...item,
        parent: parentFolder.id,
      })),
    ]);
  };

  const handleToggleOpenFolder = useCallback(
    (id: string) => {
      setOpenFolder((prev) => {
        const newSet = new Set(prev);

        if (prev.has(id)) newSet.delete(id);
        else newSet.add(id);

        return newSet;
      });

      (async () => await handleToggleFolderInBackend(id))();
    },
    [handleToggleFolderInBackend]
  );

  const handleIsFolderOpen = useCallback(
    (id: string) => openFolderList.has(id),
    [openFolderList]
  );

  return (
    <RequestListContext.Provider
      value={{
        listData,
        createSingleRequest,
        createCollection,
        createRestApiBasic,
        deleteFolderOrRequestId,
        handleChangeDeleteFolderOrRequestId,
        handleDeleteFolderOrRequest,
        openFolderList,
        handleToggleOpenFolder,
        handleIsFolderOpen,
      }}
    >
      {children}
    </RequestListContext.Provider>
  );
};

export default RequestListProvider;
