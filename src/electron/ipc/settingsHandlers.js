import { ipcMain } from "electron";
import { getSettings, updateSettings } from "../db/settingsDB.js";

export const settingsHandlers = () => {
  ipcMain.handle("getSettings", async (_) => await getSettings());
  ipcMain.handle(
    "updateSettings",
    async (_, ...rest) => await updateSettings(...rest)
  );
};
