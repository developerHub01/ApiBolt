import { ipcMain } from "electron";
import {
  createTheme,
  deleteThemeById,
  getThemeById,
  getThemeListMeta,
  updateTheme,
} from "../db/themeDB.js";
import { saveThemePaletteLocal } from "../utils/theme.js";

export const themeHandler = () => {
  ipcMain.handle(
    "getThemeListMeta",
    async (_, ...rest) => await getThemeListMeta(...rest)
  );
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
  ipcMain.handle(
    "saveThemePalette",
    async (_, ...rest) =>
      await saveThemePaletteLocal(JSON.stringify(rest[0], null, 2))
  );
};
