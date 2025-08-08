import { defaultSettings } from "@/constant/settings.constant";
import { useAppSelector } from "@/context/redux/hooks";
import { selectActiveProjectId } from "@/context/redux/request-response/request-response-selector";
import { selectSettingBackground } from "@/context/redux/setting/setting-selector";

const useCheckApplyingBackground = (): {
  backgroundImages: Array<string>;
  backgroundOpacity: number;
  backgroundBlur: number;
} | null => {
  const activeProjectId = useAppSelector(selectActiveProjectId);
  const { global, local } = useAppSelector(selectSettingBackground);

  const backgroundImages =
    (activeProjectId
      ? (local.backgroundImages ?? global.backgroundImages)
      : global.backgroundImages) ?? defaultSettings.backgroundImages;
  const backgroundOpacity =
    (activeProjectId
      ? (local.backgroundOpacity ?? global.backgroundOpacity)
      : global.backgroundOpacity) ?? defaultSettings.backgroundOpacity;
  const backgroundBlur =
    (activeProjectId
      ? (local.backgroundBlur ?? global.backgroundBlur)
      : global.backgroundBlur) ?? defaultSettings.backgroundBlur;

  if (!backgroundImages?.length) return null;

  console.log({
    activeProjectId,
    backgroundImages,
    backgroundOpacity,
    backgroundBlur,
  });

  return {
    backgroundImages,
    backgroundOpacity,
    backgroundBlur,
  };
};

export default useCheckApplyingBackground;
