import { ipcMain } from "electron";
import {
  createRequestOrFolderMeta,
  getRequestOrFolderMeta,
} from "../db/requestOrFolderMetaDB.js";

export const requestOrFolderMetaHandler = () => {
  ipcMain.handle(
    "getRequestOrFolderMeta",
    async (_, ...rest) => await getRequestOrFolderMeta(...rest)
  );
  ipcMain.handle(
    "createRequestOrFolderMeta",
    async (_, ...rest) => await createRequestOrFolderMeta(...rest)
  );
};
