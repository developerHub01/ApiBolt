import { useSetting } from "@/context/setting/SettingProvider";
import { useAppSelector } from "@/context/redux/hooks";
import { calculateIntoFixedPoint } from "@/utils";
import useGlobalLocalSettingv1 from "@/hooks/setting/use-global-local-settingv1";
import {
  DEFAULT_SETTINGS,
  DEFAULT_ZOOM_LEVEL,
  MAX_ZOOM_LEVEL,
  MIN_ZOOM_LEVEL,
} from "@/constant/settings.constant";
import { senitizeValue } from "@/utils/settings.utils";
import SettingContextBasedLayout from "@/components/app/setting/content/SettingContextBasedLayout";
import {
  selectZoomLevelGlobal,
  selectZoomLevelLocal,
} from "@/context/redux/setting/selectors/setting";
import { selectActiveProjectId } from "@/context/redux/project/selectors/project";

const SettingZoomLevel = () => {
  const { activeTab } = useSetting();
  const activeProjectId = useAppSelector(selectActiveProjectId);
  const zoomLevelGlobal = useAppSelector(selectZoomLevelGlobal);
  const zoomLevelLocal = useAppSelector(selectZoomLevelLocal);

  const { value, handleChange, handleChangeSettingType, settingType } =
    useGlobalLocalSettingv1({
      globalSetting: zoomLevelGlobal,
      localSetting: zoomLevelLocal,
      DEFAULT_SETTINGS: DEFAULT_SETTINGS.zoomLevel,
      activeTab,
      activeProjectId,
      key: "zoomLevel",
    });

  const senitizedValue = calculateIntoFixedPoint(
    Number(senitizeValue(value, DEFAULT_SETTINGS.zoomLevel)) * 100,
  );

  return (
    <SettingContextBasedLayout
      settingType={settingType}
      label="Adjust the interface scale to your preference"
      value={senitizedValue}
      defaultValue={calculateIntoFixedPoint(DEFAULT_ZOOM_LEVEL * 100, 1)}
      min={calculateIntoFixedPoint(MIN_ZOOM_LEVEL * 100, 1)}
      max={calculateIntoFixedPoint(MAX_ZOOM_LEVEL * 100, 1)}
      onChange={value =>
        handleChange(calculateIntoFixedPoint(Number(value) / 100, 1))
      }
      suffixLable="%"
      step={5}
      handleChangeSettingType={handleChangeSettingType}
    />
  );
};

export default SettingZoomLevel;
