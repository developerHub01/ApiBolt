import {
  defaultCodeFontSize,
  defaultSettings,
  maxCodeFontSize,
  minCodeFontSize,
} from "@/constant/settings.constant";
import { useAppSelector } from "@/context/redux/hooks";
import { useSetting } from "@/context/setting/SettingProvider";
import useGlobalLocalSettingv1 from "@/hooks/setting/use-global-local-settingv1";
import { senitizeValue } from "@/utils/settings.utils";
import SettingContextBasedLayout from "@/components/app/setting/content/SettingContextBasedLayout";

const SettingCodeFontSize = () => {
  const { activeTab } = useSetting();
  const activeProjectId = useAppSelector(
    (state) => state.requestResponse.activeProjectId
  );
  const codeFontSizeGlobal = useAppSelector(
    (state) => state.setting.globalSetting.codeFontSize
  );
  const codeFontSizeLocal = useAppSelector(
    (state) => state.setting.settings?.codeFontSize
  );

  const { value, handleChange, handleChangeSettingType, settingType } =
    useGlobalLocalSettingv1({
      globalSetting: codeFontSizeGlobal,
      localSetting: codeFontSizeLocal,
      defaultSettings: defaultSettings.codeFontSize,
      activeTab,
      activeProjectId,
      key: "codeFontSize",
    });

  const senitizedValue = Number(
    senitizeValue(value, defaultSettings.codeFontSize)
  );

  return (
    <SettingContextBasedLayout
      label="Adjust code font size"
      settingType={settingType}
      handleChangeSettingType={handleChangeSettingType}
      value={senitizedValue}
      defaultValue={defaultCodeFontSize}
      min={minCodeFontSize}
      max={maxCodeFontSize}
      onChange={handleChange}
      suffixLable="px"
    />
  );
};

export default SettingCodeFontSize;
