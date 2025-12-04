import { ElectronAPIBodyBinaryInterface } from "@/shared/types/api/electron-body-binary";
import fs from "fs";
import path from "path";
import { dialog, ipcMain } from "electron";
import {
  createBodyBinary,
  deleteBodyBinary,
  duplicateBodyBinary,
  getBodyBinary,
  replaceBodyBinary,
  updateBodyBinary
} from "@/main/db/bodyBinaryDB.js";

export const bodyBinaryHandler = () => {
  ipcMain.handle(
    "getBodyBinary",
    async (
      _,
      ...rest: Parameters<ElectronAPIBodyBinaryInterface["getBodyBinary"]>
    ): ReturnType<ElectronAPIBodyBinaryInterface["getBodyBinary"]> => {
      try {
        const result = await getBodyBinary(...rest);
        if (!result) throw new Error();
        const filePath = result?.path;

        let file: string | null = null;
        if (filePath && fs.existsSync(filePath)) file = path.basename(filePath);

        return {
          ...result,
          file
        };
      } catch (error) {
        console.error(error);
        return null;
      }
    }
  );
  ipcMain.handle(
    "createBodyBinary",
    async (
      _,
      ...rest: Parameters<ElectronAPIBodyBinaryInterface["createBodyBinary"]>
    ): ReturnType<ElectronAPIBodyBinaryInterface["createBodyBinary"]> =>
      await createBodyBinary(...rest)
  );
  ipcMain.handle(
    "updateBodyBinary",
    async (
      _,
      ...rest: Parameters<ElectronAPIBodyBinaryInterface["updateBodyBinary"]>
    ): ReturnType<ElectronAPIBodyBinaryInterface["updateBodyBinary"]> => {
      try {
        const requestOrFolderMetaId = rest?.[0] ?? undefined;

        const result = await dialog.showOpenDialog({
          properties: ["openFile"],
          title: "Select file",
          buttonLabel: "Select"
        });

        const path = result?.filePaths?.[0];

        return await updateBodyBinary({
          requestOrFolderMetaId,
          path
        });
      } catch (error) {
        console.error(error);
        return false;
      }
    }
  );
  ipcMain.handle(
    "deleteBodyBinary",
    async (
      _,
      ...rest: Parameters<ElectronAPIBodyBinaryInterface["deleteBodyBinary"]>
    ): ReturnType<ElectronAPIBodyBinaryInterface["deleteBodyBinary"]> =>
      await deleteBodyBinary(...rest)
  );
  ipcMain.handle(
    "duplicateBodyBinary",
    async (
      _,
      ...rest: Parameters<ElectronAPIBodyBinaryInterface["duplicateBodyBinary"]>
    ): ReturnType<ElectronAPIBodyBinaryInterface["duplicateBodyBinary"]> =>
      await duplicateBodyBinary(...rest)
  );
  ipcMain.handle(
    "replaceBodyBinary",
    async (
      _,
      ...rest: Parameters<ElectronAPIBodyBinaryInterface["replaceBodyBinary"]>
    ): ReturnType<ElectronAPIBodyBinaryInterface["replaceBodyBinary"]> =>
      await replaceBodyBinary(...rest)
  );
};
