import { ipcMain } from "electron";
import {
  createActiveSidebarTab,
  deleteActiveSidebarTab,
  getActiveSidebarTab,
  updateActiveSidebarTab
} from "@/main/db/activeSidebarTabDB.js";
import { ElectronAPIActiveSidebarTabInterface } from "@/shared/types/api/electron-api-active-sidebar-tab";

export const activeSidebarTabHandler = () => {
  ipcMain.handle(
    "getActiveSidebarTab",
    async (
      _,
      ...rest: Parameters<
        ElectronAPIActiveSidebarTabInterface["getActiveSidebarTab"]
      >
    ): ReturnType<
      ElectronAPIActiveSidebarTabInterface["getActiveSidebarTab"]
    > => await getActiveSidebarTab(...rest)
  );
  ipcMain.handle(
    "createActiveSidebarTab",
    async (
      _,
      ...rest: Parameters<
        ElectronAPIActiveSidebarTabInterface["createActiveSidebarTab"]
      >
    ): ReturnType<
      ElectronAPIActiveSidebarTabInterface["createActiveSidebarTab"]
    > => await createActiveSidebarTab(...rest)
  );
  ipcMain.handle(
    "updateActiveSidebarTab",
    async (
      _,
      ...rest: Parameters<
        ElectronAPIActiveSidebarTabInterface["updateActiveSidebarTab"]
      >
    ): ReturnType<
      ElectronAPIActiveSidebarTabInterface["updateActiveSidebarTab"]
    > => await updateActiveSidebarTab(...rest)
  );
  ipcMain.handle(
    "deleteActiveSidebarTab",
    async (
      _,
      ...rest: Parameters<
        ElectronAPIActiveSidebarTabInterface["deleteActiveSidebarTab"]
      >
    ): ReturnType<
      ElectronAPIActiveSidebarTabInterface["deleteActiveSidebarTab"]
    > => await deleteActiveSidebarTab(...rest)
  );
};
