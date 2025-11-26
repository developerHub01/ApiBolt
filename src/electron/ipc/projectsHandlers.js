import { app, dialog, ipcMain } from "electron";
import {
  changeActiveProject,
  createProjects,
  deleteProjects,
  exportProject,
  getActiveProject,
  getProjects,
  updateProjects,
} from "../db/projectsDB.js";
import { jarManager } from "../utils/cookieManager.js";
import path from "path";
import { mainWindow } from "../main.js";
import { writeFile } from "fs/promises";

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
      }request.json`;

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
};
