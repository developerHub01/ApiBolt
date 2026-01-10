import { useCallback, useMemo } from "react";
import type { SettingType } from "@shared/types/setting.types";
import { useAppDispatch } from "@/context/redux/hooks";
import { updateSettings } from "@/context/redux/setting/thunks/setting";
import type { TSettingTab } from "@/context/setting/SettingProvider";

const checkIsDefaultType = (value: unknown) =>
  [-1, "default"].includes(value as number | string);

interface UseGlobalLocalSettingRequestProps {
  globalSetting: unknown;
  localSetting: unknown;
  DEFAULT_SETTINGS?: unknown;
  activeTab: TSettingTab;
  activeProjectId: string | null;
  key: string;
}

const useGlobalLocalSettingRequest = ({
  globalSetting,
  localSetting,
  DEFAULT_SETTINGS,
  activeTab,
  activeProjectId,
  key,
}: UseGlobalLocalSettingRequestProps) => {
  const dispatch = useAppDispatch();

  const settingType: SettingType = useMemo(() => {
    if (activeTab === "project") {
      if (!localSetting) return "global";
      if (checkIsDefaultType(localSetting)) return "default";
      return "custom";
    } else {
      if (checkIsDefaultType(globalSetting)) return "default";
      return "custom";
    }
  }, [activeTab, globalSetting, localSetting]);

  const value = useMemo(() => {
    if (activeTab === "global" || settingType === "global")
      return globalSetting ?? DEFAULT_SETTINGS;

    if (settingType === "default")
      return localSetting ?? globalSetting ?? DEFAULT_SETTINGS;

    return localSetting;
  }, [DEFAULT_SETTINGS, activeTab, globalSetting, localSetting, settingType]);

  const handleChange = useCallback(
    (value?: unknown) => {
      const isNumberType = !isNaN(Number(value ?? DEFAULT_SETTINGS));
      const defaultValue = isNumberType ? -1 : "default";
      const localValue = isNumberType
        ? Number(value ?? DEFAULT_SETTINGS)
        : (value ?? DEFAULT_SETTINGS);

      const updatedValue =
        settingType === "default"
          ? defaultValue
          : settingType === "global"
            ? null
            : localValue;

      dispatch(
        updateSettings({
          [key]: updatedValue,
          projectId: activeTab === "project" ? activeProjectId : null,
        }),
      );
    },
    [activeProjectId, activeTab, DEFAULT_SETTINGS, dispatch, key, settingType],
  );

  const handleChangeSettingType = useCallback(
    (value: SettingType) => {
      const isNumberType = !isNaN(Number(DEFAULT_SETTINGS));
      const defaultValue = isNumberType ? -1 : "default";
      const updatedValue =
        value === "default"
          ? defaultValue
          : value === "global"
            ? null
            : DEFAULT_SETTINGS;

      dispatch(
        updateSettings({
          [key]: updatedValue,
          projectId: activeTab === "project" ? activeProjectId : null,
        }),
      );
    },
    [DEFAULT_SETTINGS, activeProjectId, activeTab, dispatch, key],
  );

  return { value, handleChange, handleChangeSettingType, settingType };
};

export default useGlobalLocalSettingRequest;
