import { BrowserWindow, dialog, ipcMain } from "electron";
import {
  defaultSettings,
  getApplyingZoomLevel,
  getSettings,
  updateSettings,
} from "@/main/db/settingsDB.js";

import { ElectronAPISettingsInterface } from "@shared/types/api/electron-settings";
import { mainWindow } from "@/main/index";
import { getImageFilesFromFolder } from "@/main/utils/images";

const BACKGROUND_IMAGES_NUMBER_LIMIT = 30;

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

const handleBackgroundImages = async (
  images: string | null | "default" = null,
) => {
  if (images && images !== "default") {
    return await getImageFilesFromFolder({
      folderPath: images,
      limit: BACKGROUND_IMAGES_NUMBER_LIMIT,
    });
  }
  return images as null | "default";
};

export const settingsHandlers = () => {
  ipcMain.handle(
    "getSettings",
    async (_): ReturnType<ElectronAPISettingsInterface["getSettings"]> => {
      const { settings, globalSetting } = await getSettings();

      const globalBackgroundImages = await handleBackgroundImages(
        globalSetting?.backgroundImages,
      );
      const localBackgroundImages = await handleBackgroundImages(
        settings?.backgroundImages,
      );

      await handleZoomLevel();

      return {
        settings: settings
          ? {
              ...settings,
              backgroundImages: localBackgroundImages,
            }
          : settings,
        globalSetting: {
          ...globalSetting,
          backgroundImages: globalBackgroundImages,
        },
      };
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
        if (!mainWindow) throw new Error();

        const { method = "upload", projectId } = rest[0];
        let result: string | "default" | null = null;

        if (method === "upload") {
          const dialogResult = await dialog.showOpenDialog(mainWindow, {
            properties: ["openDirectory"],
            title: "Select background images folder",
            buttonLabel: "Select",
          });

          /* dialogResult.filePaths exists */
          result = dialogResult.filePaths?.[0] ?? null;
        } else if (method === "default") result = "default";

        const updatePayload: Parameters<
          ElectronAPISettingsInterface["updateSettings"]
        >[0] = {
          projectId: projectId ?? null,
          backgroundImages: result,
        };

        /* updating opacity based on the result and method */
        if (result && method === "upload") {
          const { settings, globalSetting } = await getSettings();

          /* if no opacity fixed in global and not have any value in project based setting then update opacity of local */
          if (
            (globalSetting?.backgroundOpacity === undefined ||
              globalSetting?.backgroundOpacity === null) &&
            (settings?.backgroundOpacity === undefined ||
              settings?.backgroundOpacity === null)
          ) {
            /* cast payload to proper type with backgroundOpacity */
            updatePayload.backgroundOpacity = defaultSettings.backgroundOpacity;
          }
        }

        return await updateSettings(updatePayload);
      } catch (error) {
        console.error(error);
        return false;
      }
    },
  );
};
