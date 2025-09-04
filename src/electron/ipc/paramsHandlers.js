import { ipcMain } from "electron";
import {
  checkAllParamsByRequestMetaId,
  createParams,
  deleteParams,
  deleteParamsByRequestMetaId,
  getParams,
  replaceParams,
  updateParams,
} from "../db/paramsDB.js";

export const paramsHandlers = () => {
  ipcMain.handle("getParams", async (_, ...rest) => await getParams(...rest));
  ipcMain.handle(
    "deleteParams",
    async (_, ...rest) => await deleteParams(...rest)
  );
  ipcMain.handle(
    "deleteParamsByRequestMetaId",
    async (_, ...rest) => await deleteParamsByRequestMetaId(...rest)
  );
  ipcMain.handle(
    "createParams",
    async (_, ...rest) => await createParams(...rest)
  );
  ipcMain.handle(
    "updateParams",
    async (_, ...rest) => await updateParams(...rest)
  );
  ipcMain.handle(
    "replaceParams",
    async (_, ...rest) => await replaceParams(...rest)
  );
  ipcMain.handle(
    "checkAllParamsByRequestMetaId",
    async (_, ...rest) => await checkAllParamsByRequestMetaId(...rest)
  );
};
