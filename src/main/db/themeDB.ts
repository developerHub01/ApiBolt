import { eq } from "drizzle-orm";
import { db } from "./index.js";
import { themeTable } from "./schema.js";

export const getThemeListMeta = async () => {
  try {
    const result = await db
      .select({
        id: themeTable.id,
        name: themeTable.name,
        type: themeTable.type,
        url: themeTable.url,
        author: themeTable.author,
        thumbnail: themeTable.thumbnail,
        createdAt: themeTable.createdAt,
      })
      .from(themeTable);

    return result;
  } catch (error) {
    console.error(error);
  }
};

export const getThemeById = async (id) => {
  try {
    const result = (
      await db.select().from(themeTable).where(eq(themeTable.id, id))
    )?.[0];

    if (result.palette) result.palette = JSON.parse(result.palette);
    return result;
  } catch (error) {
    console.error(error);
  }
};

export const getThemePaletteById = async (id) => {
  try {
    let result = (
      await db
        .select({
          palette: themeTable.palette,
        })
        .from(themeTable)
        .where(eq(themeTable.id, id))
    )?.[0]?.palette;

    if (result) result = JSON.parse(result);
    return result;
  } catch (error) {
    console.error(error);
  }
};

export const createTheme = async (payload = {}) => {
  try {
    if ("palette" in payload && typeof payload.palette === "object")
      payload.palette = JSON.stringify(payload.palette);

    const result = await db.insert(themeTable).values(payload);
    return result.rowsAffected > 0;
  } catch (error) {
    console.error(error);
  }
};

export const updateTheme = async (payload) => {
  if (!payload || !payload.id) return false;

  delete payload["createdAt"];
  const updatePayload = { ...payload };
  delete updatePayload["id"];
  delete updatePayload["createdAt"];

  try {
    const updated = await db
      .insert(themeTable)
      .values(payload)
      .onConflictDoUpdate({
        target: themeTable.id,
        set: {
          ...updatePayload,
        },
      });

    return updated?.rowsAffected > 0;
  } catch (error) {
    console.error(error);
    return false;
  }
};

export const deleteThemeById = async (id) => {
  try {
    const deleted = await db.delete(themeTable).where(eq(themeTable.id, id));
    return deleted?.rowsAffected > 0;
  } catch (error) {
    console.error(error);
    return false;
  }
};
