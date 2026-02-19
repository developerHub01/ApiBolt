import { ipcMain } from "electron";
import { ElectronAPIPathParamsInterface } from "@shared/types/api/electron-path-params";
import {
  createPathParams,
  deletePathParamsByRequestMetaId,
  getPathParams,
  updatePathParams,
} from "@/main/db/pathParamsDB";

export const pathParamsHandlers = (): void => {
  ipcMain.handle(
    "getPathParams",
    async (
      _,
      ...rest: Parameters<ElectronAPIPathParamsInterface["getPathParams"]>
    ): ReturnType<ElectronAPIPathParamsInterface["getPathParams"]> =>
      await getPathParams(...rest),
  );
  ipcMain.handle(
    "deletePathParamsByRequestMetaId",
    async (
      _,
      ...rest: Parameters<
        ElectronAPIPathParamsInterface["deletePathParamsByRequestMetaId"]
      >
    ): ReturnType<
      ElectronAPIPathParamsInterface["deletePathParamsByRequestMetaId"]
    > => await deletePathParamsByRequestMetaId(...rest),
  );
  ipcMain.handle(
    "createPathParams",
    async (
      _,
      ...rest: Parameters<ElectronAPIPathParamsInterface["createPathParams"]>
    ): ReturnType<ElectronAPIPathParamsInterface["createPathParams"]> =>
      await createPathParams(...rest),
  );
  ipcMain.handle(
    "updatePathParams",
    async (
      _,
      ...rest: Parameters<ElectronAPIPathParamsInterface["updatePathParams"]>
    ): ReturnType<ElectronAPIPathParamsInterface["updatePathParams"]> =>
      await updatePathParams(...rest),
  );
};
