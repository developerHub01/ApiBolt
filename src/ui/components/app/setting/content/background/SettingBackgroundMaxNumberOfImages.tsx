import {
  defaultSettings,
  maxBackgroundMaxNumberOfImages,
  minBackgroundMaxNumberOfImages,
} from "@/constant/settings.constant";
import { useAppSelector } from "@/context/redux/hooks";
import { useSetting } from "@/context/setting/SettingProvider";
import useGlobalLocalSettingv1 from "@/hooks/setting/use-global-local-settingv1";
import { senitizeValue } from "@/utils/settings.utils";
import SettingContextBasedLayout from "@/components/app/setting/content/SettingContextBasedLayout";

const SettingBackgroundMaxNumberOfImages = () => {
  const { activeTab } = useSetting();
  const activeProjectId = useAppSelector(
    (state) => state.requestResponse.activeProjectId
  );
  const maxImagesGlobal = useAppSelector(
    (state) => state.setting.globalSetting.maxNumberOfImages
  );
  const maxImagesLocal = useAppSelector(
    (state) => state.setting.settings?.maxNumberOfImages
  );

  const { value, handleChange, handleChangeSettingType, settingType } =
    useGlobalLocalSettingv1({
      globalSetting: maxImagesGlobal,
      localSetting: maxImagesLocal,
      defaultSettings: defaultSettings.maxNumberOfImages,
      activeTab,
      activeProjectId,
      key: "maxNumberOfImages",
    });

  const senitizedValue = Number(
    senitizeValue(value, defaultSettings.maxNumberOfImages)
  );

  return (
    <SettingContextBasedLayout
      label="Allow max number of images"
      settingType={settingType}
      handleChangeSettingType={handleChangeSettingType}
      defaultValue={defaultSettings.maxNumberOfImages!}
      value={senitizedValue}
      min={minBackgroundMaxNumberOfImages}
      max={maxBackgroundMaxNumberOfImages}
      onChange={handleChange}
    />
  );
};

export default SettingBackgroundMaxNumberOfImages;
