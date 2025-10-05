import fs from "fs";
import path from "path";
import { dialog, ipcMain } from "electron";
import {
  createBodyBinary,
  deleteBodyBinary,
  getBodyBinary,
  updateBodyBinary,
} from "../db/bodyBinaryDB.js";

export const bodyBinaryHandler = () => {
  ipcMain.handle("getBodyBinary", async (_, ...rest) => {
    try {
      let result = (await getBodyBinary(...rest)) ?? {};
      const { path: filePath } = result;

      let file = null;
      if (filePath && fs.existsSync(filePath)) file = path.basename(filePath);

      return {
        ...result,
        file,
      };
    } catch (error) {
      console.error(error);
    }
  });
  ipcMain.handle(
    "createBodyBinary",
    async (_, ...rest) => await createBodyBinary(...rest)
  );
  ipcMain.handle("updateBodyBinary", async (_, ...rest) => {
    try {
      let payload = rest?.[0] ?? {};

      let result = await dialog.showOpenDialog({
        properties: ["openFile"],
        title: "Select file",
        buttonLabel: "Select",
      });

      result = result?.filePaths?.[0];

      payload["path"] = result;

      return await updateBodyBinary(payload);
    } catch (error) {
      console.error(error);
    }
  });
  ipcMain.handle(
    "deleteBodyBinary",
    async (_, ...rest) => await deleteBodyBinary(...rest)
  );
};
