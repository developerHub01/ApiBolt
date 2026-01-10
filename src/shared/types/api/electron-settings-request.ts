import {
  SettingsRequestTotalInterface,
  UpdateSettingsRequestInterface,
} from "@shared/types/setting-request.types";

export interface ElectronAPISettingsRequestInterface {
  getSettingsRequest(): Promise<SettingsRequestTotalInterface>;
  updateSettingsRequest(
    payload: UpdateSettingsRequestInterface,
  ): Promise<boolean>;
}
