import React, { createContext, useContext, 
  useEffect
 } from "react";
import type { TMethod } from "@/types";
import { isElectron } from "@/utils/electron";
import { useStore } from "@/store/store";

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

// eslint-disable-next-line @typescript-eslint/no-empty-object-type
interface RequestListContext {}

const RequestListContext = createContext<RequestListContext>({});

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
  const handleLoadList = useStore((state) => state.handleLoadList);
  const handleLoadOpenFolderList = useStore(
    (state) => state.handleLoadOpenFolderList
  );

  useEffect(() => {
    if (!isElectron()) return;

    (async () => await handleLoadList())();
    // window.electronAPIDB.onBoltCoreChange(() => {
    //   (async () => await handleLoadList())();
    // });

    (async () => await handleLoadOpenFolderList())();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <RequestListContext.Provider value={{}}>
      {children}
    </RequestListContext.Provider>
  );
};

export default RequestListProvider;
