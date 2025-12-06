import { eq } from "drizzle-orm";
import { db } from "@/main/db/index.js";
import {
  ACTIVE_SIDEBAR_TAB_ID,
  activeSidebarTabTable,
  DEFAULT_ACTIVE_SIDEBAR_TAB,
} from "@/main/db/schema.js";
import { ElectronAPIActiveSidebarTabInterface } from "@shared/types/api/electron-api-active-sidebar-tab";

export const getActiveSidebarTab: ElectronAPIActiveSidebarTabInterface["getActiveSidebarTab"] =
  async () => {
    try {
      const tab = (
        await db
          .select()
          .from(activeSidebarTabTable)
          .where(eq(activeSidebarTabTable.id, ACTIVE_SIDEBAR_TAB_ID))
      )?.[0]?.tab;
      if (tab) return tab;

      await createActiveSidebarTab();
      return DEFAULT_ACTIVE_SIDEBAR_TAB;
    } catch (error) {
      console.error(error);
      return DEFAULT_ACTIVE_SIDEBAR_TAB;
    }
  };

export const createActiveSidebarTab: ElectronAPIActiveSidebarTabInterface["createActiveSidebarTab"] =
  async (tab = DEFAULT_ACTIVE_SIDEBAR_TAB) => {
    try {
      return (
        (
          await db.insert(activeSidebarTabTable).values({
            id: ACTIVE_SIDEBAR_TAB_ID,
            tab,
          })
        )?.rowsAffected > 0
      );
    } catch (error) {
      console.error(error);
      return false;
    }
  };

export const updateActiveSidebarTab: ElectronAPIActiveSidebarTabInterface["updateActiveSidebarTab"] =
  async tab => {
    try {
      return (
        (
          await db
            .insert(activeSidebarTabTable)
            .values({
              tab,
              id: ACTIVE_SIDEBAR_TAB_ID,
            })
            .onConflictDoUpdate({
              target: [activeSidebarTabTable.id],
              set: {
                tab,
              },
            })
        )?.rowsAffected > 0
      );
    } catch (error) {
      console.error(error);
      return false;
    }
  };

export const deleteActiveSidebarTab: ElectronAPIActiveSidebarTabInterface["deleteActiveSidebarTab"] =
  async () => {
    try {
      return (
        (
          await db
            .delete(activeSidebarTabTable)
            .where(eq(activeSidebarTabTable.id, ACTIVE_SIDEBAR_TAB_ID))
        )?.rowsAffected > 0
      );
    } catch (error) {
      console.error(error);
      return false;
    }
  };
