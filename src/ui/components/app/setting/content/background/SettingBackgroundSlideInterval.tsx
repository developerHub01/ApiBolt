import {
  defaultSettings,
  maxBackgroundslideInterval,
  minBackgroundslideInterval,
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
      defaultSettings: defaultSettings.slideInterval,
      activeTab,
      activeProjectId,
      key: "slideInterval",
    });

  const senitizedValue = Number(
    senitizeValue(value, defaultSettings.slideInterval)
  );

  return (
    <SettingContextBasedLayout
      label="Adjust slide interval"
      settingType={settingType}
      handleChangeSettingType={handleChangeSettingType}
      defaultValue={defaultSettings.slideInterval!}
      value={senitizedValue}
      onChange={handleChange}
      min={minBackgroundslideInterval}
      max={maxBackgroundslideInterval}
      suffixLable="s"
      longSuffixLable=" seconds"
      isLast
    />
  );
};

export default SettingBackgroundSlideInterval;
