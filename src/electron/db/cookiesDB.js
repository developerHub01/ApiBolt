import { eq } from "drizzle-orm";
import { db } from "./index.js";
import { cookiesTable } from "./schema.js";
import { getActiveProject } from "./projectsDB.js";

export const getCookiesByProject = async (id) => {
  try {
    if (!id) id = await getActiveProject();
    if (!id) return [];

    return (
      await db
        .select()
        .from(cookiesTable)
        .where(eq(cookiesTable.id, id))
        .limit(1)
    )?.[0]?.cookies;
  } catch (error) {
    console.error(error);
  }
};

export const createCookiesByProject = async (payload = {}) => {
  try {
    if (!("id" in payload)) payload["id"] = await getActiveProject();

    const result = await db.insert(cookiesTable).values(payload);
    return result.changes > 0;
  } catch (error) {
    console.error(error);
  }
};

export const updateCookiesByProject = async (payload) => {
  try {
    if (!payload) return false;

    let { id, ...other } = payload;
    payload = other;

    if (!id) id = await getActiveProject();
    if (!id) return false;

    const isExist = (
      await db.select().from(cookiesTable).where(eq(cookiesTable.id, id))
    )?.[0];

    if (!isExist) {
      const result = await createCookiesByProject({
        ...payload,
        id,
      });
      return result.changes > 0;
    }

    const updated = await db
      .update(cookiesTable)
      .set({
        ...payload,
      })
      .where(eq(cookiesTable.id, id));
    return updated?.changes > 0;
  } catch (error) {
    console.error(error);
    return false;
  }
};

export const deleteCookiesByProject = async (id) => {
  try {
    if (!id) id = await getActiveProject();
    if (!id) return false;

    const deleted = await db
      .delete(cookiesTable)
      .where(eq(cookiesTable.id, id));
    return deleted?.changes > 0;
  } catch (error) {
    console.error(error);
    return false;
  }
};
