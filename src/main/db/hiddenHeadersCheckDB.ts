import { eq, inArray } from "drizzle-orm";
import { db } from "@/main/db/index.js";
import { hiddenHeadersCheckTable } from "@/main/db/schema.js";
import { getTabList } from "@/main/db/tabsDB.js";

const booleanFields = new Set([
  "authorization",
  "userAgent",
  "contentLength",
  "accept",
  "acceptEncoding",
  "connection",
]);

/* id === requestOrFolderMetaId */
export const getHiddenHeadersCheck = async (id) => {
  try {
    if (!id) id = (await getTabList())?.selectedTab;
    if (!id) return null;

    const result = (
      await db
        .select()
        .from(hiddenHeadersCheckTable)
        .where(eq(hiddenHeadersCheckTable.requestOrFolderMetaId, id))
    )?.[0];

    if (result)
      for (const key in result) {
        if (!booleanFields.has(key)) continue;
        result[key] = Boolean(result[key]);
      }

    return result;
  } catch (error) {
    console.error(error);
  }
};

export const createHiddenHeadersCheck = async (payload = {}) => {
  try {
    if (!("requestOrFolderMetaId" in payload))
      payload["requestOrFolderMetaId"] = (await getTabList())?.selectedTab;
    if (!payload.requestOrFolderMetaId) return false;

    if (typeof payload === "object" && !Object.keys(payload).length)
      return true;

    const existingData = await getHiddenHeadersCheck(
      payload.requestOrFolderMetaId
    );
    if (existingData) return await updateHiddenHeadersCheck(payload);

    const result = await db.insert(hiddenHeadersCheckTable).values(payload);

    return result?.rowsAffected > 0;
  } catch (error) {
    console.error(error);
  }
};

export const updateHiddenHeadersCheck = async (payload) => {
  if (!payload) return false;

  const selectedTab =
    payload.requestOrFolderMetaId ?? (await getTabList()).selectedTab;
  if (!selectedTab) return false;

  delete payload["id"];
  delete payload["requestOrFolderMetaId"];

  for (const key in payload)
    if (typeof payload[key] === "boolean") payload[key] = Number(payload[key]);

  if (typeof payload === "object" && !Object.keys(payload).length) return true;

  try {
    const isExist = (
      await db
        .select()
        .from(hiddenHeadersCheckTable)
        .where(eq(hiddenHeadersCheckTable.requestOrFolderMetaId, selectedTab))
    )?.[0];

    if (!isExist)
      await createHiddenHeadersCheck({
        selectedTab,
      });

    await db
      .update(hiddenHeadersCheckTable)
      .set({
        ...payload,
      })
      .where(eq(hiddenHeadersCheckTable.requestOrFolderMetaId, selectedTab));
    return true;
  } catch (error) {
    console.error(error);
  }
};

/* 
payload = {
  oldId: newId ---> newId means duplicatedId
}
*/
export const duplicateHiddenHeadersCheck = async (payload) => {
  try {
    if (!payload) return;
    const oldIds = Object.keys(payload);
    if (!oldIds.length) return;

    const existingHeadersCheckData = await db
      .select()
      .from(hiddenHeadersCheckTable)
      .where(inArray(hiddenHeadersCheckTable.requestOrFolderMetaId, oldIds));

    if (!existingHeadersCheckData.length) return true;

    /**
     * - Replacing oldId with duplicatedId
     * and only keeping url so that other things automatically generate by default
     */
    const duplicatePayload = existingHeadersCheckData.map((headersCheck) => {
      delete headersCheck["id"];
      return {
        ...headersCheck,
        requestOrFolderMetaId: payload[headersCheck.requestOrFolderMetaId],
      };
    });

    const result = await db
      .insert(hiddenHeadersCheckTable)
      .values(duplicatePayload);

    return result.rowsAffected > 0;
  } catch (error) {
    console.error(error);
  }
};
