import { ipcMain } from "electron";
import { ElectronAPISettingsRequestInterface } from "@shared/types/api/electron-settings-request";
import {
  getSettingsRequest,
  updateSettingsRequest,
} from "@/main/db/settingsRequestDB";

export const settingsRequestHandler = () => {
  ipcMain.handle(
    "getSettingsRequest",
    async (
      _,
    ): ReturnType<ElectronAPISettingsRequestInterface["getSettingsRequest"]> =>
      await getSettingsRequest(),
  );
  ipcMain.handle(
    "updateSettingsRequest",
    async (
      _,
      ...rest: Parameters<
        ElectronAPISettingsRequestInterface["updateSettingsRequest"]
      >
    ): ReturnType<
      ElectronAPISettingsRequestInterface["updateSettingsRequest"]
    > => await updateSettingsRequest(...rest),
  );
};
