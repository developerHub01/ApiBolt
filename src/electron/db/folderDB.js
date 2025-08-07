import { eq, count } from "drizzle-orm";
import { db } from "./index.js";
import { folderTable } from "./schema.js";
import { getActiveProject } from "./projectsDB.js";

/* folder meta id */
export const getFolder = async (requestOrFolderMetaId) => {
  try {
    return await db
      .select()
      .from(folderTable)
      .where(eq(folderTable.requestOrFolderMetaId, requestOrFolderMetaId));
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
    const { requestOrFolderMetaId } = payload;

    if (!requestOrFolderMetaId) return false;

    let updated;
    const folderData = await db
      .select()
      .from(folderTable)
      .where(eq(folderTable.requestOrFolderMetaId, requestOrFolderMetaId));

    if (!folderData) {
      const activeProject = await getActiveProject();
      updated = await db.insert(folderTable).values({
        ...payload,
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
