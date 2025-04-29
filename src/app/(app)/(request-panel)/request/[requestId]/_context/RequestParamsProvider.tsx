"use client";

import React, { createContext, useCallback, useContext, useState } from "react";

export interface ShowColumnInterface {
  value: boolean;
  description: boolean;
}

interface RequestParamsContext {
  showColumn: ShowColumnInterface;
  toggleShowColumn: (key: keyof ShowColumnInterface) => void;
}

const RequestParamsContext = createContext<RequestParamsContext | null>(null);

export const useRequestParams = () => {
  const context = useContext(RequestParamsContext);

  if (!context) {
    throw new Error(
      "useRequestParams must be used within a RequestParamsProvider."
    );
  }

  return context;
};

interface RequestParamsProviderProps {
  children: React.ReactNode;
}

const RequestParamsProvider = ({ children }: RequestParamsProviderProps) => {
  const [showColumn, setShowColumn] = useState<ShowColumnInterface>({
    value: true,
    description: true,
  });

  const toggleShowColumn = useCallback((key: keyof ShowColumnInterface) => {
    console.log("==========");
    setShowColumn((prev) => ({
      ...prev,
      [key]: !prev[key],
    }));
  }, []);

  return (
    <RequestParamsContext.Provider
      value={{
        showColumn,
        toggleShowColumn,
      }}
    >
      {children}
    </RequestParamsContext.Provider>
  );
};

export default RequestParamsProvider;
