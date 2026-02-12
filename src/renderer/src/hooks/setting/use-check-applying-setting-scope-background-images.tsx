import { useAppSelector } from "@/context/redux/hooks";
import {
  selectBackgroundImagesGlobal,
  selectBackgroundImagesLocal,
} from "@/context/redux/setting/selectors/setting";
import { useSetting } from "@/context/setting/SettingProvider";
import { SettingsInterface } from "@shared/types/setting.types";

const useCheckApplyingSettingScopeBackgroundImages = () => {
  const { activeTab } = useSetting();
  const backgroundImagesGlobal = useAppSelector(selectBackgroundImagesGlobal);
  const backgroundImagesLocal = useAppSelector(selectBackgroundImagesLocal);

  const backgroundImages = (
    activeTab === "project"
      ? (backgroundImagesLocal ?? backgroundImagesGlobal)
      : backgroundImagesGlobal
  ) as SettingsInterface["backgroundImages"];

  if (
    backgroundImages &&
    typeof backgroundImages === "object" &&
    "thumbnails" in backgroundImages
  )
    return backgroundImages["thumbnails"];

  if (backgroundImages === "default" || !backgroundImages) return [];

  return backgroundImages;
};

export default useCheckApplyingSettingScopeBackgroundImages;
