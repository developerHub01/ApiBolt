import type { SettingsInterface } from "@/types/setting.types";

export const stepAmountZoomLevel = 0.1;
export const defaultZoomLevel = 1;
export const maxZoomLevel = 1.5;
export const minZoomLevel = 0.5;
export const defaultBackgroundBlur = 0;
export const minBackgroundBlur = 0;
export const maxBackgroundBlur = 30;
export const defaultBackgroundOpacity = 1;
export const minBackgroundOpacity = 0.3;
export const maxBackgroundOpacity = 1;

export const maxBackgroundImagesCount = 6;

export const defaultSettings: SettingsInterface = {
  backgroundImages: [],
  backgroundOpacity: defaultBackgroundOpacity,
  backgroundBlur: defaultBackgroundBlur,
  codeFontSize: 16,
  indentationSize: 4,
  zoomLevel: defaultZoomLevel,
  isZoomable: 0, // 0: disable, 1: enable, -1: default
  layoutType: "ltr",
  projectId: null,
};
