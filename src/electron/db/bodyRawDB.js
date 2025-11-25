import { eq, inArray } from "drizzle-orm";
import { db } from "./index.js";
import { bodyRawTable } from "./schema.js";
import { getTabList } from "./tabsDB.js";

export const getBodyRaw = async (requestOrFolderMetaId) => {
  if (!requestOrFolderMetaId)
    requestOrFolderMetaId = (await getTabList())?.selectedTab;

  if (!requestOrFolderMetaId) return null;

  try {
    const result = (
      await db
        .select()
        .from(bodyRawTable)
        .where(eq(bodyRawTable.requestOrFolderMetaId, requestOrFolderMetaId))
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
    if (!payload.requestOrFolderMetaId) return false;

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
    let { requestOrFolderMetaId, ...rest } = payload;

    if (!requestOrFolderMetaId)
      requestOrFolderMetaId = (await getTabList())?.selectedTab;
    if (!requestOrFolderMetaId) return false;

    payload = rest;

    for (const key in payload)
      if (typeof payload[key] === "boolean")
        payload[key] = Number(payload[key]);

    const bodyRawData = await db
      .select()
      .from(bodyRawTable)
      .where(eq(bodyRawTable.requestOrFolderMetaId, requestOrFolderMetaId));

    let updated;

    if (!bodyRawData.length) {
      updated = await db.insert(bodyRawTable).values({
        ...rest,
        requestOrFolderMetaId,
      });
    } else {
      updated = await db
        .update(bodyRawTable)
        .set({
          ...rest,
        })
        .where(eq(bodyRawTable.requestOrFolderMetaId, requestOrFolderMetaId));
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
    if (!requestOrFolderMetaId) return false;

    const deleted = await db
      .delete(bodyRawTable)
      .where(eq(bodyRawTable.requestOrFolderMetaId, requestOrFolderMetaId));

    return deleted?.rowsAffected > 0;
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
    if (!oldIds.length) return;

    const existingBodyRawData = await db
      .select()
      .from(bodyRawTable)
      .where(inArray(bodyRawTable.requestOrFolderMetaId, oldIds));

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
    const updatePayload = { ...payload };
    delete updatePayload["id"];
    delete updatePayload["requestOrFolderMetaId"];

    await db
      .delete(bodyRawTable)
      .where(
        eq(bodyRawTable.requestOrFolderMetaId, payload.requestOrFolderMetaId)
      );

    if (Object.keys(updatePayload || {}).length)
      await db.insert(bodyRawTable).values(payload);

    return true;
  } catch (error) {
    console.error(error);
  }
};
