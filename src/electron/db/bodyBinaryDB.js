import { eq } from "drizzle-orm";
import { db } from "./index.js";
import { bodyBinaryTable } from "./schema.js";
import { getTabList } from "./tabsDB.js";

export const getBodyBinary = async (requestOrFolderMetaId) => {
  if (!requestOrFolderMetaId)
    requestOrFolderMetaId = (await getTabList())?.selectedTab;

  if (!requestOrFolderMetaId) return null;

  try {
    const result = (
      await db
        .select()
        .from(bodyBinaryTable)
        .where(eq(bodyBinaryTable.requestOrFolderMetaId, requestOrFolderMetaId))
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
    if (!payload.requestOrFolderMetaId) return false;

    const result = await db.insert(bodyBinaryTable).values({
      ...payload,
      requestOrFolderMetaId,
    });

    return result.changes > 0;
  } catch (error) {
    console.error(error);
  }
};

export const updateBodyBinary = async (payload = {}) => {
  try {
    let { requestOrFolderMetaId, ...rest } = payload;

    if (!requestOrFolderMetaId)
      requestOrFolderMetaId = (await getTabList())?.selectedTab;
    if (!requestOrFolderMetaId) return false;

    payload = rest;

    const bodyRawData = await db
      .select()
      .from(bodyBinaryTable)
      .where(eq(bodyBinaryTable.requestOrFolderMetaId, requestOrFolderMetaId));

    let updated;

    if (!bodyRawData.length) {
      updated = await db.insert(bodyBinaryTable).values({
        ...rest,
        requestOrFolderMetaId,
      });
    } else {
      updated = await db
        .update(bodyBinaryTable)
        .set({
          ...rest,
        })
        .where(
          eq(bodyBinaryTable.requestOrFolderMetaId, requestOrFolderMetaId)
        );
    }

    return updated?.changes > 0;
  } catch (error) {
    console.error(error);
  }
};

export const deleteBodyBinary = async (requestOrFolderMetaId) => {
  try {
    if (!requestOrFolderMetaId)
      requestOrFolderMetaId = (await getTabList())?.selectedTab;

    if (!requestOrFolderMetaId) return null;

    const deleted = await db
      .delete(bodyBinaryTable)
      .where(eq(bodyBinaryTable.requestOrFolderMetaId, requestOrFolderMetaId));

    return deleted.changes > 0;
  } catch (error) {
    console.error(error);
  }
};
