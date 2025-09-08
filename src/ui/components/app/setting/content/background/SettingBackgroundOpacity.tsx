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
import { selectActiveProjectId } from "@/context/redux/request-response/request-response-selector";
import {
  selectOpacityGlobal,
  selectOpacityLocal,
} from "@/context/redux/setting/setting-selector";

const SettingBackgroundOpacity = () => {
  const { activeTab } = useSetting();
  const activeProjectId = useAppSelector(selectActiveProjectId);
  const opacityGlobal = useAppSelector(selectOpacityGlobal);
  const opacityLocal = useAppSelector(selectOpacityLocal);

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
