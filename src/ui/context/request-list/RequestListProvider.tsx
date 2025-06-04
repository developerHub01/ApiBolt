import React, {
  createContext,
  useCallback,
  useContext,
  useEffect,
} from "react";
/* eslint-disable react-hooks/exhaustive-deps */
import { useAppDispatch, useAppSelector } from "@/context/redux/hooks";
import {
  handleChangeDeleteFolderOrRequestId,
  handleChangeIsDataLoaded,
  handleCreateRestApiBasic,
  handleCreateSingleRequest,
  handleLoadOpenFolderList,
  handleLoadRequestList,
  handleToggleFolder,
  handleChangeShouldDataLoad,
  type RequestListItemInterface,
} from "@/context/redux/request-list-slice/request-list-slice";
import { v4 as uuidv4 } from "uuid";
import type { TMethod } from "@/types";

interface RequestListContext {
  createSingleRequest: (parent?: string) => Promise<void>;
  createCollection: (parent?: string) => Promise<void>;
  createRestApiBasic: () => Promise<void>;
  duplicateBoltCore: (id: string) => Promise<void>;
  handleDeleteFolderOrRequest: (value: boolean) => void;
  handleRequestForDelete: (value: string) => void;
  handleToggleOpenFolder: (id: string) => Promise<void>;
  handleMoveRequest: (
    requestId: string,
    folderId: string | undefined,
    index?: number
  ) => Promise<void>;
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
  const isDataLoaded = useAppSelector(
    (state) => state.requestList.isDataLoaded
  );
  const shouldDataLoad = useAppSelector(
    (state) => state.requestList.shouldDataLoad
  );
  const deleteFolderOrRequestId = useAppSelector(
    (state) => state.requestList.deleteFolderOrRequestId
  );
  const dispatch = useAppDispatch();

  /**
   * on application load it will load request list and openFolderList and used flag to stop reload aftar again mount after an unmounta. like if user hide request list and again on.
   * **/
  useEffect(() => {
    if (isDataLoaded) return;

    (async () => {
      const list = await window.electronAPIDB.getAllBoltCore();
      const openFolderList = await window.electronAPIDB.getAllOpenFolder();

      dispatch(handleLoadRequestList(list));
      dispatch(handleLoadOpenFolderList(openFolderList));
      dispatch(handleChangeIsDataLoaded(true));
    })();
  }, [isDataLoaded]);

  /**
   * It mainly for those task which only modify in backend so after backend task shouldDataLoad will be true and then load from backend and make that flag as false
   */
  useEffect(() => {
    if (!shouldDataLoad) return;

    (async () => {
      const list = await window.electronAPIDB.getAllBoltCore();
      dispatch(handleLoadRequestList(list));
      dispatch(handleChangeShouldDataLoad(false));
    })();
  }, [shouldDataLoad]);

  const handleDeleteFolderOrRequest = useCallback(
    async (value: boolean) => {
      if (value) {
        await window.electronAPIDB.deleteBoltCore(deleteFolderOrRequestId);
        dispatch(handleChangeShouldDataLoad(true));
      }

      dispatch(handleChangeDeleteFolderOrRequestId(""));
    },
    [deleteFolderOrRequestId]
  );

  const handleRequestForDelete = useCallback((value: string) => {
    dispatch(handleChangeDeleteFolderOrRequestId(value));
  }, []);

  const createSingleRequest = async (parent?: string) => {
    const payload: RequestListItemInterface = {
      id: uuidv4(),
      name: "Request",
      method: "get",
      createdAt: Date.now(),
      ...(parent ? { parent } : {}),
    };

    dispatch(handleCreateSingleRequest(payload));
    await window.electronAPIDB.addBoltCore(payload);
  };
  const createCollection = async (parent?: string) => {
    const payload = {
      id: uuidv4(),
      name: parent ? "Folder" : "Collection",
      children: [],
      createdAt: Date.now(),
      ...(parent ? { parent } : {}),
    };

    dispatch(handleCreateSingleRequest(payload));
    await window.electronAPIDB.addBoltCore(payload);
  };
  const createRestApiBasic = async () => {
    const parentFolder: RequestListItemInterface = {
      id: uuidv4(),
      name: "REST API basics: CRUD, test & variable",
      children: [],
      createdAt: Date.now(),
    };

    const payload: Array<RequestListItemInterface> = (
      ["get", "post", "put", "patch", "delete"] as Array<TMethod>
    ).map((method) => ({
      id: uuidv4(),
      name: `${method[0].toUpperCase()}${method.substring(1)} data`,
      method: method as TMethod,
      createdAt: Date.now(),
    }));

    parentFolder.children = payload.map((item) => item.id);

    const requestList = [
      parentFolder,
      ...payload.map((item) => ({
        ...item,
        parent: parentFolder.id,
      })),
    ];

    dispatch(handleCreateRestApiBasic(requestList));
    await window.electronAPIDB.addMultipleBoltCore(requestList);
  };

  const duplicateBoltCore = async (id: string) => {
    await window.electronAPIDB.duplicateBoltCore(id);
    dispatch(handleChangeShouldDataLoad(true));
  };

  const handleToggleOpenFolder = useCallback(async (id: string) => {
    dispatch(handleToggleFolder(id));
    await window.electronAPIDB.toggleFolder(id);
  }, []);

  const handleMoveRequest = useCallback(
    async (
      requestId: string,
      folderId: string | undefined,
      index: number = 0
    ) => {
      await window.electronAPIDB.moveBoltCore(requestId, folderId, index);
      dispatch(handleChangeShouldDataLoad(true));
    },
    []
  );

  return (
    <RequestListContext.Provider
      value={{
        createSingleRequest,
        createCollection,
        createRestApiBasic,
        duplicateBoltCore,
        handleDeleteFolderOrRequest,
        handleRequestForDelete,
        handleToggleOpenFolder,
        handleMoveRequest,
      }}
    >
      {children}
    </RequestListContext.Provider>
  );
};

export default RequestListProvider;
