import { useAppSelector } from "@/context/redux/hooks";
import {
  selectMaxImagesGlobal,
  selectMaxImagesLocal,
} from "@/context/redux/setting/selectors/setting";
import { useSetting } from "@/context/setting/SettingProvider";
import useGlobalLocalSettingv1 from "@/hooks/setting/use-global-local-settingv1";
import { DEFAULT_SETTINGS } from "@/constant/settings.constant";
import { senitizeValue } from "@/utils/settings.utils";
import { selectActiveProjectId } from "@/context/redux/project/selectors/project";

const useCheckBackgroundSettingMaxNumberOfImages = () => {
  const { activeTab } = useSetting();
  const activeProjectId = useAppSelector(selectActiveProjectId);
  const maxImagesGlobal = useAppSelector(selectMaxImagesGlobal);
  const maxImagesLocal = useAppSelector(selectMaxImagesLocal);

  const { value, handleChange, handleChangeSettingType, settingType } =
    useGlobalLocalSettingv1({
      globalSetting: maxImagesGlobal,
      localSetting: maxImagesLocal,
      DEFAULT_SETTINGS: DEFAULT_SETTINGS.maxNumberOfImages,
      activeTab,
      activeProjectId,
      key: "maxNumberOfImages",
    });

  const senitizedValue = Number(
    senitizeValue(value, DEFAULT_SETTINGS.maxNumberOfImages)
  );

  return {
    value,
    handleChange,
    handleChangeSettingType,
    settingType,
    senitizedValue,
    activeTab,
    activeProjectId,
    maxImagesGlobal,
    maxImagesLocal,
  };
};

export default useCheckBackgroundSettingMaxNumberOfImages;
