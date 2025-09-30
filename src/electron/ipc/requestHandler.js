import { ipcMain } from "electron";
import { clearRequestDB } from "../db/requestDB.js";

export const requestHandler = () => {
  ipcMain.handle(
    "clearRequestDB",
    async (_, ...rest) => await clearRequestDB(...rest)
  );
};
