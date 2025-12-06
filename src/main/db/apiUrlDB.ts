import { eq, inArray } from "drizzle-orm";
import { db } from "@/main/db/index.js";
import { API_URL_DEFAULT_VALUE, apiUrlTable } from "@/main/db/schema.js";
import { getTabList } from "@/main/db/tabsDB.js";
import { ElectronAPIApiUrlInterface } from "@shared/types/api/electron-api-url";

/* id === requestOrFolderMetaId */
export const getApiUrlDB: ElectronAPIApiUrlInterface["getApiUrlDB"] =
  async id => {
    try {
      if (!id) id = (await getTabList())?.selectedTab;
      if (!id) throw new Error();

      const result = (
        await db
          .select()
          .from(apiUrlTable)
          .where(eq(apiUrlTable.requestOrFolderMetaId, id))
      )?.[0];

      if (!result) throw new Error();
      return result;
    } catch (error) {
      console.error(error);
      return { url: API_URL_DEFAULT_VALUE };
    }
  };

export const createApiUrl: ElectronAPIApiUrlInterface["createApiUrl"] = async (
  payload = {},
) => {
  try {
    const tabId = (await getTabList())?.selectedTab;
    if (!tabId) throw Error();

    const result = await db.insert(apiUrlTable).values({
      ...payload,
      requestOrFolderMetaId: tabId,
    });
    return result.rowsAffected > 0;
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
export const duplicateApiUrl: ElectronAPIApiUrlInterface["duplicateApiUrl"] =
  async payload => {
    try {
      return await db.transaction(async tsx => {
        if (!payload) throw new Error();
        const oldIds = Object.keys(payload);
        if (!oldIds.length) throw new Error();

        const existingUrlData = await tsx
          .select()
          .from(apiUrlTable)
          .where(inArray(apiUrlTable.requestOrFolderMetaId, oldIds));

        if (!existingUrlData.length) return true;

        /**
         * - Replacing oldId with duplicatedId
         * and only keeping url so that other things automatically generate by default
         */
        const duplicatePayload = existingUrlData.map(
          ({ url, requestOrFolderMetaId }) => ({
            requestOrFolderMetaId: payload[requestOrFolderMetaId],
            url,
          }),
        );

        return (
          (await tsx.insert(apiUrlTable).values(duplicatePayload))
            .rowsAffected > 0
        );
      });
    } catch (error) {
      console.error(error);
      return false;
    }
  };

export const updateApiUrl: ElectronAPIApiUrlInterface["updateApiUrl"] =
  async payload => {
    try {
      return await db.transaction(async tsx => {
        const tabId = (await getTabList())?.selectedTab;
        if (!payload || !tabId) throw Error();

        delete payload["id"];
        delete payload["createdAt"];

        const isExist = (
          await tsx
            .select()
            .from(apiUrlTable)
            .where(eq(apiUrlTable.requestOrFolderMetaId, tabId))
        )?.[0];

        if (!isExist) {
          await tsx.insert(apiUrlTable).values({
            ...payload,
            requestOrFolderMetaId: tabId,
          });
          return true;
        }

        await tsx
          .update(apiUrlTable)
          .set({
            ...payload,
          })
          .where(eq(apiUrlTable.requestOrFolderMetaId, tabId));
        return true;
      });
    } catch (error) {
      console.error(error);
      return false;
    }
  };

export const deleteApiUrlByRequestMetaId = async (
  requestOrFolderMetaId: string,
) => {
  try {
    await db
      .delete(apiUrlTable)
      .where(eq(apiUrlTable.requestOrFolderMetaId, requestOrFolderMetaId));
    return true;
  } catch (error) {
    console.error(error);
    return false;
  }
};
