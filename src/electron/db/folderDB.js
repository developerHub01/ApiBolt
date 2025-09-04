import { eq } from "drizzle-orm";
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
    console.log(error);
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

    return updated?.changes > 0;
  } catch (error) {
    console.log(error);
  }
};
