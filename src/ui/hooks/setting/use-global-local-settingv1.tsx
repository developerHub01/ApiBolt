import { useCallback, useEffect, useState } from "react";
import type { SettingsType } from "@/types/setting.types";
import { useAppDispatch } from "@/context/redux/hooks";
import type { TSettingTab } from "@/context/setting/SettingProvider";
import { updateSettings } from "@/context/redux/setting/setting-thunk";

interface useGlobalLocalSettingv1Props {
  globalSetting: unknown;
  localSetting: unknown;
  defaultSettings?: unknown;
  activeTab: TSettingTab;
  activeProjectId: string | null;
  key: string;
}

const useGlobalLocalSettingv1 = ({
  globalSetting,
  localSetting,
  defaultSettings,
  activeTab,
  activeProjectId,
  key,
}: useGlobalLocalSettingv1Props): {
  value: unknown;
  handleChange: (value?: string) => void;
  handleChangeSettingType: (value: SettingsType) => void;
  settingType: SettingsType;
} => {
  const dispatch = useAppDispatch();
  const [settingType, setSettingType] = useState<SettingsType>("default");
  const [isUpdate, setIsUpdate] = useState<boolean>(false);

  useEffect(() => {
    let type: SettingsType = "custom";

    if (activeTab === "project") {
      if (!localSetting) type = "global";
      else if (
        localSetting === null ||
        localSetting === undefined ||
        localSetting === defaultSettings
      )
        type = "default";
    } else {
      if (
        globalSetting === null ||
        globalSetting === undefined ||
        globalSetting === defaultSettings
      )
        type = "default";
    }
    setSettingType(type);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const value =
    (activeTab === "project" ? localSetting : globalSetting) ?? defaultSettings;

  const handleChange = useCallback(
    (value?: string) => {
      const updatedValue =
        settingType === "default"
          ? defaultSettings
          : settingType === "global"
            ? null
            : isNaN(Number(value ?? defaultSettings))
              ? (value ?? defaultSettings)
              : Number(value ?? defaultSettings);

      dispatch(
        updateSettings({
          [key]: updatedValue,
          projectId: activeTab === "project" ? activeProjectId : null,
        })
      );
    },
    [activeProjectId, activeTab, defaultSettings, dispatch, key, settingType]
  );

  useEffect(() => {
    if (!isUpdate) return;
    handleChange();
    setIsUpdate(false);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isUpdate]);

  const handleChangeSettingType = useCallback((value: SettingsType) => {
    setSettingType(value);
    if (value === "custom") return;
    setIsUpdate(true);
  }, []);

  return {
    value,
    handleChange,
    handleChangeSettingType,
    settingType,
  };
};

export default useGlobalLocalSettingv1;
