import { eq, inArray } from "drizzle-orm";
import { db } from "./index.js";
import { API_URL_DEFAULT_VALUE, apiUrlTable } from "./schema.js";
import { getTabList } from "./tabsDB.js";

/* id === requestOrFolderMetaId */
export const getApiUrlDB = async (id) => {
  try {
    if (!id) id = (await getTabList())?.selectedTab;
    if (!id) return null;

    return (
      (
        await db
          .select()
          .from(apiUrlTable)
          .where(eq(apiUrlTable.requestOrFolderMetaId, id))
      )?.[0] ?? { url: API_URL_DEFAULT_VALUE }
    );
  } catch (error) {
    console.error(error);
  }
};

export const createApiUrl = async (payload = {}) => {
  try {
    if (!("requestOrFolderMetaId" in payload))
      payload["requestOrFolderMetaId"] = (await getTabList())?.selectedTab;
    if (!payload.requestOrFolderMetaId) return false;

    const result = await db.insert(apiUrlTable).values(payload);
    return result.rowsAffected > 0;
  } catch (error) {
    console.error(error);
  }
};

/* 
payload = {
  oldId: newId ---> newId means duplicatedId
}
*/
export const duplicateApiUrl = async (payload) => {
  try {
    if (!payload) return;
    const oldIds = Object.keys(payload);
    if (!oldIds.length) return;

    const existingUrlData = await db
      .select()
      .from(apiUrlTable)
      .where(inArray(apiUrlTable.requestOrFolderMetaId, oldIds));

    if (!existingUrlData.length) return true;

    /**
     * - Replacing oldId with duplicatedId
     * and only keeping url so that other things automatically generate by default
     */
    const duplicatePayload = existingUrlData.map(
      ({ url, requestOrFolderMetaId }) => ({
        requestOrFolderMetaId: payload[requestOrFolderMetaId],
        url,
      })
    );

    const result = await db.insert(apiUrlTable).values(duplicatePayload);

    return result.rowsAffected > 0;
  } catch (error) {
    console.error(error);
  }
};

export const updateApiUrl = async (payload) => {
  if (!payload) return false;

  let { requestOrFolderMetaId, ...other } = payload;
  payload = other;

  if (!requestOrFolderMetaId)
    requestOrFolderMetaId = (await getTabList())?.selectedTab;
  if (!requestOrFolderMetaId) return false;

  delete payload["id"];
  delete payload["createdAt"];

  try {
    const isExist = (
      await db
        .select()
        .from(apiUrlTable)
        .where(eq(apiUrlTable.requestOrFolderMetaId, requestOrFolderMetaId))
    )?.[0];

    if (!isExist) {
      const result = await createApiUrl({
        requestOrFolderMetaId,
        ...payload,
      });
      return result.rowsAffected > 0;
    }

    const updated = await db
      .update(apiUrlTable)
      .set({
        ...payload,
      })
      .where(eq(apiUrlTable.requestOrFolderMetaId, requestOrFolderMetaId));
    return updated?.rowsAffected > 0;
  } catch (error) {
    console.error(error);
    return false;
  }
};

export const deleteApiUrlByRequestMetaId = async (requestOrFolderMetaId) => {
  try {
    if (!requestOrFolderMetaId)
      requestOrFolderMetaId = (await getTabList())?.selectedTab;
    if (!requestOrFolderMetaId) return false;

    const deleted = await db
      .delete(apiUrlTable)
      .where(eq(apiUrlTable.requestOrFolderMetaId, requestOrFolderMetaId));
    return deleted?.rowsAffected > 0;
  } catch (error) {
    console.error(error);
    return false;
  }
};
