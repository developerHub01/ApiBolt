import { AppInfoInterface } from "@shared/types/app-info.types";

export interface ElectronAPIAppInfoInterface {
  getAppInfo(): Promise<AppInfoInterface>;
}
