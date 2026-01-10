import { BrowserWindow, dialog, ipcMain } from "electron";
import {
  getApplyingZoomLevel,
  getSettings,
  updateSettings,
} from "@/main/db/settingsDB.js";
import { access, readdir } from "fs/promises";
import { constants } from "fs";
import path from "path";
import { ElectronAPISettingsInterface } from "@shared/types/api/electron-settings";
import { pathToFileURL } from "url";
import { mainWindow } from "@/main/index";
import { defaultSettings } from "@/data/settings";

const BACKGROUND_IMAGES_NUMBER_LIMIT = 30;

const imageExtensions = new Set<string>([
  ".png",
  ".jpg",
  ".jpeg",
  ".gif",
  ".bmp",
  ".webp",
]);

/** Get image URLs for renderer via api-bolt:// protocol */
export const getImageFilesFromFolder = async (folderPath: string) => {
  try {
    await access(folderPath, constants.R_OK);

    const files =
      (await readdir(folderPath, { withFileTypes: true }))
        ?.filter(
          entry =>
            entry.isFile() &&
            imageExtensions.has(path.extname(entry.name).toLowerCase()),
        )
        ?.slice(0, BACKGROUND_IMAGES_NUMBER_LIMIT)
        ?.map(file => {
          const absolutePath = path.resolve(folderPath, file.name);
          const url = pathToFileURL(absolutePath).toString();
          return url.replace("file://", "api-bolt://");
        }) ?? [];

    const folderUrl = path.resolve(folderPath);
    return [folderUrl, ...files];
  } catch (error) {
    console.error("getImageFilesFromFolder error:", error);
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

const handleBackgroundImages = async (
  images: string | null | "default" = null,
) => {
  if (images && images !== "default") {
    return await getImageFilesFromFolder(images);
  }
  return images as null | "default";
};

export const settingsHandler = () => {
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
