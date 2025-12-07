import { eq, inArray } from "drizzle-orm";
import { db } from "@/main/db/index.js";
import { requestMetaTabTable } from "@/main/db/schema.js";
import { getTabList } from "@/main/db/tabsDB.js";
import { ElectronAPIRequestMetaTabInterface } from "@shared/types/api/electron-request-meta-tab";

export const getRequestMetaTab: ElectronAPIRequestMetaTabInterface["getRequestMetaTab"] =
  async requestOrFolderMetaId => {
    requestOrFolderMetaId = requestOrFolderMetaId ?? (await getTabList())?.selectedTab;
    if (!requestOrFolderMetaId) throw Error();

    try {
      return (
        (
          await db
            .select()
            .from(requestMetaTabTable)
            .where(
              eq(
                requestMetaTabTable.requestOrFolderMetaId,
                requestOrFolderMetaId,
              ),
            )
        )?.[0] ?? null
      );
    } catch (error) {
      console.error(error);
      return null;
    }
  };

export const createRequestMetaTab: ElectronAPIRequestMetaTabInterface["createRequestMetaTab"] =
  async payload => {
    try {
      const tabId =
        payload.requestOrFolderMetaId ?? (await getTabList())?.selectedTab;
      if (!tabId) throw Error();

      return (
        (
          await db.insert(requestMetaTabTable).values({
            ...payload,
            requestOrFolderMetaId: tabId,
          })
        )?.rowsAffected > 0
      );
    } catch (error) {
      console.error(error);
      return false;
    }
  };

export const updateRequestMetaTab: ElectronAPIRequestMetaTabInterface["updateRequestMetaTab"] =
  async (payload = {}) => {
    try {
      const tabId =
        payload.requestOrFolderMetaId ?? (await getTabList())?.selectedTab;
      if (!tabId) throw Error();

      const requestMetaTabData = (
        await db
          .select()
          .from(requestMetaTabTable)
          .where(eq(requestMetaTabTable.requestOrFolderMetaId, tabId))
      )?.[0];

      if (!requestMetaTabData) {
        await db.insert(requestMetaTabTable).values({
          ...payload,
          requestOrFolderMetaId: tabId,
        });
      } else {
        const { requestOrFolderMetaId, ...updatePayload } = payload;
        await db
          .update(requestMetaTabTable)
          .set({
            ...updatePayload,
          })
          .where(eq(requestMetaTabTable.requestOrFolderMetaId, tabId));
      }

      return true;
    } catch (error) {
      console.error(error);
      return false;
    }
  };

export const deleteRequestMetaTab: ElectronAPIRequestMetaTabInterface["deleteRequestMetaTab"] =
  async requestOrFolderMetaId => {
    try {
        requestOrFolderMetaId = requestOrFolderMetaId ??(await getTabList())?.selectedTab;
      if (!requestOrFolderMetaId) throw Error();

      await db
        .delete(requestMetaTabTable)
        .where(
          eq(requestMetaTabTable.requestOrFolderMetaId, requestOrFolderMetaId),
        );

      return true;
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
export const duplicateRequestMetaTab: ElectronAPIRequestMetaTabInterface["duplicateRequestMetaTab"] =
  async payload => {
    try {
      if (!payload) throw new Error();
      const oldIds = Object.keys(payload);
      if (!oldIds.length) throw new Error();

      const existingRequestMetaTabData = await db
        .select()
        .from(requestMetaTabTable)
        .where(inArray(requestMetaTabTable.requestOrFolderMetaId, oldIds));

      if (!existingRequestMetaTabData.length) return true;

      /**
       * - Replacing oldId with duplicatedId
       * and only keeping url so that other things automatically generate by default
       */
      const duplicatePayload = existingRequestMetaTabData.map(tab => {
        const { id, ...updatePayload } = tab;
        return {
          ...updatePayload,
          requestOrFolderMetaId: payload[tab.requestOrFolderMetaId],
        };
      });

      return (
        (await db.insert(requestMetaTabTable).values(duplicatePayload))
          ?.rowsAffected > 0
      );
    } catch (error) {
      console.error(error);
      return false;
    }
  };

export const replaceRequestMetaTab: ElectronAPIRequestMetaTabInterface["replaceRequestMetaTab"] =
  async (payload = {}) => {
    try {
      const { requestOrFolderMetaId, ...updatPayload } = payload;
      if (!requestOrFolderMetaId) throw new Error();

      const result = await db
        .insert(requestMetaTabTable)
        .values({
          ...updatPayload,
          requestOrFolderMetaId,
        })
        .onConflictDoUpdate({
          target: requestMetaTabTable.requestOrFolderMetaId,
          set: {
            ...updatPayload,
          },
        });

      return result.rowsAffected > 0;
    } catch (error) {
      console.error(error);
      return false;
    }
  };
