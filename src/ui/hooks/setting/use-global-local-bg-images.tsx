import { useCallback, useEffect, useMemo, useState } from "react";
import type {
  SettingType,
  UpdateBackgroundImagePayloadMethodType,
} from "@/types/setting.types";
import type { TSettingTab } from "@/context/setting/SettingProvider";
import { DEFAULT_SETTINGS } from "@/constant/settings.constant";
import { updateSettingsBackgroundImages } from "@/context/redux/setting/thunk/setting-thunk";
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
  handleChange: (method?: UpdateBackgroundImagePayloadMethodType) => void;
  handleChangeSettingType: (value: SettingType) => void;
  settingType: SettingType;
} => {
  const dispatch = useAppDispatch();
  /**
   * ⚠️⚠️⚠️⚠️ HERE STATE IS INTENTIONAL  ⚠️⚠️⚠️⚠️
   * State so that we can keep track for user that did he just changed setting type or not
   * Because some times like for custom it will show an interface to upload folder path.
   * so this is just local temporary state.
   * Temporary state because there is no guarantee that user will upload.
   * **/
  const [settingType, setSettingType] = useState<SettingType>("default");
  const [isUpdate, setIsUpdate] = useState<boolean>(false);
  /**
   * ⚠️⚠️⚠️⚠️ HERE STATE IS INTENTIONAL  ⚠️⚠️⚠️⚠️
   * **/

  useEffect(() => {
    let type: SettingType = "custom";

    if (activeTab === "project") {
      if (!localSetting) type = "global";
      else if (checkIsDefaultType(localSetting)) type = "default";
    } else {
      if (!globalSetting || checkIsDefaultType(globalSetting)) type = "default";
    }
    setSettingType(type);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const value = useMemo(() => {
    if (activeTab === "global" || settingType === "global")
      return globalSetting ?? DEFAULT_SETTINGS.backgroundImages;

    if (settingType === "default")
      return localSetting ?? globalSetting ?? DEFAULT_SETTINGS.backgroundImages;

    return localSetting ?? [];
  }, [activeTab, globalSetting, localSetting, settingType]);

  const handleChange = useCallback(
    (method?: UpdateBackgroundImagePayloadMethodType) => {
      /**
       * ["default", "custom"] in both case default because if select custom then also I dont want to trigger "File Explorer dialog"
       * so when click in custom it will be set as default and only custom will apply when user click on "Choose background folder" button and select folder
       * if global then remove the background images because I want that field as null so it follow global setting
       * else as upload the background images though it is unreachable case because we already check the settingType
       * but just to be sure I am adding this
       * **/
      if (!method)
        method = ["default", "custom"].includes(settingType)
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
    },
    [activeTab, dispatch, settingType]
  );

  useEffect(() => {
    if (!isUpdate) return;
    handleChange();
    setIsUpdate(false);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isUpdate]);

  const handleChangeSettingType = useCallback((value: SettingType) => {
    setSettingType(value);

    /**
     * if custom then emetiately dont say to upload instead let use the upload button click if needed
     * **/
    // if (value === "custom") return;
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
