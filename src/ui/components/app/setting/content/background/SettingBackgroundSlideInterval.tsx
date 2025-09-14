import {
  DEFAULT_SETTINGS,
  MAX_BACKGROUNDSLIDE_INTERVAL,
  MIN_BACKGROUNDSLIDE_INTERVAL,
} from "@/constant/settings.constant";
import { useAppSelector } from "@/context/redux/hooks";
import { useSetting } from "@/context/setting/SettingProvider";
import useGlobalLocalSettingv1 from "@/hooks/setting/use-global-local-settingv1";
import { senitizeValue } from "@/utils/settings.utils";
import SettingContextBasedLayout from "@/components/app/setting/content/SettingContextBasedLayout";
import { selectActiveProjectId } from "@/context/redux/request-response/request-response-selector";
import {
  selectSlideIntervalGlobal,
  selectSlideIntervalLocal,
} from "@/context/redux/setting/setting-selector";

const SettingBackgroundSlideInterval = () => {
  const { activeTab } = useSetting();
  const activeProjectId = useAppSelector(selectActiveProjectId);
  const slideIntervalGlobal = useAppSelector(selectSlideIntervalGlobal);
  const slideIntervalLocal = useAppSelector(selectSlideIntervalLocal);

  const { value, handleChange, handleChangeSettingType, settingType } =
    useGlobalLocalSettingv1({
      globalSetting: slideIntervalGlobal,
      localSetting: slideIntervalLocal,
      DEFAULT_SETTINGS: DEFAULT_SETTINGS.slideInterval,
      activeTab,
      activeProjectId,
      key: "slideInterval",
    });

  const senitizedValue = Number(
    senitizeValue(value, DEFAULT_SETTINGS.slideInterval)
  );

  return (
    <SettingContextBasedLayout
      label="Adjust slide interval"
      settingType={settingType}
      handleChangeSettingType={handleChangeSettingType}
      defaultValue={DEFAULT_SETTINGS.slideInterval!}
      value={senitizedValue}
      onChange={handleChange}
      min={MIN_BACKGROUNDSLIDE_INTERVAL}
      max={MAX_BACKGROUNDSLIDE_INTERVAL}
      suffixLable="s"
      longSuffixLable=" seconds"
      isLast
    />
  );
};

export default SettingBackgroundSlideInterval;
