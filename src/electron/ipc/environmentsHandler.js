import { app, dialog, ipcMain } from "electron";
import path from "path";
import {
  getAllEnvironments,
  getEnvironments,
  createEnvironments,
  updateEnvironments,
  deleteAllEnvironments,
  deleteEnvironments,
} from "../db/environmentsDB.js";
import { mainWindow } from "../main.js";
import { getActiveProjectDetails } from "../db/projectsDB.js";
import { writeFile } from "fs/promises";

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
            extensions: ["json"],
          },
        ],
      });

      if (!canceled && filePath) {
        await writeFile(filePath, JSON.stringify(envs, null, 2));
        return true;
      } else {
        throw new Error("Save dialog cancelled.");
      }
    } catch (error) {
      console.error(error);
      return false;
    }
  });
};
