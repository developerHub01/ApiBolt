import { ipcMain } from "electron";
import {
  getHttpStatus,
  getHttpStatusByCode,
  updateHttpStatus,
} from "@/main/db/httpStatusDB.js";
import { ElectronAPIHttpStatusInterface } from "@shared/types/api/electron-http-status";

export const httpStatusHandler = (): void => {
  ipcMain.handle(
    "getHttpStatus",
    async (
      _,
      ...rest: Parameters<ElectronAPIHttpStatusInterface["getHttpStatus"]>
    ): ReturnType<ElectronAPIHttpStatusInterface["getHttpStatus"]> =>
      await getHttpStatus(...rest),
  );
  ipcMain.handle(
    "getHttpStatusByCode",
    async (
      _,
      ...rest: Parameters<ElectronAPIHttpStatusInterface["getHttpStatusByCode"]>
    ): ReturnType<ElectronAPIHttpStatusInterface["getHttpStatusByCode"]> =>
      await getHttpStatusByCode(...rest),
  );
  ipcMain.handle(
    "updateHttpStatus",
    async (
      _,
      ...rest: Parameters<ElectronAPIHttpStatusInterface["updateHttpStatus"]>
    ): ReturnType<ElectronAPIHttpStatusInterface["updateHttpStatus"]> =>
      await updateHttpStatus(...rest),
  );
};
