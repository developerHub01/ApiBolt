import { mockTabsTable } from "@/main/db/schema";
import { eq } from "drizzle-orm";
import { db } from "@/main/db/index";
import { getActiveProject } from "@/main/db/projectsDB";
import { TabsInterface } from "@shared/types/tabs";
import { ElectronAPIMockTabsInterface } from "@shared/types/api/electron-mock-tabs";

export const getMockTabList: ElectronAPIMockTabsInterface["getMockTabList"] =
  async () => {
    try {
      const activeProjectId = await getActiveProject();
      if (!activeProjectId) throw Error();

      let tabList = (
        await db
          .select()
          .from(mockTabsTable)
          .where(eq(mockTabsTable.projectId, activeProjectId))
      )?.[0];

      if (!tabList) {
        await db.insert(mockTabsTable).values({ projectId: activeProjectId });
        tabList = (
          await db
            .select()
            .from(mockTabsTable)
            .where(eq(mockTabsTable.projectId, activeProjectId))
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

export const getSelectedMockTab = async (projectId?: string | null) => {
  try {
    projectId = projectId ?? (await getActiveProject());
    if (!projectId) return null;

    return (
      (
        await db
          .select()
          .from(mockTabsTable)
          .where(eq(mockTabsTable.projectId, projectId))
          .limit(1)
      )?.[0]?.selectedTab ?? null
    );
  } catch (error) {
    console.error(error);
    return null;
  }
};

export const updateMockTabList: ElectronAPIMockTabsInterface["updateMockTabList"] =
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
        .update(mockTabsTable)
        .set({
          ...dbPayload,
        })
        .where(eq(mockTabsTable.projectId, activeProjectId));

      return updated?.rowsAffected > 0;
    } catch (error) {
      console.error(error);
      return false;
    }
  };

export const deleteAllMockTabList: ElectronAPIMockTabsInterface["deleteAllMockTabList"] =
  async () => {
    try {
      return (await db.delete(mockTabsTable))?.rowsAffected > 0;
    } catch (error) {
      console.error(error);
      return false;
    }
  };

export const deleteMockTabListByProjectId: ElectronAPIMockTabsInterface["deleteMockTabListByProjectId"] =
  async id => {
    try {
      const activeProjectId = id ?? (await getActiveProject());
      if (!activeProjectId) return false;

      return (
        (
          await db
            .delete(mockTabsTable)
            .where(eq(mockTabsTable.projectId, activeProjectId))
        )?.rowsAffected > 0
      );
    } catch (error) {
      console.error(error);
      return false;
    }
  };

export const updateMockTablistBasedRequestOrFolderMetaDeletion = async (
  deletionCandidates: Array<string> = [],
) => {
  try {
    const tabList = await getMockTabList();
    if (!tabList || !tabList?.openTabs?.length) return true;

    const openTabs = tabList.openTabs.filter(
      tab => !deletionCandidates.includes(tab),
    );
    const payload: Partial<TabsInterface> = { openTabs };

    if (tabList.selectedTab && deletionCandidates.includes(tabList.selectedTab))
      payload.selectedTab = openTabs?.[0] ?? null;

    return await updateMockTabList(payload);
  } catch (error) {
    console.error(error);
    return false;
  }
};
