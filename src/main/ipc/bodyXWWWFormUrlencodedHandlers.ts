import { ipcMain } from "electron";
import {
  checkAllBodyXWWWFormUrlencodedByRequestMetaId,
  createBodyXWWWFormUrlencoded,
  deleteBodyXWWWFormUrlencoded,
  deleteBodyXWWWFormUrlencodedByRequestMetaId,
  duplicateBodyXWWWFormUrlencoded,
  getBodyXWWWFormUrlencoded,
  replaceBodyXWWWFormUrlencoded,
  updateBodyXWWWFormUrlencoded
} from "@/main/db/bodyXWWWFormUrlencodedDB.js";
import { ElectronAPIBodyXWWWFormUrlencodedInterface } from "@/shared/types/api/electron-body-x-www-form-urlencoded";

export const bodyXWWWFormUrlencodedHandlers = () => {
  ipcMain.handle(
    "getBodyXWWWFormUrlencoded",
    async (
      _,
      ...rest: Parameters<
        ElectronAPIBodyXWWWFormUrlencodedInterface["getBodyXWWWFormUrlencoded"]
      >
    ): ReturnType<
      ElectronAPIBodyXWWWFormUrlencodedInterface["getBodyXWWWFormUrlencoded"]
    > => await getBodyXWWWFormUrlencoded(...rest)
  );
  ipcMain.handle(
    "deleteBodyXWWWFormUrlencoded",
    async (
      _,
      ...rest: Parameters<
        ElectronAPIBodyXWWWFormUrlencodedInterface["deleteBodyXWWWFormUrlencoded"]
      >
    ): ReturnType<
      ElectronAPIBodyXWWWFormUrlencodedInterface["deleteBodyXWWWFormUrlencoded"]
    > => await deleteBodyXWWWFormUrlencoded(...rest)
  );
  ipcMain.handle(
    "deleteBodyXWWWFormUrlencodedByRequestMetaId",
    async (
      _,
      ...rest: Parameters<
        ElectronAPIBodyXWWWFormUrlencodedInterface["deleteBodyXWWWFormUrlencodedByRequestMetaId"]
      >
    ): ReturnType<
      ElectronAPIBodyXWWWFormUrlencodedInterface["deleteBodyXWWWFormUrlencodedByRequestMetaId"]
    > => await deleteBodyXWWWFormUrlencodedByRequestMetaId(...rest)
  );
  ipcMain.handle(
    "createBodyXWWWFormUrlencoded",
    async (
      _,
      ...rest: Parameters<
        ElectronAPIBodyXWWWFormUrlencodedInterface["createBodyXWWWFormUrlencoded"]
      >
    ): ReturnType<
      ElectronAPIBodyXWWWFormUrlencodedInterface["createBodyXWWWFormUrlencoded"]
    > => await createBodyXWWWFormUrlencoded(...rest)
  );
  ipcMain.handle(
    "updateBodyXWWWFormUrlencoded",
    async (
      _,
      ...rest: Parameters<
        ElectronAPIBodyXWWWFormUrlencodedInterface["updateBodyXWWWFormUrlencoded"]
      >
    ): ReturnType<
      ElectronAPIBodyXWWWFormUrlencodedInterface["updateBodyXWWWFormUrlencoded"]
    > => await updateBodyXWWWFormUrlencoded(...rest)
  );
  ipcMain.handle(
    "replaceBodyXWWWFormUrlencoded",
    async (
      _,
      ...rest: Parameters<
        ElectronAPIBodyXWWWFormUrlencodedInterface["replaceBodyXWWWFormUrlencoded"]
      >
    ): ReturnType<
      ElectronAPIBodyXWWWFormUrlencodedInterface["replaceBodyXWWWFormUrlencoded"]
    > => await replaceBodyXWWWFormUrlencoded(...rest)
  );
  ipcMain.handle(
    "checkAllBodyXWWWFormUrlencodedByRequestMetaId",
    async (
      _,
      ...rest: Parameters<
        ElectronAPIBodyXWWWFormUrlencodedInterface["checkAllBodyXWWWFormUrlencodedByRequestMetaId"]
      >
    ): ReturnType<
      ElectronAPIBodyXWWWFormUrlencodedInterface["checkAllBodyXWWWFormUrlencodedByRequestMetaId"]
    > => await checkAllBodyXWWWFormUrlencodedByRequestMetaId(...rest)
  );
  ipcMain.handle(
    "duplicateBodyXWWWFormUrlencoded",
    async (
      _,
      ...rest: Parameters<
        ElectronAPIBodyXWWWFormUrlencodedInterface["duplicateBodyXWWWFormUrlencoded"]
      >
    ): ReturnType<
      ElectronAPIBodyXWWWFormUrlencodedInterface["duplicateBodyXWWWFormUrlencoded"]
    > => await duplicateBodyXWWWFormUrlencoded(...rest)
  );
};
