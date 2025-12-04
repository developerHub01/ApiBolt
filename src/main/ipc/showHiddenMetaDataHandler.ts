import { ipcMain } from "electron";
import {
  createShowHiddenMetaData,
  duplicateShowHiddenMetaData,
  getShowHiddenMetaData,
  updateShowHiddenMetaData
} from "@/main/db/showHiddenMetaDataDB.js";
import { ElectronAPIShowHiddenMetaDataInterface } from "@/shared/types/api/electron-show-hidden-meta-data";

export const showHiddenMetaDataHandler = () => {
  ipcMain.handle(
    "getShowHiddenMetaData",
    async (
      _,
      ...rest: Parameters<
        ElectronAPIShowHiddenMetaDataInterface["getShowHiddenMetaData"]
      >
    ): ReturnType<
      ElectronAPIShowHiddenMetaDataInterface["getShowHiddenMetaData"]
    > => await getShowHiddenMetaData(...rest)
  );
  ipcMain.handle(
    "createShowHiddenMetaData",
    async (
      _,
      ...rest: Parameters<
        ElectronAPIShowHiddenMetaDataInterface["createShowHiddenMetaData"]
      >
    ): ReturnType<
      ElectronAPIShowHiddenMetaDataInterface["createShowHiddenMetaData"]
    > => await createShowHiddenMetaData(...rest)
  );
  ipcMain.handle(
    "updateShowHiddenMetaData",
    async (
      _,
      ...rest: Parameters<
        ElectronAPIShowHiddenMetaDataInterface["updateShowHiddenMetaData"]
      >
    ): ReturnType<
      ElectronAPIShowHiddenMetaDataInterface["updateShowHiddenMetaData"]
    > => await updateShowHiddenMetaData(...rest)
  );
  ipcMain.handle(
    "duplicateShowHiddenMetaData",
    async (
      _,
      ...rest: Parameters<
        ElectronAPIShowHiddenMetaDataInterface["duplicateShowHiddenMetaData"]
      >
    ): ReturnType<
      ElectronAPIShowHiddenMetaDataInterface["duplicateShowHiddenMetaData"]
    > => await duplicateShowHiddenMetaData(...rest)
  );
};
