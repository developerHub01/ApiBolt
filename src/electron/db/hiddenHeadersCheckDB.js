import { and, eq, inArray } from "drizzle-orm";
import { db } from "./index.js";
import { hiddenHeadersCheckTable } from "./schema.js";
import { getTabList } from "./tabsDB.js";
import { getActiveProject } from "./projectsDB.js";

const booleanFields = new Set([
  "authorization",
  "userAgent",
  "contentLength",
  "accept",
  "acceptEncoding",
  "connection",
]);

/* id === requestOrFolderMetaId */
export const getHiddenHeadersCheck = async (id) => {
  try {
    if (!id) id = (await getTabList())?.selectedTab;
    const projectId = await getActiveProject();
    if (!id || !projectId) return null;

    const result = (
      await db
        .select()
        .from(hiddenHeadersCheckTable)
        .where(
          and(
            eq(hiddenHeadersCheckTable.requestOrFolderMetaId, id),
            eq(hiddenHeadersCheckTable.projectId, projectId)
          )
        )
    )?.[0];

    if (result)
      for (const key in result) {
        if (!booleanFields.has(key)) continue;
        result[key] = Boolean(result[key]);
      }

    return result;
  } catch (error) {
    console.error(error);
  }
};

export const createHiddenHeadersCheck = async (payload = {}) => {
  try {
    if (!("requestOrFolderMetaId" in payload))
      payload["requestOrFolderMetaId"] = (await getTabList())?.selectedTab;
    if (!("projectId" in payload))
      payload["projectId"] = await getActiveProject();
    if (!payload.requestOrFolderMetaId || !payload.projectId) return false;

    if (typeof payload === "object" && !Object.keys(payload).length)
      return true;

    const existingData = await getHiddenHeadersCheck(
      payload.requestOrFolderMetaId
    );
    if (existingData) return await updateHiddenHeadersCheck(payload);

    const result = await db.insert(hiddenHeadersCheckTable).values(payload);

    return result?.rowsAffected > 0;
  } catch (error) {
    console.error(error);
  }
};

export const updateHiddenHeadersCheck = async (payload) => {
  if (!payload) return false;

  const selectedTab =
    payload.requestOrFolderMetaId ?? (await getTabList()).selectedTab;
  const projectId = await getActiveProject();
  if (!selectedTab) return false;

  delete payload["id"];
  delete payload["requestOrFolderMetaId"];
  delete payload["projectId"];

  for (const key in payload)
    if (typeof payload[key] === "boolean") payload[key] = Number(payload[key]);

  if (typeof payload === "object" && !Object.keys(payload).length) return true;

  try {
    const isExist = (
      await db
        .select()
        .from(hiddenHeadersCheckTable)
        .where(
          and(
            eq(hiddenHeadersCheckTable.requestOrFolderMetaId, selectedTab),
            eq(hiddenHeadersCheckTable.projectId, projectId)
          )
        )
    )?.[0];

    if (!isExist)
      await createHiddenHeadersCheck({
        requestOrFolderMetaId: selectedTab,
      });

    await db
      .update(hiddenHeadersCheckTable)
      .set({
        ...payload,
      })
      .where(
        and(
          eq(hiddenHeadersCheckTable.requestOrFolderMetaId, selectedTab),
          eq(hiddenHeadersCheckTable.projectId, projectId)
        )
      );
    return true;
  } catch (error) {
    console.error(error);
  }
};

/* 
payload = {
  oldId: newId ---> newId means duplicatedId
}
*/
export const duplicateHiddenHeadersCheck = async (payload) => {
  try {
    if (!payload) return;
    const oldIds = Object.keys(payload);
    const projectId = await getActiveProject();
    if (!oldIds.length || !projectId) return;

    const existingHeadersCheckData = await db
      .select()
      .from(hiddenHeadersCheckTable)
      .where(
        and(
          inArray(hiddenHeadersCheckTable.requestOrFolderMetaId, oldIds),
          eq(hiddenHeadersCheckTable.projectId, projectId)
        )
      );

    if (!existingHeadersCheckData.length) return true;

    /**
     * - Replacing oldId with duplicatedId
     * and only keeping url so that other things automatically generate by default
     */
    const duplicatePayload = existingHeadersCheckData.map((headersCheck) => {
      delete headersCheck["id"];
      return {
        ...headersCheck,
        requestOrFolderMetaId: payload[headersCheck.requestOrFolderMetaId],
        projectId,
      };
    });

    const result = await db
      .insert(hiddenHeadersCheckTable)
      .values(duplicatePayload);

    return result.rowsAffected > 0;
  } catch (error) {
    console.error(error);
  }
};
