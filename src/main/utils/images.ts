import { access, readdir, stat } from "node:fs/promises";
import { constants } from "node:fs";
import path from "node:path";
import { pathToFileURL } from "node:url";

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
}) => {
  try {
    await access(folderPath, constants.R_OK);

    const files =
      (await readdir(folderPath, { withFileTypes: true }))
        ?.filter(
          entry =>
            entry.isFile() &&
            imageExtensions.has(path.extname(entry.name).toLowerCase()),
        )
        ?.slice(0, limit)
        ?.map(file => getApiBoltFileProtocolBasedPath(folderPath, file.name)) ??
      [];

    const folderUrl = path.resolve(folderPath);
    return [folderUrl, ...files];
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
