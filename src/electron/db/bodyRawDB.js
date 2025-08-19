import { eq } from "drizzle-orm";
import { db } from "./index.js";
import { bodyRawTable } from "./schema.js";
import { getTabList } from "./tabsDB.js";

/* id === requestId */
export const getBodyRaw = async (id) => {
  if (!id) id = (await getTabList())?.selectedTab;

  if (!id) return null;

  try {
    const result = (
      await db
        .select()
        .from(bodyRawTable)
        .where(eq(bodyRawTable.requestOrFolderMetaId, id))
    )?.[0];

    result["lineWrap"] = Boolean(result["lineWrap"]);

    return result;
  } catch (error) {
    console.log(error);
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

    return result.changes > 0;
  } catch (error) {
    console.log(error);
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

    return updated?.changes > 0;
  } catch (error) {
    console.log(error);
  }
};
