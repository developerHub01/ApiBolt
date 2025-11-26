import { and, eq, inArray } from "drizzle-orm";
import { db } from "./index.js";
import { API_URL_DEFAULT_VALUE, apiUrlTable } from "./schema.js";
import { getTabList } from "./tabsDB.js";
import { getActiveProject } from "./projectsDB.js";

/* id === requestOrFolderMetaId */
export const getApiUrlDB = async (id) => {
  try {
    if (!id) id = (await getTabList())?.selectedTab;
    if (!id) return null;
    const projectId = await getActiveProject();

    return (
      (
        await db
          .select()
          .from(apiUrlTable)
          .where(
            and(
              eq(apiUrlTable.requestOrFolderMetaId, id),
              eq(apiUrlTable.projectId, projectId)
            )
          )
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
    if (!("projectId" in payload))
      payload["projectId"] = await getActiveProject();
    if (!payload.requestOrFolderMetaId || !payload.projectId) return false;

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
    const projectId = await getActiveProject();

    if (!payload) return;
    const oldIds = Object.keys(payload);
    if (!oldIds.length || !projectId) return;

    const existingUrlData = await db
      .select()
      .from(apiUrlTable)
      .where(
        and(
          inArray(apiUrlTable.requestOrFolderMetaId, oldIds),
          eq(apiUrlTable.projectId, projectId)
        )
      );

    if (!existingUrlData.length) return true;

    /**
     * - Replacing oldId with duplicatedId
     * and only keeping url so that other things automatically generate by default
     */
    const duplicatePayload = existingUrlData.map(
      ({ url, requestOrFolderMetaId }) => ({
        requestOrFolderMetaId: payload[requestOrFolderMetaId],
        projectId,
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

  let { requestOrFolderMetaId, projectId, ...other } = payload;
  payload = other;

  if (!requestOrFolderMetaId)
    requestOrFolderMetaId = (await getTabList())?.selectedTab;
  if (!projectId) projectId = await getActiveProject();
  if (!requestOrFolderMetaId || !projectId) return false;

  delete payload["id"];
  delete payload["createdAt"];

  try {
    const isExist = (
      await db
        .select()
        .from(apiUrlTable)
        .where(
          and(
            eq(apiUrlTable.requestOrFolderMetaId, requestOrFolderMetaId),
            eq(apiUrlTable.projectId, projectId)
          )
        )
    )?.[0];

    if (!isExist) {
      await createApiUrl({
        requestOrFolderMetaId,
        projectId,
        ...payload,
      });
      return true;
    }

    await db
      .update(apiUrlTable)
      .set({
        ...payload,
      })
      .where(
        and(
          eq(apiUrlTable.requestOrFolderMetaId, requestOrFolderMetaId),
          eq(apiUrlTable.projectId, projectId)
        )
      );
    return true;
  } catch (error) {
    console.error(error);
    return false;
  }
};

export const deleteApiUrlByRequestMetaId = async (requestOrFolderMetaId) => {
  try {
    const projectId = await getActiveProject();

    if (!requestOrFolderMetaId)
      requestOrFolderMetaId = (await getTabList())?.selectedTab;
    if (!requestOrFolderMetaId || !projectId) return false;

    await db
      .delete(apiUrlTable)
      .where(
        and(
          eq(apiUrlTable.requestOrFolderMetaId, requestOrFolderMetaId),
          eq(apiUrlTable.projectId, projectId)
        )
      );
    return true;
  } catch (error) {
    console.error(error);
    return false;
  }
};
