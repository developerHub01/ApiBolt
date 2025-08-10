import { defaultSettings } from "@/constant/settings.constant";
import { useAppSelector } from "@/context/redux/hooks";
import { selectActiveProjectId } from "@/context/redux/request-response/request-response-selector";
import { selectSettingBackground } from "@/context/redux/setting/setting-selector";

const useCheckApplyingBackground = (): {
  backgroundImages: Array<string>;
  backgroundOpacity: number;
  backgroundBlur: number;
  slideInterval: number;
  maxNumberOfImages: number;
} | null => {
  const activeProjectId = useAppSelector(selectActiveProjectId);
  const { global, local } = useAppSelector(selectSettingBackground);

  const backgroundImages =
    (activeProjectId
      ? (local.backgroundImages ?? global.backgroundImages)
      : global.backgroundImages) ?? defaultSettings.backgroundImages;

  let backgroundOpacity =
    (activeProjectId
      ? (local.backgroundOpacity ?? global.backgroundOpacity)
      : global.backgroundOpacity) ?? defaultSettings.backgroundOpacity;
  if (backgroundOpacity < 0)
    backgroundOpacity = defaultSettings.backgroundOpacity;

  let backgroundBlur =
    (activeProjectId
      ? (local.backgroundBlur ?? global.backgroundBlur)
      : global.backgroundBlur) ?? defaultSettings.backgroundBlur;
  if (backgroundBlur < 0) backgroundBlur = defaultSettings.backgroundBlur;

  let maxNumberOfImages =
    (activeProjectId
      ? (local.maxNumberOfImages ?? global.maxNumberOfImages)
      : global.maxNumberOfImages) ?? defaultSettings.maxNumberOfImages!;
  if (maxNumberOfImages < 0)
    maxNumberOfImages = defaultSettings.maxNumberOfImages!;

  let slideInterval =
    (activeProjectId
      ? (local.slideInterval ?? global.slideInterval)
      : global.slideInterval) ?? defaultSettings.slideInterval!;
  if (slideInterval < 0) slideInterval = defaultSettings.slideInterval!;

  if (!backgroundImages?.length) return null;

  return {
    backgroundImages: backgroundImages.slice(0, maxNumberOfImages),
    backgroundOpacity,
    backgroundBlur,
    maxNumberOfImages,
    slideInterval,
  };
};

export default useCheckApplyingBackground;
