import { ElectronAPIBodyBinaryInterface } from "@shared/types/api/electron-body-binary";
import fs from "node:fs";
import path from "node:path";
import { dialog, ipcMain } from "electron";
import {
  createBodyBinary,
  deleteBodyBinary,
  duplicateBodyBinary,
  getBodyBinary,
  replaceBodyBinary,
  updateBodyBinary,
} from "@/main/db/bodyBinaryDB.js";
import { mainWindow } from "@/main/index";

export const bodyBinaryHandler = (): void => {
  ipcMain.handle(
    "getBodyBinary",
    async (
      _,
      ...rest: Parameters<ElectronAPIBodyBinaryInterface["getBodyBinary"]>
    ): ReturnType<ElectronAPIBodyBinaryInterface["getBodyBinary"]> => {
      try {
        const result = await getBodyBinary(...rest);
        if (!result || !result.path || !fs.existsSync(result.path)) return null;

        return {
          ...result,
          path: result.path,
          file: path.basename(result.path),
        };
      } catch (error) {
        console.error(error);
        return null;
      }
    },
  );
  ipcMain.handle(
    "createBodyBinary",
    async (
      _,
      ...rest: Parameters<ElectronAPIBodyBinaryInterface["createBodyBinary"]>
    ): ReturnType<ElectronAPIBodyBinaryInterface["createBodyBinary"]> =>
      await createBodyBinary(...rest),
  );
  ipcMain.handle(
    "updateBodyBinary",
    async (
      _,
      ...rest: Parameters<ElectronAPIBodyBinaryInterface["updateBodyBinary"]>
    ): ReturnType<ElectronAPIBodyBinaryInterface["updateBodyBinary"]> => {
      try {
        if (!mainWindow) throw new Error();
        const requestOrFolderMetaId = rest?.[0] ?? undefined;

        const result = await dialog.showOpenDialog(mainWindow, {
          properties: ["openFile"],
          title: "Select file",
          buttonLabel: "Select",
        });

        const path = result?.filePaths?.[0];

        return await updateBodyBinary({
          requestOrFolderMetaId,
          path,
        });
      } catch (error) {
        console.error(error);
        return false;
      }
    },
  );
  ipcMain.handle(
    "deleteBodyBinary",
    async (
      _,
      ...rest: Parameters<ElectronAPIBodyBinaryInterface["deleteBodyBinary"]>
    ): ReturnType<ElectronAPIBodyBinaryInterface["deleteBodyBinary"]> =>
      await deleteBodyBinary(...rest),
  );
  ipcMain.handle(
    "duplicateBodyBinary",
    async (
      _,
      ...rest: Parameters<ElectronAPIBodyBinaryInterface["duplicateBodyBinary"]>
    ): ReturnType<ElectronAPIBodyBinaryInterface["duplicateBodyBinary"]> =>
      await duplicateBodyBinary(...rest),
  );
  ipcMain.handle(
    "replaceBodyBinary",
    async (
      _,
      ...rest: Parameters<ElectronAPIBodyBinaryInterface["replaceBodyBinary"]>
    ): ReturnType<ElectronAPIBodyBinaryInterface["replaceBodyBinary"]> =>
      await replaceBodyBinary(...rest),
  );
};
