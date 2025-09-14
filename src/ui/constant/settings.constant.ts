import type { SettingsInterface } from "@/types/setting.types";

export const STEP_AMOUNT_ZOOM_LEVEL = 0.1;
export const DEFAULT_ZOOM_LEVEL = 1;
export const MAX_ZOOM_LEVEL = 1.5;
export const MIN_ZOOM_LEVEL = 0.5;

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

export const DEFAULT_SETTINGS: SettingsInterface = {
  backgroundImages: [],
  backgroundOpacity: DEFAULT_BACKGROUND_OPACITY,
  backgroundBlur: DEFAULT_BACKGROUND_BLUR,
  slideInterval: DEFAULT_BACKGROUNDSLIDE_INTERVAL,
  maxNumberOfImages: DEFAULT_BACKGROUND_MAX_NUMBER_OF_IMAGES,
  codeFontSize: DEFAULT_CODE_FONT_SIZE,
  indentationSize: DEFAULT_INDENTATION_SIZE,
  zoomLevel: DEFAULT_ZOOM_LEVEL,
  isZoomable: 0, // 0: disable, 1: enable, -1: default
  layoutType: "ltr",
  projectId: null,
};
