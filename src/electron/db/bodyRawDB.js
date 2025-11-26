import { and, eq, inArray } from "drizzle-orm";
import { db } from "./index.js";
import { bodyRawTable } from "./schema.js";
import { getTabList } from "./tabsDB.js";
import { getActiveProject } from "./projectsDB.js";

export const getBodyRaw = async (requestOrFolderMetaId) => {
  if (!requestOrFolderMetaId)
    requestOrFolderMetaId = (await getTabList())?.selectedTab;
  const projectId = await getActiveProject();

  if (!requestOrFolderMetaId || !projectId) return null;

  try {
    const result = (
      await db
        .select()
        .from(bodyRawTable)
        .where(
          and(
            eq(bodyRawTable.requestOrFolderMetaId, requestOrFolderMetaId),
            eq(bodyRawTable.projectId, projectId)
          )
        )
    )?.[0];

    if (result) result["lineWrap"] = Boolean(result["lineWrap"]);

    return result;
  } catch (error) {
    console.error(error);
  }
};

export const createBodyRaw = async (payload) => {
  try {
    if (!payload.requestOrFolderMetaId)
      payload.requestOrFolderMetaId = (await getTabList())?.selectedTab;
    if (!payload.projectId) payload.projectId = await getActiveProject();
    if (!payload.requestOrFolderMetaId || !payload.projectId) return false;

    for (const key in payload)
      if (typeof payload[key] === "boolean")
        payload[key] = Number(payload[key]);

    const result = await db.insert(bodyRawTable).values({
      ...payload,
      requestOrFolderMetaId,
    });

    return result.rowsAffected > 0;
  } catch (error) {
    console.error(error);
  }
};

export const updateBodyRaw = async (payload = {}) => {
  try {
    let { requestOrFolderMetaId, projectId, ...rest } = payload;

    if (!requestOrFolderMetaId)
      requestOrFolderMetaId = (await getTabList())?.selectedTab;
    if (!projectId) projectId = await getActiveProject();
    if (!requestOrFolderMetaId || !projectId) return false;

    payload = rest;

    for (const key in payload)
      if (typeof payload[key] === "boolean")
        payload[key] = Number(payload[key]);

    const bodyRawData = await db
      .select()
      .from(bodyRawTable)
      .where(
        and(
          eq(bodyRawTable.requestOrFolderMetaId, requestOrFolderMetaId),
          eq(bodyRawTable.projectId, projectId)
        )
      );

    let updated;

    if (!bodyRawData.length) {
      updated = await db.insert(bodyRawTable).values({
        ...rest,
        requestOrFolderMetaId,
        projectId,
      });
    } else {
      updated = await db
        .update(bodyRawTable)
        .set({
          ...rest,
        })
        .where(
          and(
            eq(bodyRawTable.requestOrFolderMetaId, requestOrFolderMetaId),
            eq(bodyRawData.projectId, projectId)
          )
        );
    }

    return updated?.rowsAffected > 0;
  } catch (error) {
    console.error(error);
  }
};

export const deleteBodyRawByRequestMetaId = async (requestOrFolderMetaId) => {
  try {
    if (!requestOrFolderMetaId)
      requestOrFolderMetaId = (await getTabList())?.selectedTab;
    const projectId = await getActiveProject();
    if (!requestOrFolderMetaId || !projectId) return false;

    await db
      .delete(bodyRawTable)
      .where(
        and(
          eq(bodyRawTable.requestOrFolderMetaId, requestOrFolderMetaId),
          eq(bodyRawTable.projectId, projectId)
        )
      );

    return true;
  } catch (error) {
    console.error(error);
    return false;
  }
};

/* 
payload = {
  oldId: newId ---> newId means duplicatedId
}
*/
export const duplicateBodyRaw = async (payload) => {
  try {
    if (!payload) return;
    const oldIds = Object.keys(payload);
    const projectId = await getActiveProject();
    if (!oldIds.length || !projectId) return;

    const existingBodyRawData = await db
      .select()
      .from(bodyRawTable)
      .where(
        and(
          inArray(bodyRawTable.requestOrFolderMetaId, oldIds),
          eq(bodyRawTable.projectId, projectId)
        )
      );

    if (!existingBodyRawData.length) return true;

    /**
     * - Replacing oldId with duplicatedId
     * and only keeping url so that other things automatically generate by default
     */
    const duplicatePayload = existingBodyRawData.map((raw) => {
      delete raw["id"];
      return {
        ...raw,
        requestOrFolderMetaId: payload[raw.requestOrFolderMetaId],
        projectId,
      };
    });

    const result = await db.insert(bodyRawTable).values(duplicatePayload);

    return result.rowsAffected > 0;
  } catch (error) {
    console.error(error);
  }
};

export const replaceBodyRaw = async (payload = {}) => {
  try {
    delete payload["id"];
    if (!payload["requestOrFolderMetaId"])
      payload["requestOrFolderMetaId"] = (await getTabList())?.selectedTab;
    if (!payload["projectId"]) payload["projectId"] = await getActiveProject();
    if (!payload["projectId"]) return false;

    await db
      .delete(bodyRawTable)
      .where(
        and(
          eq(bodyRawTable.requestOrFolderMetaId, payload.requestOrFolderMetaId),
          eq(bodyRawTable.projectId, payload.projectId)
        )
      );

    if (Object.keys(payload || {}).length)
      await db.insert(bodyRawTable).values(payload);

    return true;
  } catch (error) {
    console.error(error);
  }
};
