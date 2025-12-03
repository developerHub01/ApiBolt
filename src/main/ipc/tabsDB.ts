import { ipcMain } from "electron";
import { changeTabsData, getTabList } from "@/main/db/tabsDB.js";

export const tabsDBHandlers = () => {
  ipcMain.handle("getTabList", getTabList);
  ipcMain.handle("changeTabsData", changeTabsData);
};
