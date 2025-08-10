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

const SettingBackgroundBlur = () => {
  const { activeTab } = useSetting();
  const activeProjectId = useAppSelector(
    (state) => state.requestResponse.activeProjectId
  );
  const blurGlobal = useAppSelector(
    (state) => state.setting.globalSetting.backgroundBlur
  );
  const blurLocal = useAppSelector(
    (state) => state.setting.settings?.backgroundBlur
  );

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
