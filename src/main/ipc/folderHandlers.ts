import { ipcMain } from "electron";
import {
  duplicateFolder,
  getFolder,
  updateFolder,
} from "@/main/db/folderDB.js";
import { ElectronAPIFolderInterface } from "@shared/types/api/electron-folder";

export const folderHandlers = () => {
  ipcMain.handle(
    "getFolder",
    async (
      _,
      ...rest: Parameters<ElectronAPIFolderInterface["getFolder"]>
    ): ReturnType<ElectronAPIFolderInterface["getFolder"]> =>
      await getFolder(...rest),
  );
  ipcMain.handle(
    "updateFolder",
    async (
      _,
      ...rest: Parameters<ElectronAPIFolderInterface["updateFolder"]>
    ): ReturnType<ElectronAPIFolderInterface["updateFolder"]> =>
      await updateFolder(...rest),
  );
  ipcMain.handle(
    "duplicateFolder",
    async (
      _,
      ...rest: Parameters<ElectronAPIFolderInterface["duplicateFolder"]>
    ): ReturnType<ElectronAPIFolderInterface["duplicateFolder"]> =>
      await duplicateFolder(...rest),
  );
};
