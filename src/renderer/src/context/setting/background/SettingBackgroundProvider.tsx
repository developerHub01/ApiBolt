import React, { createContext, useCallback, useContext, useState } from "react";
import useCheckBackgroundSettingImages from "@/hooks/setting/use-check-background-setting-images";
import type {
  SettingType,
  UpdateBackgroundImagePayloadMethodType,
} from "@shared/types/setting.types";
export type TSettingBackgroundTab = "global" | "project";

interface SettingBackgroundContext {
  selectedBackgroundImageIndex: number | null;
  handleChangeSelectedBackgroundImageIndex: (value?: number | null) => void;
  handleNavigateSelectedBackgroundImageIndex: (
    direction?: "left" | "right",
  ) => void;
  settingType: SettingType;
  senitizedValue: string | Array<string> | undefined;
  folderPath: string | null;
  handleChange: (
    method?: UpdateBackgroundImagePayloadMethodType | undefined,
  ) => void;
  isHideMoreData: boolean;
  handleChangeSettingType: (value: SettingType) => void;
}

// const SettingBackgroundContext = createContext<SettingBackgroundContext | null>(null);
const SettingBackgroundContext = createContext<SettingBackgroundContext | null>(
  null,
);

export const useSettingBackground = () => {
  const context = useContext(SettingBackgroundContext);

  if (!context) {
    throw new Error(
      "useSettingBackground must be used within a SettingBackgroundProvider.",
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
  const {
    settingType,
    senitizedValue,
    folderPath,
    handleChange,
    isHideMoreData,
    handleChangeSettingType,
  } = useCheckBackgroundSettingImages();
  const [selectedBackgroundImageIndex, setSelectedBackgroundImageIndex] =
    useState<number | null>(null);

  const handleChangeSelectedBackgroundImageIndex = useCallback(
    (value?: number | null) => setSelectedBackgroundImageIndex(value ?? null),
    [],
  );

  const handleNavigateSelectedBackgroundImageIndex = useCallback(
    (direction: "left" | "right" = "left") =>
      setSelectedBackgroundImageIndex(prev =>
        prev === null
          ? 0
          : Math.abs(
              direction === "left"
                ? (senitizedValue?.length ?? 0) + prev - 1
                : prev + 1,
            ) % (senitizedValue?.length ?? 0),
      ),
    [senitizedValue?.length],
  );

  return (
    <SettingBackgroundContext.Provider
      value={{
        selectedBackgroundImageIndex,
        handleChangeSelectedBackgroundImageIndex,
        handleNavigateSelectedBackgroundImageIndex,
        settingType,
        senitizedValue,
        folderPath,
        handleChange,
        isHideMoreData,
        handleChangeSettingType,
      }}
    >
      {children}
    </SettingBackgroundContext.Provider>
  );
};

export default SettingBackgroundProvider;
