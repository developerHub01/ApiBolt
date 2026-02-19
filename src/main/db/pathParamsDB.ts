import { pathParamsTable } from "@/main/db/schema";
import { eq } from "drizzle-orm";
import { db } from "@/main/db/index.js";
import { getTabList } from "@/main/db/tabsDB.js";
import { ElectronAPIPathParamsInterface } from "@shared/types/api/electron-path-params";

/* id === requestOrFolderMetaId */
export const getPathParams: ElectronAPIPathParamsInterface["getPathParams"] =
  async id => {
    try {
      id = id ?? (await getTabList())?.selectedTab;
      if (!id) throw new Error();

      const result = (
        await db
          .select()
          .from(pathParamsTable)
          .where(eq(pathParamsTable.requestOrFolderMetaId, id))
      )?.[0];

      return JSON.parse(result.map);
    } catch (error) {
      console.error(error);
      return [];
    }
  };

export const deletePathParamsByRequestMetaId: ElectronAPIPathParamsInterface["deletePathParamsByRequestMetaId"] =
  async requestOrFolderMetaId => {
    try {
      requestOrFolderMetaId =
        requestOrFolderMetaId ?? (await getTabList())?.selectedTab;
      if (!requestOrFolderMetaId) throw new Error();

      return (
        (
          await db
            .delete(pathParamsTable)
            .where(
              eq(pathParamsTable.requestOrFolderMetaId, requestOrFolderMetaId),
            )
        ).rowsAffected > 0
      );
    } catch (error) {
      console.error(error);
      return false;
    }
  };

export const createPathParams: ElectronAPIPathParamsInterface["createPathParams"] =
  async (requestOrFolderMetaId, payload) => {
    try {
      requestOrFolderMetaId =
        requestOrFolderMetaId ?? (await getTabList())?.selectedTab;
      if (!requestOrFolderMetaId) throw new Error();

      const result = await db.insert(pathParamsTable).values({
        requestOrFolderMetaId,
        map: JSON.stringify(payload),
      });
      return result.rowsAffected > 0;
    } catch (error) {
      console.error(error);
      return false;
    }
  };

export const updatePathParams: ElectronAPIPathParamsInterface["updatePathParams"] =
  async (requestOrFolderMetaId, payload) => {
    try {
      if (!requestOrFolderMetaId) return false;

      return (
        (
          await db
            .insert(pathParamsTable)
            .values({
              requestOrFolderMetaId,
              map: JSON.stringify(payload),
            })
            .onConflictDoUpdate({
              target: [pathParamsTable.requestOrFolderMetaId],
              set: {
                map: JSON.stringify(payload),
              },
            })
        )?.rowsAffected > 0
      );
    } catch (error) {
      console.error(error);
      return false;
    }
  };
