import { ipcMain } from "electron";
import {
  createApiUrl,
  duplicateApiUrl,
  getApiUrlDB,
  updateApiUrl,
} from "@/main/db/apiUrlDB.js";
import { ElectronAPIApiUrlInterface } from "@shared/types/api/electron-api-url";

export const apiUrlHandler = (): void => {
  ipcMain.handle(
    "getApiUrlDB",
    async (
      _,
      ...rest: Parameters<ElectronAPIApiUrlInterface["getApiUrlDB"]>
    ): ReturnType<ElectronAPIApiUrlInterface["getApiUrlDB"]> =>
      await getApiUrlDB(...rest),
  );
  ipcMain.handle(
    "createApiUrl",
    async (
      _,
      ...rest: Parameters<ElectronAPIApiUrlInterface["createApiUrl"]>
    ): ReturnType<ElectronAPIApiUrlInterface["createApiUrl"]> =>
      await createApiUrl(...rest),
  );
  ipcMain.handle(
    "duplicateApiUrl",
    async (
      _,
      ...rest: Parameters<ElectronAPIApiUrlInterface["duplicateApiUrl"]>
    ): ReturnType<ElectronAPIApiUrlInterface["duplicateApiUrl"]> =>
      await duplicateApiUrl(...rest),
  );
  ipcMain.handle(
    "updateApiUrl",
    async (
      _,
      ...rest: Parameters<ElectronAPIApiUrlInterface["updateApiUrl"]>
    ): ReturnType<ElectronAPIApiUrlInterface["updateApiUrl"]> =>
      await updateApiUrl(...rest),
  );
};
