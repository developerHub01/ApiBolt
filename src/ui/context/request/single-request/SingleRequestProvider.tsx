import React, {
  createContext,
  useCallback,
  useContext,
  useEffect,
} from "react";
import { useTabSidebar } from "@/context/tab-sidebar/TabSidebarProvider";
import {
  localStorageRequestActiveTabKey,
  useRequestResponse,
  type TActiveTabType,
} from "@/context/request/RequestResponseProvider";

interface SingleRequestContext {
  getActiveMetaTab: (requestId?: string) => TActiveTabType;
  getIsLoading: (requestId?: string) => boolean;
  getIsApiUrlError: (requestId?: string) => boolean;
}

const SingleRequestContext = createContext<SingleRequestContext | null>(null);

// eslint-disable-next-line react-refresh/only-export-components
export const useSingleRequest = () => {
  const context = useContext(SingleRequestContext);

  if (!context) {
    throw new Error(
      "useSingleRequest must be used within a SingleRequestProvider."
    );
  }

  return context;
};

interface SingleRequestProviderProps {
  children: React.ReactNode;
}

const SingleRequestProvider = ({ children }: SingleRequestProviderProps) => {
  const { selectedTab } = useTabSidebar();
  const { handleChangeActiveMetaTab, activeMetaTab, isLoading, isApiUrlError } =
    useRequestResponse();

  useEffect(() => {
    if (!selectedTab) return;

    handleChangeActiveMetaTab(
      (localStorage.getItem(localStorageRequestActiveTabKey(selectedTab)) ??
        "params") as TActiveTabType
    );
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selectedTab]);

  useEffect(() => {
    if (!selectedTab) return;

    localStorage.setItem(
      localStorageRequestActiveTabKey(selectedTab),
      getActiveMetaTab(selectedTab)
    );
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [activeMetaTab]);

  const getSingleValue = useCallback(
    <T,>({
      state,
      requestId = selectedTab,
      defaultValue,
    }: {
      state: Record<string, T>;
      requestId?: string | null;
      defaultValue: T;
    }) => {
      if (!requestId) return defaultValue;

      return state[requestId] ?? defaultValue;
    },
    [selectedTab]
  );

  const getActiveMetaTab = useCallback(
    (requestId?: string): TActiveTabType =>
      getSingleValue({
        state: activeMetaTab,
        requestId,
        defaultValue: "params",
      }),
    [activeMetaTab, getSingleValue]
  );

  const getIsLoading = useCallback(
    (requestId?: string) =>
      getSingleValue({
        state: isLoading,
        requestId,
        defaultValue: false,
      }),

    [getSingleValue, isLoading]
  );

  const getIsApiUrlError = useCallback(
    (requestId?: string) =>
      getSingleValue({
        state: isApiUrlError,
        requestId,
        defaultValue: false,
      }),

    [getSingleValue, isApiUrlError]
  );

  return (
    <SingleRequestContext.Provider
      value={{
        getActiveMetaTab,
        getIsLoading,
        getIsApiUrlError,
      }}
    >
      {children}
    </SingleRequestContext.Provider>
  );
};

export default SingleRequestProvider;
