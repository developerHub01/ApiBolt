"use client";

import React, { createContext, useCallback, useContext, useState } from "react";

interface ResponseContext {
  activeMetaTab: string;
  handleChangeActiveMetaTab: (id: string) => void;
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
  const [activeMetaTab, setActiveMetaTab] = useState<string>("params");
 
  const handleChangeActiveMetaTab = useCallback((id: string) => {
    setActiveMetaTab(id);
  }, []);

  return (
    <ResponseContext.Provider
      value={{
        activeMetaTab,
        handleChangeActiveMetaTab,
      }}
    >
      {children}
    </ResponseContext.Provider>
  );
};

export default ResponseProvider;
