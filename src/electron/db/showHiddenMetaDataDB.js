import { eq } from "drizzle-orm";
import { db } from "./index.js";
import { showHiddenMetaDataTable } from "./schema.js";
import { getRequestOrFolderMetaById } from "./requestOrFolderMetaDB.js";
import { getTabList } from "./tabsDB.js";

/* id === requestOrFolderMetaId */
export const getShowHiddenMetaData = async (id) => {
  try {
    if (!id) id = (await getTabList())?.selectedTab;
    if (!id) return null;
    if (!(await getRequestOrFolderMetaById(id))) return null;

    const result = (
      await db
        .select()
        .from(showHiddenMetaDataTable)
        .where(eq(showHiddenMetaDataTable.requestOrFolderMetaId, id))
    )?.[0];

    if (!result) {
      return await createShowHiddenMetaData({
        requestOrFolderMetaId: id,
      });
    }

    return result;
  } catch (error) {
    console.error(error);
  }
};

export const createShowHiddenMetaData = async (payload = {}) => {
  try {
    if (!("requestOrFolderMetaId" in payload))
      payload["requestOrFolderMetaId"] = (await getTabList())?.selectedTab;
    if (!payload.requestOrFolderMetaId) return null;

    if (typeof payload === "object" && !Object.keys(payload).length)
      return null;

    const existingData = (
      await db
        .select()
        .from(showHiddenMetaDataTable)
        .where(
          eq(
            showHiddenMetaDataTable.requestOrFolderMetaId,
            payload.requestOrFolderMetaId
          )
        )
    )?.[0];

    if (existingData) return await updateShowHiddenMetaData(payload);

    const result = await db
      .insert(showHiddenMetaDataTable)
      .values(payload)
      .returning();

    return result;
  } catch (error) {
    console.error(error);
  }
};

export const updateShowHiddenMetaData = async (payload) => {
  if (!payload) return null;

  let selectedTab = payload["requestOrFolderMetaId"];
  delete payload["id"];
  delete payload["requestOrFolderMetaId"];

  if (!selectedTab) selectedTab = (await getTabList()).selectedTab;
  if (!selectedTab) return null;

  for (const key in payload)
    if (typeof payload[key] === "boolean") payload[key] = Number(payload[key]);

  if (typeof payload === "object" && !Object.keys(payload).length) return null;

  try {
    const isExist = (
      await db
        .select()
        .from(showHiddenMetaDataTable)
        .where(eq(showHiddenMetaDataTable.requestOrFolderMetaId, selectedTab))
    )?.[0];

    if (!isExist)
      await createShowHiddenMetaData({
        selectedTab,
      });

    const updated = await db
      .update(showHiddenMetaDataTable)
      .set({
        ...payload,
      })
      .where(eq(showHiddenMetaDataTable.requestOrFolderMetaId, selectedTab))
      .returning();
    return updated;
  } catch (error) {
    console.error(error);
  }
};
