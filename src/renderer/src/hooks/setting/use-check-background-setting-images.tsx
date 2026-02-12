import { useAppSelector } from "@/context/redux/hooks";
import {
  selectBackgroundImagesGlobal,
  selectBackgroundImagesLocal,
} from "@/context/redux/setting/selectors/setting";
import { useSetting } from "@/context/setting/SettingProvider";
import { DEFAULT_SETTINGS } from "@/constant/settings.constant";
import { senitizeValue } from "@/utils/settings.utils";
import useCheckApplyingSettingScopeBackgroundImages from "@/hooks/setting/use-check-applying-setting-scope-background-images";
import useGlobalLocalBgImages from "@/hooks/setting/use-global-local-bg-images";
import { SettingsInterface } from "@shared/types/setting.types";

const useCheckBackgroundSettingImages = () => {
  const { activeTab } = useSetting();
  const backgroundImagesGlobal = useAppSelector(selectBackgroundImagesGlobal);
  const backgroundImagesLocal = useAppSelector(selectBackgroundImagesLocal);
  const backgroundImages = useCheckApplyingSettingScopeBackgroundImages();

  const { value, settingType, handleChange, handleChangeSettingType } =
    useGlobalLocalBgImages({
      globalSetting: backgroundImagesGlobal,
      localSetting: backgroundImagesLocal,
      activeTab,
    });

  const senitizedValue = senitizeValue<
    Exclude<SettingsInterface["backgroundImages"], "default">
  >(value, DEFAULT_SETTINGS.backgroundImages);

  const folderPath =
    (typeof senitizedValue === "object" ? senitizedValue?.folderUrl : null) ??
    null;

  const images =
    (typeof senitizedValue === "object" ? senitizedValue?.images : []) ?? [];

  const thumbnails =
    (typeof senitizedValue === "object" ? senitizedValue?.thumbnails : []) ??
    [];

  const isHideMoreData =
    !Array.isArray(backgroundImages) || !backgroundImages.length;

  return {
    value,
    images,
    thumbnails,
    handleChange,
    handleChangeSettingType,
    settingType,
    senitizedValue: Array.isArray(senitizedValue) ? senitizedValue : [],
    folderPath,
    activeTab,
    isHideMoreData,
    backgroundImagesGlobal,
    backgroundImagesLocal,
    backgroundImages,
  };
};

export default useCheckBackgroundSettingImages;
