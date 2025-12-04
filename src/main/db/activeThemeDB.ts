import { eq, isNull } from "drizzle-orm";
import { db } from "@/main/db/index.js";
import { activeThemeTable, themeTable } from "@/main/db/schema.js";
import { getActiveProject } from "@/main/db/projectsDB.js";
import {
  defaultActiveThemeId,
  defaultActiveThemePalette
} from "@/data/themes.js";
import { ElectronAPIActiveThemeInterface } from "@/shared/types/api/electron-active-theme";
import { ActiveThemePaletteInterface } from "@/shared/types/theme.types";

export const getActiveThemeId: ElectronAPIActiveThemeInterface["getActiveThemeId"] =
  async () => {
    try {
      const global =
        (
          await db
            .select({
              id: activeThemeTable.activeTheme
            })
            .from(activeThemeTable)
            .where(isNull(activeThemeTable.projectId))
            .limit(1)
        )?.[0]?.id ?? defaultActiveThemeId;

      const activeProjectId = await getActiveProject();

      let local: string | null = null;
      if (activeProjectId)
        local =
          (
            await db
              .select({
                id: activeThemeTable.activeTheme
              })
              .from(activeThemeTable)
              .where(eq(activeThemeTable.projectId, activeProjectId))
              .limit(1)
          )?.[0]?.id ?? null;

      return {
        global,
        local
      };
    } catch (error) {
      console.error(error);
      return {
        global: defaultActiveThemeId,
        local: null
      };
    }
  };

export const getActiveThemePalette: ElectronAPIActiveThemeInterface["getActiveThemePalette"] =
  async () => {
    try {
      const theme: {
        global: string | null;
        local: string | null;
      } = {
        global: null,
        local: null
      };
      const result: ActiveThemePaletteInterface = {
        global: defaultActiveThemePalette,
        local: null
      };

      theme.global = (
        await db
          .select({
            palette: themeTable.palette
          })
          .from(activeThemeTable)
          .where(isNull(activeThemeTable.projectId))
          .leftJoin(themeTable, eq(activeThemeTable.activeTheme, themeTable.id))
          .limit(1)
      )?.[0]?.palette;

      const activeProjectId = await getActiveProject();
      if (activeProjectId)
        theme.local =
          (
            await db
              .select({
                palette: themeTable.palette
              })
              .from(activeThemeTable)
              .where(eq(activeThemeTable.projectId, activeProjectId))
              .leftJoin(
                themeTable,
                eq(activeThemeTable.activeTheme, themeTable.id)
              )
              .limit(1)
          )?.[0]?.palette ?? null;

      try {
        if (theme.global) result.global = JSON.parse(theme.global);
      } catch (error) {
        result.global = defaultActiveThemePalette;
      }
      try {
        if (theme.local) result.global = JSON.parse(theme.local);
      } catch (error) {
        result.local = null;
      }

      return result;
    } catch (error) {
      console.error(error);
      return {
        global: defaultActiveThemePalette,
        local: null
      };
    }
  };

export const changeActiveTheme: ElectronAPIActiveThemeInterface["changeActiveTheme"] =
  async payload => {
    try {
      /**
       * if projectId is null means global theme else local
       * if global theme then activeTheme can't be null so use default activeThemeId
       */
      if (!payload.projectId && !payload.activeTheme)
        payload.activeTheme = defaultActiveThemeId;

      return (
        (
          await db
            .insert(activeThemeTable)
            .values(payload)
            .onConflictDoUpdate({
              target: [activeThemeTable.projectId],
              set: {
                activeTheme: payload.activeTheme
              }
            })
        ).rowsAffected > 0
      );
    } catch (error) {
      console.error(error);
      return false;
    }
  };
