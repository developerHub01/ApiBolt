import { AllNotNull } from "@shared/types";
import type { SettingsInterface } from "@shared/types/setting.types";

export const STEP_AMOUNT_ZOOM_LEVEL = 0.1;
export const DEFAULT_ZOOM_LEVEL = 1;
export const MAX_ZOOM_LEVEL = 1.5;
export const MIN_ZOOM_LEVEL = 0.5;

export const DEFAULT_ACTIVITY_BAR_VISIBLE = 1;

export const DEFAULT_BACKGROUND_BLUR = 0;
export const MIN_BACKGROUND_BLUR = 0;
export const MAX_BACKGROUND_BLUR = 30;

export const DEFAULT_BACKGROUND_OPACITY = 0.9;
export const MIN_BACKGROUND_OPACITY = 0.3;
export const MAX_BACKGROUND_OPACITY = 1;

export const DEFAULT_BACKGROUND_MAX_NUMBER_OF_IMAGES = 6;
export const MIN_BACKGROUND_MAX_NUMBER_OF_IMAGES = 1;
export const MAX_BACKGROUND_MAX_NUMBER_OF_IMAGES = 30;

export const DEFAULT_BACKGROUNDSLIDE_INTERVAL = 5;
export const MIN_BACKGROUNDSLIDE_INTERVAL = 3;
export const MAX_BACKGROUNDSLIDE_INTERVAL = 15;

export const DEFAULT_CODE_FONT_SIZE = 16;
export const MIN_CODE_FONT_SIZE = 8;
export const MAX_CODE_FONT_SIZE = 50;

export const DEFAULT_INDENTATION_SIZE = 4;
export const MIN_INDENTATION_SIZE = 1;
export const MAX_INDENTATION_SIZE = 16;

/* this is the real values not masked or cover like use -1 or "default" as but in UI show masked preapred value  */
export const DEFAULT_RAW_SETTINGS_VALUES: SettingsInterface = {
  backgroundImages: "default",
  backgroundOpacity: -1,
  backgroundBlur: -1,
  slideInterval: -1,
  maxNumberOfImages: -1,
  codeFontSize: -1,
  indentationSize: -1,
  zoomLevel: -1,
  isZoomable: -1, // 0: disable, 1: enable, -1: default
  activityBarVisible: -1,
  layoutType: "default",
  projectId: null,
};

export const DEFAULT_SETTINGS: AllNotNull<
  Omit<SettingsInterface, "projectId">
> &
  Pick<SettingsInterface, "projectId"> = {
  backgroundImages: "default",
  backgroundOpacity: DEFAULT_BACKGROUND_OPACITY,
  backgroundBlur: DEFAULT_BACKGROUND_BLUR,
  slideInterval: DEFAULT_BACKGROUNDSLIDE_INTERVAL,
  maxNumberOfImages: DEFAULT_BACKGROUND_MAX_NUMBER_OF_IMAGES,
  codeFontSize: DEFAULT_CODE_FONT_SIZE,
  indentationSize: DEFAULT_INDENTATION_SIZE,
  zoomLevel: DEFAULT_ZOOM_LEVEL,
  isZoomable: 0, // 0: disable, 1: enable, -1: default
  activityBarVisible: DEFAULT_ACTIVITY_BAR_VISIBLE,
  layoutType: "ltr",
  projectId: null,
};
