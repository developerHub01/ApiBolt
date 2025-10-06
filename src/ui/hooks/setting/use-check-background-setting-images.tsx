import { useAppSelector } from "@/context/redux/hooks";
import {
  selectBackgroundImagesGlobal,
  selectBackgroundImagesLocal,
} from "@/context/redux/setting/setting-selector";
import { useSetting } from "@/context/setting/SettingProvider";
import { DEFAULT_SETTINGS } from "@/constant/settings.constant";
import { senitizeValue } from "@/utils/settings.utils";
import type { SettingBackgroundImagesValueType } from "@/hooks/setting/use-global-local-bg-images";
import useCheckApplyingSettingScopeBackgroundImages from "@/hooks/setting/use-check-applying-setting-scope-background-images";
import useGlobalLocalBgImages from "@/hooks/setting/use-global-local-bg-images";

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

  const senitizedValue = senitizeValue(
    value,
    DEFAULT_SETTINGS.backgroundImages
  ) as SettingBackgroundImagesValueType;

  const isHideMoreData =
    !Array.isArray(backgroundImages) || !backgroundImages.length;

  return {
    value,
    handleChange,
    handleChangeSettingType,
    settingType,
    senitizedValue,
    activeTab,
    isHideMoreData,
    backgroundImagesGlobal,
    backgroundImagesLocal,
    backgroundImages,
  };
};

export default useCheckBackgroundSettingImages;
