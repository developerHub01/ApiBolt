import { eq } from "drizzle-orm";
import { db } from "./index.js";
import { API_URL_DEFAULT_VALUE, apiUrlTable } from "./schema.js";
import { getTabList } from "./tabsDB.js";

/* id === requestOrFolderMetaId */
export const getApiUrlDB = async (id) => {
  try {
    if (!id) id = (await getTabList())?.selectedTab;
    if (!id) return [];

    return (
      (
        await db
          .select()
          .from(apiUrlTable)
          .where(eq(apiUrlTable.requestOrFolderMetaId, id))
      )?.[0] ?? { url: API_URL_DEFAULT_VALUE }
    );
  } catch (error) {
    console.log(error);
  }
};

export const createApiUrl = async (payload = {}) => {
  try {
    if (!("requestOrFolderMetaId" in payload))
      payload["requestOrFolderMetaId"] = (await getTabList())?.selectedTab;
    if (!payload.requestOrFolderMetaId) return false;

    const result = await db.insert(apiUrlTable).values(payload);
    return result.changes > 0;
  } catch (error) {
    console.log(error);
  }
};

export const updateApiUrl = async (requestOrFolderMetaId, payload) => {
  if (!payload) return false;

  delete payload["id"];
  delete payload["requestOrFolderMetaId"];
  delete payload["createdAt"];

  try {
    const isExist = (
      await db
        .select()
        .from(apiUrlTable)
        .where(eq(apiUrlTable.requestOrFolderMetaId, requestOrFolderMetaId))
    )?.[0];

    if (!isExist)
      await createApiUrl({
        requestOrFolderMetaId,
      });

    const updated = await db
      .update(apiUrlTable)
      .set({
        ...payload,
      })
      .where(eq(apiUrlTable.id, requestOrFolderMetaId));
    return updated?.changes > 0;
  } catch (error) {
    console.log(error);
  }
};
