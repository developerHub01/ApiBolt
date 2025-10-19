import {
  DEFAULT_CODE_FONT_SIZE,
  DEFAULT_SETTINGS,
  MAX_CODE_FONT_SIZE,
  MIN_CODE_FONT_SIZE,
} from "@/constant/settings.constant";
import { useAppSelector } from "@/context/redux/hooks";
import { useSetting } from "@/context/setting/SettingProvider";
import useGlobalLocalSettingv1 from "@/hooks/setting/use-global-local-settingv1";
import { senitizeValue } from "@/utils/settings.utils";
import SettingContextBasedLayout from "@/components/app/setting/content/SettingContextBasedLayout";
import {
  selectCodeFontSizeGlobal,
  selectCodeFontSizeLocal,
} from "@/context/redux/setting/selectors/setting-selector";
import { selectActiveProjectId } from "@/context/redux/request-response/selectors/project";

const SettingCodeFontSize = () => {
  const { activeTab } = useSetting();
  const activeProjectId = useAppSelector(selectActiveProjectId);
  const codeFontSizeGlobal = useAppSelector(selectCodeFontSizeGlobal);
  const codeFontSizeLocal = useAppSelector(selectCodeFontSizeLocal);

  const { value, handleChange, handleChangeSettingType, settingType } =
    useGlobalLocalSettingv1({
      globalSetting: codeFontSizeGlobal,
      localSetting: codeFontSizeLocal,
      DEFAULT_SETTINGS: DEFAULT_SETTINGS.codeFontSize,
      activeTab,
      activeProjectId,
      key: "codeFontSize",
    });

  const senitizedValue = Number(
    senitizeValue(value, DEFAULT_SETTINGS.codeFontSize)
  );

  return (
    <SettingContextBasedLayout
      label="Adjust code font size"
      settingType={settingType}
      handleChangeSettingType={handleChangeSettingType}
      value={senitizedValue}
      defaultValue={DEFAULT_CODE_FONT_SIZE}
      min={MIN_CODE_FONT_SIZE}
      max={MAX_CODE_FONT_SIZE}
      onChange={handleChange}
      suffixLable="px"
    />
  );
};

export default SettingCodeFontSize;
