import { eq } from "drizzle-orm";
import { db } from "@/main/db/index.js";
import {
  activeThemeTable,
  GLOBAL_PROJECT_ID,
  themeTable,
} from "@/main/db/schema.js";
import { getActiveProject } from "@/main/db/projectsDB.js";
import {
  defaultActiveTheme,
  defaultActiveThemeId,
  defaultActiveThemePalette,
} from "@/data/themes.js";
import { ElectronAPIActiveThemeInterface } from "@shared/types/api/electron-active-theme";
import {
  ActiveThemePaletteInterface,
  ThemeMetaInterface,
} from "@shared/types/theme.types";
import { ElectronAPIThemeInterface } from "@shared/types/api/electron-theme";
import { generateThemesSeed } from "@/main/seeders/themesSeed";

const { palette, ...detaultActiveThemeMeta } = defaultActiveTheme;

export const getActiveThemeMeta: ElectronAPIThemeInterface["getActiveThemeMeta"] =
  async () => {
    try {
      const globalResult = (
        await db
          .select({
            id: themeTable.id,
            name: themeTable.name,
            type: themeTable.type,
            author: themeTable.author,
            authorUsername: themeTable.authorUsername,
            thumbnail: themeTable.thumbnail,
            version: themeTable.version,
            createdAt: themeTable.createdAt,
          })
          .from(activeThemeTable)
          .leftJoin(themeTable, eq(activeThemeTable.activeTheme, themeTable.id))

          .where(eq(activeThemeTable.projectId, GLOBAL_PROJECT_ID))
          .limit(1)
      )?.[0];

      const global: ThemeMetaInterface = globalResult?.id
        ? (globalResult as ThemeMetaInterface)
        : detaultActiveThemeMeta;

      const activeProjectId = await getActiveProject();

      let local: ThemeMetaInterface | null = null;
      if (activeProjectId) {
        const localResult = (
          await db
            .select({
              id: themeTable.id,
              name: themeTable.name,
              type: themeTable.type,
              author: themeTable.author,
              authorUsername: themeTable.authorUsername,
              thumbnail: themeTable.thumbnail,
              createdAt: themeTable.createdAt,
            })
            .from(activeThemeTable)
            .leftJoin(
              themeTable,
              eq(activeThemeTable.activeTheme, themeTable.id),
            )
            .where(eq(activeThemeTable.projectId, activeProjectId))
            .limit(1)
        )?.[0];

        if (localResult[0]?.id) local = localResult[0] as ThemeMetaInterface;
      }

      return {
        global,
        local,
      };
    } catch (error) {
      console.error(error);
      return {
        global: detaultActiveThemeMeta,
        local: null,
      };
    }
  };

export const getActiveGlobalThemeId = async (): Promise<boolean> => {
  try {
    return Boolean(
      (
        await db
          .select({
            id: activeThemeTable.activeTheme,
          })
          .from(activeThemeTable)
          .where(eq(activeThemeTable.projectId, GLOBAL_PROJECT_ID))
          .limit(1)
      )?.[0]?.id,
    );
  } catch (error) {
    console.error(error);
    return false;
  }
};

export const createActiveGlobalThemeIfNotExist = async (): Promise<boolean> => {
  try {
    const doHave = await getActiveGlobalThemeId();
    if (doHave) return true;

    await generateThemesSeed();

    return true;
  } catch (error) {
    console.error(error);
    return false;
  }
};

export const getActiveThemeId: ElectronAPIActiveThemeInterface["getActiveThemeId"] =
  async () => {
    try {
      const global =
        (
          await db
            .select({
              id: activeThemeTable.activeTheme,
            })
            .from(activeThemeTable)
            .where(eq(activeThemeTable.projectId, GLOBAL_PROJECT_ID))
            .limit(1)
        )?.[0]?.id ?? defaultActiveThemeId;

      const activeProjectId = await getActiveProject();

      let local: string | null = null;
      if (activeProjectId)
        local =
          (
            await db
              .select({
                id: activeThemeTable.activeTheme,
              })
              .from(activeThemeTable)
              .where(eq(activeThemeTable.projectId, activeProjectId))
              .limit(1)
          )?.[0]?.id ?? null;

      return {
        global,
        local,
      };
    } catch (error) {
      console.error(error);
      return {
        global: defaultActiveThemeId,
        local: null,
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
        local: null,
      };
      const result: ActiveThemePaletteInterface = {
        global: defaultActiveThemePalette,
        local: null,
      };

      theme.global = (
        await db
          .select({
            palette: themeTable.palette,
          })
          .from(activeThemeTable)
          .where(eq(activeThemeTable.projectId, GLOBAL_PROJECT_ID))
          .leftJoin(themeTable, eq(activeThemeTable.activeTheme, themeTable.id))
          .limit(1)
      )?.[0]?.palette;

      const activeProjectId = await getActiveProject();
      if (activeProjectId)
        theme.local =
          (
            await db
              .select({
                palette: themeTable.palette,
              })
              .from(activeThemeTable)
              .where(eq(activeThemeTable.projectId, activeProjectId))
              .leftJoin(
                themeTable,
                eq(activeThemeTable.activeTheme, themeTable.id),
              )
              .limit(1)
          )?.[0]?.palette ?? null;

      try {
        if (theme.global) result.global = JSON.parse(theme.global);
      } catch {
        result.global = defaultActiveThemePalette;
      }
      try {
        if (theme.local) result.global = JSON.parse(theme.local);
      } catch {
        result.local = null;
      }

      return result;
    } catch (error) {
      console.error(error);
      return {
        global: defaultActiveThemePalette,
        local: null,
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

      const isExist = (
        await db
          .select()
          .from(activeThemeTable)
          .where(
            eq(
              activeThemeTable.projectId,
              payload.projectId ?? GLOBAL_PROJECT_ID,
            ),
          )
          .limit(1)
      )?.[0];

      if (!isExist)
        return (
          (
            await db.insert(activeThemeTable).values({
              ...payload,
              projectId: payload.projectId ?? GLOBAL_PROJECT_ID,
            })
          ).rowsAffected > 0
        );

      return (
        (
          await db
            .update(activeThemeTable)
            .set({
              activeTheme: payload.activeTheme,
            })
            .where(
              eq(
                activeThemeTable.projectId,
                payload.projectId ?? GLOBAL_PROJECT_ID,
              ),
            )
        ).rowsAffected > 0
      );
    } catch (error) {
      console.error(error);
      return false;
    }
  };

export const deleteActiveTheme = async (
  projectId: string,
): Promise<boolean> => {
  try {
    return (
      (
        await db
          .delete(activeThemeTable)
          .where(eq(activeThemeTable.projectId, projectId))
      ).rowsAffected > 0
    );
  } catch (error) {
    console.error(error);
    return false;
  }
};
