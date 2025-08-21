import { ipcMain } from "electron";
import {
  checkAllHeadersByRequestMetaId,
  createHeaders,
  deleteHeaders,
  deleteHeadersByRequestMetaId,
  getHeaders,
  replaceHeaders,
  updateHeaders,
} from "../db/headersDB.js";

export const headersHandlers = () => {
  ipcMain.handle("getHeaders", async (_, ...rest) => await getHeaders(...rest));
  ipcMain.handle(
    "deleteHeaders",
    async (_, ...rest) => await deleteHeaders(...rest)
  );
  ipcMain.handle(
    "deleteHeadersByRequestMetaId",
    async (_, ...rest) => await deleteHeadersByRequestMetaId(...rest)
  );
  ipcMain.handle(
    "createHeaders",
    async (_, ...rest) => await createHeaders(...rest)
  );
  ipcMain.handle(
    "updateHeaders",
    async (_, ...rest) => await updateHeaders(...rest)
  );
  ipcMain.handle(
    "replaceHeaders",
    async (_, ...rest) => await replaceHeaders(...rest)
  );
  ipcMain.handle(
    "checkAllHeadersByRequestMetaId",
    async (_, ...rest) => await checkAllHeadersByRequestMetaId(...rest)
  );
};
