import { ipcMain } from "electron";
import {
  createRequestOrFolderMeta,
  deleteRequestOrFolderMetaAll,
  deleteRequestOrFolderMetaByProjectId,
  getRequestOrFolderMeta,
  moveRequestOrFolderMeta,
  updateRequestOrFolderMeta,
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
  ipcMain.handle(
    "updateRequestOrFolderMeta",
    async (_, ...rest) => await updateRequestOrFolderMeta(...rest)
  );
  ipcMain.handle(
    "moveRequestOrFolderMeta",
    async (_, ...rest) => await moveRequestOrFolderMeta(...rest)
  );
  ipcMain.handle(
    "deleteRequestOrFolderMetaByProjectId",
    async (_, ...rest) => await deleteRequestOrFolderMetaByProjectId(...rest)
  );
  ipcMain.handle(
    "deleteRequestOrFolderMetaAll",
    async () => await deleteRequestOrFolderMetaAll()
  );
};
