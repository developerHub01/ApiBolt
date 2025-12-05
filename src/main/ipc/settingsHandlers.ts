import { BrowserWindow, dialog, ipcMain } from "electron";
import {
  defaultSettings,
  getApplyingZoomLevel,
  getSettings,
  updateSettings,
} from "@/main/db/settingsDB.js";
import { access, readdir } from "fs/promises";
import { constants } from "fs";
import path from "path";
import { ElectronAPISettingsInterface } from "@shared/types/api/electron-settings";

const BACKGROUND_IMAGES_NUMBER_LIMIT = 30;

const imageExtensions = new Set<string>([
  ".png",
  ".jpg",
  ".jpeg",
  ".gif",
  ".bmp",
  ".webp",
]);

const getImageFilesFromFolder = async (folderPath: string) => {
  try {
    await access(folderPath, constants.R_OK);

    const files =
      (await readdir(folderPath, { withFileTypes: true }))
        ?.filter(entry => {
          if (!entry.isFile()) return false;
          const ext = path.extname(entry.name).toLowerCase();
          return imageExtensions.has(ext);
        })
        ?.slice(0, BACKGROUND_IMAGES_NUMBER_LIMIT)
        ?.map(file => path.join(folderPath, file.name)) ?? [];

    return [folderPath, ...files];
  } catch (error) {
    console.error(error);
    return null;
  }
};

export const handleZoomLevel = async () => {
  /* getting access of focused window */
  const windows = BrowserWindow.getAllWindows();
  /* getting zoomLevel comparing both global and project based */
  const zoomLevel = await getApplyingZoomLevel();

  /* window and zoomlevel found then update zoomLevel */
  if (windows && typeof zoomLevel === "number") {
    for (const window of windows) {
      /* skip splash */
      // if (window.isSplash) continue;
      window.webContents.setZoomFactor(zoomLevel);
    }
  }
};

export const settingsHandlers = () => {
  ipcMain.handle(
    "getSettings",
    async (_): ReturnType<ElectronAPISettingsInterface["getSettings"]> => {
      const result = await getSettings();

      if (
        result?.globalSetting?.backgroundImages &&
        result?.globalSetting?.backgroundImages !== "default"
      )
        result.globalSetting.backgroundImages = await getImageFilesFromFolder(
          result?.globalSetting?.backgroundImages,
        );

      if (
        result?.settings?.backgroundImages &&
        result?.settings?.backgroundImages !== "default"
      )
        result.settings.backgroundImages = await getImageFilesFromFolder(
          result?.settings?.backgroundImages,
        );

      await handleZoomLevel();

      return result;
    },
  );
  ipcMain.handle(
    "updateSettings",
    async (
      _,
      ...rest: Parameters<ElectronAPISettingsInterface["updateSettings"]>
    ): ReturnType<ElectronAPISettingsInterface["updateSettings"]> => {
      try {
        const result = await updateSettings(...rest);
        if (!result) return result;

        const payload = rest?.[0] ?? {};

        /* checking is there updating zoomLevel */
        if (result && "zoomLevel" in payload) await handleZoomLevel();
        return result;
      } catch (error) {
        console.error(error);
        return false;
      }
    },
  );
  ipcMain.handle(
    "updateSettingsBackgroundImages",
    async (
      _,
      ...rest: Parameters<
        ElectronAPISettingsInterface["updateSettingsBackgroundImages"]
      >
    ): ReturnType<
      ElectronAPISettingsInterface["updateSettingsBackgroundImages"]
    > => {
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

          /* if no opacity fixed in global and not have any value in project based setting then update opacity of local */

          if (
            (existingGlobalSetting?.backgroundOpacity === null ||
              typeof existingGlobalSetting?.backgroundOpacity ===
                "undefined") &&
            (existingSettings?.backgroundOpacity === null ||
              typeof existingSettings?.backgroundOpacity === "undefined")
          ) {
            payload.backgroundOpacity = defaultSettings.backgroundOpacity;
          }
        }

        return await updateSettings(payload);
      } catch (error) {
        console.error(error);
        return false;
      }
    },
  );
};
