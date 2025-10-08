import { ipcMain, shell } from "electron";
import { constants } from "fs";
import { access } from "fs/promises";

export const fileSystemHandler = () => {
  ipcMain.handle("openFolder", async (_, path) => {
    try {
      await access(path, constants.R_OK);
      const result = await shell.openPath(path);
      /* shell.openPath returns an empty string on success */
      return !result;
    } catch (error) {
      console.error(error);
      return false;
    }
  });
};
