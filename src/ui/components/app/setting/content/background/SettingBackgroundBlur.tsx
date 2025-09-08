import {
  defaultSettings,
  maxBackgroundBlur,
  minBackgroundBlur,
} from "@/constant/settings.constant";
import { useAppSelector } from "@/context/redux/hooks";
import { useSetting } from "@/context/setting/SettingProvider";
import useGlobalLocalSettingv1 from "@/hooks/setting/use-global-local-settingv1";
import { senitizeValue } from "@/utils/settings.utils";
import SettingContextBasedLayout from "@/components/app/setting/content/SettingContextBasedLayout";
import { selectActiveProjectId } from "@/context/redux/request-response/request-response-selector";
import {
  selectBlurGlobal,
  selectBlurLocal,
} from "@/context/redux/setting/setting-selector";

const SettingBackgroundBlur = () => {
  const { activeTab } = useSetting();
  const activeProjectId = useAppSelector(selectActiveProjectId);
  const blurGlobal = useAppSelector(selectBlurGlobal);
  const blurLocal = useAppSelector(selectBlurLocal);

  const { value, handleChange, handleChangeSettingType, settingType } =
    useGlobalLocalSettingv1({
      globalSetting: blurGlobal,
      localSetting: blurLocal,
      defaultSettings: defaultSettings.backgroundBlur,
      activeTab,
      activeProjectId,
      key: "backgroundBlur",
    });

  const senitizedValue = Number(
    senitizeValue(value, defaultSettings.backgroundBlur) ?? 0
  );

  return (
    <SettingContextBasedLayout
      label="Adjust background blur"
      settingType={settingType}
      handleChangeSettingType={handleChangeSettingType}
      defaultValue={defaultSettings.backgroundBlur}
      value={senitizedValue}
      onChange={handleChange}
      min={minBackgroundBlur}
      max={maxBackgroundBlur}
      suffixLable="px"
    />
  );
};

export default SettingBackgroundBlur;
