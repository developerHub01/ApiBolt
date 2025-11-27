import { app, dialog, ipcMain } from "electron";
import {
  changeActiveProject,
  createProjects,
  deleteProjects,
  exportProject,
  getActiveProject,
  getProjects,
  importProject,
  updateProjects,
} from "../db/projectsDB.js";
import { jarManager } from "../utils/cookieManager.js";
import path from "path";
import { mainWindow } from "../main.js";
import { readFile, writeFile } from "fs/promises";

export const projectsHandlers = () => {
  ipcMain.handle("getProjects", async (_) => await getProjects());
  ipcMain.handle(
    "createProjects",
    async (_, ...rest) => await createProjects(...rest)
  );
  ipcMain.handle(
    "updateProjects",
    async (_, ...rest) => await updateProjects(...rest)
  );
  ipcMain.handle(
    "deleteProjects",
    async (_, ...rest) => await deleteProjects(...rest)
  );
  ipcMain.handle("changeActiveProject", async (_, ...rest) => {
    const response = await changeActiveProject(...rest);
    await jarManager.loadFromDB();
    return response;
  });
  ipcMain.handle("getActiveProject", async (_) => await getActiveProject());
  ipcMain.handle("exportProject", async (_, ...rest) => {
    try {
      const payload = await exportProject(...rest);
      if (!payload) throw new Error();

      const fileName = `${
        payload?.project?.name
          ? `${payload?.project?.name?.replaceAll(" ", "_")}_`
          : ""
      }project.json`;

      const { canceled, filePath } = await dialog.showSaveDialog(mainWindow, {
        title: "Save project",
        defaultPath: path.join(app.getPath("downloads"), fileName),
        filters: [
          {
            name: "JSON file",
            extensions: ["json"],
          },
        ],
      });

      if (!canceled && filePath) {
        await writeFile(filePath, JSON.stringify(payload, null, 2));
        return {
          success: true,
          message: "Project exported successfully!",
        };
      } else {
        throw new Error("Save dialog cancelled.");
      }
    } catch (error) {
      console.error(error);
      return {
        success: false,
        message:
          error.message ?? "Something went wrong while exporting the project.",
      };
    }
  });
  ipcMain.handle("importProject", async (_, ...rest) => {
    try {
      const { filePaths } = await dialog.showOpenDialog(mainWindow, {
        title: "Save project",
        defaultPath: app.getPath("downloads"),
        filters: [
          {
            name: "JSON file",
            extensions: ["json"],
          },
        ],
      });

      const filePath = filePaths?.[0];
      if (!filePath) throw new Error("No file selected.");

      let fileData = await readFile(filePath, "utf-8");
      try {
        fileData = JSON.parse(fileData);
      } catch (error) {
        throw new Error("Not valid JSON data");
      }

      try {
        const response = await importProject(fileData);
        if (!response) throw new Error();
      } catch (error) {
        console.error(error);
        throw new Error("Not valid project-file.");
      }

      return {
        success: true,
        message: "Project imported successfully!",
      };
    } catch (error) {
      console.error(error);
      return {
        success: false,
        message:
          error.message ?? "Something went wrong while importing the project.",
      };
    }
  });
};
