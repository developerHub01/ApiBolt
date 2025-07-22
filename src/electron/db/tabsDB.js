import { tabsTable } from "./schema.js";
import { eq } from "drizzle-orm";
import { db } from "./index.js";
import { getActiveProject } from "./projectsDB.js";

export const getTabList = async () => {
  try {
    const activeProjectId = await getActiveProject();

    if (!activeProjectId) return null;

    let tabList = await db
      .select()
      .from(tabsTable)
      .where(eq(tabsTable.projectId, activeProjectId));

    if (!tabList || !tabList?.length) {
      await db.insert(tabsTable).values({ projectId: activeProjectId });
      tabList = await db
        .select()
        .from(tabsTable)
        .where(eq(tabsTable.projectId, activeProjectId));
    }

    const result = tabList?.[0];
    if (!result) return result;
    result.openTabs = JSON.parse(result.openTabs);

    return result;
  } catch (error) {
    console.log(error);
  }
};

export const updateTabList = async (payload) => {
  const activeProjectId = await getActiveProject();

  if (payload.openTabs && Array.isArray(payload.openTabs))
    payload.openTabs = JSON.stringify(payload.openTabs);

  const updated = await db
    .update(tabsTable)
    .set({
      ...payload,
    })
    .where(eq(tabsTable.projectId, activeProjectId));

  return updated?.changes > 0;
};

export const deleteAllTabList = async () => {
  try {
    let deleted = await db.delete(tabsTable);

    return deleted?.changes > 0;
  } catch (error) {
    console.log(error);
  }
};

export const deleteTabListByProjectId = async (id) => {
  try {
    const activeProjectId = id ?? (await getActiveProject());

    let deleted = await db
      .delete(tabsTable)
      .where(eq(tabsTable.projectId, activeProjectId));

    return deleted?.changes > 0;
  } catch (error) {
    console.log(error);
  }
};
