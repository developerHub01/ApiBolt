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
  getRequestOrFolderMetaById
} from "@/main/db/requestOrFolderMetaDB.js";
import { ElectronAPIRequestOrFolderMetaInterface } from "@shared/types/api/electron-request-or-folder-meta";

export const requestOrFolderMetaHandler = () => {
  ipcMain.handle(
    "getRequestOrFolderMeta",
    async (
      _,
      ...rest: Parameters<
        ElectronAPIRequestOrFolderMetaInterface["getRequestOrFolderMeta"]
      >
    ): Promise<
      ReturnType<
        ElectronAPIRequestOrFolderMetaInterface["getRequestOrFolderMeta"]
      >
    > => await getRequestOrFolderMeta(...rest)
  );
  ipcMain.handle(
    "getRequestOrFolderMetaById",
    async (
      _,
      ...rest: Parameters<
        ElectronAPIRequestOrFolderMetaInterface["getRequestOrFolderMetaById"]
      >
    ): Promise<
      ReturnType<
        ElectronAPIRequestOrFolderMetaInterface["getRequestOrFolderMetaById"]
      >
    > => await getRequestOrFolderMetaById(...rest)
  );
  ipcMain.handle(
    "createRequestOrFolderMeta",
    async (
      _,
      ...rest: Parameters<
        ElectronAPIRequestOrFolderMetaInterface["createRequestOrFolderMeta"]
      >
    ): Promise<
      ReturnType<
        ElectronAPIRequestOrFolderMetaInterface["createRequestOrFolderMeta"]
      >
    > => await createRequestOrFolderMeta(...rest)
  );
  ipcMain.handle(
    "updateRequestOrFolderMeta",
    async (
      _,
      ...rest: Parameters<
        ElectronAPIRequestOrFolderMetaInterface["updateRequestOrFolderMeta"]
      >
    ): Promise<
      ReturnType<
        ElectronAPIRequestOrFolderMetaInterface["updateRequestOrFolderMeta"]
      >
    > => await updateRequestOrFolderMeta(...rest)
  );
  ipcMain.handle(
    "collapseAllRequestOrFolderMeta",
    async (
      _,
      ...rest: Parameters<
        ElectronAPIRequestOrFolderMetaInterface["collapseAllRequestOrFolderMeta"]
      >
    ): Promise<
      ReturnType<
        ElectronAPIRequestOrFolderMetaInterface["collapseAllRequestOrFolderMeta"]
      >
    > => await collapseAllRequestOrFolderMeta(...rest)
  );
  ipcMain.handle(
    "moveRequestOrFolderMeta",
    async (
      _,
      ...rest: Parameters<
        ElectronAPIRequestOrFolderMetaInterface["moveRequestOrFolderMeta"]
      >
    ): Promise<
      ReturnType<
        ElectronAPIRequestOrFolderMetaInterface["moveRequestOrFolderMeta"]
      >
    > => await moveRequestOrFolderMeta(...rest)
  );
  ipcMain.handle(
    "deleteRequestOrFolderMetaById",
    async (
      _,
      ...rest: Parameters<
        ElectronAPIRequestOrFolderMetaInterface["deleteRequestOrFolderMetaById"]
      >
    ): Promise<
      ReturnType<
        ElectronAPIRequestOrFolderMetaInterface["deleteRequestOrFolderMetaById"]
      >
    > => await deleteRequestOrFolderMetaById(...rest)
  );
  ipcMain.handle(
    "deleteRequestOrFolderMetaByProjectId",
    async (
      _,
      ...rest: Parameters<
        ElectronAPIRequestOrFolderMetaInterface["deleteRequestOrFolderMetaByProjectId"]
      >
    ): Promise<
      ReturnType<
        ElectronAPIRequestOrFolderMetaInterface["deleteRequestOrFolderMetaByProjectId"]
      >
    > => await deleteRequestOrFolderMetaByProjectId(...rest)
  );
  ipcMain.handle(
    "duplicateRequestOrFolderMeta",
    async (
      _,
      ...rest: Parameters<
        ElectronAPIRequestOrFolderMetaInterface["duplicateRequestOrFolderMeta"]
      >
    ): Promise<
      ReturnType<
        ElectronAPIRequestOrFolderMetaInterface["duplicateRequestOrFolderMeta"]
      >
    > => await duplicateRequestOrFolderMeta(...rest)
  );
  ipcMain.handle(
    "deleteRequestOrFolderMetaAll",
    async (): Promise<
      ReturnType<
        ElectronAPIRequestOrFolderMetaInterface["deleteRequestOrFolderMetaAll"]
      >
    > => await deleteRequestOrFolderMetaAll()
  );
  ipcMain.handle(
    "expendOrCollapseRequestOrFolderMetaAll",
    async (
      _,
      ...rest: Parameters<
        ElectronAPIRequestOrFolderMetaInterface["expendOrCollapseRequestOrFolderMetaAll"]
      >
    ): Promise<
      ReturnType<
        ElectronAPIRequestOrFolderMetaInterface["expendOrCollapseRequestOrFolderMetaAll"]
      >
    > => await expendOrCollapseRequestOrFolderMetaAll(...rest)
  );
};
