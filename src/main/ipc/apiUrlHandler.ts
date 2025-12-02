import { ipcMain } from "electron";
import {
  createApiUrl,
  duplicateApiUrl,
  getApiUrlDB,
  updateApiUrl,
} from "../db/apiUrlDB.js";

export const apiUrlHandler = () => {
  ipcMain.handle(
    "getApiUrlDB",
    async (_, ...rest) => await getApiUrlDB(...rest)
  );
  ipcMain.handle(
    "createApiUrl",
    async (_, ...rest) => await createApiUrl(...rest)
  );
  ipcMain.handle(
    "duplicateApiUrl",
    async (_, ...rest) => await duplicateApiUrl(...rest)
  );
  ipcMain.handle(
    "updateApiUrl",
    async (_, ...rest) => await updateApiUrl(...rest)
  );
};
