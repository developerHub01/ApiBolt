import { useCallback, useEffect, useState } from "react";
import type { SettingsType } from "@/types/setting.types";
import type { TSettingTab } from "@/context/setting/SettingProvider";
import { defaultSettings } from "@/constant/settings.constant";
import { updateSettingsBackgroundImages } from "@/context/redux/setting/setting-thunk";
import { useAppDispatch } from "@/context/redux/hooks";

const checkIsDefaultType = (value: unknown) =>
  [-1, "default"].includes(value as number | string);

interface UseGlobalLocalBgImagesProps {
  globalSetting: SettingBackgroundImagesValueType;
  localSetting: SettingBackgroundImagesValueType;
  activeTab: TSettingTab;
}

export type SettingBackgroundImagesValueType =
  | Array<string>
  | string
  | null
  | undefined;

const useGlobalLocalBgImages = ({
  globalSetting,
  localSetting,
  activeTab,
}: UseGlobalLocalBgImagesProps): {
  value: SettingBackgroundImagesValueType;
  handleChange: () => void;
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
        checkIsDefaultType(localSetting)
      )
        type = "default";
    } else {
      if (
        globalSetting === null ||
        globalSetting === undefined ||
        checkIsDefaultType(globalSetting)
      )
        type = "default";
    }
    setSettingType(type);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const value =
    (activeTab === "project" ? localSetting : globalSetting) ??
    defaultSettings.backgroundImages;

  const handleChange = useCallback(() => {
    const method =
      settingType === "default"
        ? "default"
        : settingType === "global"
          ? "remove"
          : "upload";

    dispatch(
      updateSettingsBackgroundImages({
        method,
        type: activeTab,
      })
    );
  }, [activeTab, dispatch, settingType]);

  useEffect(() => {
    if (!isUpdate) return;
    handleChange();
    setIsUpdate(false);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isUpdate]);

  const handleChangeSettingType = useCallback((value: SettingsType) => {
    setSettingType(value);

    /* if custom then emetiately dont say to upload instead let use the upload button click if needed */
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

export default useGlobalLocalBgImages;
