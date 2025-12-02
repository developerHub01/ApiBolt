import { eq, inArray } from "drizzle-orm";
import { db } from "./index.js";
import { folderTable } from "./schema.js";
import { getActiveProject } from "./projectsDB.js";
import { getTabList } from "./tabsDB.js";

/* folder meta id */
export const getFolder = async (requestOrFolderMetaId) => {
  try {
    if (!requestOrFolderMetaId)
      requestOrFolderMetaId = (await getTabList())?.selectedTab;
    if (!requestOrFolderMetaId) return null;

    const result = (
      await db
        .select()
        .from(folderTable)
        .where(eq(folderTable.requestOrFolderMetaId, requestOrFolderMetaId))
    )?.[0];

    if (!result) return result;

    return {
      title: result.title,
      description: result.description,
    };
  } catch (error) {
    console.error(error);
  }
};
/* 
payload = {
  title?: string,
  description?: string,
  requestOrFolderMetaId: string
}
*/
export const updateFolder = async (payload) => {
  try {
    if (!payload || typeof payload !== "object") return false;
    let requestOrFolderMetaId = payload.requestOrFolderMetaId;

    if (!requestOrFolderMetaId)
      requestOrFolderMetaId = (await getTabList())?.selectedTab;
    if (!requestOrFolderMetaId) return false;

    let updated;
    const folderData = (
      await db
        .select()
        .from(folderTable)
        .where(eq(folderTable.requestOrFolderMetaId, requestOrFolderMetaId))
    )?.[0];

    if (!folderData) {
      const activeProject = await getActiveProject();
      updated = await db.insert(folderTable).values({
        ...payload,
        requestOrFolderMetaId,
        projectId: activeProject,
      });
    } else {
      updated = await db
        .update(folderTable)
        .set({
          ...payload,
        })
        .where(eq(folderTable.requestOrFolderMetaId, requestOrFolderMetaId));
    }

    return updated?.rowsAffected > 0;
  } catch (error) {
    console.error(error);
  }
};

/* 
payload = {
  oldId: newId ---> newId means duplicatedId
}
*/
export const duplicateFolder = async (payload) => {
  try {
    if (!payload) return;
    const oldIds = Object.keys(payload);
    if (!oldIds.length) return;

    const existingFolderData = await db
      .select()
      .from(folderTable)
      .where(inArray(folderTable.requestOrFolderMetaId, oldIds));

    if (!existingFolderData.length) return true;

    /**
     * - Replacing oldId with duplicatedId
     * and only keeping url so that other things automatically generate by default
     */
    const duplicatePayload = existingFolderData.map((folder) => {
      delete folder["id"];
      return {
        ...folder,
        requestOrFolderMetaId: payload[folder.requestOrFolderMetaId],
      };
    });

    const result = await db.insert(folderTable).values(duplicatePayload);

    return result.rowsAffected > 0;
  } catch (error) {
    console.error(error);
  }
};
