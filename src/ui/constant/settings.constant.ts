import type { SettingsInterface } from "@/types/setting.types";

export const stepAmountZoomLevel = 0.1;
export const defaultZoomLevel = 1;
export const maxZoomLevel = 1.5;
export const minZoomLevel = 0.5;

export const defaultBackgroundBlur = 0;
export const minBackgroundBlur = 0;
export const maxBackgroundBlur = 30;

export const defaultBackgroundOpacity = 0.9;
export const minBackgroundOpacity = 0.3;
export const maxBackgroundOpacity = 1;

export const defaultBackgroundMaxNumberOfImages = 6;
export const minBackgroundMaxNumberOfImages = 1;
export const maxBackgroundMaxNumberOfImages = 30;

export const defaultBackgroundslideInterval = 5;
export const minBackgroundslideInterval = 3;
export const maxBackgroundslideInterval = 15;

export const defaultCodeFontSize = 16;
export const minCodeFontSize = 8;
export const maxCodeFontSize = 50;

export const defaultIndentationSize = 4;
export const minIndentationSize = 1;
export const maxIndentationSize = 16;

export const defaultSettings: SettingsInterface = {
  backgroundImages: [],
  backgroundOpacity: defaultBackgroundOpacity,
  backgroundBlur: defaultBackgroundBlur,
  slideInterval: defaultBackgroundslideInterval,
  maxNumberOfImages: defaultBackgroundMaxNumberOfImages,
  codeFontSize: defaultCodeFontSize,
  indentationSize: defaultIndentationSize,
  zoomLevel: defaultZoomLevel,
  isZoomable: 0, // 0: disable, 1: enable, -1: default
  layoutType: "ltr",
  projectId: null,
};
