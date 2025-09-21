import { ipcMain } from "electron";
import {
  createShowHiddenMetaData,
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
};
