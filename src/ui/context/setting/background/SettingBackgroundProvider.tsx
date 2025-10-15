import React, { createContext, useCallback, useContext, useState } from "react";
export type TSettingBackgroundTab = "global" | "project";

interface SettingBackgroundContext {
  selectedBackgroundImageIndex: number | null;
  handleChangeSelectedBackgroundImageIndex: (value?: number | null) => void;
}

// const SettingBackgroundContext = createContext<SettingBackgroundContext | null>(null);
const SettingBackgroundContext = createContext<SettingBackgroundContext | null>(
  null
);

// eslint-disable-next-line react-refresh/only-export-components
export const useSettingBackground = () => {
  const context = useContext(SettingBackgroundContext);

  if (!context) {
    throw new Error(
      "useSettingBackground must be used within a SettingBackgroundProvider."
    );
  }

  return context;
};

interface SettingBackgroundProviderProps {
  children: React.ReactNode;
}

const SettingBackgroundProvider = ({
  children,
}: SettingBackgroundProviderProps) => {
  const [selectedBackgroundImageIndex, setSelectedBackgroundImageIndex] =
    useState<number | null>(null);

  const handleChangeSelectedBackgroundImageIndex = useCallback(
    (value?: number | null) => setSelectedBackgroundImageIndex(value ?? null),
    []
  );

  return (
    <SettingBackgroundContext.Provider
      value={{
        selectedBackgroundImageIndex,
        handleChangeSelectedBackgroundImageIndex,
      }}
    >
      {children}
    </SettingBackgroundContext.Provider>
  );
};

export default SettingBackgroundProvider;
