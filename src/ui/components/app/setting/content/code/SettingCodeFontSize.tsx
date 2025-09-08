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
import { selectActiveProjectId } from "@/context/redux/request-response/request-response-selector";
import {
  selectCodeFontSizeGlobal,
  selectCodeFontSizeLocal,
} from "@/context/redux/setting/setting-selector";

const SettingCodeFontSize = () => {
  const { activeTab } = useSetting();
  const activeProjectId = useAppSelector(selectActiveProjectId);
  const codeFontSizeGlobal = useAppSelector(selectCodeFontSizeGlobal);
  const codeFontSizeLocal = useAppSelector(selectCodeFontSizeLocal);

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
