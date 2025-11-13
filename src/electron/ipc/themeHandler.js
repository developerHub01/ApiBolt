import { ipcMain } from "electron";
import {
  createTheme,
  deleteThemeById,
  getThemeById,
  updateTheme,
} from "../db/themeDB.js";

export const themeHandler = () => {
  ipcMain.handle(
    "getThemeById",
    async (_, ...rest) => await getThemeById(...rest)
  );
  ipcMain.handle(
    "createTheme",
    async (_, ...rest) => await createTheme(...rest)
  );
  ipcMain.handle(
    "updateTheme",
    async (_, ...rest) => await updateTheme(...rest)
  );
  ipcMain.handle(
    "deleteThemeById",
    async (_, ...rest) => await deleteThemeById(...rest)
  );
};
