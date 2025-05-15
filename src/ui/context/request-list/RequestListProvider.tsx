import React, { createContext, useContext, useEffect, useState } from "react";
import type { TMethod } from "@/types";

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

const data: Record<string, RequestListItemInterface> = {
  "0d45c3b2-dfe4-4953-a29a-f6dc1dbfdc15": {
    name: "Collection",
    children: [],
    id: "0d45c3b2-dfe4-4953-a29a-f6dc1dbfdc15",
  },
  "1a89fe77-58a5-4d94-8af1-0902d397f38e": {
    name: "Request",
    method: "post",
    id: "1a89fe77-58a5-4d94-8af1-0902d397f38e",
  },
  "1a89fe77-58a5-4d94-8af1-0902d397f38f": {
    name: "Request",
    method: "get",
    id: "1a89fe77-58a5-4d94-8af1-0902d397f38f",
  },
  "3c1e52f9-780e-42cb-83d5-6a6d5a643e2c": {
    name: "Request",
    method: "put",
    id: "3c1e52f9-780e-42cb-83d5-6a6d5a643e2c",
  },
  "8f9c3172-c5a1-4cf7-bd8e-1fabe89a7017": {
    name: "Collection",
    children: [],
    id: "8f9c3172-c5a1-4cf7-bd8e-1fabe89a7017",
  },
  "ce3adf7e-0f10-4ff0-b9e3-72cb1bd5b9b9": {
    name: "Request",
    method: "delete",
    id: "ce3adf7e-0f10-4ff0-b9e3-72cb1bd5b9b9",
  },
  "f75a22a5-58ec-4499-98b1-c44c13791aa2": {
    name: "Collection",
    children: [],
    id: "f75a22a5-58ec-4499-98b1-c44c13791aa2",
  },
};

const RequestListProvider = ({ children }: RequestListProviderProps) => {
  const [listData, setListData] =
    useState<Record<string, RequestListItemInterface>>(data);

  useEffect(() => {
    (async () => await handleLoadList())();
    window.electronAPIDB.onBoltCoreChange(() => {
      (async () => await handleLoadList())();
    });
  }, []);

  const handleLoadList = async () => {
    const data = await window.electronAPIDB.getAllBoltCore();
    setListData(data);
  };

  return (
    <RequestListContext.Provider
      value={{
        listData,
      }}
    >
      {children}
    </RequestListContext.Provider>
  );
};

export default RequestListProvider;
