import { ipcMain } from "electron";
import {
  createTheme,
  deleteThemeById,
  getThemeById,
  getThemeListMeta,
  getThemePaletteById,
  updateTheme
} from "@/main/db/themeDB.js";
import { saveThemePaletteLocal } from "@/main/utils/theme.js";
import { ElectronAPIThemeInterface } from "@/shared/types/api/electron-theme";

export const themeHandler = () => {
  ipcMain.handle(
    "getThemeListMeta",
    async (
      _,
      ...rest: Parameters<ElectronAPIThemeInterface["getThemeListMeta"]>
    ): ReturnType<ElectronAPIThemeInterface["getThemeListMeta"]> =>
      await getThemeListMeta(...rest)
  );
  ipcMain.handle(
    "getThemeById",
    async (
      _,
      ...rest: Parameters<ElectronAPIThemeInterface["getThemeById"]>
    ): ReturnType<ElectronAPIThemeInterface["getThemeById"]> =>
      await getThemeById(...rest)
  );
  ipcMain.handle(
    "getThemePaletteById",
    async (
      _,
      ...rest: Parameters<ElectronAPIThemeInterface["getThemePaletteById"]>
    ): ReturnType<ElectronAPIThemeInterface["getThemePaletteById"]> =>
      await getThemePaletteById(...rest)
  );
  ipcMain.handle(
    "createTheme",
    async (
      _,
      ...rest: Parameters<ElectronAPIThemeInterface["createTheme"]>
    ): ReturnType<ElectronAPIThemeInterface["createTheme"]> =>
      await createTheme(...rest)
  );
  ipcMain.handle(
    "updateTheme",
    async (
      _,
      ...rest: Parameters<ElectronAPIThemeInterface["updateTheme"]>
    ): ReturnType<ElectronAPIThemeInterface["updateTheme"]> =>
      await updateTheme(...rest)
  );
  ipcMain.handle(
    "deleteThemeById",
    async (
      _,
      ...rest: Parameters<ElectronAPIThemeInterface["deleteThemeById"]>
    ): ReturnType<ElectronAPIThemeInterface["deleteThemeById"]> =>
      await deleteThemeById(...rest)
  );
  ipcMain.handle(
    "saveThemePalette",
    async (
      _,
      ...rest: Parameters<ElectronAPIThemeInterface["saveThemePalette"]>
    ): ReturnType<ElectronAPIThemeInterface["saveThemePalette"]> =>
      await saveThemePaletteLocal(JSON.stringify(rest[0], null, 2))
  );
};
