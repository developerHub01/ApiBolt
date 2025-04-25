"use client";

import React, { createContext, useCallback, useContext, useState } from "react";

interface RequestContext {
  activeMetaTab: string;
  handleChangeActiveMetaTab: (id: string) => void;
}

const RequestContext = createContext<RequestContext | null>(null);

export const useRequest = () => {
  const context = useContext(RequestContext);

  if (!context) {
    throw new Error("useRequest must be used within a RequestProvider.");
  }

  return context;
};

interface RequestProviderProps {
  children: React.ReactNode;
}

const RequestProvider = ({ children }: RequestProviderProps) => {
  const [activeMetaTab, setActiveMetaTab] = useState<string>("");

  const handleChangeActiveMetaTab = useCallback((id: string) => {
    setActiveMetaTab(id);
  }, []);

  return (
    <RequestContext.Provider
      value={{
        activeMetaTab,
        handleChangeActiveMetaTab,
      }}
    >
      {children}
    </RequestContext.Provider>
  );
};

export default RequestProvider;
