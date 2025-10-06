import {
  DEFAULT_SETTINGS,
  MAX_BACKGROUND_MAX_NUMBER_OF_IMAGES,
  MIN_BACKGROUND_MAX_NUMBER_OF_IMAGES,
} from "@/constant/settings.constant";
import SettingContextBasedLayout from "@/components/app/setting/content/SettingContextBasedLayout";
import useCheckBackgroundSettingMaxNumberOfImages from "@/hooks/setting/use-check-background-setting-max-number-of-images";

const SettingBackgroundMaxNumberOfImages = () => {
  const { settingType, senitizedValue, handleChange, handleChangeSettingType } =
    useCheckBackgroundSettingMaxNumberOfImages();

  return (
    <SettingContextBasedLayout
      label="Allow max number of images"
      settingType={settingType}
      handleChangeSettingType={handleChangeSettingType}
      defaultValue={DEFAULT_SETTINGS.maxNumberOfImages!}
      value={senitizedValue}
      min={MIN_BACKGROUND_MAX_NUMBER_OF_IMAGES}
      max={MAX_BACKGROUND_MAX_NUMBER_OF_IMAGES}
      onChange={handleChange}
    />
  );
};

export default SettingBackgroundMaxNumberOfImages;
