import React, { createContext, useCallback, useContext, useState } from "react";

export type TSettingTab = "global" | "project";

interface SettingContext {
  activeTab: TSettingTab;
  handleChangeActiveTab: (value?: TSettingTab) => void;
}

// const SettingContext = createContext<SettingContext | null>(null);
const SettingContext = createContext<SettingContext | null>(null);

// eslint-disable-next-line react-refresh/only-export-components
export const useSetting = () => {
  const context = useContext(SettingContext);

  if (!context) {
    throw new Error("useSetting must be used within a SettingProvider.");
  }

  return context;
};

interface SettingProviderProps {
  children: React.ReactNode;
}

const SettingProvider = ({ children }: SettingProviderProps) => {
  const [activeTab, setActiveTab] = useState<TSettingTab>("project");

  const handleChangeActiveTab = useCallback((value?: TSettingTab) => {
    setActiveTab((prev) => value ?? (prev === "global" ? "project" : "global"));
  }, []);

  return (
    <SettingContext.Provider
      value={{
        activeTab,
        handleChangeActiveTab,
      }}
    >
      {children}
    </SettingContext.Provider>
  );
};

export default SettingProvider;
