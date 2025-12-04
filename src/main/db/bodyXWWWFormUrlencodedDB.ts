import { eq, inArray } from "drizzle-orm";
import { db } from "@/main/db/index.js";
import { bodyXWWWFormUrlencodedTable } from "@/main/db/schema.js";
import { getTabList } from "@/main/db/tabsDB.js";
import { ElectronAPIBodyXWWWFormUrlencodedInterface } from "@/shared/types/api/electron-body-x-www-form-urlencoded";

export const getBodyXWWWFormUrlencoded: ElectronAPIBodyXWWWFormUrlencodedInterface["getBodyXWWWFormUrlencoded"] =
  async requestOrFolderMetaId => {
    try {
      requestOrFolderMetaId =
        requestOrFolderMetaId ?? (await getTabList())?.selectedTab;
      if (!requestOrFolderMetaId) throw new Error();

      const result = await db
        .select()
        .from(bodyXWWWFormUrlencodedTable)
        .where(
          eq(
            bodyXWWWFormUrlencodedTable.requestOrFolderMetaId,
            requestOrFolderMetaId
          )
        );

      return result.map(item => ({
        ...item,
        isCheck: Boolean(item.isCheck)
      }));
    } catch (error) {
      console.error(error);
      return [];
    }
  };

export const deleteBodyXWWWFormUrlencoded: ElectronAPIBodyXWWWFormUrlencodedInterface["deleteBodyXWWWFormUrlencoded"] =
  async formId => {
    try {
      return (
        (
          await db
            .delete(bodyXWWWFormUrlencodedTable)
            .where(eq(bodyXWWWFormUrlencodedTable.id, formId))
        )?.rowsAffected > 0
      );
    } catch (error) {
      console.error(error);
      return false;
    }
  };

/* id === requestOrFolderMetaId */
export const deleteBodyXWWWFormUrlencodedByRequestMetaId: ElectronAPIBodyXWWWFormUrlencodedInterface["deleteBodyXWWWFormUrlencodedByRequestMetaId"] =
  async requestOrFolderMetaId => {
    try {
      requestOrFolderMetaId =
        requestOrFolderMetaId ?? (await getTabList())?.selectedTab;
      if (!requestOrFolderMetaId) throw new Error();

      return (
        (
          await db
            .delete(bodyXWWWFormUrlencodedTable)
            .where(
              eq(
                bodyXWWWFormUrlencodedTable.requestOrFolderMetaId,
                requestOrFolderMetaId
              )
            )
        ).rowsAffected > 0
      );
    } catch (error) {
      console.error(error);
      return false;
    }
  };

export const createBodyXWWWFormUrlencoded: ElectronAPIBodyXWWWFormUrlencodedInterface["createBodyXWWWFormUrlencoded"] =
  async payload => {
    try {
      const requestOrFolderMetaId =
        payload.requestOrFolderMetaId ?? (await getTabList())?.selectedTab;
      if (!requestOrFolderMetaId) throw new Error();

      return (
        (
          await db.insert(bodyXWWWFormUrlencodedTable).values({
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

export const updateBodyXWWWFormUrlencoded: ElectronAPIBodyXWWWFormUrlencodedInterface["updateBodyXWWWFormUrlencoded"] =
  async (formId, payload) => {
    if (!payload) throw new Error();

    delete payload["id"];
    delete payload["requestOrFolderMetaId"];

    try {
      const isExist = (
        await db
          .select()
          .from(bodyXWWWFormUrlencodedTable)
          .where(eq(bodyXWWWFormUrlencodedTable.id, formId))
      )?.[0];

      if (!isExist)
        return await createBodyXWWWFormUrlencoded({
          id: formId,
          ...payload
        });

      return (
        (
          await db
            .update(bodyXWWWFormUrlencodedTable)
            .set({
              ...payload,
              requestOrFolderMetaId: payload.requestOrFolderMetaId
                ? payload.requestOrFolderMetaId
                : undefined
            })
            .where(eq(bodyXWWWFormUrlencodedTable.id, formId))
        )?.rowsAffected > 0
      );
    } catch (error) {
      console.error(error);
      return false;
    }
  };

export const replaceBodyXWWWFormUrlencoded: ElectronAPIBodyXWWWFormUrlencodedInterface["replaceBodyXWWWFormUrlencoded"] =
  async (requestOrFolderMetaId, payload = []) => {
    try {
      const replacePayload = payload.map(formData => {
        const { id, createdAt, ...rest } = formData;
        return {
          ...rest,
          requestOrFolderMetaId:
            formData["requestOrFolderMetaId"] ?? requestOrFolderMetaId,
          value: Array.isArray(formData.value)
            ? JSON.stringify(formData.value)
            : formData.value
        };
      });

      return await db.transaction(async tsx => {
        await tsx
          .delete(bodyXWWWFormUrlencodedTable)
          .where(
            eq(
              bodyXWWWFormUrlencodedTable.requestOrFolderMetaId,
              requestOrFolderMetaId
            )
          );

        if (!replacePayload.length) return true;
        await tsx.insert(bodyXWWWFormUrlencodedTable).values(replacePayload);

        return true;
      });
    } catch (error) {
      console.error(error);
      return false;
    }
  };

export const checkAllBodyXWWWFormUrlencodedByRequestMetaId: ElectronAPIBodyXWWWFormUrlencodedInterface["checkAllBodyXWWWFormUrlencodedByRequestMetaId"] =
  async requestOrFolderMetaId => {
    try {
      requestOrFolderMetaId =
        requestOrFolderMetaId ?? (await getTabList())?.selectedTab;
      if (!requestOrFolderMetaId) throw new Error();

      const rows =
        (await db
          .select()
          .from(bodyXWWWFormUrlencodedTable)
          .where(
            eq(
              bodyXWWWFormUrlencodedTable.requestOrFolderMetaId,
              requestOrFolderMetaId
            )
          )) ?? [];

      const checkValue = !rows.every(row => row.isCheck);

      return (
        (
          await db
            .update(bodyXWWWFormUrlencodedTable)
            .set({
              isCheck: checkValue
            })
            .where(
              eq(
                bodyXWWWFormUrlencodedTable.requestOrFolderMetaId,
                requestOrFolderMetaId
              )
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
export const duplicateBodyXWWWFormUrlencoded: ElectronAPIBodyXWWWFormUrlencodedInterface["duplicateBodyXWWWFormUrlencoded"] =
  async payload => {
    try {
      if (!payload) throw new Error();
      const oldIds = Object.keys(payload);
      if (!oldIds.length) throw new Error();

      const existingBodyXWWWFormUrlencodedData = await db
        .select()
        .from(bodyXWWWFormUrlencodedTable)
        .where(
          inArray(bodyXWWWFormUrlencodedTable.requestOrFolderMetaId, oldIds)
        );

      if (!existingBodyXWWWFormUrlencodedData.length) return true;

      /**
       * - Replacing oldId with duplicatedId
       * and only keeping url so that other things automatically generate by default
       */
      const duplicatePayload = existingBodyXWWWFormUrlencodedData.map(
        bodyXWWWFormUrlencoded => {
          const { id, createdAt, ...rest } = bodyXWWWFormUrlencoded;
          return {
            ...rest,
            requestOrFolderMetaId:
              payload[bodyXWWWFormUrlencoded.requestOrFolderMetaId]
          };
        }
      );

      return (
        (await db.insert(bodyXWWWFormUrlencodedTable).values(duplicatePayload))
          .rowsAffected > 0
      );
    } catch (error) {
      console.error(error);
      return false;
    }
  };
