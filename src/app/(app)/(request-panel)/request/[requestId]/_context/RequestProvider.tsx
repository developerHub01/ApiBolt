"use client";

import React, { createContext, useCallback, useContext, useState } from "react";

interface RequestContext {
  activeMetaTab: string;
  handleChangeActiveMetaTab: (id: string) => void;
  selectedMethod: string;
  handleChangeSelectedMethod: (id: string) => void;
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
  const [activeMetaTab, setActiveMetaTab] = useState<string>("params");
  const [selectedMethod, setSelectedMethod] = useState<string>("get");

  const handleChangeActiveMetaTab = useCallback((id: string) => {
    setActiveMetaTab(id);
  }, []);
  const handleChangeSelectedMethod = useCallback((id: string) => {
    setSelectedMethod(id);
  }, []);

  return (
    <RequestContext.Provider
      value={{
        activeMetaTab,
        handleChangeActiveMetaTab,
        selectedMethod,
        handleChangeSelectedMethod,
      }}
    >
      {children}
    </RequestContext.Provider>
  );
};

export default RequestProvider;
