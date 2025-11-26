import { and, eq, inArray } from "drizzle-orm";
import { db } from "./index.js";
import { bodyBinaryTable } from "./schema.js";
import { getTabList } from "./tabsDB.js";
import { getActiveProject } from "./projectsDB.js";

export const getBodyBinary = async (requestOrFolderMetaId) => {
  if (!requestOrFolderMetaId)
    requestOrFolderMetaId = (await getTabList())?.selectedTab;
  const projectId = await getActiveProject();
  if (!requestOrFolderMetaId || !projectId) return null;

  try {
    const result = (
      await db
        .select()
        .from(bodyBinaryTable)
        .where(
          and(
            eq(bodyBinaryTable.requestOrFolderMetaId, requestOrFolderMetaId),
            eq(bodyBinaryTable.projectId, projectId)
          )
        )
    )?.[0];

    return result;
  } catch (error) {
    console.error(error);
  }
};

export const createBodyBinary = async (payload) => {
  try {
    if (!payload.requestOrFolderMetaId)
      payload.requestOrFolderMetaId = (await getTabList())?.selectedTab;
    if (!payload.projectId) payload.projectId = await getActiveProject();
    if (!payload.requestOrFolderMetaId || !payload.projectId) return false;

    const result = await db.insert(bodyBinaryTable).values({
      ...payload,
      requestOrFolderMetaId,
    });

    return result.rowsAffected > 0;
  } catch (error) {
    console.error(error);
  }
};

export const updateBodyBinary = async (payload = {}) => {
  try {
    let { requestOrFolderMetaId, projectId, ...rest } = payload;

    if (!requestOrFolderMetaId)
      requestOrFolderMetaId = (await getTabList())?.selectedTab;
    if (!projectId) projectId = await getActiveProject();
    if (!requestOrFolderMetaId || !projectId) return false;

    payload = rest;

    const bodyRawData = await db
      .select()
      .from(bodyBinaryTable)
      .where(
        and(
          eq(bodyBinaryTable.requestOrFolderMetaId, requestOrFolderMetaId),
          eq(bodyBinaryTable.projectId, projectId)
        )
      );

    let updated;

    if (!bodyRawData.length) {
      updated = await db.insert(bodyBinaryTable).values({
        ...rest,
        requestOrFolderMetaId,
        projectId,
      });
    } else {
      updated = await db
        .update(bodyBinaryTable)
        .set({
          ...rest,
        })
        .where(
          and(
            eq(bodyBinaryTable.requestOrFolderMetaId, requestOrFolderMetaId),
            eq(bodyBinaryTable.projectId, projectId)
          )
        );
    }

    return updated?.rowsAffected > 0;
  } catch (error) {
    console.error(error);
  }
};

export const deleteBodyBinary = async (requestOrFolderMetaId) => {
  try {
    if (!requestOrFolderMetaId)
      requestOrFolderMetaId = (await getTabList())?.selectedTab;
    const projectId = await getActiveProject();
    if (!requestOrFolderMetaId || !projectId) return false;

    await db
      .delete(bodyBinaryTable)
      .where(
        and(
          eq(bodyBinaryTable.requestOrFolderMetaId, requestOrFolderMetaId),
          eq(bodyBinaryTable.projectId, projectId)
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
export const duplicateBodyBinary = async (payload) => {
  try {
    if (!payload) return;
    const projectId = await getActiveProject();
    const oldIds = Object.keys(payload);
    if (!oldIds.length || !projectId) return;

    const existingBodyBinaryData = await db
      .select()
      .from(bodyBinaryTable)
      .where(
        and(
          inArray(bodyBinaryTable.requestOrFolderMetaId, oldIds),
          eq(bodyBinaryTable.projectId, projectId)
        )
      );

    if (!existingBodyBinaryData.length) return true;

    /**
     * - Replacing oldId with duplicatedId
     * and only keeping url so that other things automatically generate by default
     */
    const duplicatePayload = existingBodyBinaryData.map((binary) => {
      delete binary["id"];
      return {
        ...binary,
        requestOrFolderMetaId: payload[binary.requestOrFolderMetaId],
        projectId,
      };
    });

    const result = await db.insert(bodyBinaryTable).values(duplicatePayload);

    return result.rowsAffected > 0;
  } catch (error) {
    console.error(error);
  }
};

export const replaceBodyBinary = async (payload = {}) => {
  try {
    delete payload["id"];
    if (!payload["requestOrFolderMetaId"])
      payload["requestOrFolderMetaId"] = (await getTabList())?.selectedTab;
    if (!payload["projectId"]) payload["projectId"] = await getActiveProject();
    if (!payload["projectId"]) return false;

    await db
      .delete(bodyBinaryTable)
      .where(
        and(
          eq(
            bodyBinaryTable.requestOrFolderMetaId,
            payload.requestOrFolderMetaId
          ),
          eq(bodyBinaryTable.projectId, payload.projectId)
        )
      );

    if (Object.keys(payload || {}).length)
      await db.insert(bodyBinaryTable).values({
        ...payload,
      });

    return true;
  } catch (error) {
    console.error(error);
  }
};
