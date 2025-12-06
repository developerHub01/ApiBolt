import { eq, inArray } from "drizzle-orm";
import { db } from "@/main/db/index.js";
import { showHiddenMetaDataTable } from "@/main/db/schema.js";
import { getRequestOrFolderMetaById } from "@/main/db/requestOrFolderMetaDB.js";
import { getTabList } from "@/main/db/tabsDB.js";
import { ElectronAPIShowHiddenMetaDataInterface } from "@shared/types/api/electron-show-hidden-meta-data";

/* id === requestOrFolderMetaId */
export const getShowHiddenMetaData: ElectronAPIShowHiddenMetaDataInterface["getShowHiddenMetaData"] =
  async id => {
    try {
      id = id ?? (await getTabList())?.selectedTab;
      if (!id) throw new Error();
      if (!(await getRequestOrFolderMetaById(id))) throw new Error();

      return (
        await db
          .select()
          .from(showHiddenMetaDataTable)
          .where(eq(showHiddenMetaDataTable.requestOrFolderMetaId, id))
      )?.[0];
    } catch (error) {
      console.error(error);
      return null;
    }
  };

export const createShowHiddenMetaData: ElectronAPIShowHiddenMetaDataInterface["createShowHiddenMetaData"] =
  async payload => {
    try {
      if (!payload) throw new Error();
      const requestOrFolderMetaId =
        payload.requestOrFolderMetaId ?? (await getTabList()).selectedTab;
      if (!requestOrFolderMetaId) throw new Error();

      if (typeof payload === "object" && !Object.keys(payload).length)
        return null;

      const existingData = (
        await db
          .select()
          .from(showHiddenMetaDataTable)
          .where(
            eq(
              showHiddenMetaDataTable.requestOrFolderMetaId,
              requestOrFolderMetaId,
            ),
          )
      )?.[0];

      if (existingData)
        return await updateShowHiddenMetaData({
          ...payload,
          requestOrFolderMetaId,
        });

      return (
        await db
          .insert(showHiddenMetaDataTable)
          .values({
            ...payload,
            requestOrFolderMetaId,
          })
          .returning()
      )?.[0];
    } catch (error) {
      console.error(error);
      return null;
    }
  };

export const updateShowHiddenMetaData: ElectronAPIShowHiddenMetaDataInterface["updateShowHiddenMetaData"] =
  async payload => {
    if (!payload) throw new Error();
    const requestOrFolderMetaId =
      payload.requestOrFolderMetaId ?? (await getTabList()).selectedTab;
    if (!requestOrFolderMetaId) throw new Error();

    try {
      const isExist = (
        await db
          .select()
          .from(showHiddenMetaDataTable)
          .where(
            eq(
              showHiddenMetaDataTable.requestOrFolderMetaId,
              requestOrFolderMetaId,
            ),
          )
      )?.[0];

      if (!isExist)
        await createShowHiddenMetaData({
          requestOrFolderMetaId,
        });

      return (
        await db
          .update(showHiddenMetaDataTable)
          .set({
            ...payload,
          })
          .where(
            eq(
              showHiddenMetaDataTable.requestOrFolderMetaId,
              requestOrFolderMetaId,
            ),
          )
          .returning()
      )?.[0];
    } catch (error) {
      console.error(error);
      return null;
    }
  };

/* 
payload = {
  oldId: newId ---> newId means duplicatedId
}
*/
export const duplicateShowHiddenMetaData: ElectronAPIShowHiddenMetaDataInterface["duplicateShowHiddenMetaData"] =
  async payload => {
    try {
      if (!payload) throw new Error();
      const oldIds = Object.keys(payload);
      if (!oldIds.length) throw new Error();

      const existingShowHiddenMetaData = await db
        .select()
        .from(showHiddenMetaDataTable)
        .where(inArray(showHiddenMetaDataTable.requestOrFolderMetaId, oldIds));

      if (!existingShowHiddenMetaData.length) return true;

      /**
       * - Replacing oldId with duplicatedId
       * and only keeping url so that other things automatically generate by default
       */
      const duplicatePayload = existingShowHiddenMetaData.map(metaData => {
        const { id, ...rest } = metaData;
        return {
          ...rest,
          requestOrFolderMetaId: payload[metaData.requestOrFolderMetaId],
        };
      });

      return (
        (await db.insert(showHiddenMetaDataTable).values(duplicatePayload))
          .rowsAffected > 0
      );
    } catch (error) {
      console.error(error);
      return false;
    }
  };
