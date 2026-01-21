import { ipcMain } from "electron";
import {
  createTheme,
  deleteThemeById,
  getThemeById,
  getThemeListMeta,
  getThemePaletteById,
  getTotalInstalledThemeCount,
  updateTheme,
} from "@/main/db/themeDB.js";
import {
  importThemePaletteInEditor,
  saveThemePaletteLocal,
} from "@/main/utils/theme.js";
import { ElectronAPIThemeInterface } from "@shared/types/api/electron-theme";
import { app } from "electron/main";
import path, { dirname } from "node:path";
import { mkdir, unlink, writeFile } from "node:fs/promises";
import axios from "axios";
import { getImageFileFromPath } from "@/main/utils/images";
import { ThemeInterface } from "@shared/types/theme.types";
import {
  createActiveGlobalThemeIfNotExist,
  getActiveThemeMeta,
} from "@/main/db/activeThemeDB";
import { MAX_INSTALLED_THEME_COUNT } from "@shared/constant/theme";

const getNewThumbnailPath = (id: string): string => {
  const userDataPath = app.getPath("userData");
  return path.join(userDataPath, "theme_thumbnails", `${id}.webp`);
};

const getNewPreviewPath = (id: string): string => {
  const userDataPath = app.getPath("userData");
  return path.join(userDataPath, "theme_previews", `${id}.webp`);
};

const getThemesWithApiProtocolAssets = async <
  T extends Partial<Pick<ThemeInterface, "thumbnail" | "preview">>,
>(
  themes: Array<T>,
  addPreview: boolean = false,
): Promise<Array<T>> => {
  const results = await Promise.allSettled(
    themes.map(async theme => {
      let thumbnail = theme.thumbnail;
      let preview = addPreview ? theme.preview : undefined;

      if (thumbnail) {
        const processedPath = await getImageFileFromPath(thumbnail);
        if (processedPath) thumbnail = processedPath;
      }
      if (preview) {
        const processedPath = await getImageFileFromPath(preview);
        if (processedPath) preview = processedPath;
      }

      return {
        ...theme,
        thumbnail,
        preview,
      };
    }),
  );

  return results
    .filter(res => res.status === "fulfilled")
    .map(res => (res as PromiseFulfilledResult<T>).value) as Array<T>;
};

export const themeHandler = (): void => {
  ipcMain.handle(
    "getThemeListMeta",
    async (
      _,
      ...rest: Parameters<ElectronAPIThemeInterface["getThemeListMeta"]>
    ): ReturnType<ElectronAPIThemeInterface["getThemeListMeta"]> =>
      await getThemesWithApiProtocolAssets(await getThemeListMeta(...rest)),
  );
  ipcMain.handle(
    "getActiveThemeMeta",
    async (_): ReturnType<ElectronAPIThemeInterface["getActiveThemeMeta"]> => {
      const themes = await getActiveThemeMeta();
      themes.global = (
        await getThemesWithApiProtocolAssets([themes.global])
      )[0];
      if (themes.local)
        themes.local = (
          await getThemesWithApiProtocolAssets([themes.local])
        )[0];

      return themes;
    },
  );
  ipcMain.handle(
    "getThemeById",
    async (
      _,
      ...rest: Parameters<ElectronAPIThemeInterface["getThemeById"]>
    ): ReturnType<ElectronAPIThemeInterface["getThemeById"]> => {
      const response = await getThemeById(...rest);
      if (!response) return response;
      return (
        await getThemesWithApiProtocolAssets<
          /* removing promise and null from the type */
          Exclude<
            Awaited<ReturnType<ElectronAPIThemeInterface["getThemeById"]>>,
            null
          >
        >([response], true)
      )[0];
    },
  );
  ipcMain.handle(
    "getThemePaletteById",
    async (
      _,
      ...rest: Parameters<ElectronAPIThemeInterface["getThemePaletteById"]>
    ): ReturnType<ElectronAPIThemeInterface["getThemePaletteById"]> =>
      await getThemePaletteById(...rest),
  );
  ipcMain.handle(
    "createTheme",
    async (
      _,
      ...rest: Parameters<ElectronAPIThemeInterface["createTheme"]>
    ): ReturnType<ElectronAPIThemeInterface["createTheme"]> =>
      await createTheme(...rest),
  );
  ipcMain.handle(
    "updateTheme",
    async (
      _,
      ...rest: Parameters<ElectronAPIThemeInterface["updateTheme"]>
    ): ReturnType<ElectronAPIThemeInterface["updateTheme"]> =>
      await updateTheme(...rest),
  );
  ipcMain.handle(
    "deleteThemeById",
    async (
      _,
      ...rest: Parameters<ElectronAPIThemeInterface["deleteThemeById"]>
    ): ReturnType<ElectronAPIThemeInterface["deleteThemeById"]> =>
      await deleteThemeById(...rest),
  );
  ipcMain.handle(
    "saveThemePalette",
    async (
      _,
      ...rest: Parameters<ElectronAPIThemeInterface["saveThemePalette"]>
    ): ReturnType<ElectronAPIThemeInterface["saveThemePalette"]> =>
      await saveThemePaletteLocal(JSON.stringify(rest[0], null, 2)),
  );
  ipcMain.handle(
    "importThemePaletteInEditor",
    async (): ReturnType<
      ElectronAPIThemeInterface["importThemePaletteInEditor"]
    > => await importThemePaletteInEditor(),
  );
  ipcMain.handle(
    "installTheme",
    async (
      _,
      ...rest: Parameters<ElectronAPIThemeInterface["installTheme"]>
    ): ReturnType<ElectronAPIThemeInterface["installTheme"]> => {
      const themeMeta = rest[0];
      const totalInstalledTheme = await getTotalInstalledThemeCount();

      if (totalInstalledTheme >= MAX_INSTALLED_THEME_COUNT)
        throw new Error("theme installation limit exit");

      if (!themeMeta.id || !themeMeta.thumbnail) throw new Error();

      const themeId = themeMeta.id;
      const thumbnail = themeMeta.thumbnail;
      const preview = themeMeta.preview;

      /* handle fs context */
      const userDataPath = app.getPath("userData");
      const thumbnailLocalPath = path.join(
        userDataPath,
        "theme_thumbnails",
        `${themeId}.webp`,
      );
      const previewlLocalPath = path.join(
        userDataPath,
        "theme_previews",
        `${themeId}.webp`,
      );

      await Promise.allSettled([
        mkdir(dirname(thumbnailLocalPath), {
          recursive: true,
        }),
        mkdir(dirname(previewlLocalPath), {
          recursive: true,
        }),
      ]);

      /* getting images from server */
      const [thumbnailRes, previewRes] = await Promise.allSettled([
        axios.get(thumbnail, {
          responseType: "arraybuffer",
        }),
        axios.get(preview, {
          responseType: "arraybuffer",
        }),
      ]);

      /* storing buffer saving operation */
      const writeBufferPromises: Array<Promise<void>> = [];

      if (thumbnailRes.status === "fulfilled")
        writeBufferPromises.push(
          writeFile(thumbnailLocalPath, Buffer.from(thumbnailRes.value.data)),
        );

      if (previewRes.status === "fulfilled")
        writeBufferPromises.push(
          writeFile(previewlLocalPath, Buffer.from(previewRes.value.data)),
        );

      /* writting all buffter images */
      await Promise.all(writeBufferPromises);

      const createResponse = await createTheme({
        ...themeMeta,
        thumbnail: thumbnailLocalPath,
        preview: previewlLocalPath,
      });

      if (!createResponse) {
        try {
          await Promise.allSettled([
            unlink(thumbnailLocalPath),
            unlink(previewlLocalPath),
          ]);
        } catch {
          /*  */
        }
      }

      return createResponse;
    },
  );
  ipcMain.handle(
    "unInstallTheme",
    async (
      _,
      ...rest: Parameters<ElectronAPIThemeInterface["unInstallTheme"]>
    ): ReturnType<ElectronAPIThemeInterface["unInstallTheme"]> => {
      const themeId = rest[0];
      if (!themeId) throw new Error();

      const deletedResponse = await deleteThemeById(themeId);

      if (deletedResponse) {
        try {
          await Promise.allSettled([
            unlink(getNewThumbnailPath(themeId)),
            unlink(getNewPreviewPath(themeId)),
          ]);
        } catch {
          /*  */
        }
      }

      await createActiveGlobalThemeIfNotExist();
      return deletedResponse;
    },
  );
};
