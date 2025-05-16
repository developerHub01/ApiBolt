import { ipcMain } from "electron";
import { getAllOpenFolder, toggleFolder } from "../db/openFoldersDB.js";

export const openFoldersDBHandlers = () => {
  ipcMain.handle("toggleFolder", toggleFolder);
  ipcMain.handle("getAllOpenFolder", getAllOpenFolder);
};
