import { ipcMain } from "electron";
import {
  createMetaShowColumn,
  deleteMetaShowColumn,
  duplicateMetaShowColumn,
  getMetaShowColumn,
  updateMetaShowColumn
} from "@/main/db/metaShowColumnDB.js";
import { ElectronAPIMetaShowColumnInterface } from "@shared/types/api/electron-meta-show-column";

export const metaShowColumnHandlers = () => {
  ipcMain.handle(
    "getMetaShowColumn",
    async (
      _,
      ...rest: Parameters<
        ElectronAPIMetaShowColumnInterface["getMetaShowColumn"]
      >
    ): ReturnType<ElectronAPIMetaShowColumnInterface["getMetaShowColumn"]> =>
      await getMetaShowColumn(...rest)
  );
  ipcMain.handle(
    "createMetaShowColumn",
    async (
      _,
      ...rest: Parameters<
        ElectronAPIMetaShowColumnInterface["createMetaShowColumn"]
      >
    ): ReturnType<ElectronAPIMetaShowColumnInterface["createMetaShowColumn"]> =>
      await createMetaShowColumn(...rest)
  );
  ipcMain.handle(
    "updateMetaShowColumn",
    async (
      _,
      ...rest: Parameters<
        ElectronAPIMetaShowColumnInterface["updateMetaShowColumn"]
      >
    ): ReturnType<ElectronAPIMetaShowColumnInterface["updateMetaShowColumn"]> =>
      await updateMetaShowColumn(...rest)
  );
  ipcMain.handle(
    "deleteMetaShowColumn",
    async (
      _,
      ...rest: Parameters<
        ElectronAPIMetaShowColumnInterface["deleteMetaShowColumn"]
      >
    ): ReturnType<ElectronAPIMetaShowColumnInterface["deleteMetaShowColumn"]> =>
      await deleteMetaShowColumn(...rest)
  );
  ipcMain.handle(
    "duplicateMetaShowColumn",
    async (
      _,
      ...rest: Parameters<
        ElectronAPIMetaShowColumnInterface["duplicateMetaShowColumn"]
      >
    ): ReturnType<
      ElectronAPIMetaShowColumnInterface["duplicateMetaShowColumn"]
    > => await duplicateMetaShowColumn(...rest)
  );
};
