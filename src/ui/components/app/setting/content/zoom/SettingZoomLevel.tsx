import { useSetting } from "@/context/setting/SettingProvider";
import { useAppSelector } from "@/context/redux/hooks";
import { calculateIntoFixedPoint } from "@/utils";
import useGlobalLocalSettingv1 from "@/hooks/setting/use-global-local-settingv1";
import {
  defaultSettings,
  defaultZoomLevel,
  maxZoomLevel,
  minZoomLevel,
} from "@/constant/settings.constant";
import { senitizeValue } from "@/utils/settings.utils";
import SettingContextBasedLayout from "@/components/app/setting/content/SettingContextBasedLayout";

const SettingZoomLevel = () => {
  const { activeTab } = useSetting();
  const activeProjectId = useAppSelector(
    (state) => state.requestResponse.activeProjectId
  );
  const zoomLevelGlobal = useAppSelector(
    (state) => state.setting.globalSetting.zoomLevel
  );
  const zoomLevelLocal = useAppSelector(
    (state) => state.setting.settings?.zoomLevel
  );

  const { value, handleChange, handleChangeSettingType, settingType } =
    useGlobalLocalSettingv1({
      globalSetting: zoomLevelGlobal,
      localSetting: zoomLevelLocal,
      defaultSettings: defaultSettings.zoomLevel,
      activeTab,
      activeProjectId,
      key: "zoomLevel",
    });

  const senitizedValue = calculateIntoFixedPoint(
    Number(senitizeValue(value, defaultSettings.zoomLevel)) * 100
  );

  return (
    <SettingContextBasedLayout
      settingType={settingType}
      label="Adjust the interface scale to your preference"
      value={senitizedValue}
      defaultValue={calculateIntoFixedPoint(defaultZoomLevel * 100, 1)}
      min={calculateIntoFixedPoint(minZoomLevel * 100, 1)}
      max={calculateIntoFixedPoint(maxZoomLevel * 100, 1)}
      onChange={(value) =>
        handleChange(calculateIntoFixedPoint(Number(value) / 100, 1))
      }
      suffixLable="%"
      step={5}
      handleChangeSettingType={handleChangeSettingType}
    />
  );
};

export default SettingZoomLevel;
