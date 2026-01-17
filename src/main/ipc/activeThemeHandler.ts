import { ipcMain } from "electron";
import {
  changeActiveTheme,
  deleteActiveTheme,
  getActiveThemeId,
  getActiveThemePalette,
} from "@/main/db/activeThemeDB.js";
import { ElectronAPIActiveThemeInterface } from "@shared/types/api/electron-active-theme";
import { getActiveProject } from "@/main/db/projectsDB";
import { defaultActiveThemeId } from "@/data/themes";

export const activeThemeHandler = (): void => {
  ipcMain.handle(
    "getActiveThemeId",
    async (
      _,
      ...rest: Parameters<ElectronAPIActiveThemeInterface["getActiveThemeId"]>
    ): ReturnType<ElectronAPIActiveThemeInterface["getActiveThemeId"]> =>
      await getActiveThemeId(...rest),
  );
  ipcMain.handle(
    "getActiveThemePalette",
    async (
      _,
      ...rest: Parameters<
        ElectronAPIActiveThemeInterface["getActiveThemePalette"]
      >
    ): ReturnType<ElectronAPIActiveThemeInterface["getActiveThemePalette"]> =>
      await getActiveThemePalette(...rest),
  );
  ipcMain.handle(
    "changeActiveTheme",
    async (
      _,
      ...rest: Parameters<ElectronAPIActiveThemeInterface["changeActiveTheme"]>
    ): ReturnType<ElectronAPIActiveThemeInterface["changeActiveTheme"]> =>
      await changeActiveTheme(...rest),
  );
  ipcMain.handle(
    "inActiveTheme",
    async (_): ReturnType<ElectronAPIActiveThemeInterface["inActiveTheme"]> => {
      const projectId = await getActiveProject();

      if (projectId) return await deleteActiveTheme(projectId);

      return await changeActiveTheme({
        activeTheme: defaultActiveThemeId,
        projectId: null,
      });
    },
  );
};
