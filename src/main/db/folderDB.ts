import { eq, inArray } from "drizzle-orm";
import { db } from "@/main/db/index.js";
import { folderTable } from "@/main/db/schema.js";
import { getActiveProject } from "@/main/db/projectsDB.js";
import { getTabList } from "@/main/db/tabsDB.js";
import { ElectronAPIFolderInterface } from "@shared/types/api/electron-folder";

/* folder meta id */
export const getFolder: ElectronAPIFolderInterface["getFolder"] =
  async requestOrFolderMetaId => {
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
      if (!result) throw new Error();

      return {
        title: result.title,
        description: result.description,
      };
    } catch (error) {
      console.error(error);
      return null;
    }
  };

export const updateFolder: ElectronAPIFolderInterface["updateFolder"] =
  async payload => {
    try {
      if (!payload || typeof payload !== "object") throw new Error();
      const requestOrFolderMetaId =
        payload.requestOrFolderMetaId ?? (await getTabList())?.selectedTab;
      const activeProject = await getActiveProject();
      if (!requestOrFolderMetaId || !activeProject) throw new Error();

      const { requestOrFolderMetaId: _, ...updatePayload } = payload;

      return (
        (
          await db
            .insert(folderTable)
            .values({
              ...payload,
              requestOrFolderMetaId,
              projectId: activeProject,
            })
            .onConflictDoUpdate({
              target: [folderTable.requestOrFolderMetaId],
              set: {
                ...updatePayload,
              },
            })
        ).rowsAffected > 0
      );
    } catch (error) {
      console.error(error);
      return false;
    }
  };

/* 
payload = {
  oldId: newId ---> newId means duplicatedId
}
*/
export const duplicateFolder: ElectronAPIFolderInterface["duplicateFolder"] =
  async payload => {
    try {
      if (!payload) throw new Error();
      const oldIds = Object.keys(payload);
      if (!oldIds.length) throw new Error();

      const existingFolderData = await db
        .select()
        .from(folderTable)
        .where(inArray(folderTable.requestOrFolderMetaId, oldIds));

      if (!existingFolderData.length) return true;

      /**
       * - Replacing oldId with duplicatedId
       * and only keeping url so that other things automatically generate by default
       */
      const duplicatePayload = existingFolderData.map(folder => {
        const { id, ...folderPayload } = folder;
        return {
          ...folderPayload,
          requestOrFolderMetaId: payload[folder.requestOrFolderMetaId],
        };
      });

      const result = await db.insert(folderTable).values(duplicatePayload);

      return result.rowsAffected > 0;
    } catch (error) {
      console.error(error);
      return false;
    }
  };
