import { ipcMain } from "electron";
import {
  changeActiveTheme,
  getActiveThemeId,
  getActiveThemePalette
} from "@/main/db/activeThemeDB.js";
import { ElectronAPIActiveThemeInterface } from "@shared/types/api/electron-active-theme";

export const activeThemeHandler = () => {
  ipcMain.handle(
    "getActiveThemeId",
    async (
      _,
      ...rest: Parameters<ElectronAPIActiveThemeInterface["getActiveThemeId"]>
    ): ReturnType<ElectronAPIActiveThemeInterface["getActiveThemeId"]> =>
      await getActiveThemeId(...rest)
  );
  ipcMain.handle(
    "getActiveThemePalette",
    async (
      _,
      ...rest: Parameters<
        ElectronAPIActiveThemeInterface["getActiveThemePalette"]
      >
    ): ReturnType<ElectronAPIActiveThemeInterface["getActiveThemePalette"]> =>
      await getActiveThemePalette(...rest)
  );
  ipcMain.handle(
    "changeActiveTheme",
    async (
      _,
      ...rest: Parameters<ElectronAPIActiveThemeInterface["changeActiveTheme"]>
    ): ReturnType<ElectronAPIActiveThemeInterface["changeActiveTheme"]> =>
      await changeActiveTheme(...rest)
  );
};
