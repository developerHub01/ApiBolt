import { eq, inArray } from "drizzle-orm";
import { db } from "./index.js";
import { requestMetaTabTable } from "./schema.js";
import { getTabList } from "./tabsDB.js";

export const getRequestMetaTab = async (requestOrFolderMetaId) => {
  if (!requestOrFolderMetaId)
    requestOrFolderMetaId = (await getTabList())?.selectedTab;

  if (!requestOrFolderMetaId) return null;

  try {
    const result = (
      await db
        .select()
        .from(requestMetaTabTable)
        .where(
          eq(requestMetaTabTable.requestOrFolderMetaId, requestOrFolderMetaId)
        )
    )?.[0];

    return result;
  } catch (error) {
    console.error(error);
  }
};

export const createRequestMetaTab = async (payload) => {
  try {
    if (!payload.requestOrFolderMetaId)
      payload.requestOrFolderMetaId = (await getTabList())?.selectedTab;
    if (!payload.requestOrFolderMetaId) return false;

    const result = await db.insert(requestMetaTabTable).values({
      ...payload,
      requestOrFolderMetaId,
    });

    return result.rowsAffected > 0;
  } catch (error) {
    console.error(error);
  }
};

export const updateRequestMetaTab = async (payload = {}) => {
  try {
    let { requestOrFolderMetaId, ...rest } = payload;

    if (!requestOrFolderMetaId)
      requestOrFolderMetaId = (await getTabList())?.selectedTab;
    if (!requestOrFolderMetaId) return false;

    payload = rest;

    const requestMetaTabData = await db
      .select()
      .from(requestMetaTabTable)
      .where(
        eq(requestMetaTabTable.requestOrFolderMetaId, requestOrFolderMetaId)
      );

    let updated;

    if (!requestMetaTabData.length) {
      updated = await db.insert(requestMetaTabTable).values({
        ...rest,
        requestOrFolderMetaId,
      });
    } else {
      updated = await db
        .update(requestMetaTabTable)
        .set({
          ...rest,
        })
        .where(
          eq(requestMetaTabTable.requestOrFolderMetaId, requestOrFolderMetaId)
        );
    }

    return updated?.rowsAffected > 0;
  } catch (error) {
    console.error(error);
  }
};

export const deleteRequestMetaTab = async (requestOrFolderMetaId) => {
  try {
    if (!requestOrFolderMetaId)
      requestOrFolderMetaId = (await getTabList())?.selectedTab;

    if (!requestOrFolderMetaId) return null;

    const deleted = await db
      .delete(requestMetaTabTable)
      .where(
        eq(requestMetaTabTable.requestOrFolderMetaId, requestOrFolderMetaId)
      );

    return deleted.rowsAffected > 0;
  } catch (error) {
    console.error(error);
  }
};

/* 
payload = {
  oldId: newId ---> newId means duplicatedId
}
*/
export const duplicateRequestMetaTab = async (payload) => {
  try {
    if (!payload) return;
    const oldIds = Object.keys(payload);
    if (!oldIds.length) return;

    const existingRequestMetaTabData = await db
      .select()
      .from(requestMetaTabTable)
      .where(inArray(requestMetaTabTable.requestOrFolderMetaId, oldIds));

    if (!existingRequestMetaTabData.length) return true;

    /**
     * - Replacing oldId with duplicatedId
     * and only keeping url so that other things automatically generate by default
     */
    const duplicatePayload = existingRequestMetaTabData.map((tab) => {
      delete tab["id"];
      return {
        ...tab,
        requestOrFolderMetaId: payload[tab.requestOrFolderMetaId],
      };
    });

    const result = await db
      .insert(requestMetaTabTable)
      .values(duplicatePayload);

    return result.rowsAffected > 0;
  } catch (error) {
    console.error(error);
  }
};

export const replaceRequestMetaTab = async (payload = {}) => {
  try {
    const updatPayload = { ...payload };
    delete updatPayload["id"];
    delete updatPayload["requestOrFolderMetaId"];

    const result = await db
      .insert(requestMetaTabTable)
      .values({
        ...payload,
      })
      .onConflictDoUpdate({
        target: requestMetaTabTable.requestOrFolderMetaId,
        set: {
          ...updatPayload,
        },
      });

    return result.rowsAffected > 0;
  } catch (error) {
    console.error(error);
  }
};
