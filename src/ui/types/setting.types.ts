export type TKeyboardShortcutKey = "+" | "-" | "=" | "0";

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

export interface SettingsTotalInterface {
  globalSetting: SettingsInterface;
  settings: SettingsInterface | null;
}
