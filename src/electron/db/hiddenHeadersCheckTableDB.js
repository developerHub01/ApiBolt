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

    // return result.map((item) => ({
    //   ...item,
    //   isCheck: Boolean(item.isCheck),
    // }));

    // Object.entries(result)
    console.log(result);

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

    const result = await db.insert(hiddenHeadersCheckTable).values(payload);
    return result.changes > 0;
  } catch (error) {
    console.log(error);
  }
};

export const updateHiddenHeadersCheck = async (payload) => {
  if (!payload) return false;

  delete payload["id"];
  delete payload["requestOrFolderMetaId"];

  const selectedTab = (await getTabList()).selectedTab;
  if (!selectedTab) return false;

  for (const key in payload)
    if (typeof payload[key] === "boolean") payload[key] = payload[key] ? 1 : 0;

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
