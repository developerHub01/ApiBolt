import { app, dialog, ipcMain } from "electron";
import path from "node:path";
import {
  getAllEnvironments,
  getEnvironments,
  createEnvironments,
  updateEnvironments,
  deleteAllEnvironments,
  deleteEnvironments,
  importEnvironments,
} from "@/main/db/environmentsDB.js";
import { mainWindow } from "@/main/index";
import { getActiveProjectDetails } from "@/main/db/projectsDB.js";
import { readFile, writeFile } from "node:fs/promises";
import { filterValidEnvironments } from "@/main/utils/environments.js";
import { ElectronAPIEnvironmentsInterface } from "@shared/types/api/electron-environments";
import { TEnvironmentFile } from "@shared/types/export-import/environments";

export const enviromentsHandlers = (): void => {
  ipcMain.handle(
    "getAllEnvironments",
    async (
      _,
      ...rest: Parameters<
        ElectronAPIEnvironmentsInterface["getAllEnvironments"]
      >
    ): ReturnType<ElectronAPIEnvironmentsInterface["getAllEnvironments"]> =>
      await getAllEnvironments(...rest),
  );
  ipcMain.handle(
    "getEnvironments",
    async (
      _,
      ...rest: Parameters<ElectronAPIEnvironmentsInterface["getEnvironments"]>
    ): ReturnType<ElectronAPIEnvironmentsInterface["getEnvironments"]> =>
      await getEnvironments(...rest),
  );
  ipcMain.handle(
    "createEnvironments",
    async (
      _,
      ...rest: Parameters<
        ElectronAPIEnvironmentsInterface["createEnvironments"]
      >
    ): ReturnType<ElectronAPIEnvironmentsInterface["createEnvironments"]> =>
      await createEnvironments(...rest),
  );
  ipcMain.handle(
    "updateEnvironments",
    async (
      _,
      ...rest: Parameters<
        ElectronAPIEnvironmentsInterface["updateEnvironments"]
      >
    ): ReturnType<ElectronAPIEnvironmentsInterface["updateEnvironments"]> =>
      await updateEnvironments(...rest),
  );
  ipcMain.handle(
    "deleteAllEnvironments",
    async (
      _,
      ...rest: Parameters<
        ElectronAPIEnvironmentsInterface["deleteAllEnvironments"]
      >
    ): ReturnType<ElectronAPIEnvironmentsInterface["deleteAllEnvironments"]> =>
      await deleteAllEnvironments(...rest),
  );
  ipcMain.handle(
    "deleteEnvironments",
    async (
      _,
      ...rest: Parameters<
        ElectronAPIEnvironmentsInterface["deleteEnvironments"]
      >
    ): ReturnType<ElectronAPIEnvironmentsInterface["deleteEnvironments"]> =>
      await deleteEnvironments(...rest),
  );
  ipcMain.handle(
    "exportEnvironments",
    async (
      _,
      ...rest: Parameters<
        ElectronAPIEnvironmentsInterface["exportEnvironments"]
      >
    ): ReturnType<ElectronAPIEnvironmentsInterface["exportEnvironments"]> => {
      try {
        if (!mainWindow) throw new Error();

        const activeProject = await getActiveProjectDetails();
        const projectName = activeProject?.name;
        if (!projectName) throw new Error("no active project");

        const envs = (await getEnvironments(...rest))?.map(
          ({ id, projectId, createdAt, ...env }) => env,
        );
        if (!envs) throw new Error("envs not found");

        const { canceled, filePath } = await dialog.showSaveDialog(mainWindow, {
          title: "Save environment variable list",
          defaultPath: path.join(
            app.getPath("downloads"),
            `${projectName.replaceAll(" ", "_")}_environments.json`,
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
          return {
            success: true,
            message: "Environment variables exported successfully!",
          };
        } else {
          throw new Error("Save dialog cancelled.");
        }
      } catch (error) {
        console.error(error);
        return {
          success: false,
          message:
            error instanceof Error
              ? error.message
              : "Something went wrong while exporting list.",
        };
      }
    },
  );
  ipcMain.handle(
    "importEnvironments",
    async (
      _,
      // ...rest: Parameters<
      //   ElectronAPIEnvironmentsInterface["importEnvironments"]
      // >
    ): ReturnType<ElectronAPIEnvironmentsInterface["importEnvironments"]> => {
      try {
        if (!mainWindow) throw new Error();
        const activeProject = await getActiveProjectDetails();
        const projectName = activeProject?.name;
        if (!projectName) throw new Error("no active project");

        const { filePaths } = await dialog.showOpenDialog(mainWindow, {
          title: "Import environment variable list",
          defaultPath: app.getPath("downloads"),
          filters: [
            {
              name: "JSON file",
              extensions: ["json"],
            },
          ],
        });

        const filePath = filePaths?.[0];
        if (!filePath) throw new Error("No file selected");

        try {
          let fileData = await readFile(filePath, "utf-8");
          fileData = JSON.parse(fileData);
        } catch (error) {
          throw new Error("Not valid JSON data");
        }

        let fileData: TEnvironmentFile | null = null;
        try {
          const fileStringData = await readFile(filePath, "utf-8");
          fileData = JSON.parse(fileStringData);
          if (!fileData) throw new Error();
        } catch {
          throw new Error("Not valid JSON data");
        }

        const cleanedData = filterValidEnvironments(fileData);
        if (!cleanedData) throw new Error("Not valid environment data");

        const response = await importEnvironments(cleanedData);
        if (!response) throw new Error();

        return {
          success: true,
          message: "Environments variable imported successfully!",
        };
      } catch (error) {
        console.error(error);
        return {
          success: false,
          message:
            error instanceof Error
              ? error.message
              : "Something went wrong while exporting list.",
        };
      }
    },
  );
};
