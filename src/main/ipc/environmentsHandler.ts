import { app, dialog, ipcMain } from "electron";
import path from "path";
import {
  getAllEnvironments,
  getEnvironments,
  createEnvironments,
  updateEnvironments,
  deleteAllEnvironments,
  deleteEnvironments
} from "@/main/db/environmentsDB.js";
import { mainWindow } from "@/main/index.js";
import { getActiveProjectDetails } from "@/main/db/projectsDB.js";
import { readFile, writeFile } from "fs/promises";
import { filterValidEnvironments } from "@/main/utils/environments.js";

export const enviromentsHandlers = () => {
  ipcMain.handle(
    "getAllEnvironments",
    async (_, ...rest) => await getAllEnvironments(...rest)
  );
  ipcMain.handle(
    "getEnvironments",
    async (_, ...rest) => await getEnvironments(...rest)
  );
  ipcMain.handle(
    "createEnvironments",
    async (_, ...rest) => await createEnvironments(...rest)
  );
  ipcMain.handle(
    "updateEnvironments",
    async (_, ...rest) => await updateEnvironments(...rest)
  );
  ipcMain.handle(
    "deleteAllEnvironments",
    async (_, ...rest) => await deleteAllEnvironments(...rest)
  );
  ipcMain.handle(
    "deleteEnvironments",
    async (_, ...rest) => await deleteEnvironments(...rest)
  );
  ipcMain.handle("exportEnvironments", async (_, ...rest) => {
    try {
      const activeProject = await getActiveProjectDetails();

      const projectName = activeProject?.projects_table?.name;
      if (!projectName) throw new Error("no active project");

      const envs = (await getEnvironments(...rest))?.map(
        ({ id, projectId, createdAt, ...env }) => env
      );
      if (!envs) throw new Error("envs not found");

      const { canceled, filePath } = await dialog.showSaveDialog(mainWindow, {
        title: "Save environment variable list",
        defaultPath: path.join(
          app.getPath("downloads"),
          `${projectName.replaceAll(" ", "_")}_environments.json`
        ),
        filters: [
          {
            name: "JSON file",
            extensions: ["json"]
          }
        ]
      });

      if (!canceled && filePath) {
        await writeFile(filePath, JSON.stringify(envs, null, 2));
        return {
          success: true,
          message: "Environment variables exported successfully!"
        };
      } else {
        throw new Error("Save dialog cancelled.");
      }
    } catch (error) {
      console.error(error);
      return {
        success: false,
        message: error.message ?? "Something went wrong while exporting list."
      };
    }
  });
  ipcMain.handle("importEnvironments", async (_, ...rest) => {
    try {
      const activeProject = await getActiveProjectDetails();

      const projectName = activeProject?.projects_table?.name;
      if (!projectName) throw new Error("no active project");

      const { filePaths } = await dialog.showOpenDialog(mainWindow, {
        title: "Import environment variable list",
        defaultPath: app.getPath("downloads"),
        filters: [
          {
            name: "JSON file",
            extensions: ["json"]
          }
        ]
      });

      const filePath = filePaths?.[0];
      if (!filePath) throw new Error("No file selected");

      let fileData = await readFile(filePath, "utf-8");

      try {
        fileData = JSON.parse(fileData);
      } catch (error) {
        throw new Error("Not valid JSON data");
      }

      const cleanedData = filterValidEnvironments(fileData);
      if (!cleanedData) throw new Error("Not valid environment data");

      const response = await createEnvironments(cleanedData);
      if (!response) throw new Error();

      return {
        success: true,
        message: "Environments variable imported successfully!"
      };
    } catch (error) {
      console.error(error);
      return {
        success: false,
        message: error.message ?? "Something went wrong while exporting list."
      };
    }
  });
};
