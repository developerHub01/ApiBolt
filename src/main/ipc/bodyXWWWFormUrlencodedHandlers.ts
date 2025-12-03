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

export const bodyXWWWFormUrlencodedHandlers = () => {
  ipcMain.handle(
    "getBodyXWWWFormUrlencoded",
    async (_, ...rest) => await getBodyXWWWFormUrlencoded(...rest)
  );
  ipcMain.handle(
    "deleteBodyXWWWFormUrlencoded",
    async (_, ...rest) => await deleteBodyXWWWFormUrlencoded(...rest)
  );
  ipcMain.handle(
    "deleteBodyXWWWFormUrlencodedByRequestMetaId",
    async (_, ...rest) =>
      await deleteBodyXWWWFormUrlencodedByRequestMetaId(...rest)
  );
  ipcMain.handle(
    "createBodyXWWWFormUrlencoded",
    async (_, ...rest) => await createBodyXWWWFormUrlencoded(...rest)
  );
  ipcMain.handle(
    "updateBodyXWWWFormUrlencoded",
    async (_, ...rest) => await updateBodyXWWWFormUrlencoded(...rest)
  );
  ipcMain.handle(
    "replaceBodyXWWWFormUrlencoded",
    async (_, ...rest) => await replaceBodyXWWWFormUrlencoded(...rest)
  );
  ipcMain.handle(
    "checkAllBodyXWWWFormUrlencodedByRequestMetaId",
    async (_, ...rest) =>
      await checkAllBodyXWWWFormUrlencodedByRequestMetaId(...rest)
  );
  ipcMain.handle(
    "duplicateBodyXWWWFormUrlencoded",
    async (_, ...rest) => await duplicateBodyXWWWFormUrlencoded(...rest)
  );
};
