import { ipcMain } from "electron";
import {
  getHttpStatus,
  getHttpStatusByCode,
  updateHttpStatus,
} from "../db/httpStatusDB.js";

export const httpStatusHandler = () => {
  ipcMain.handle(
    "getHttpStatus",
    async (_, ...rest) => await getHttpStatus(...rest)
  );
  ipcMain.handle(
    "getHttpStatusByCode",
    async (_, ...rest) => await getHttpStatusByCode(...rest)
  );
  ipcMain.handle(
    "updateHttpStatus",
    async (_, ...rest) => await updateHttpStatus(...rest)
  );
};
