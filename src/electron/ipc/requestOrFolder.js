import { ipcMain } from "electron";
import {
  findRequestOrFolderById,
  updateRequestOrFolderById,
  deleteRequestOrFolderById,
} from "../db/requestOrFolderDB.js";

export const requestOrFolderDBHandlers = () => {
  ipcMain.handle(
    "findRequestOrFolderById",
    async (_, id) => await findRequestOrFolderById(id)
  );
  ipcMain.handle(
    "updateRequestOrFolderById",
    async (_, id, payload) => await updateRequestOrFolderById(id, payload)
  );
  ipcMain.handle(
    "deleteRequestOrFolderById",
    async (_, id) => await deleteRequestOrFolderById(id)
  );
};
