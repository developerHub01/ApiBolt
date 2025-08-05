export type TKeyboardShortcutKey = "+" | "-" | "=" | "0";

export type TLayoutSetting = "ltr" | "rtl";

export interface SettingsInterface {
  backgroundImages: Array<string>;
  backgroundOpacity: number;
  backgroundBlur: number;
  zoomLevel: number;
  isZoomable: boolean;
  codeFontSize: number;
  indentationSize: number;
  layoutType: "ltr" | "rtl";
  projectId?: string | null;
}

export type ProjectSettingsInterface = {
  [K in keyof SettingsInterface]?: SettingsInterface[K] | null;
};

export interface SettingsTotalInterface {
  globalSetting: SettingsInterface;
  settings: ProjectSettingsInterface;
}

export type SettingsType = "default" | "global" | "custom";
