import { useAppSelector } from "@/context/redux/hooks";
import { useSetting } from "@/context/setting/SettingProvider";

const useCheckApplyingSettingScopeBackgroundImages = () => {
  const { activeTab } = useSetting();
  const backgroundImagesGlobal = useAppSelector(
    (state) => state.setting.globalSetting.backgroundImages
  );
  const backgroundImagesLocal = useAppSelector(
    (state) => state.setting.settings?.backgroundImages
  );

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
