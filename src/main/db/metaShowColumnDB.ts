import { eq, inArray } from "drizzle-orm";
import { db } from "@/main/db/index.js";
import { metaShowColumnTable } from "@/main/db/schema.js";
import { getTabList } from "@/main/db/tabsDB.js";

const metaColumnList = [
  "paramsValue",
  "paramsDescription",
  "headersValue",
  "headersDescription",
  "formDataValue",
  "formDataDescription",
  "xWWWFormUrlencodedValue",
  "xWWWFormUrlencodedDescription",
];

export const getMetaShowColumn = async (requestOrFolderMetaId) => {
  try {
    const result = (
      await db
        .select()
        .from(metaShowColumnTable)
        .where(
          eq(metaShowColumnTable.requestOrFolderMetaId, requestOrFolderMetaId)
        )
    )?.[0];

    for (const key in result) {
      if (metaColumnList.includes(key)) result[key] = Boolean(result[key]);
    }

    return result;
  } catch (error) {
    console.error(error);
  }
};

export const createMetaShowColumn = async (payload = {}) => {
  try {
    if (!("requestOrFolderMetaId" in payload))
      payload["requestOrFolderMetaId"] = (await getTabList())?.selectedTab;
    if (!payload.requestOrFolderMetaId) return false;

    const result = await db.insert(metaShowColumnTable).values(payload);

    return result?.rowsAffected > 0;
  } catch (error) {
    console.error(error);
  }
};

export const updateMetaShowColumn = async (payload) => {
  if (!payload) return false;

  let requestOrFolderMetaId = payload.requestOrFolderMetaId;

  if (!requestOrFolderMetaId)
    requestOrFolderMetaId = (await getTabList())?.selectedTab;
  if (!requestOrFolderMetaId) return false;

  delete payload["id"];
  delete payload["requestOrFolderMetaId"];
  delete payload["createdAt"];

  for (const key in payload) {
    if (typeof payload[key] === "boolean") payload[key] = Number(payload[key]);
  }

  try {
    const isExist = (
      await db
        .select()
        .from(metaShowColumnTable)
        .where(
          eq(metaShowColumnTable.requestOrFolderMetaId, requestOrFolderMetaId)
        )
    )?.[0];

    if (!isExist)
      await createMetaShowColumn({
        requestOrFolderMetaId,
      });

    const updated = await db
      .update(metaShowColumnTable)
      .set({
        ...payload,
      })
      .where(
        eq(metaShowColumnTable.requestOrFolderMetaId, requestOrFolderMetaId)
      );
    return updated?.rowsAffected > 0;
  } catch (error) {
    console.error(error);
  }
};

export const deleteMetaShowColumn = async (requestOrFolderMetaId) => {
  try {
    const deleted = await db
      .delete(metaShowColumnTable)
      .where(
        eq(metaShowColumnTable.requestOrFolderMetaId, requestOrFolderMetaId)
      );

    return deleted?.rowsAffected > 0;
  } catch (error) {
    console.error(error);
  }
};

/* 
payload = {
  oldId: newId ---> newId means duplicatedId
}
*/
export const duplicateMetaShowColumn = async (payload) => {
  try {
    if (!payload) return;
    const oldIds = Object.keys(payload);
    if (!oldIds.length) return;

    const existingMetaShowColumn = await db
      .select()
      .from(metaShowColumnTable)
      .where(inArray(metaShowColumnTable.requestOrFolderMetaId, oldIds));

    if (!existingMetaShowColumn.length) return true;

    /**
     * - Replacing oldId with duplicatedId
     * and only keeping url so that other things automatically generate by default
     */
    const duplicatePayload = existingMetaShowColumn.map((meta) => {
      delete meta["id"];
      delete meta["createdAt"];
      return {
        ...meta,
        requestOrFolderMetaId: payload[meta.requestOrFolderMetaId],
      };
    });

    const result = await db
      .insert(metaShowColumnTable)
      .values(duplicatePayload);

    return result.rowsAffected > 0;
  } catch (error) {
    console.error(error);
  }
};
