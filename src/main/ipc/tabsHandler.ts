import { ipcMain } from "electron";
import {
  deleteAllTabList,
  deleteTabListByProjectId,
  getTabList,
  updateTabList,
} from "@/main/db/tabsDB.js";
import { ElectronAPITabsInterface } from "@shared/types/api/electron-tabs";

export const tabsHandler = () => {
  ipcMain.handle(
    "getTabList",
    async (
      _,
      ...rest: Parameters<ElectronAPITabsInterface["getTabList"]>
    ): ReturnType<ElectronAPITabsInterface["getTabList"]> =>
      await getTabList(...rest),
  );
  ipcMain.handle(
    "updateTabList",
    async (
      _,
      ...rest: Parameters<ElectronAPITabsInterface["updateTabList"]>
    ): ReturnType<ElectronAPITabsInterface["updateTabList"]> =>
      await updateTabList(...rest),
  );
  ipcMain.handle(
    "deleteAllTabList",
    async (
      _,
      ...rest: Parameters<ElectronAPITabsInterface["deleteAllTabList"]>
    ): ReturnType<ElectronAPITabsInterface["deleteAllTabList"]> =>
      await deleteAllTabList(...rest),
  );
  ipcMain.handle(
    "deleteTabListByProjectId",
    async (
      _,
      ...rest: Parameters<ElectronAPITabsInterface["deleteTabListByProjectId"]>
    ): ReturnType<ElectronAPITabsInterface["deleteTabListByProjectId"]> =>
      await deleteTabListByProjectId(...rest),
  );
};
