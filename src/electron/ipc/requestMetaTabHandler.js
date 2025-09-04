import { ipcMain } from "electron";
import {
  getRequestMetaTab,
  createRequestMetaTab,
  updateRequestMetaTab,
  deleteRequestMetaTab,
} from "../db/requestMetaTabDB.js";

export const requestMetaTabHandler = () => {
  ipcMain.handle(
    "getRequestMetaTab",
    async (_, ...rest) => await getRequestMetaTab(...rest)
  );
  ipcMain.handle(
    "createRequestMetaTab",
    async (_, ...rest) => await createRequestMetaTab(...rest)
  );
  ipcMain.handle(
    "updateRequestMetaTab",
    async (_, ...rest) => await updateRequestMetaTab(...rest)
  );
  ipcMain.handle(
    "deleteRequestMetaTab",
    async (_, ...rest) => await deleteRequestMetaTab(...rest)
  );
};
