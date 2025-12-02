import {
  ProjectSettingsInterface,
  SettingsInterface,
  SettingsTotalInterface,
  UpdateBackgroundImagePayloadInterface
} from "@/shared/types/setting.types";

export interface ElectronAPISettingsInterface {
  getSettings(): Promise<SettingsTotalInterface>;
  updateSettings(
    payload: Partial<SettingsInterface | ProjectSettingsInterface>
  ): Promise<boolean>;
  updateSettingsBackgroundImages(
    payload: UpdateBackgroundImagePayloadInterface
  ): Promise<boolean>;
}
