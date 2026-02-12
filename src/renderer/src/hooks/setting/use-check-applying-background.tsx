import { DEFAULT_SETTINGS } from "@/constant/settings.constant";
import { useAppSelector } from "@/context/redux/hooks";
import { selectActiveProjectId } from "@/context/redux/project/selectors/project";
import { selectSettingBackground } from "@/context/redux/setting/selectors/setting";

const useCheckApplyingBackground = (): {
  backgroundImages: Array<string> | string;
  backgroundThumbnails: Array<string> | null;
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
      : global.backgroundImages) ?? DEFAULT_SETTINGS.backgroundImages;

  let backgroundOpacity =
    (activeProjectId
      ? (local.backgroundOpacity ?? global.backgroundOpacity)
      : global.backgroundOpacity) ?? DEFAULT_SETTINGS.backgroundOpacity;
  if (backgroundOpacity < 0)
    backgroundOpacity = DEFAULT_SETTINGS.backgroundOpacity;

  let backgroundBlur =
    (activeProjectId
      ? (local.backgroundBlur ?? global.backgroundBlur)
      : global.backgroundBlur) ?? DEFAULT_SETTINGS.backgroundBlur;
  if (backgroundBlur < 0) backgroundBlur = DEFAULT_SETTINGS.backgroundBlur;

  let maxNumberOfImages =
    (activeProjectId
      ? (local.maxNumberOfImages ?? global.maxNumberOfImages)
      : global.maxNumberOfImages) ?? DEFAULT_SETTINGS.maxNumberOfImages!;
  if (maxNumberOfImages < 0)
    maxNumberOfImages = DEFAULT_SETTINGS.maxNumberOfImages!;

  let slideInterval =
    (activeProjectId
      ? (local.slideInterval ?? global.slideInterval)
      : global.slideInterval) ?? DEFAULT_SETTINGS.slideInterval!;
  if (slideInterval < 0) slideInterval = DEFAULT_SETTINGS.slideInterval!;

  if (typeof backgroundImages !== "object" || !backgroundImages.images?.length)
    return null;

  return {
    backgroundImages: backgroundImages?.images.slice(1, maxNumberOfImages),
    backgroundThumbnails:
      backgroundImages?.thumbnails?.slice(1, maxNumberOfImages) ?? null,
    backgroundOpacity,
    backgroundBlur,
    maxNumberOfImages,
    slideInterval,
  };
};

export default useCheckApplyingBackground;
