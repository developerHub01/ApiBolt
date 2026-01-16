import { eq } from "drizzle-orm";
import { db } from "@/main/db/index.js";
import { themeTable } from "@/main/db/schema.js";
import { ElectronAPIThemeInterface } from "@shared/types/api/electron-theme";
import { ThemeInterface, ThemeMetaDBInterface } from "@shared/types/theme.types";

export const getThemeListMeta: ElectronAPIThemeInterface["getThemeListMeta"] =
  async () => {
    try {
     return await db
        .select({
          id: themeTable.id,
          name: themeTable.name,
          type: themeTable.type,
          author: themeTable.author,
          authorUsername: themeTable.authorUsername,
          thumbnail: themeTable.thumbnail,
          createdAt: themeTable.createdAt,
        })
        .from(themeTable);
    } catch (error) {
      console.error(error);
      return [];
    }
  };

export const getThemeById: ElectronAPIThemeInterface["getThemeById"] =
  async id => {
    try {
      const result = (
        await db.select().from(themeTable).where(eq(themeTable.id, id))
      )?.[0];

      return {
        ...result,
        palette: (result.palette
          ? JSON.parse(result.palette)
          : {}) as ThemeMetaDBInterface["palette"],
      };
    } catch (error) {
      console.error(error);
      return null;
    }
  };

export const getThemePaletteById: ElectronAPIThemeInterface["getThemePaletteById"] =
  async id => {
    try {
      const result = (
        await db
          .select({
            palette: themeTable.palette,
          })
          .from(themeTable)
          .where(eq(themeTable.id, id))
      )?.[0]?.palette;

      if (!result) throw new Error();
      return JSON.parse(result) as ThemeInterface["palette"];
    } catch (error) {
      console.error(error);
      return null;
    }
  };

export const createTheme: ElectronAPIThemeInterface["createTheme"] =
  async payload => {
    try {
      return (
        (
          await db.insert(themeTable).values({
            ...payload,
            palette: JSON.stringify(payload.palette),
          }).onConflictDoUpdate({
            target: [themeTable.id],
            set: {
              ...payload,
              palette: JSON.stringify(payload.palette),
            }
          })
        ).rowsAffected > 0
      );
    } catch (error) {
      console.error(error);
      return false;
    }
  };

export const updateTheme: ElectronAPIThemeInterface["updateTheme"] =
  async payload => {
    delete payload["createdAt"];

    const palette = payload.palette
      ? JSON.stringify(payload.palette)
      : undefined;

    try {
      return (
        (
          await db.update(themeTable).set({
            ...payload,
            palette,
          })
        )?.rowsAffected > 0
      );
    } catch (error) {
      console.error(error);
      return false;
    }
  };

export const deleteThemeById: ElectronAPIThemeInterface["deleteThemeById"] =
  async id => {
    try {
      return (
        (await db.delete(themeTable).where(eq(themeTable.id, id)))
          ?.rowsAffected > 0
      );
    } catch (error) {
      console.error(error);
      return false;
    }
  };
