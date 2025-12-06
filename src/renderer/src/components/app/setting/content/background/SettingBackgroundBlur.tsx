import {
  DEFAULT_SETTINGS,
  MAX_BACKGROUND_BLUR,
  MIN_BACKGROUND_BLUR,
} from "@/constant/settings.constant";
import { useAppSelector } from "@/context/redux/hooks";
import { useSetting } from "@/context/setting/SettingProvider";
import useGlobalLocalSettingv1 from "@/hooks/setting/use-global-local-settingv1";
import { senitizeValue } from "@/utils/settings.utils";
import SettingContextBasedLayout from "@/components/app/setting/content/SettingContextBasedLayout";
import {
  selectBlurGlobal,
  selectBlurLocal,
} from "@/context/redux/setting/selectors/setting";
import { selectActiveProjectId } from "@/context/redux/project/selectors/project";

const SettingBackgroundBlur = () => {
  const { activeTab } = useSetting();
  const activeProjectId = useAppSelector(selectActiveProjectId);
  const blurGlobal = useAppSelector(selectBlurGlobal);
  const blurLocal = useAppSelector(selectBlurLocal);

  const { value, handleChange, handleChangeSettingType, settingType } =
    useGlobalLocalSettingv1({
      globalSetting: blurGlobal,
      localSetting: blurLocal,
      DEFAULT_SETTINGS: DEFAULT_SETTINGS.backgroundBlur,
      activeTab,
      activeProjectId,
      key: "backgroundBlur",
    });

  const senitizedValue = Number(
    senitizeValue(value, DEFAULT_SETTINGS.backgroundBlur) ?? 0,
  );

  return (
    <SettingContextBasedLayout
      label="Adjust background blur"
      settingType={settingType}
      handleChangeSettingType={handleChangeSettingType}
      defaultValue={DEFAULT_SETTINGS.backgroundBlur}
      value={senitizedValue}
      onChange={handleChange}
      min={MIN_BACKGROUND_BLUR}
      max={MAX_BACKGROUND_BLUR}
      suffixLable="px"
    />
  );
};

export default SettingBackgroundBlur;
