import { ipcMain } from "electron";
import { createBodyRaw, getBodyRaw, updateBodyRaw } from "../db/bodyRawDB.js";

export const bodyRawHandler = () => {
  ipcMain.handle("getBodyRaw", async (_, ...rest) => await getBodyRaw(...rest));
  ipcMain.handle(
    "createBodyRaw",
    async (_, ...rest) => await createBodyRaw(...rest)
  );
  ipcMain.handle(
    "updateBodyRaw",
    async (_, ...rest) => await updateBodyRaw(...rest)
  );
};
