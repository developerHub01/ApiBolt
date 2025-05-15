import React, {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useState,
} from "react";
import type { TMethod } from "@/types";
import { v4 as uuidv4 } from "uuid";

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
  deleteFolderOrRequestId: string;
  handleChangeDeleteFolderOrRequestId: (value: string) => void;
  handleDeleteFolderOrRequest: (value: boolean) => void;
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

  useEffect(() => {
    (async () => await handleLoadList())();
    window.electronAPIDB.onBoltCoreChange(() => {
      (async () => await handleLoadList())();
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleLoadList = useCallback(
    async () => setListData(await window.electronAPIDB.getAllBoltCore()),
    []
  );

  const handleChangeDeleteFolderOrRequestId = useCallback(
    (value: string) => setDeleteFolderOrRequestId(value),
    []
  );

  const handleDeleteFolderOrRequest = useCallback(
    async (value: boolean) => {
      console.log({ value });
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
    console.log({ payload });

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

  return (
    <RequestListContext.Provider
      value={{
        listData,
        createSingleRequest,
        createCollection,
        deleteFolderOrRequestId,
        handleChangeDeleteFolderOrRequestId,
        handleDeleteFolderOrRequest,
      }}
    >
      {children}
    </RequestListContext.Provider>
  );
};

export default RequestListProvider;
