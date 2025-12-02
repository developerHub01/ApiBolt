import { ipcMain } from "electron";
import {
  changeActiveTheme,
  getActiveThemeId,
  getActiveThemePalette,
} from "../db/activeThemeDB.js";

export const activeThemeHandler = () => {
  ipcMain.handle(
    "getActiveThemeId",
    async (_, ...rest) => await getActiveThemeId(...rest)
  );
  ipcMain.handle(
    "getActiveThemePalette",
    async (_, ...rest) => await getActiveThemePalette(...rest)
  );
  ipcMain.handle(
    "changeActiveTheme",
    async (_, ...rest) => await changeActiveTheme(...rest)
  );
};
