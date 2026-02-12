import { access, readdir, stat } from "node:fs/promises";
import { constants } from "node:fs";
import path from "node:path";
import { pathToFileURL } from "node:url";
import { nativeImage } from "electron";
import { BackgroundImagesInterface } from "@shared/types/setting.types";

const imageExtensions = new Set<string>([
  ".png",
  ".jpg",
  ".jpeg",
  ".gif",
  ".bmp",
  ".webp",
]);

/** Get image URLs for renderer via api-bolt:// protocol */
export const getImageFilesFromFolder = async ({
  folderPath,
  limit = Infinity,
}: {
  folderPath: string;
  limit?: number;
}): Promise<BackgroundImagesInterface | null> => {
  try {
    await access(folderPath, constants.R_OK);

    const imageEntries =
      (
        await readdir(folderPath, {
          withFileTypes: true,
        })
      )
        ?.filter(
          entry =>
            entry.isFile() &&
            imageExtensions.has(path.extname(entry.name).toLowerCase()),
        )
        ?.slice(0, limit) ?? [];

    const thumbnails = (
      await Promise.allSettled(
        imageEntries.map(entry => {
          const fullPath = path.join(folderPath, entry.name);
          return nativeImage.createThumbnailFromPath(fullPath, {
            width: 300,
            height: 300,
          });
        }),
      )
    )
      .filter(res => res.status === "fulfilled")
      .map(res => res.value.toDataURL());

    const images =
      imageEntries?.map(file =>
        getApiBoltFileProtocolBasedPath(folderPath, file.name),
      ) ?? [];

    const folderUrl = path.resolve(folderPath);

    return {
      folderUrl,
      thumbnails,
      images,
    };
  } catch (error) {
    console.error("getImageFilesFromFolder error:", error);
    return null;
  }
};

export const getImageFileFromPath = async (filePath: string) => {
  try {
    await access(filePath, constants.R_OK);
    const stats = await stat(filePath);

    if (!stats.isFile) throw new Error("it is not a file");
    if (!imageExtensions.has(path.extname(filePath)))
      throw new Error("file is not an image");

    return getApiBoltFileProtocolBasedPath(filePath);
  } catch (error) {
    console.error("getImageFilesFromFolder error:", error);
    return null;
  }
};

export const getApiBoltFileProtocolBasedPath = (...paths: Array<string>) => {
  const absolutePath = path.resolve(...paths);
  const url = pathToFileURL(absolutePath).toString();
  return url.replace(/^file:\/\/\//, "api-bolt://");
};
