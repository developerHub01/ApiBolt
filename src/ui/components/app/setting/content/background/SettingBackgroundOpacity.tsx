import {
  defaultSettings,
  maxBackgroundOpacity,
  minBackgroundOpacity,
} from "@/constant/settings.constant";
import { useAppSelector } from "@/context/redux/hooks";
import { useSetting } from "@/context/setting/SettingProvider";
import useGlobalLocalSettingv1 from "@/hooks/setting/use-global-local-settingv1";
import { senitizeValue } from "@/utils/settings.utils";
import { calculateIntoFixedPoint } from "@/utils";
import SettingContextBasedLayout from "@/components/app/setting/content/SettingContextBasedLayout";

const SettingBackgroundOpacity = () => {
  const { activeTab } = useSetting();
  const activeProjectId = useAppSelector(
    (state) => state.requestResponse.activeProjectId
  );
  const opacityGlobal = useAppSelector(
    (state) => state.setting.globalSetting.backgroundOpacity
  );
  const opacityLocal = useAppSelector(
    (state) => state.setting.settings?.backgroundOpacity
  );

  const { value, handleChange, handleChangeSettingType, settingType } =
    useGlobalLocalSettingv1({
      globalSetting: opacityGlobal,
      localSetting: opacityLocal,
      defaultSettings: defaultSettings.backgroundOpacity,
      activeTab,
      activeProjectId,
      key: "backgroundOpacity",
    });

  const senitizedValue = calculateIntoFixedPoint(
    Number(senitizeValue(value, defaultSettings.backgroundOpacity)) * 100
  );

  return (
    <SettingContextBasedLayout
      label="Adjust background opacity"
      settingType={settingType}
      handleChangeSettingType={handleChangeSettingType}
      defaultValue={calculateIntoFixedPoint(
        defaultSettings.backgroundOpacity * 100
      )}
      value={senitizedValue}
      min={calculateIntoFixedPoint(minBackgroundOpacity * 100, 1)}
      max={calculateIntoFixedPoint(maxBackgroundOpacity * 100, 1)}
      suffixLable="%"
      onChange={(value) =>
        handleChange(calculateIntoFixedPoint(Number(value) / 100, 1))
      }
    />
  );
};

export default SettingBackgroundOpacity;
