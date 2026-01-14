export type TKeyboardShortcutKey = "+" | "-" | "0";

export type THttpVersionSetting = "http/1.0" | "http/1.1" | "http/2.0";
export type THttpVersionSettingNoSenitize = THttpVersionSetting | "default";

export interface SettingsRequestInterface {
  httpVersion: THttpVersionSettingNoSenitize | null;
  requestTimeout: number | null;
  maxResponseSize: number | null;
  sslVerification: number | null;
  cookieTracking: number | null;
  projectId?: string | null;
}

export type SettingsRequestAllValueExistInterface = {
  [K in keyof SettingsRequestInterface]: NonNullable<
    SettingsRequestInterface[K]
  >;
};

export interface SettingsActualValuedRequestInterface {
  httpVersion: THttpVersionSettingNoSenitize;
  requestTimeout: number;
  maxResponseSize: number;
  sslVerification: boolean;
  cookieTracking: boolean;
  projectId?: string;
}

export type ProjectSettingsRequestInterface = {
  [K in keyof SettingsRequestInterface]?: SettingsRequestInterface[K] | null;
};

export interface SettingsRequestTotalInterface {
  globalSetting: SettingsRequestInterface;
  settings: ProjectSettingsRequestInterface | null;
}

export type UpdateSettingsRequestInterface = Partial<SettingsRequestInterface>;

export interface UpdateSettingsRequestTotalInterface {
  globalSetting: UpdateSettingsRequestInterface;
  settings: {
    [K in keyof UpdateSettingsRequestInterface]?:
      | UpdateSettingsRequestInterface[K]
      | null;
  };
}
