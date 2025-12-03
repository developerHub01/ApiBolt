import { ipcMain } from "electron";
import {
  createActiveSidebarTab,
  deleteActiveSidebarTab,
  getActiveSidebarTab,
  updateActiveSidebarTab
} from "@/main/db/activeSidebarTabDB.js";

export const activeSidebarTabHandler = () => {
  ipcMain.handle(
    "getActiveSidebarTab",
    async (_, ...rest) => await getActiveSidebarTab(...rest)
  );
  ipcMain.handle(
    "createActiveSidebarTab",
    async (_, ...rest) => await createActiveSidebarTab(...rest)
  );
  ipcMain.handle(
    "updateActiveSidebarTab",
    async (_, ...rest) => await updateActiveSidebarTab(...rest)
  );
  ipcMain.handle(
    "deleteActiveSidebarTab",
    async (_, ...rest) => await deleteActiveSidebarTab(...rest)
  );
};
