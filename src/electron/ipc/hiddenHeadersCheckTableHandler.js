import { ipcMain } from "electron";
import {
  createHiddenHeadersCheck,
  getHiddenHeadersCheck,
  updateHiddenHeadersCheck,
} from "../db/hiddenHeadersCheckTableDB.js";

export const hiddenHeadersCheckTableHandler = () => {
  ipcMain.handle(
    "getHiddenHeadersCheck",
    async (_, ...rest) => await getHiddenHeadersCheck(...rest)
  );
  ipcMain.handle(
    "createHiddenHeadersCheck",
    async (_, ...rest) => await createHiddenHeadersCheck(...rest)
  );
  ipcMain.handle(
    "updateHiddenHeadersCheck",
    async (_, ...rest) => await updateHiddenHeadersCheck(...rest)
  );
};
