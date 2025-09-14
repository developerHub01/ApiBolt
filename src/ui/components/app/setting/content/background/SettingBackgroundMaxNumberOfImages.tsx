import {
  DEFAULT_SETTINGS,
  MAX_BACKGROUND_MAX_NUMBER_OF_IMAGES,
  MIN_BACKGROUND_MAX_NUMBER_OF_IMAGES,
} from "@/constant/settings.constant";
import { useAppSelector } from "@/context/redux/hooks";
import { useSetting } from "@/context/setting/SettingProvider";
import useGlobalLocalSettingv1 from "@/hooks/setting/use-global-local-settingv1";
import { senitizeValue } from "@/utils/settings.utils";
import SettingContextBasedLayout from "@/components/app/setting/content/SettingContextBasedLayout";
import { selectActiveProjectId } from "@/context/redux/request-response/request-response-selector";
import {
  selectMaxImagesGlobal,
  selectMaxImagesLocal,
} from "@/context/redux/setting/setting-selector";

const SettingBackgroundMaxNumberOfImages = () => {
  const { activeTab } = useSetting();
  const activeProjectId = useAppSelector(selectActiveProjectId);
  const maxImagesGlobal = useAppSelector(selectMaxImagesGlobal);
  const maxImagesLocal = useAppSelector(selectMaxImagesLocal);

  const { value, handleChange, handleChangeSettingType, settingType } =
    useGlobalLocalSettingv1({
      globalSetting: maxImagesGlobal,
      localSetting: maxImagesLocal,
      DEFAULT_SETTINGS: DEFAULT_SETTINGS.maxNumberOfImages,
      activeTab,
      activeProjectId,
      key: "maxNumberOfImages",
    });

  const senitizedValue = Number(
    senitizeValue(value, DEFAULT_SETTINGS.maxNumberOfImages)
  );

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
