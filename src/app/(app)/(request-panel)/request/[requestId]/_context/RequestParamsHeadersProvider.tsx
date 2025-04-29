"use client";

import React, {
  createContext,
  useCallback,
  useContext,
  useMemo,
  useState,
} from "react";

export interface ShowColumnInterface {
  value: boolean;
  description: boolean;
}

interface RequestParamsHeadersContext {
  showColumn: ShowColumnInterface;
  toggleShowColumn: (key: keyof ShowColumnInterface) => void;
}

const RequestParamsHeadersContext =
  createContext<RequestParamsHeadersContext | null>(null);

export const useRequestParamsHeaders = () => {
  const context = useContext(RequestParamsHeadersContext);

  if (!context) {
    throw new Error(
      "useRequestParamsHeaders must be used within a RequestParamsHeadersProvider."
    );
  }

  return context;
};

export const useCellListToShow = () => {
  const { showColumn } = useRequestParamsHeaders();

  return useMemo(() => {
    const keyList = Object.entries(showColumn);
    return keyList.reduce(
      (acc, [key, value]) => {
        if (value) acc.push(key);
        return acc;
      },
      ["key"]
    );
  }, [showColumn]);
};

interface RequestParamsHeadersProviderProps {
  children: React.ReactNode;
}

const RequestParamsHeadersProvider = ({
  children,
}: RequestParamsHeadersProviderProps) => {
  const [showColumn, setShowColumn] = useState<ShowColumnInterface>({
    value: true,
    description: true,
  });

  const toggleShowColumn = useCallback((key: keyof ShowColumnInterface) => {
    setShowColumn((prev) => ({
      ...prev,
      [key]: !prev[key],
    }));
  }, []);

  return (
    <RequestParamsHeadersContext.Provider
      value={{
        showColumn,
        toggleShowColumn,
      }}
    >
      {children}
    </RequestParamsHeadersContext.Provider>
  );
};

export default RequestParamsHeadersProvider;
