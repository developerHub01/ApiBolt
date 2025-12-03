import { eq } from "drizzle-orm";
import { db } from "@/main/db/index.js";
import { cookiesTable } from "@/main/db/schema.js";
import { getActiveProject } from "@/main/db/projectsDB.js";

export const getCookiesByProject = async (projectId) => {
  try {
    if (!projectId) projectId = await getActiveProject();
    if (!projectId) return null;

    let cookiesList = (
      await db
        .select()
        .from(cookiesTable)
        .where(eq(cookiesTable.projectId, projectId))
        .limit(1)
    )?.[0]?.cookies;

    if (!cookiesList) return null;

    try {
      let parsed = JSON.parse(cookiesList);

      /* fallback to raw if structure invalid */
      if (!parsed.cookies || !Array.isArray(parsed.cookies)) return cookiesList;

      const beforeCount = parsed.cookies.length;

      /* remove expired cookies */
      parsed.cookies = parsed.cookies.filter(
        (entry) =>
          !entry.expires || new Date(entry.expires).getTime() > Date.now()
      );

      if (parsed.cookies.length !== beforeCount) {
        cookiesList = JSON.stringify(parsed);

        await db
          .update(cookiesTable)
          .set({
            cookies: cookiesList,
          })
          .where(eq(cookiesTable.projectId, projectId));
      }

      return cookiesList;
    } catch (error) {
      console.error("Error parsing cookies JSON:", error);
      return cookiesList;
    }
  } catch (error) {
    console.error(error);
  }
};

export const getParsedCookiesByProject = async (projectId) => {
  try {
    const cookies = await getCookiesByProject(projectId);
    if (!cookies) return [];

    return JSON.parse(cookies)?.cookies ?? [];
  } catch (error) {
    console.error(error);
    return [];
  }
};

export const createCookiesByProject = async (payload = {}) => {
  try {
    if (!("projectId" in payload))
      payload["projectId"] = await getActiveProject();

    const result = await db.insert(cookiesTable).values(payload);
    return result.rowsAffected > 0;
  } catch (error) {
    console.error(error);
  }
};

export const replaceCookiesByProject = async (payload) => {
  try {
    if (!payload) return false;

    let { projectId, cookies } = payload;
    payload = cookies;

    if (!projectId) projectId = await getActiveProject();
    if (!projectId) return false;

    const existing = (
      await db
        .select()
        .from(cookiesTable)
        .where(eq(cookiesTable.projectId, projectId))
    )?.[0];

    if (!existing?.cookies) {
      const result = await createCookiesByProject({
        cookies: JSON.stringify(payload),
        projectId,
      });
      return result.rowsAffected > 0;
    }

    const updated = await db
      .update(cookiesTable)
      .set({
        cookies: JSON.stringify(payload),
      })
      .where(eq(cookiesTable.projectId, projectId));

    return updated?.rowsAffected > 0;
  } catch (error) {
    console.error(error);
    return false;
  }
};

export const updateCookiesByProject = async (payload) => {
  try {
    if (!payload) return false;

    let { projectId, cookies } = payload;
    payload = cookies;

    if (!projectId) projectId = await getActiveProject();
    if (!projectId) return false;

    const existing = (
      await db
        .select()
        .from(cookiesTable)
        .where(eq(cookiesTable.projectId, projectId))
    )?.[0];

    if (!existing?.cookies) {
      const result = await createCookiesByProject({
        cookies: JSON.stringify({
          cookies: payload,
        }),
        projectId,
      });
      return result.rowsAffected > 0;
    }

    /* getting existing cookies and updating with payload */
    const existingCookies = JSON.parse(existing.cookies);
    existingCookies.cookies = payload;

    const updated = await db
      .update(cookiesTable)
      .set({
        cookies: JSON.stringify(existingCookies),
      })
      .where(eq(cookiesTable.projectId, projectId));

    return updated?.rowsAffected > 0;
  } catch (error) {
    console.error(error);
    return false;
  }
};

export const deleteCookiesByProject = async (projectId) => {
  try {
    if (!projectId) projectId = await getActiveProject();
    if (!projectId) return false;

    const deleted = await db
      .delete(cookiesTable)
      .where(eq(cookiesTable.projectId, projectId));
    return deleted?.rowsAffected > 0;
  } catch (error) {
    console.error(error);
    return false;
  }
};

export const deleteCookieKeyByProject = async ({ projectId, key } = {}) => {
  try {
    if (!key) return false;
    if (!projectId) projectId = await getActiveProject();
    if (!projectId) return false;

    let existingData = (
      await db
        .select()
        .from(cookiesTable)
        .where(eq(cookiesTable.projectId, projectId))
        .limit(1)
    )?.[0]?.cookies;

    if (!existingData) return true;

    existingData = JSON.parse(existingData);
    if (existingData.cookies && !Array.isArray(existingData.cookies))
      return true;

    existingData.cookies = (existingData.cookies ?? []).filter(
      (entry) => entry.key !== key
    );
    const updatePayload = JSON.stringify(existingData);

    const updated = await db
      .update(cookiesTable)
      .set({
        cookies: updatePayload,
      })
      .where(eq(cookiesTable.projectId, projectId));

    return updated?.rowsAffected > 0;
  } catch (error) {
    console.error(error);
    return false;
  }
};

export const clearCookiesByProject = async (projectId) => {
  try {
    if (!projectId) projectId = await getActiveProject();
    if (!projectId) return false;

    let existingData = (
      await db
        .select()
        .from(cookiesTable)
        .where(eq(cookiesTable.projectId, projectId))
        .limit(1)
    )?.[0]?.cookies;

    if (!existingData) return true;

    existingData = JSON.parse(existingData);
    if (!existingData.cookies) return true;

    existingData.cookies = [];
    const updatePayload = JSON.stringify(existingData);

    const updated = await db
      .update(cookiesTable)
      .set({
        cookies: updatePayload,
      })
      .where(eq(cookiesTable.projectId, projectId));

    return updated?.rowsAffected > 0;
  } catch (error) {
    console.error(error);
    return false;
  }
};
