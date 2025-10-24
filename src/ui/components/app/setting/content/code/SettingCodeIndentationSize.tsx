import { useAppSelector } from "@/context/redux/hooks";
import { useSetting } from "@/context/setting/SettingProvider";
import {
  DEFAULT_INDENTATION_SIZE,
  DEFAULT_SETTINGS,
  MAX_INDENTATION_SIZE,
  MIN_INDENTATION_SIZE,
} from "@/constant/settings.constant";
import useGlobalLocalSettingv1 from "@/hooks/setting/use-global-local-settingv1";
import { senitizeValue } from "@/utils/settings.utils";
import SettingContextBasedLayout from "@/components/app/setting/content/SettingContextBasedLayout";
import {
  selectIndentationSizeGlobal,
  selectIndentationSizeLocal,
} from "@/context/redux/setting/selectors/setting-selector";
import { selectActiveProjectId } from "@/context/redux/project/selectors/project";

const SettingCodeIndentationSize = () => {
  const { activeTab } = useSetting();
  const activeProjectId = useAppSelector(selectActiveProjectId);
  const indentationSizeGlobal = useAppSelector(selectIndentationSizeGlobal);
  const indentationSizeLocal = useAppSelector(selectIndentationSizeLocal);

  const { value, handleChange, handleChangeSettingType, settingType } =
    useGlobalLocalSettingv1({
      globalSetting: indentationSizeGlobal,
      localSetting: indentationSizeLocal,
      DEFAULT_SETTINGS: DEFAULT_SETTINGS.indentationSize,
      activeTab,
      activeProjectId,
      key: "indentationSize",
    });

  const senitizedValue = Number(
    senitizeValue(value, DEFAULT_SETTINGS.indentationSize)
  );

  return (
    <SettingContextBasedLayout
      label="Adjust code indentation size"
      settingType={settingType}
      handleChangeSettingType={handleChangeSettingType}
      value={senitizedValue}
      defaultValue={DEFAULT_INDENTATION_SIZE}
      min={MIN_INDENTATION_SIZE}
      max={MAX_INDENTATION_SIZE}
      onChange={handleChange}
      isLast
    />
  );
};

export default SettingCodeIndentationSize;
