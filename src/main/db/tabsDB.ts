import { tabsTable } from "@/main/db/schema.js";
import { eq } from "drizzle-orm";
import { db } from "@/main/db/index.js";
import { getActiveProject } from "@/main/db/projectsDB.js";
import { ElectronAPITabsInterface } from "@shared/types/api/electron-tabs";
import { TabsInterface } from "@shared/types/tabs";

export const getTabList: ElectronAPITabsInterface["getTabList"] = async () => {
  try {
    const activeProjectId = await getActiveProject();
    if (!activeProjectId) throw Error();

    let tabList = (
      await db
        .select()
        .from(tabsTable)
        .where(eq(tabsTable.projectId, activeProjectId))
    )?.[0];

    if (!tabList) {
      await db.insert(tabsTable).values({ projectId: activeProjectId });
      tabList = (
        await db
          .select()
          .from(tabsTable)
          .where(eq(tabsTable.projectId, activeProjectId))
      )?.[0];
    }

    return {
      ...tabList,
      openTabs: JSON.parse(tabList.openTabs) as Array<string>,
    };
  } catch (error) {
    console.error(error);
    return {
      openTabs: [],
      selectedTab: null,
    };
  }
};

export const getSelectedTab = async (projectId?: string | null) => {
  try {
    projectId = projectId ?? (await getActiveProject());
    if (!projectId) return null;

    return (
      (
        await db
          .select()
          .from(tabsTable)
          .where(eq(tabsTable.projectId, projectId))
          .limit(1)
      )?.[0]?.selectedTab ?? null
    );
  } catch (error) {
    console.error(error);
    return null;
  }
};

export const updateTabList: ElectronAPITabsInterface["updateTabList"] =
  async payload => {
    try {
      const activeProjectId = await getActiveProject();
      if (!activeProjectId) return false;

      const dbPayload: Partial<
        Omit<TabsInterface, "openTabs"> & {
          openTabs: string;
        }
      > = {};

      if (Array.isArray(payload.openTabs))
        dbPayload.openTabs = JSON.stringify(payload.openTabs);
      if ("selectedTab" in payload)
        dbPayload.selectedTab = payload.selectedTab ?? null;

      const updated = await db
        .update(tabsTable)
        .set({
          ...dbPayload,
        })
        .where(eq(tabsTable.projectId, activeProjectId));

      return updated?.rowsAffected > 0;
    } catch (error) {
      console.error(error);
      return false;
    }
  };

export const deleteAllTabList: ElectronAPITabsInterface["deleteAllTabList"] =
  async () => {
    try {
      return (await db.delete(tabsTable))?.rowsAffected > 0;
    } catch (error) {
      console.error(error);
      return false;
    }
  };

export const deleteTabListByProjectId: ElectronAPITabsInterface["deleteTabListByProjectId"] =
  async id => {
    try {
      const activeProjectId = id ?? (await getActiveProject());
      if (!activeProjectId) return false;

      return (
        (
          await db
            .delete(tabsTable)
            .where(eq(tabsTable.projectId, activeProjectId))
        )?.rowsAffected > 0
      );
    } catch (error) {
      console.error(error);
      return false;
    }
  };

export const updateTablistBasedRequestOrFolderMetaDeletion = async (
  deletionCandidates: Array<string> = [],
) => {
  try {
    const tabList = await getTabList();
    if (!tabList || !tabList?.openTabs?.length) return true;

    const openTabs = tabList.openTabs.filter(
      tab => !deletionCandidates.includes(tab),
    );
    const payload: Partial<TabsInterface> = { openTabs };

    if (tabList.selectedTab && deletionCandidates.includes(tabList.selectedTab))
      payload.selectedTab = openTabs?.[0] ?? null;

    return await updateTabList(payload);
  } catch (error) {
    console.error(error);
    return false;
  }
};
