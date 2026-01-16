import { SettingsInterface } from "@shared/types/setting.types";

type SettingRawInterface = Omit<SettingsInterface, "backgroundImages"> & {
  backgroundImages: "default" | string | null;
};

export const defaultSettings: SettingRawInterface = {
  /* default == "default" | global == null */
  backgroundImages: "default",
  maxNumberOfImages: -1,
  backgroundOpacity: -1,
  slideInterval: -1,
  backgroundBlur: -1,
  codeFontSize: -1,
  indentationSize: -1,
  zoomLevel: -1,
  isZoomable: -1,
  activityBarVisible: -1,
  layoutType: "default",
  tabListLayoutType: "default",
  projectId: null,
};
