import { ipcMain } from "electron";
import { getFolder, updateFolder } from "../db/folderDB.js";

export const folderHandlers = () => {
  ipcMain.handle("getFolder", async (_, ...rest) => await getFolder(...rest));
  ipcMain.handle(
    "updateFolder",
    async (_, ...rest) => await updateFolder(...rest)
  );
};
