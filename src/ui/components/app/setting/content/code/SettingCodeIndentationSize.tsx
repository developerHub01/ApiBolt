import { useAppSelector } from "@/context/redux/hooks";
import { useSetting } from "@/context/setting/SettingProvider";
import {
  defaultIndentationSize,
  defaultSettings,
  maxIndentationSize,
  minIndentationSize,
} from "@/constant/settings.constant";
import useGlobalLocalSettingv1 from "@/hooks/setting/use-global-local-settingv1";
import { senitizeValue } from "@/utils/settings.utils";
import SettingContextBasedLayout from "@/components/app/setting/content/SettingContextBasedLayout";
import { selectActiveProjectId } from "@/context/redux/request-response/request-response-selector";
import {
  selectIndentationSizeGlobal,
  selectIndentationSizeLocal,
} from "@/context/redux/setting/setting-selector";

const SettingCodeIndentationSize = () => {
  const { activeTab } = useSetting();
  const activeProjectId = useAppSelector(selectActiveProjectId);
  const indentationSizeGlobal = useAppSelector(selectIndentationSizeGlobal);
  const indentationSizeLocal = useAppSelector(selectIndentationSizeLocal);

  const { value, handleChange, handleChangeSettingType, settingType } =
    useGlobalLocalSettingv1({
      globalSetting: indentationSizeGlobal,
      localSetting: indentationSizeLocal,
      defaultSettings: defaultSettings.indentationSize,
      activeTab,
      activeProjectId,
      key: "indentationSize",
    });

  const senitizedValue = Number(
    senitizeValue(value, defaultSettings.indentationSize)
  );

  return (
    <SettingContextBasedLayout
      label="Adjust code indentation size"
      settingType={settingType}
      handleChangeSettingType={handleChangeSettingType}
      value={senitizedValue}
      defaultValue={defaultIndentationSize}
      min={minIndentationSize}
      max={maxIndentationSize}
      onChange={handleChange}
      isLast
    />
  );
};

export default SettingCodeIndentationSize;
