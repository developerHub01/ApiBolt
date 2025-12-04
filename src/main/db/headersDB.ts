import { eq, inArray } from "drizzle-orm";
import { db } from "@/main/db/index.js";
import { headersTable } from "@/main/db/schema.js";
import { getTabList } from "@/main/db/tabsDB.js";
import { ElectronAPIHeadersInterface } from "@/shared/types/api/electron-headers";

/* id === requestOrFolderMetaId */
export const getHeaders: ElectronAPIHeadersInterface["getHeaders"] =
  async id => {
    try {
      id = id ?? (await getTabList())?.selectedTab;
      if (!id) throw new Error();

      const result = await db
        .select()
        .from(headersTable)
        .where(eq(headersTable.requestOrFolderMetaId, id));

      return result;
    } catch (error) {
      console.error(error);
      return [];
    }
  };

export const deleteHeaders: ElectronAPIHeadersInterface["deleteHeaders"] =
  async paramId => {
    try {
      return (
        (await db.delete(headersTable).where(eq(headersTable.id, paramId)))
          ?.rowsAffected > 0
      );
    } catch (error) {
      console.error(error);
      return false;
    }
  };

/* id === requestOrFolderMetaId */
export const deleteHeadersByRequestMetaId: ElectronAPIHeadersInterface["deleteHeadersByRequestMetaId"] =
  async requestOrFolderMetaId => {
    try {
      requestOrFolderMetaId =
        requestOrFolderMetaId ?? (await getTabList())?.selectedTab;
      if (!requestOrFolderMetaId) throw new Error();

      return (
        (
          await db
            .delete(headersTable)
            .where(
              eq(headersTable.requestOrFolderMetaId, requestOrFolderMetaId)
            )
        ).rowsAffected > 0
      );
    } catch (error) {
      console.error(error);
      return false;
    }
  };

export const createHeaders: ElectronAPIHeadersInterface["createHeaders"] =
  async (payload = {}) => {
    try {
      const requestOrFolderMetaId =
        payload.requestOrFolderMetaId ?? (await getTabList())?.selectedTab;
      if (!requestOrFolderMetaId) throw new Error();

      return (
        (
          await db.insert(headersTable).values({
            ...payload,
            requestOrFolderMetaId
          })
        )?.rowsAffected > 0
      );
    } catch (error) {
      console.error(error);
      return false;
    }
  };

export const updateHeaders: ElectronAPIHeadersInterface["updateHeaders"] =
  async (headerId, payload) => {
    if (!payload) throw new Error();

    try {
      const isExist = (
        await db
          .select()
          .from(headersTable)
          .where(eq(headersTable.id, headerId))
      )?.[0];

      if (!isExist)
        await createHeaders({
          id: headerId,
          ...payload
        });

      return (
        (
          await db
            .update(headersTable)
            .set({
              ...payload,
              requestOrFolderMetaId: payload.requestOrFolderMetaId
                ? payload.requestOrFolderMetaId
                : undefined
            })
            .where(eq(headersTable.id, headerId))
        )?.rowsAffected > 0
      );
    } catch (error) {
      console.error(error);
      return false;
    }
  };

export const replaceHeaders: ElectronAPIHeadersInterface["replaceHeaders"] =
  async (requestOrFolderMetaId, payload) => {
    try {
      const replacePayload = payload.map(header => {
        const { id, ...rest } = header;
        return {
          ...rest,
          requestOrFolderMetaId:
            header["requestOrFolderMetaId"] ?? requestOrFolderMetaId,
          value: Array.isArray(header.value)
            ? JSON.stringify(header.value)
            : header.value
        };
      });

      return await db.transaction(async tsx => {
        await tsx
          .delete(headersTable)
          .where(eq(headersTable.requestOrFolderMetaId, requestOrFolderMetaId));

        if (!replacePayload.length) return true;
        await tsx.insert(headersTable).values(replacePayload);

        return true;
      });
    } catch (error) {
      console.error(error);
      return false;
    }
  };

export const checkAllHeadersByRequestMetaId: ElectronAPIHeadersInterface["checkAllHeadersByRequestMetaId"] =
  async requestOrFolderMetaId => {
    try {
      requestOrFolderMetaId =
        requestOrFolderMetaId ?? (await getTabList())?.selectedTab;
      if (!requestOrFolderMetaId) throw new Error();

      const rows =
        (await db
          .select()
          .from(headersTable)
          .where(
            eq(headersTable.requestOrFolderMetaId, requestOrFolderMetaId)
          )) ?? [];

      const checkValue = !rows.every(row => row.isCheck);

      return (
        (
          await db
            .update(headersTable)
            .set({
              isCheck: checkValue
            })
            .where(
              eq(headersTable.requestOrFolderMetaId, requestOrFolderMetaId)
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
export const duplicateHeaders: ElectronAPIHeadersInterface["duplicateHeaders"] =
  async payload => {
    try {
      if (!payload) throw new Error();
      const oldIds = Object.keys(payload);
      if (!oldIds.length) throw new Error();

      const existingHeadersData = await db
        .select()
        .from(headersTable)
        .where(inArray(headersTable.requestOrFolderMetaId, oldIds));

      if (!existingHeadersData.length) return true;

      /**
       * - Replacing oldId with duplicatedId
       * and only keeping url so that other things automatically generate by default
       */
      const duplicatePayload = existingHeadersData.map(header => {
        const { id, createdAt, ...rest } = header;
        return {
          ...rest,
          requestOrFolderMetaId: payload[header.requestOrFolderMetaId]
        };
      });

      return (
        (await db.insert(headersTable).values(duplicatePayload)).rowsAffected >
        0
      );
    } catch (error) {
      console.error(error);
      return false;
    }
  };
