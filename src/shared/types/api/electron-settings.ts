import {
  SettingsTotalInterface,
  UpdateBackgroundImagePayloadInterface,
  UpdateSettingsInterface,
} from "@shared/types/setting.types";

export interface ElectronAPISettingsInterface {
  getSettings(): Promise<SettingsTotalInterface>;
  updateSettings(payload: UpdateSettingsInterface): Promise<boolean>;
  updateSettingsBackgroundImages(
    payload: UpdateBackgroundImagePayloadInterface,
  ): Promise<boolean>;
}
