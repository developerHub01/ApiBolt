import { eq, inArray } from "drizzle-orm";
import { db } from "@/main/db/index.js";
import { metaShowColumnTable } from "@/main/db/schema.js";
import { getTabList } from "@/main/db/tabsDB.js";
import { ElectronAPIMetaShowColumnInterface } from "@shared/types/api/electron-meta-show-column";

// const metaColumnList = [
//   "paramsValue",
//   "paramsDescription",
//   "headersValue",
//   "headersDescription",
//   "formDataValue",
//   "formDataDescription",
//   "xWWWFormUrlencodedValue",
//   "xWWWFormUrlencodedDescription"
// ];

export const getMetaShowColumn: ElectronAPIMetaShowColumnInterface["getMetaShowColumn"] =
  async requestOrFolderMetaId => {
    try {
      requestOrFolderMetaId =
        requestOrFolderMetaId ?? (await getTabList())?.selectedTab;
      if (!requestOrFolderMetaId) throw new Error();

      const result = (
        await db
          .select()
          .from(metaShowColumnTable)
          .where(
            eq(
              metaShowColumnTable.requestOrFolderMetaId,
              requestOrFolderMetaId,
            ),
          )
      )?.[0];

      return result;
    } catch (error) {
      console.error(error);
      return null;
    }
  };

export const createMetaShowColumn: ElectronAPIMetaShowColumnInterface["createMetaShowColumn"] =
  async (payload = {}) => {
    try {
      const requestOrFolderMetaId =
        payload.requestOrFolderMetaId ?? (await getTabList())?.selectedTab;
      if (!requestOrFolderMetaId) throw new Error();

      return (
        (
          await db.insert(metaShowColumnTable).values({
            ...payload,
            requestOrFolderMetaId,
          })
        )?.rowsAffected > 0
      );
    } catch (error) {
      console.error(error);
      return false;
    }
  };

export const updateMetaShowColumn: ElectronAPIMetaShowColumnInterface["updateMetaShowColumn"] =
  async payload => {
    try {
      const requestOrFolderMetaId =
        payload.requestOrFolderMetaId ?? (await getTabList())?.selectedTab;
      if (!requestOrFolderMetaId) throw new Error();

      const isExist = (
        await db
          .select()
          .from(metaShowColumnTable)
          .where(
            eq(
              metaShowColumnTable.requestOrFolderMetaId,
              requestOrFolderMetaId,
            ),
          )
      )?.[0];

      if (!isExist)
        await createMetaShowColumn({
          requestOrFolderMetaId,
        });

      return (
        (
          await db
            .update(metaShowColumnTable)
            .set({
              ...payload,
            })
            .where(
              eq(
                metaShowColumnTable.requestOrFolderMetaId,
                requestOrFolderMetaId,
              ),
            )
        )?.rowsAffected > 0
      );
    } catch (error) {
      console.error(error);
      return false;
    }
  };

export const deleteMetaShowColumn: ElectronAPIMetaShowColumnInterface["deleteMetaShowColumn"] =
  async requestOrFolderMetaId => {
    try {
      requestOrFolderMetaId =
        requestOrFolderMetaId ?? (await getTabList())?.selectedTab;
      if (!requestOrFolderMetaId) throw new Error();

      return (
        (
          await db
            .delete(metaShowColumnTable)
            .where(
              eq(
                metaShowColumnTable.requestOrFolderMetaId,
                requestOrFolderMetaId,
              ),
            )
        )?.rowsAffected > 0
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
export const duplicateMetaShowColumn: ElectronAPIMetaShowColumnInterface["duplicateMetaShowColumn"] =
  async payload => {
    try {
      if (!payload) throw new Error();
      const oldIds = Object.keys(payload);
      if (!oldIds.length) throw new Error();

      const existingMetaShowColumn = await db
        .select()
        .from(metaShowColumnTable)
        .where(inArray(metaShowColumnTable.requestOrFolderMetaId, oldIds));

      if (!existingMetaShowColumn.length) return true;

      /**
       * - Replacing oldId with duplicatedId
       * and only keeping url so that other things automatically generate by default
       */
      const duplicatePayload = existingMetaShowColumn.map(meta => {
        const { id, createdAt, ...rest } = meta;
        return {
          ...rest,
          requestOrFolderMetaId: payload[meta.requestOrFolderMetaId],
        };
      });

      return (
        (await db.insert(metaShowColumnTable).values(duplicatePayload))
          .rowsAffected > 0
      );
    } catch (error) {
      console.error(error);
      return false;
    }
  };
