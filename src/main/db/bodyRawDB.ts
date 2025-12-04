import { eq, inArray } from "drizzle-orm";
import { db } from "@/main/db/index.js";
import { bodyRawTable } from "@/main/db/schema.js";
import { getTabList } from "@/main/db/tabsDB.js";
import { ElectronAPIBodyRawInterface } from "@/shared/types/api/electron-body-raw";

export const getBodyRaw: ElectronAPIBodyRawInterface["getBodyRaw"] =
  async requestOrFolderMetaId => {
    requestOrFolderMetaId =
      requestOrFolderMetaId ?? (await getTabList())?.selectedTab;
    if (!requestOrFolderMetaId) throw new Error();

    try {
      return (
        await db
          .select()
          .from(bodyRawTable)
          .where(eq(bodyRawTable.requestOrFolderMetaId, requestOrFolderMetaId))
      )?.[0];
    } catch (error) {
      console.error(error);
      return null;
    }
  };

export const createBodyRaw: ElectronAPIBodyRawInterface["createBodyRaw"] =
  async payload => {
    try {
      const requestOrFolderMetaId =
        payload.requestOrFolderMetaId ?? (await getTabList())?.selectedTab;
      if (!requestOrFolderMetaId) throw new Error();

      return (
        (
          await db.insert(bodyRawTable).values({
            ...payload,
            requestOrFolderMetaId
          })
        ).rowsAffected > 0
      );
    } catch (error) {
      console.error(error);
      return false;
    }
  };

export const updateBodyRaw: ElectronAPIBodyRawInterface["updateBodyRaw"] =
  async payload => {
    try {
      const requestOrFolderMetaId =
        payload.requestOrFolderMetaId ?? (await getTabList())?.selectedTab;
      if (!requestOrFolderMetaId) throw new Error();

      const { requestOrFolderMetaId: _, ...updatePayload } = payload;

      return (
        (
          await db
            .insert(bodyRawTable)
            .values({
              ...payload,
              requestOrFolderMetaId
            })
            .onConflictDoUpdate({
              target: [bodyRawTable.requestOrFolderMetaId],
              set: {
                ...updatePayload
              }
            })
        ).rowsAffected > 0
      );
    } catch (error) {
      console.error(error);
      return false;
    }
  };

export const deleteBodyRawByRequestMetaId = async (
  requestOrFolderMetaId?: string | null
) => {
  try {
    requestOrFolderMetaId =
      requestOrFolderMetaId ?? (await getTabList())?.selectedTab;
    if (!requestOrFolderMetaId) throw new Error();

    return (
      (
        await db
          .delete(bodyRawTable)
          .where(eq(bodyRawTable.requestOrFolderMetaId, requestOrFolderMetaId))
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
export const duplicateBodyRaw: ElectronAPIBodyRawInterface["duplicateBodyRaw"] =
  async payload => {
    try {
      if (!payload) throw new Error();
      const oldIds = Object.keys(payload);
      if (!oldIds.length) throw new Error();

      const existingBodyRawData = await db
        .select()
        .from(bodyRawTable)
        .where(inArray(bodyRawTable.requestOrFolderMetaId, oldIds));

      if (!existingBodyRawData.length) return true;

      /**
       * - Replacing oldId with duplicatedId
       * and only keeping url so that other things automatically generate by default
       */
      const duplicatePayload = existingBodyRawData.map(raw => {
        const { id, ...rest } = raw;
        return {
          ...rest,
          requestOrFolderMetaId: payload[raw.requestOrFolderMetaId]
        };
      });

      return (
        (await db.insert(bodyRawTable).values(duplicatePayload)).rowsAffected >
        0
      );
    } catch (error) {
      console.error(error);
      return false;
    }
  };

export const replaceBodyRaw: ElectronAPIBodyRawInterface["replaceBodyRaw"] =
  async payload => {
    try {
      return await db.transaction(async tsx => {
        const { requestOrFolderMetaId, ...updatePayload } = payload;
        if (!requestOrFolderMetaId) throw new Error();

        await tsx
          .delete(bodyRawTable)
          .where(eq(bodyRawTable.requestOrFolderMetaId, requestOrFolderMetaId));

        if (Object.keys(updatePayload || {}).length)
          await tsx.insert(bodyRawTable).values({
            ...updatePayload,
            requestOrFolderMetaId
          });

        return true;
      });
    } catch (error) {
      console.error(error);
      return false;
    }
  };
