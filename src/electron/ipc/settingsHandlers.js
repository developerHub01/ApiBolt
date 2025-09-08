import { BrowserWindow, dialog, ipcMain } from "electron";
import {
  defaultSettings,
  getSettings,
  getZoomLevel,
  updateSettings,
} from "../db/settingsDB.js";
import fs from "fs";
import path from "path";

const imageExtensions = [".png", ".jpg", ".jpeg", ".gif", ".bmp", ".webp"];

function getImageFilesFromFolder(folderPath) {
  try {
    const allFiles = fs.readdirSync(folderPath)?.slice(0, 30);

    const imageFiles = allFiles.filter((file) => {
      const ext = path.extname(file).toLowerCase();
      return imageExtensions.includes(ext);
    });

    // Return full paths
    return imageFiles.map((file) => path.join(folderPath, file));
  } catch (error) {
    return null;
  }
}

export const settingsHandlers = () => {
  ipcMain.handle("getSettings", async (_) => {
    const result = await getSettings();

    if (
      result?.globalSetting?.backgroundImages &&
      result?.globalSetting?.backgroundImages !== "default"
    )
      result.globalSetting.backgroundImages = getImageFilesFromFolder(
        result?.globalSetting?.backgroundImages
      );

    if (
      result?.settings?.backgroundImages &&
      result?.settings?.backgroundImages !== "default"
    )
      result.settings.backgroundImages = getImageFilesFromFolder(
        result?.settings?.backgroundImages
      );

    return result;
  });
  ipcMain.handle("updateSettings", async (_, ...rest) => {
    try {
      const result = await updateSettings(...rest);

      const payload = rest?.[0] ?? {};
      /* checking is there updating zoomLevel */
      if (result && typeof payload.zoomLevel === "number") {
        /* getting access of focused window */
        const window = BrowserWindow.getFocusedWindow();
        /* getting zoomLevel comparing both global and project based */
        let zoomLevel = await getZoomLevel();

        if (zoomLevel === -1) zoomLevel = 1;
        /* window and zoomlevel found then update zoomLevel */
        if (window && typeof zoomLevel === "number")
          window.webContents.setZoomFactor(zoomLevel);
      }

      return result;
    } catch (error) {
      console.error(error);
    }
  });
  ipcMain.handle("updateSettingsBackgroundImages", async (_, ...rest) => {
    try {
      let payload = rest?.[0] ?? {};
      const method = payload?.method ?? "upload";
      let result = null;

      if (method === "upload") {
        result = await dialog.showOpenDialog({
          properties: ["openDirectory"],
          title: "Select background images folder",
          buttonLabel: "Select",
        });

        result = result?.filePaths?.[0];
      } else if (method === "default") result = "default";

      payload = {
        projectId: payload?.projectId ?? null,
        backgroundImages: result,
      };

      /* updating opacity based on the result and method */
      if (result && method === "upload") {
        const { settings: existingSettings, existingGlobalSetting } =
          await getSettings();

        console.log({ existingGlobalSetting, existingSettings });

        /* if no opacity fixed in global and not have any value in project based setting then update opacity of local */

        if (
          (existingGlobalSetting?.backgroundOpacity === null ||
            typeof existingGlobalSetting?.backgroundOpacity === "undefined") &&
          (existingSettings?.backgroundOpacity === null ||
            typeof existingSettings?.backgroundOpacity === "undefined")
        ) {
          payload.backgroundOpacity = defaultSettings.backgroundOpacity;
        }
      }

      return await updateSettings(payload);
    } catch (error) {
      console.error(error);
    }
  });
};
