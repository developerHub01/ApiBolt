import { eq } from "drizzle-orm";
import { db } from "./index.js";
import { hiddenHeadersCheckTable } from "./schema.js";
import { getTabList } from "./tabsDB.js";

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

    return result;
  } catch (error) {
    console.log(error);
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

    return result?.changes > 0;
  } catch (error) {
    console.log(error);
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

    const updated = await db
      .update(hiddenHeadersCheckTable)
      .set({
        ...payload,
      })
      .where(eq(hiddenHeadersCheckTable.requestOrFolderMetaId, selectedTab));
    return updated?.changes > 0;
  } catch (error) {
    console.log(error);
  }
};
