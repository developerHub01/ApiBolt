import { ipcMain } from "electron";
import {
  createHistory,
  deleteHistoryById,
  getHistoryById,
  getHistoryByRequestId,
} from "../db/historyDB.js";

export const historyHandler = () => {
  ipcMain.handle(
    "getHistoryById",
    async (_, ...rest) => await getHistoryById(...rest)
  );
  ipcMain.handle(
    "getHistoryByRequestId",
    async (_, ...rest) => await getHistoryByRequestId(...rest)
  );
  ipcMain.handle(
    "createHistory",
    async (_, ...rest) => await createHistory(...rest)
  );
  ipcMain.handle(
    "deleteHistoryById",
    async (_, ...rest) => await deleteHistoryById(...rest)
  );
};
