import { and, eq, inArray } from "drizzle-orm";
import { db } from "./index.js";
import { requestMetaTabTable } from "./schema.js";
import { getTabList } from "./tabsDB.js";
import { getActiveProject } from "./projectsDB.js";

export const getRequestMetaTab = async (requestOrFolderMetaId) => {
  if (!requestOrFolderMetaId)
    requestOrFolderMetaId = (await getTabList())?.selectedTab;
  const projectId = await getActiveProject();

  if (!requestOrFolderMetaId || !projectId) return null;

  try {
    const result = (
      await db
        .select()
        .from(requestMetaTabTable)
        .where(
          and(
            eq(
              requestMetaTabTable.requestOrFolderMetaId,
              requestOrFolderMetaId
            ),
            eq(requestMetaTabTable.projectId, projectId)
          )
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
    if (!payload.projectId) payload.projectId = await getActiveProject();
    if (!payload.requestOrFolderMetaId || !payload.projectId) return false;

    const result = await db.insert(requestMetaTabTable).values({
      ...payload,
      requestOrFolderMetaId,
      projectId: payload.projectId,
    });

    return result.rowsAffected > 0;
  } catch (error) {
    console.error(error);
  }
};

export const updateRequestMetaTab = async (payload = {}) => {
  try {
    let { requestOrFolderMetaId, projectId, ...rest } = payload;

    if (!requestOrFolderMetaId)
      requestOrFolderMetaId = (await getTabList())?.selectedTab;
    if (!projectId) projectId = await getActiveProject();
    if (!requestOrFolderMetaId || !projectId) return false;

    payload = rest;

    const requestMetaTabData = await db
      .select()
      .from(requestMetaTabTable)
      .where(
        and(
          eq(requestMetaTabTable.requestOrFolderMetaId, requestOrFolderMetaId),
          eq(requestMetaTabTable.projectId, projectId)
        )
      );

    let updated;

    if (!requestMetaTabData.length) {
      updated = await db.insert(requestMetaTabTable).values({
        ...rest,
        requestOrFolderMetaId,
        projectId,
      });
    } else {
      updated = await db
        .update(requestMetaTabTable)
        .set({
          ...rest,
        })
        .where(
          and(
            eq(
              requestMetaTabTable.requestOrFolderMetaId,
              requestOrFolderMetaId
            ),
            eq(requestMetaTabTable.projectId, projectId)
          )
        );
    }

    return true;
  } catch (error) {
    console.error(error);
  }
};

export const deleteRequestMetaTab = async (requestOrFolderMetaId) => {
  try {
    if (!requestOrFolderMetaId)
      requestOrFolderMetaId = (await getTabList())?.selectedTab;
    const projectId = await getActiveProject();

    if (!requestOrFolderMetaId || !projectId) return false;

    await db
      .delete(requestMetaTabTable)
      .where(
        and(
          eq(requestMetaTabTable.requestOrFolderMetaId, requestOrFolderMetaId),
          eq(requestMetaTabTable.projectId, projectId)
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
export const duplicateRequestMetaTab = async (payload) => {
  try {
    if (!payload) return;
    const oldIds = Object.keys(payload);
    const projectId = await getActiveProject();
    if (!oldIds.length || !projectId) return;

    const existingRequestMetaTabData = await db
      .select()
      .from(requestMetaTabTable)
      .where(
        and(
          inArray(requestMetaTabTable.requestOrFolderMetaId, oldIds),
          eq(requestMetaTabTable.projectId, projectId)
        )
      );

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
        projectId,
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
    delete updatPayload["projectId"];

    const result = await db
      .insert(requestMetaTabTable)
      .values({
        ...payload,
      })
      .onConflictDoUpdate({
        target: [
          requestMetaTabTable.requestOrFolderMetaId,
          requestMetaTabTable.projectId,
        ],
        set: {
          ...updatPayload,
        },
      });

    return result.rowsAffected > 0;
  } catch (error) {
    console.error(error);
  }
};
