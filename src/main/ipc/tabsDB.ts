import { ipcMain } from "electron";
import { changeTabsData, getTabList } from "../db/tabsDB.js";

export const tabsDBHandlers = () => {
  ipcMain.handle("getTabList", getTabList);
  ipcMain.handle("changeTabsData", changeTabsData);
};
