import { ipcMain } from "electron";
import {
  createHiddenHeadersCheck,
  duplicateHiddenHeadersCheck,
  getHiddenHeadersCheck,
  updateHiddenHeadersCheck,
} from "@/main/db/hiddenHeadersCheckDB.js";
import { ElectronAPIHiddenHeadersCheckInterface } from "@shared/types/api/electron-hidden-headers-check";

export const hiddenHeadersCheckHandler = (): void => {
  ipcMain.handle(
    "getHiddenHeadersCheck",
    async (
      _,
      ...rest: Parameters<
        ElectronAPIHiddenHeadersCheckInterface["getHiddenHeadersCheck"]
      >
    ): ReturnType<
      ElectronAPIHiddenHeadersCheckInterface["getHiddenHeadersCheck"]
    > => await getHiddenHeadersCheck(...rest),
  );
  ipcMain.handle(
    "createHiddenHeadersCheck",
    async (
      _,
      ...rest: Parameters<
        ElectronAPIHiddenHeadersCheckInterface["createHiddenHeadersCheck"]
      >
    ): ReturnType<
      ElectronAPIHiddenHeadersCheckInterface["createHiddenHeadersCheck"]
    > => await createHiddenHeadersCheck(...rest),
  );
  ipcMain.handle(
    "updateHiddenHeadersCheck",
    async (
      _,
      ...rest: Parameters<
        ElectronAPIHiddenHeadersCheckInterface["updateHiddenHeadersCheck"]
      >
    ): ReturnType<
      ElectronAPIHiddenHeadersCheckInterface["updateHiddenHeadersCheck"]
    > => await updateHiddenHeadersCheck(...rest),
  );
  ipcMain.handle(
    "duplicateHiddenHeadersCheck",
    async (
      _,
      ...rest: Parameters<
        ElectronAPIHiddenHeadersCheckInterface["duplicateHiddenHeadersCheck"]
      >
    ): ReturnType<
      ElectronAPIHiddenHeadersCheckInterface["duplicateHiddenHeadersCheck"]
    > => await duplicateHiddenHeadersCheck(...rest),
  );
};
