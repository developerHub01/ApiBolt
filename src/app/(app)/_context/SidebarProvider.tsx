"use client";

import React, { createContext, useCallback, useContext, useState } from "react";

export type TSidebarTab = "collections" | "environments" | null;

interface SidebarContext {
  activeTab: TSidebarTab;
  lastActiveTab: TSidebarTab;
  handleChangeActiveTab: (id?: TSidebarTab) => void;
  handleToggleSidebar: () => void;
}

const SidebarContext = createContext<SidebarContext | null>(null);

export const useSidebar = () => {
  const context = useContext(SidebarContext);

  if (!context) {
    throw new Error("useSidebar must be used within a SidebarProvider.");
  }

  return context;
};

interface SidebarProviderProps {
  children: React.ReactNode;
}

const SidebarProvider = ({ children }: SidebarProviderProps) => {
  const [activeTab, setActiveTab] = useState<TSidebarTab>("collections");
  const [lastActiveTab, setLastActiveTab] =
    useState<TSidebarTab>("collections");

  const handleChangeActiveTab = useCallback(
    (id: TSidebarTab = null) => {
      setLastActiveTab(id);

      if (id === activeTab) return setActiveTab(null);
      setActiveTab(id);
    },
    [activeTab, setActiveTab]
  );

  const handleToggleSidebar = useCallback(() => {
    if (!activeTab) return setActiveTab(lastActiveTab);

    setLastActiveTab(activeTab);
    setActiveTab(null);
  }, [activeTab, lastActiveTab]);

  return (
    <SidebarContext.Provider
      value={{
        activeTab,
        lastActiveTab,
        handleChangeActiveTab,
        handleToggleSidebar,
      }}
    >
      {children}
    </SidebarContext.Provider>
  );
};

export default SidebarProvider;
