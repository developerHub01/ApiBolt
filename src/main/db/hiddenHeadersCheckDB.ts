import { eq, inArray } from "drizzle-orm";
import { db } from "@/main/db/index.js";
import { hiddenHeadersCheckTable } from "@/main/db/schema.js";
import { getTabList } from "@/main/db/tabsDB.js";
import { ElectronAPIHiddenHeadersCheckInterface } from "@shared/types/api/electron-hidden-headers-check";

/* id === requestOrFolderMetaId */
export const getHiddenHeadersCheck: ElectronAPIHiddenHeadersCheckInterface["getHiddenHeadersCheck"] =
  async id => {
    try {
      id = id ?? (await getTabList())?.selectedTab;
      if (!id) throw new Error();

      return (
        await db
          .select()
          .from(hiddenHeadersCheckTable)
          .where(eq(hiddenHeadersCheckTable.requestOrFolderMetaId, id))
      )?.[0];
    } catch (error) {
      console.error(error);
      return null;
    }
  };

export const createHiddenHeadersCheck: ElectronAPIHiddenHeadersCheckInterface["createHiddenHeadersCheck"] =
  async payload => {
    try {
      const requestOrFolderMetaId =
        payload.requestOrFolderMetaId ?? (await getTabList())?.selectedTab;
      if (!requestOrFolderMetaId) throw new Error();

      if (typeof payload === "object" && !Object.keys(payload).length)
        throw new Error();

      return (
        await db
          .insert(hiddenHeadersCheckTable)
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

export const updateHiddenHeadersCheck: ElectronAPIHiddenHeadersCheckInterface["updateHiddenHeadersCheck"] =
  async payload => {
    if (!payload) throw new Error();

    const requestOrFolderMetaId =
      payload.requestOrFolderMetaId ?? (await getTabList())?.selectedTab;
    if (!requestOrFolderMetaId) throw new Error();

    if (typeof payload === "object" && !Object.keys(payload).length)
      throw new Error();

    try {
      return (
        await db
          .update(hiddenHeadersCheckTable)
          .set({
            ...payload,
            requestOrFolderMetaId: payload.requestOrFolderMetaId ?? undefined,
          })
          .where(
            eq(
              hiddenHeadersCheckTable.requestOrFolderMetaId,
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
export const duplicateHiddenHeadersCheck: ElectronAPIHiddenHeadersCheckInterface["duplicateHiddenHeadersCheck"] =
  async payload => {
    try {
      if (!payload) throw new Error();
      const oldIds = Object.keys(payload);
      if (!oldIds.length) throw new Error();

      const existingHeadersCheckData = await db
        .select()
        .from(hiddenHeadersCheckTable)
        .where(inArray(hiddenHeadersCheckTable.requestOrFolderMetaId, oldIds));

      if (!existingHeadersCheckData.length) return true;

      /**
       * - Replacing oldId with duplicatedId
       * and only keeping url so that other things automatically generate by default
       */
      const duplicatePayload = existingHeadersCheckData.map(headersCheck => {
        const { id, ...rest } = headersCheck;
        return {
          ...rest,
          requestOrFolderMetaId: payload[headersCheck.requestOrFolderMetaId],
        };
      });

      return (
        (await db.insert(hiddenHeadersCheckTable).values(duplicatePayload))
          .rowsAffected > 0
      );
    } catch (error) {
      console.error(error);
      return false;
    }
  };
