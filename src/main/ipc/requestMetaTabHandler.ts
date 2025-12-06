import { ipcMain } from "electron";
import {
  getRequestMetaTab,
  createRequestMetaTab,
  updateRequestMetaTab,
  deleteRequestMetaTab,
  duplicateRequestMetaTab,
  replaceRequestMetaTab,
} from "@/main/db/requestMetaTabDB.js";
import { ElectronAPIRequestMetaTabInterface } from "@shared/types/api/electron-request-meta-tab";

export const requestMetaTabHandler = () => {
  ipcMain.handle(
    "getRequestMetaTab",
    async (
      _,
      ...rest: Parameters<
        ElectronAPIRequestMetaTabInterface["getRequestMetaTab"]
      >
    ): ReturnType<ElectronAPIRequestMetaTabInterface["getRequestMetaTab"]> =>
      await getRequestMetaTab(...rest),
  );
  ipcMain.handle(
    "createRequestMetaTab",
    async (
      _,
      ...rest: Parameters<
        ElectronAPIRequestMetaTabInterface["createRequestMetaTab"]
      >
    ): ReturnType<ElectronAPIRequestMetaTabInterface["createRequestMetaTab"]> =>
      await createRequestMetaTab(...rest),
  );
  ipcMain.handle(
    "updateRequestMetaTab",
    async (
      _,
      ...rest: Parameters<
        ElectronAPIRequestMetaTabInterface["updateRequestMetaTab"]
      >
    ): ReturnType<ElectronAPIRequestMetaTabInterface["updateRequestMetaTab"]> =>
      await updateRequestMetaTab(...rest),
  );
  ipcMain.handle(
    "deleteRequestMetaTab",
    async (
      _,
      ...rest: Parameters<
        ElectronAPIRequestMetaTabInterface["deleteRequestMetaTab"]
      >
    ): ReturnType<ElectronAPIRequestMetaTabInterface["deleteRequestMetaTab"]> =>
      await deleteRequestMetaTab(...rest),
  );
  ipcMain.handle(
    "duplicateRequestMetaTab",
    async (
      _,
      ...rest: Parameters<
        ElectronAPIRequestMetaTabInterface["duplicateRequestMetaTab"]
      >
    ): ReturnType<
      ElectronAPIRequestMetaTabInterface["duplicateRequestMetaTab"]
    > => await duplicateRequestMetaTab(...rest),
  );
  ipcMain.handle(
    "replaceRequestMetaTab",
    async (
      _,
      ...rest: Parameters<
        ElectronAPIRequestMetaTabInterface["replaceRequestMetaTab"]
      >
    ): ReturnType<
      ElectronAPIRequestMetaTabInterface["replaceRequestMetaTab"]
    > => await replaceRequestMetaTab(...rest),
  );
};
