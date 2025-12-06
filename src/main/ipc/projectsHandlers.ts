import { app, dialog, ipcMain, IpcMainInvokeEvent } from "electron";
import {
  changeActiveProject,
  createProjects,
  deleteProjects,
  exportProject,
  getActiveProject,
  getProjects,
  importProject,
  updateProjects,
} from "@/main/db/projectsDB";
import { jarManager } from "@/main/utils/cookieManager";
import path from "path";
import { mainWindow } from "@/main/index.js";
import { readFile, writeFile } from "fs/promises";
import { CreateProjectPayloadInterface } from "@shared/types/project.types";
import { ElectronAPIProjectsInterface } from "@shared/types/api/electron-projects";
import { ProjectExportFileInterface } from "@shared/types/export-import/project";

export const projectsHandlers = () => {
  ipcMain.handle(
    "getProjects",
    async (): Promise<
      ReturnType<ElectronAPIProjectsInterface["getProjects"]>
    > => await getProjects(),
  );
  ipcMain.handle(
    "createProjects",
    async (
      _: IpcMainInvokeEvent,
      payload: CreateProjectPayloadInterface,
    ): Promise<ReturnType<ElectronAPIProjectsInterface["createProjects"]>> =>
      await createProjects(payload),
  );
  ipcMain.handle(
    "updateProjects",
    async (
      _: IpcMainInvokeEvent,
      ...rest: Parameters<ElectronAPIProjectsInterface["updateProjects"]>
    ): Promise<ReturnType<ElectronAPIProjectsInterface["updateProjects"]>> =>
      await updateProjects(...rest),
  );
  ipcMain.handle(
    "deleteProjects",
    async (
      _: IpcMainInvokeEvent,
      ...rest: Parameters<ElectronAPIProjectsInterface["deleteProjects"]>
    ): Promise<ReturnType<ElectronAPIProjectsInterface["deleteProjects"]>> =>
      await deleteProjects(...rest),
  );
  ipcMain.handle(
    "changeActiveProject",
    async (
      _: IpcMainInvokeEvent,
      ...rest: Parameters<ElectronAPIProjectsInterface["changeActiveProject"]>
    ): Promise<
      ReturnType<ElectronAPIProjectsInterface["changeActiveProject"]>
    > => {
      const response = await changeActiveProject(...rest);
      await jarManager.loadFromDB();
      return response;
    },
  );
  ipcMain.handle(
    "getActiveProject",
    async (): Promise<
      ReturnType<ElectronAPIProjectsInterface["getActiveProject"]>
    > => await getActiveProject(),
  );

  ipcMain.handle(
    "exportProject",
    async (
      _,
      ...rest: Parameters<ElectronAPIProjectsInterface["exportProject"]>
    ): Promise<ReturnType<ElectronAPIProjectsInterface["exportProject"]>> => {
      try {
        if (!mainWindow) throw new Error("Main window not available");

        const payload: ProjectExportFileInterface = await exportProject(
          ...rest,
        );
        if (!payload) throw new Error("No project to export");

        const fileName = `${
          payload?.project?.name
            ? `${payload.project.name.replaceAll(" ", "_")}_`
            : ""
        }project.json`;

        const { canceled, filePath } = await dialog.showSaveDialog(mainWindow, {
          title: "Save project",
          defaultPath: path.join(app.getPath("downloads"), fileName),
          filters: [{ name: "JSON file", extensions: ["json"] }],
        });

        if (!canceled && filePath) {
          await writeFile(filePath, JSON.stringify(payload, null, 2));
          return {
            ...payload,
            success: true,
            message: "Project exported successfully!",
          };
        } else {
          throw new Error("Save dialog cancelled.");
        }
      } catch (error: unknown) {
        console.error(error);
        return {
          success: false,
          message:
            error instanceof Error
              ? error.message
              : "Something went wrong while exporting the project.",
        };
      }
    },
  );
  ipcMain.handle(
    "importProject",
    async (): Promise<
      ReturnType<ElectronAPIProjectsInterface["importProject"]>
    > => {
      try {
        if (!mainWindow) throw new Error("");
        const { filePaths } = await dialog.showOpenDialog(mainWindow, {
          title: "Open project JSON",
          defaultPath: app.getPath("downloads"),
          filters: [{ name: "JSON file", extensions: ["json"] }],
        });

        const filePath = filePaths?.[0];
        if (!filePath) throw new Error("No file selected.");

        let fileData: ProjectExportFileInterface | null = null;
        try {
          const fileStringData = await readFile(filePath, "utf-8");
          fileData = JSON.parse(fileStringData);
          if (!fileData) throw new Error();
        } catch {
          throw new Error("Not valid JSON data");
        }
        const response = await importProject(fileData);
        if (!response) throw new Error();

        return {
          success: true,
          message: "Project imported successfully!",
        };
      } catch (error: unknown) {
        console.error(error);
        return {
          success: false,
          message:
            error instanceof Error
              ? error.message
              : "Something went wrong while importing the project.",
        };
      }
    },
  );
};
