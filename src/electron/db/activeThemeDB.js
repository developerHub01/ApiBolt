import { eq, isNull } from "drizzle-orm";
import { db } from "./index.js";
import { activeThemeTable, themeTable } from "./schema.js";
import { getActiveProject } from "./projectsDB.js";
import {
  defaultActiveThemeId,
  defaultActiveThemePalette,
} from "../../data/themes.js";

export const getActiveThemeId = async () => {
  try {
    const theme = {
      global: null,
      local: null,
    };

    theme.global =
      (
        await db
          .select({
            id: activeThemeTable.activeTheme,
          })
          .from(activeThemeTable)
          .where(isNull(activeThemeTable.projectId))
          .limit(1)
      )?.[0]?.id ?? defaultActiveThemeId;

    const activeProjectId = await getActiveProject();

    theme.local =
      (
        await db
          .select({
            id: activeThemeTable.activeTheme,
          })
          .from(activeThemeTable)
          .where(eq(activeThemeTable.projectId, activeProjectId))
          .limit(1)
      )?.[0]?.id ?? null;

    return theme;
  } catch (error) {
    console.error(error);
  }
};

export const getActiveThemePalette = async () => {
  try {
    const theme = {
      global: null,
      local: null,
    };

    theme.global = (
      await db
        .select({
          palette: themeTable.palette,
        })
        .from(activeThemeTable)
        .where(isNull(activeThemeTable.projectId))
        .leftJoin(themeTable, eq(activeThemeTable.activeTheme, themeTable.id))
        .limit(1)
    )?.[0]?.palette;

    if (theme.global) theme.global = JSON.parse(theme.global);
    else theme.global = defaultActiveThemePalette;

    const activeProjectId = await getActiveProject();

    theme.local =
      (
        await db
          .select({
            palette: themeTable.palette,
          })
          .from(activeThemeTable)
          .where(eq(activeThemeTable.projectId, activeProjectId))
          .leftJoin(themeTable, eq(activeThemeTable.activeTheme, themeTable.id))
          .limit(1)
      )?.[0]?.palette ?? null;

    if (theme.local) theme.local = JSON.parse(theme.local);

    return theme;
  } catch (error) {
    console.error(error);
  }
};

export const changeActiveTheme = async (payload = {}) => {
  try {
    if (!("projectId" in payload)) payload.projectId = null;
    /**
     * if projectId is null means global theme else local
     * if global theme then activeTheme can't be null so use default activeThemeId
     */
    if (!payload.projectId && !payload.activeTheme)
      payload.activeTheme = defaultActiveThemeId;

    const isAlreadyExist = Boolean(
      (
        await db
          .select({
            id: activeThemeTable.projectId,
          })
          .from(activeThemeTable)
          .where(
            payload.projectId
              ? eq(activeThemeTable.projectId, payload.projectId)
              : isNull(activeThemeTable.projectId)
          )
          .limit(1)
      )?.[0]
    );

    if (isAlreadyExist) {
      const updatePayload = { ...payload };
      delete updatePayload["projectId"];
      return await db
        .update(activeThemeTable)
        .set({ ...updatePayload })
        .where(
          payload.projectId
            ? eq(activeThemeTable.projectId, payload.projectId)
            : isNull(activeThemeTable.projectId)
        );
    }

    const result = await db.insert(activeThemeTable).values(payload);
    return result.changes > 0;
  } catch (error) {
    console.error(error);
  }
};
