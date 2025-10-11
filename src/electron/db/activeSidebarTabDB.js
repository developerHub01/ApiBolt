import { eq } from "drizzle-orm";
import { db } from "./index.js";
import { ACTIVE_SIDEBAR_TAB_ID, activeSidebarTabTable } from "./schema.js";

export const getActiveSidebarTab = async () => {
  try {
    const tab = (
      await db
        .select()
        .from(activeSidebarTabTable)
        .where(eq(activeSidebarTabTable.id, ACTIVE_SIDEBAR_TAB_ID))
    )?.[0]?.tab;
    if (tab) return tab;

    await createActiveSidebarTab();
    return "project";
  } catch (error) {
    console.error(error);
  }
};

export const createActiveSidebarTab = async (payload = {}) => {
  const id = payload?.id ?? ACTIVE_SIDEBAR_TAB_ID;

  try {
    const response = await db.insert(activeSidebarTabTable).values({
      id,
      ...payload,
    });
    return Boolean(response?.changes);
  } catch (error) {
    console.error(error);
  }
};

export const updateActiveSidebarTab = async (tab = "project") => {
  try {
    const isExist = await getActiveSidebarTab();

    if (!isExist) {
      return await createActiveSidebarTab({
        tab,
      });
    }

    const updated = await db
      .update(activeSidebarTabTable)
      .set({
        tab,
      })
      .where(eq(activeSidebarTabTable.id, ACTIVE_SIDEBAR_TAB_ID));

    return Boolean(updated?.changes);
  } catch (error) {
    console.error(error);
  }
};

export const deleteActiveSidebarTab = async () => {
  try {
    return (
      (await db
        .delete(activeSidebarTabTable)
        .where(eq(activeSidebarTabTable.id, ACTIVE_SIDEBAR_TAB_ID))?.changes) >
      0
    );
  } catch (error) {
    console.error(error);
  }
};
