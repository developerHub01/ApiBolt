import { useAppSelector } from "@/context/redux/hooks";
import {
  selectBackgroundImagesGlobal,
  selectBackgroundImagesLocal,
} from "@/context/redux/setting/selectors/setting";
import { useSetting } from "@/context/setting/SettingProvider";

const useCheckApplyingSettingScopeBackgroundImages = () => {
  const { activeTab } = useSetting();
  const backgroundImagesGlobal = useAppSelector(selectBackgroundImagesGlobal);
  const backgroundImagesLocal = useAppSelector(selectBackgroundImagesLocal);

  let backgroundImages = (
    activeTab === "project"
      ? (backgroundImagesLocal ?? backgroundImagesGlobal)
      : backgroundImagesGlobal
  ) as Array<string> | string;

  if (backgroundImages === "default" || !backgroundImages)
    backgroundImages = [];

  return backgroundImages;
};

export default useCheckApplyingSettingScopeBackgroundImages;
