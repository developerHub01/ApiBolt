import { ipcMain } from "electron";
import { getHttpStatus, updateHttpStatus } from "../db/httpStatusDB.js";

export const httpStatusHandler = () => {
  ipcMain.handle(
    "getHttpStatus",
    async (_, ...rest) => await getHttpStatus(...rest)
  );
  ipcMain.handle(
    "updateHttpStatus",
    async (_, ...rest) => await updateHttpStatus(...rest)
  );
};
