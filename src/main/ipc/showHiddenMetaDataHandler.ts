import { ipcMain } from "electron";
import {
  createShowHiddenMetaData,
  duplicateShowHiddenMetaData,
  getShowHiddenMetaData,
  updateShowHiddenMetaData,
} from "../db/showHiddenMetaDataDB.js";

export const showHiddenMetaDataHandler = () => {
  ipcMain.handle(
    "getShowHiddenMetaData",
    async (_, ...rest) => await getShowHiddenMetaData(...rest)
  );
  ipcMain.handle(
    "createShowHiddenMetaData",
    async (_, ...rest) => await createShowHiddenMetaData(...rest)
  );
  ipcMain.handle(
    "updateShowHiddenMetaData",
    async (_, ...rest) => await updateShowHiddenMetaData(...rest)
  );
  ipcMain.handle(
    "duplicateShowHiddenMetaData",
    async (_, ...rest) => await duplicateShowHiddenMetaData(...rest)
  );
};
