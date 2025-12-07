export type TKeyboardShortcutKey = "+" | "-" | "0";

export type TLayoutSetting = "ltr" | "rtl";
export type TLayoutSettingNoSenitize = "ltr" | "rtl" | "default";

export interface SettingsInterface {
  backgroundImages: Array<string> | "default" | null;
  backgroundOpacity: number | null;
  backgroundBlur: number | null;
  slideInterval?: number | null; // in milliseconds
  maxNumberOfImages?: number | null;
  zoomLevel: number | null;
  isZoomable: number | null;
  codeFontSize: number | null;
  indentationSize: number | null;
  activityBarVisible: number | null;
  layoutType: TLayoutSetting | "default" | null;
  projectId?: string | null;
}

export type ProjectSettingsInterface = {
  [K in keyof SettingsInterface]?: SettingsInterface[K] | null;
};

export interface SettingsTotalInterface {
  globalSetting: SettingsInterface;
  settings: ProjectSettingsInterface | null;
}

export type UpdateSettingsInterface = Partial<
  Omit<SettingsInterface, "backgroundImages"> & {
    backgroundImages:
      | Exclude<SettingsInterface["backgroundImages"], Array<string>>
      | string;
  }
>;

export interface UpdateSettingsTotalInterface {
  globalSetting: UpdateSettingsInterface;
  settings: {
    [K in keyof UpdateSettingsInterface]?: UpdateSettingsInterface[K] | null;
  };
}

export type SettingType = "default" | "global" | "custom";

export type UpdateBackgroundImagePayloadMethodType =
  | "upload"
  | "remove"
  | "default";

export interface UpdateBackgroundImagePayloadInterface {
  projectId?: string | null;
  method: UpdateBackgroundImagePayloadMethodType;
}
