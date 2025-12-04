import { ipcMain } from "electron";
import {
  checkAllParamsByRequestMetaId,
  createParams,
  deleteParams,
  deleteParamsByRequestMetaId,
  duplicateParams,
  getParams,
  replaceParams,
  updateParams
} from "@/main/db/paramsDB.js";
import { ElectronAPIParamsInterface } from "@/shared/types/api/electron-params";

export const paramsHandlers = () => {
  ipcMain.handle(
    "getParams",
    async (
      _,
      ...rest: Parameters<ElectronAPIParamsInterface["getParams"]>
    ): ReturnType<ElectronAPIParamsInterface["getParams"]> =>
      await getParams(...rest)
  );
  ipcMain.handle(
    "deleteParams",
    async (
      _,
      ...rest: Parameters<ElectronAPIParamsInterface["deleteParams"]>
    ): ReturnType<ElectronAPIParamsInterface["deleteParams"]> =>
      await deleteParams(...rest)
  );
  ipcMain.handle(
    "deleteParamsByRequestMetaId",
    async (
      _,
      ...rest: Parameters<
        ElectronAPIParamsInterface["deleteParamsByRequestMetaId"]
      >
    ): ReturnType<ElectronAPIParamsInterface["deleteParamsByRequestMetaId"]> =>
      await deleteParamsByRequestMetaId(...rest)
  );
  ipcMain.handle(
    "createParams",
    async (
      _,
      ...rest: Parameters<ElectronAPIParamsInterface["createParams"]>
    ): ReturnType<ElectronAPIParamsInterface["createParams"]> =>
      await createParams(...rest)
  );
  ipcMain.handle(
    "updateParams",
    async (
      _,
      ...rest: Parameters<ElectronAPIParamsInterface["updateParams"]>
    ): ReturnType<ElectronAPIParamsInterface["updateParams"]> =>
      await updateParams(...rest)
  );
  ipcMain.handle(
    "replaceParams",
    async (
      _,
      ...rest: Parameters<ElectronAPIParamsInterface["replaceParams"]>
    ): ReturnType<ElectronAPIParamsInterface["replaceParams"]> =>
      await replaceParams(...rest)
  );
  ipcMain.handle(
    "checkAllParamsByRequestMetaId",
    async (
      _,
      ...rest: Parameters<
        ElectronAPIParamsInterface["checkAllParamsByRequestMetaId"]
      >
    ): ReturnType<
      ElectronAPIParamsInterface["checkAllParamsByRequestMetaId"]
    > => await checkAllParamsByRequestMetaId(...rest)
  );
  ipcMain.handle(
    "duplicateParams",
    async (
      _,
      ...rest: Parameters<ElectronAPIParamsInterface["duplicateParams"]>
    ): ReturnType<ElectronAPIParamsInterface["duplicateParams"]> =>
      await duplicateParams(...rest)
  );
};
