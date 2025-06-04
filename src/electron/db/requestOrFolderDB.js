import { promises as fs } from "fs";
import path from "path";
import { app } from "electron";

const __dirname = app.getAppPath();

const getFullPath = (id) =>
  path.join(
    __dirname,
    "src",
    "electron",
    "storage",
    "request-or-folder",
    `${id}.json`
  );

export const findRequestOrFolderById = async (id) => {
  if (!id) return null;
  try {
    return await fs.readFile(getFullPath(id), "utf-8");
  } catch (error) {
    console.log(error);
  }
};

export const updateRequestOrFolderById = async (id, data = "") => {
  try {
    await fs.writeFile(getFullPath(id), JSON.stringify(data));
  } catch (error) {
    console.log(error);
  }
};

export const deleteRequestOrFolderById = async (id) => {
  try {
    await fs.unlink(getFullPath(id));
  } catch (error) {
    console.log(error);
  }
};
