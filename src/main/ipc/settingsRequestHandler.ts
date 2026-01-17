import { ipcMain } from "electron";
import { ElectronAPISettingsRequestInterface } from "@shared/types/api/electron-settings-request";
import {
  getSettingsRequest,
  updateSettingsRequest,
} from "@/main/db/settingsRequestDB";

export const settingsRequestHandler = (): void => {
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
    > => {
      const response = await updateSettingsRequest(...rest);
      return Boolean(response);
    },
  );
};
