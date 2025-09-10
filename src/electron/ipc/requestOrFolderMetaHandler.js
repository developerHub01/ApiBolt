import { ipcMain } from "electron";
import {
  createRequestOrFolderMeta,
  deleteRequestOrFolderMetaAll,
  deleteRequestOrFolderMetaById,
  deleteRequestOrFolderMetaByProjectId,
  getRequestOrFolderMeta,
  moveRequestOrFolderMeta,
  updateRequestOrFolderMeta,
  duplicateRequestOrFolderMeta,
  expendOrCollapseRequestOrFolderMetaAll,
  collapseAllRequestOrFolderMeta,
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
    "collapseAllRequestOrFolderMeta",
    async (_, ...rest) => await collapseAllRequestOrFolderMeta(...rest)
  );
  ipcMain.handle(
    "moveRequestOrFolderMeta",
    async (_, ...rest) => await moveRequestOrFolderMeta(...rest)
  );
  ipcMain.handle(
    "deleteRequestOrFolderMetaById",
    async (_, ...rest) => await deleteRequestOrFolderMetaById(...rest)
  );
  ipcMain.handle(
    "deleteRequestOrFolderMetaByProjectId",
    async (_, ...rest) => await deleteRequestOrFolderMetaByProjectId(...rest)
  );
  ipcMain.handle(
    "duplicateRequestOrFolderMeta",
    async (_, ...rest) => await duplicateRequestOrFolderMeta(...rest)
  );
  ipcMain.handle(
    "deleteRequestOrFolderMetaAll",
    async () => await deleteRequestOrFolderMetaAll()
  );
  ipcMain.handle(
    "expendOrCollapseRequestOrFolderMetaAll",
    async (_, ...rest) => await expendOrCollapseRequestOrFolderMetaAll(...rest)
  );
};
