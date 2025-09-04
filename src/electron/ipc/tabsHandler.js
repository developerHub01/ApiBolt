import { ipcMain } from "electron";
import {
  deleteAllTabList,
  deleteTabListByProjectId,
  getTabList,
  updateTabList,
} from "../db/tabsDB.js";

export const tabsHandler = () => {
  ipcMain.handle("getTabList", async (_, ...rest) => await getTabList(...rest));
  ipcMain.handle(
    "updateTabList",
    async (_, ...rest) => await updateTabList(...rest)
  );
  ipcMain.handle(
    "deleteAllTabList",
    async (_, ...rest) => await deleteAllTabList(...rest)
  );
  ipcMain.handle(
    "deleteTabListByProjectId",
    async (_, ...rest) => await deleteTabListByProjectId(...rest)
  );
};
