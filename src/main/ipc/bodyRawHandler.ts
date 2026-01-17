import { ipcMain } from "electron";
import {
  createBodyRaw,
  duplicateBodyRaw,
  getBodyRaw,
  replaceBodyRaw,
  updateBodyRaw,
} from "@/main/db/bodyRawDB.js";
import { ElectronAPIBodyRawInterface } from "@shared/types/api/electron-body-raw";

export const bodyRawHandler = (): void => {
  ipcMain.handle(
    "getBodyRaw",
    async (
      _,
      ...rest: Parameters<ElectronAPIBodyRawInterface["getBodyRaw"]>
    ): ReturnType<ElectronAPIBodyRawInterface["getBodyRaw"]> =>
      await getBodyRaw(...rest),
  );
  ipcMain.handle(
    "createBodyRaw",
    async (
      _,
      ...rest: Parameters<ElectronAPIBodyRawInterface["createBodyRaw"]>
    ): ReturnType<ElectronAPIBodyRawInterface["createBodyRaw"]> =>
      await createBodyRaw(...rest),
  );
  ipcMain.handle(
    "updateBodyRaw",
    async (
      _,
      ...rest: Parameters<ElectronAPIBodyRawInterface["updateBodyRaw"]>
    ): ReturnType<ElectronAPIBodyRawInterface["updateBodyRaw"]> =>
      await updateBodyRaw(...rest),
  );
  ipcMain.handle(
    "duplicateBodyRaw",
    async (
      _,
      ...rest: Parameters<ElectronAPIBodyRawInterface["duplicateBodyRaw"]>
    ): ReturnType<ElectronAPIBodyRawInterface["duplicateBodyRaw"]> =>
      await duplicateBodyRaw(...rest),
  );
  ipcMain.handle(
    "replaceBodyRaw",
    async (
      _,
      ...rest: Parameters<ElectronAPIBodyRawInterface["replaceBodyRaw"]>
    ): ReturnType<ElectronAPIBodyRawInterface["replaceBodyRaw"]> =>
      await replaceBodyRaw(...rest),
  );
};
