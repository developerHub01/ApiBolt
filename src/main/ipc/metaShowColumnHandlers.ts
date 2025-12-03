import { ipcMain } from "electron";
import {
  createMetaShowColumn,
  deleteMetaShowColumn,
  duplicateMetaShowColumn,
  getMetaShowColumn,
  updateMetaShowColumn
} from "@/main/db/metaShowColumnDB.js";

export const metaShowColumnHandlers = () => {
  ipcMain.handle(
    "getMetaShowColumn",
    async (_, ...rest) => await getMetaShowColumn(...rest)
  );
  ipcMain.handle(
    "createMetaShowColumn",
    async (_, ...rest) => await createMetaShowColumn(...rest)
  );
  ipcMain.handle(
    "updateMetaShowColumn",
    async (_, ...rest) => await updateMetaShowColumn(...rest)
  );
  ipcMain.handle(
    "deleteMetaShowColumn",
    async (_, ...rest) => await deleteMetaShowColumn(...rest)
  );
  ipcMain.handle(
    "duplicateMetaShowColumn",
    async (_, ...rest) => await duplicateMetaShowColumn(...rest)
  );
};
