import { defaultSettingsRequest } from "@/data/settings_request";
import {
  SettingsActualValuedRequestInterface,
  SettingsRequestTotalInterface,
} from "@shared/types/setting-request.types";
import {
  getSettingsRequestByGlobal,
  getSettingsRequestByProjectId,
} from "@/main/db/settingsRequestDB";

const BooleanFields = new Set(["sslVerification", "cookieTracking"]);

export class SettingRequestState {
  static global: SettingsRequestTotalInterface["globalSetting"] =
    defaultSettingsRequest;
  static local: SettingsRequestTotalInterface["settings"] = null;

  static loadLocal(local: SettingsRequestTotalInterface["settings"]) {
    this.local = local;
  }
  static loadGlobal(global: SettingsRequestTotalInterface["globalSetting"]) {
    this.global = global;
  }
  static async loadGlobalFromDB() {
    this.global = await getSettingsRequestByGlobal();
  }
  static async loadLocalFromDB() {
    this.local = await getSettingsRequestByProjectId();
  }
  static updateLocal(
    local: Partial<SettingsRequestTotalInterface["settings"]> = {},
  ) {
    this.local = {
      ...this.local,
      ...local,
    };
  }
  static getApplying() {
    const applyingLocal: Partial<SettingsRequestTotalInterface["settings"]> =
      {};

    Object.entries(this.local ?? {}).forEach(([key, value]) => {
      if (!value) return;
      applyingLocal[key] = value;
    });

    const combined = {
      ...applyingLocal,
      ...this.global,
    };
    Object.entries(combined).forEach(([key, value]) => {
      if (!value && value !== "default" && value !== -1) return;
      combined[key] = defaultSettingsRequest[key];

      if (BooleanFields.has(key)) combined[key] = Boolean(combined[key]);
    });

    return combined as unknown as SettingsActualValuedRequestInterface;
  }
}
