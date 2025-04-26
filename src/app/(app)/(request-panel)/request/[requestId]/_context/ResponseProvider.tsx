"use client";

import React, { createContext, useCallback, useContext, useState } from "react";

export type TResponseTab = "raw" | "preview";

interface ResponseContext {
  activeMetaTab: string;
  handleChangeActiveMetaTab: (id: string) => void;
  responseTab: TResponseTab;
  handleChangeActiveResponseTab: (value: TResponseTab) => void;
}

const ResponseContext = createContext<ResponseContext | null>(null);

export const useResponse = () => {
  const context = useContext(ResponseContext);

  if (!context) {
    throw new Error(
      "useResponseResponse must be used within a ResponseProvider."
    );
  }

  return context;
};

interface ResponseProviderProps {
  children: React.ReactNode;
}

const ResponseProvider = ({ children }: ResponseProviderProps) => {
  const [activeMetaTab, setActiveMetaTab] = useState<string>("body");
  const [responseTab, setResponseTab] = useState<TResponseTab>("raw");

  const handleChangeActiveMetaTab = useCallback((id: string) => {
    setActiveMetaTab(id);
  }, []);
  
  const handleChangeActiveResponseTab = useCallback((id: TResponseTab) => {
    setResponseTab(id);
  }, []);

  return (
    <ResponseContext.Provider
      value={{
        activeMetaTab,
        handleChangeActiveMetaTab,
        responseTab,
        handleChangeActiveResponseTab,
      }}
    >
      {children}
    </ResponseContext.Provider>
  );
};

export default ResponseProvider;
