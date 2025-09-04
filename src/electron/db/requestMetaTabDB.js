import { eq } from "drizzle-orm";
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
    console.log(error);
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

    return result.changes > 0;
  } catch (error) {
    console.log(error);
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

    return updated?.changes > 0;
  } catch (error) {
    console.log(error);
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

    return deleted.changes > 0;
  } catch (error) {
    console.log(error);
  }
};
