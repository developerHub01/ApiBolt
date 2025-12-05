import { ipcMain } from "electron";
import {
  checkAllHeadersByRequestMetaId,
  createHeaders,
  deleteHeaders,
  deleteHeadersByRequestMetaId,
  duplicateHeaders,
  getHeaders,
  replaceHeaders,
  updateHeaders
} from "@/main/db/headersDB.js";
import { ElectronAPIHeadersInterface } from "@shared/types/api/electron-headers";

export const headersHandlers = () => {
  ipcMain.handle(
    "getHeaders",
    async (
      _,
      ...rest: Parameters<ElectronAPIHeadersInterface["getHeaders"]>
    ): ReturnType<ElectronAPIHeadersInterface["getHeaders"]> =>
      await getHeaders(...rest)
  );
  ipcMain.handle(
    "deleteHeaders",
    async (
      _,
      ...rest: Parameters<ElectronAPIHeadersInterface["deleteHeaders"]>
    ): ReturnType<ElectronAPIHeadersInterface["deleteHeaders"]> =>
      await deleteHeaders(...rest)
  );
  ipcMain.handle(
    "deleteHeadersByRequestMetaId",
    async (
      _,
      ...rest: Parameters<
        ElectronAPIHeadersInterface["deleteHeadersByRequestMetaId"]
      >
    ): ReturnType<
      ElectronAPIHeadersInterface["deleteHeadersByRequestMetaId"]
    > => await deleteHeadersByRequestMetaId(...rest)
  );
  ipcMain.handle(
    "createHeaders",
    async (
      _,
      ...rest: Parameters<ElectronAPIHeadersInterface["createHeaders"]>
    ): ReturnType<ElectronAPIHeadersInterface["createHeaders"]> =>
      await createHeaders(...rest)
  );
  ipcMain.handle(
    "updateHeaders",
    async (
      _,
      ...rest: Parameters<ElectronAPIHeadersInterface["updateHeaders"]>
    ): ReturnType<ElectronAPIHeadersInterface["updateHeaders"]> =>
      await updateHeaders(...rest)
  );
  ipcMain.handle(
    "replaceHeaders",
    async (
      _,
      ...rest: Parameters<ElectronAPIHeadersInterface["replaceHeaders"]>
    ): ReturnType<ElectronAPIHeadersInterface["replaceHeaders"]> =>
      await replaceHeaders(...rest)
  );
  ipcMain.handle(
    "checkAllHeadersByRequestMetaId",
    async (
      _,
      ...rest: Parameters<
        ElectronAPIHeadersInterface["checkAllHeadersByRequestMetaId"]
      >
    ): ReturnType<
      ElectronAPIHeadersInterface["checkAllHeadersByRequestMetaId"]
    > => await checkAllHeadersByRequestMetaId(...rest)
  );
  ipcMain.handle(
    "duplicateHeaders",
    async (
      _,
      ...rest: Parameters<ElectronAPIHeadersInterface["duplicateHeaders"]>
    ): ReturnType<ElectronAPIHeadersInterface["duplicateHeaders"]> =>
      await duplicateHeaders(...rest)
  );
};
