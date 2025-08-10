export type TKeyboardShortcutKey = "+" | "-" | "=" | "0";

export type TLayoutSetting = "ltr" | "rtl";
export type TLayoutSettingNoSenitize = "ltr" | "rtl" | "default";

export interface SettingsInterface {
  backgroundImages: Array<string>;
  backgroundOpacity: number;
  backgroundBlur: number;
  slideInterval?: number | null; // in milliseconds
  maxNumberOfImages?: number | null;
  zoomLevel: number;
  isZoomable: number;
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

export type UpdateBackgroundImagePayloadMethodType =
  | "upload"
  | "remove"
  | "default";

export interface UpdateBackgroundImagePayloadInterface {
  projectId?: string | null;
  method: UpdateBackgroundImagePayloadMethodType;
}
