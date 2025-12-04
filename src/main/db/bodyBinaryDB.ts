import { eq, inArray } from "drizzle-orm";
import { db } from "@/main/db/index.js";
import { bodyBinaryTable } from "@/main/db/schema.js";
import { getTabList } from "@/main/db/tabsDB.js";
import { ElectronAPIBodyBinaryInterface } from "@/shared/types/api/electron-body-binary";
import { BodyBinaryInterface } from "@/shared/types/request-response.types";

export const getBodyBinary = async (
  ...[requestOrFolderMetaId]: Parameters<
    ElectronAPIBodyBinaryInterface["getBodyBinary"]
  >
) => {
  if (!requestOrFolderMetaId)
    requestOrFolderMetaId = (await getTabList())?.selectedTab;

  if (!requestOrFolderMetaId) throw new Error();

  try {
    return (
      (
        await db
          .select({
            requestOrFolderMetaId: bodyBinaryTable.requestOrFolderMetaId,
            path: bodyBinaryTable.path
          })
          .from(bodyBinaryTable)
          .where(
            eq(bodyBinaryTable.requestOrFolderMetaId, requestOrFolderMetaId)
          )
      )?.[0] ?? null
    );
  } catch (error) {
    console.error(error);
    return null;
  }
};

export const createBodyBinary: ElectronAPIBodyBinaryInterface["createBodyBinary"] =
  async payload => {
    try {
      const requestOrFolderMetaId =
        payload.requestOrFolderMetaId ?? (await getTabList())?.selectedTab;
      if (!requestOrFolderMetaId) throw new Error();

      return (
        (
          await db.insert(bodyBinaryTable).values({
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

export const updateBodyBinary = async (
  payload: Partial<BodyBinaryInterface>
) => {
  try {
    const requestOrFolderMetaId =
      payload?.requestOrFolderMetaId ?? (await getTabList())?.selectedTab;
    if (!requestOrFolderMetaId) throw new Error();

    return (
      (
        await db
          .insert(bodyBinaryTable)
          .values({
            ...payload,
            requestOrFolderMetaId
          })
          .onConflictDoUpdate({
            target: [bodyBinaryTable.requestOrFolderMetaId],
            set: {
              ...payload
            }
          })
      )?.rowsAffected > 0
    );
  } catch (error) {
    console.error(error);
    return false;
  }
};

export const deleteBodyBinary: ElectronAPIBodyBinaryInterface["deleteBodyBinary"] =
  async requestOrFolderMetaId => {
    try {
      requestOrFolderMetaId = (await getTabList())?.selectedTab;
      if (!requestOrFolderMetaId) throw new Error();

      return (
        (
          await db
            .delete(bodyBinaryTable)
            .where(
              eq(bodyBinaryTable.requestOrFolderMetaId, requestOrFolderMetaId)
            )
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
export const duplicateBodyBinary: ElectronAPIBodyBinaryInterface["duplicateBodyBinary"] =
  async payload => {
    try {
      if (!payload) throw new Error();
      const oldIds = Object.keys(payload);
      if (!oldIds.length) throw new Error();

      const existingBodyBinaryData = await db
        .select()
        .from(bodyBinaryTable)
        .where(inArray(bodyBinaryTable.requestOrFolderMetaId, oldIds));

      if (!existingBodyBinaryData.length) return true;

      /**
       * - Replacing oldId with duplicatedId
       * and only keeping url so that other things automatically generate by default
       */
      const duplicatePayload = existingBodyBinaryData.map(binary => {
        const { id, ...binaryPayload } = binary;
        return {
          ...binaryPayload,
          requestOrFolderMetaId: payload[binary.requestOrFolderMetaId]
        };
      });

      return (
        (await db.insert(bodyBinaryTable).values(duplicatePayload))
          .rowsAffected > 0
      );
    } catch (error) {
      console.error(error);
      return false;
    }
  };

export const replaceBodyBinary: ElectronAPIBodyBinaryInterface["replaceBodyBinary"] =
  async payload => {
    try {
      return await db.transaction(async tsx => {
        await tsx
          .delete(bodyBinaryTable)
          .where(
            eq(
              bodyBinaryTable.requestOrFolderMetaId,
              payload.requestOrFolderMetaId
            )
          );

        if (Object.keys(payload || {}).length)
          await tsx.insert(bodyBinaryTable).values({
            ...payload
          });

        return true;
      });
    } catch (error) {
      console.error(error);
      return false;
    }
  };
