import { app, dialog, ipcMain, IpcMainInvokeEvent } from "electron";
import {
  clearRequest,
  exportFolder,
  exportRequest,
  importFolder,
  importRequest
} from "@/main/db/requestDB.js";
import { getRequestOrFolderMetaById } from "@/main/db/requestOrFolderMetaDB.js";
import path from "path";
import { readFile, writeFile } from "fs/promises";
import { mainWindow } from "@/main/index.js";
import { getSelectedTab } from "@/main/db/tabsDB.js";
import { getActiveProject } from "@/main/db/projectsDB.js";
import { ElectronAPIRequestInterface } from "@/shared/types/api/electron-request.js";
import { RequestExportFileInterface } from "@/shared/types/export-import/request";
import { FolderExportFileInterface } from "@/shared/types/export-import/folder";

export const requestHandler = () => {
  ipcMain.handle(
    "clearRequest",
    async (
      _: IpcMainInvokeEvent,
      ...rest: Parameters<ElectronAPIRequestInterface["clearRequest"]>
    ): Promise<ReturnType<ElectronAPIRequestInterface["clearRequest"]>> => {
      try {
        const projectId = await getActiveProject();
        if (!rest[0] || !projectId) throw new Error("no request selected");

        const response = await clearRequest(rest[0]);
        if (!response) throw new Error();

        return {
          success: true,
          message: "Request cleared successfully!"
        };
      } catch (error) {
        console.error(error);
        return {
          success: false,
          message:
            error instanceof Error
              ? error.message
              : "Something went wrong while clearing the request."
        };
      }
    }
  );
  ipcMain.handle(
    "importRequest",
    async (
      _: IpcMainInvokeEvent,
      ...rest: Parameters<ElectronAPIRequestInterface["importRequest"]>
    ): Promise<ReturnType<ElectronAPIRequestInterface["importRequest"]>> => {
      try {
        if (!mainWindow) throw new Error();

        const requestId = rest[0] ?? (await getSelectedTab());
        if (!requestId) throw new Error("no request selected");

        const { filePaths } = await dialog.showOpenDialog(mainWindow, {
          title: "Open request data",
          defaultPath: app.getPath("downloads"),
          filters: [
            {
              name: "JSON file",
              extensions: ["json"]
            }
          ]
        });

        const filePath = filePaths?.[0];
        if (!filePath) throw new Error("No file selected.");

        const fileStringData = await readFile(filePath, "utf-8");
        try {
          const fileData = JSON.parse(
            fileStringData
          ) as RequestExportFileInterface;

          if (Array.isArray(fileData?.bodyFormData)) {
            fileData.bodyFormData.map((form, index) => {
              if (Array.isArray(form.value)) {
                fileData.bodyFormData[index].value = JSON.stringify(
                  fileData.bodyFormData[index].value
                );
              }
            });
          }

          const response = await importRequest({
            requestId,
            ...fileData
          });
          if (!response) throw new Error();
        } catch (error) {
          console.error(error);
          throw new Error("Not valid request-file.");
        }

        return {
          success: true,
          message: "Request imported successfully!"
        };
      } catch (error: unknown) {
        console.error(error);
        return {
          success: false,
          message:
            error instanceof Error
              ? error.message
              : "Something went wrong while exporting request."
        };
      }
    }
  );
  ipcMain.handle(
    "exportRequest",
    async (
      _: IpcMainInvokeEvent,
      ...rest: Parameters<ElectronAPIRequestInterface["exportRequest"]>
    ): Promise<ReturnType<ElectronAPIRequestInterface["exportRequest"]>> => {
      try {
        if (!mainWindow) throw new Error();
        if (!rest[0]) throw new Error("No request selected");

        const payload = await exportRequest(rest[0]);
        if (!payload) throw new Error();

        const fileName = payload.name
          ? `${payload.name.replaceAll(" ", "_")}_request.json`
          : "request.json";

        const { canceled, filePath } = await dialog.showSaveDialog(mainWindow, {
          title: "Save request data",
          defaultPath: path.join(app.getPath("downloads"), fileName),
          filters: [
            {
              name: "JSON file",
              extensions: ["json"]
            }
          ]
        });

        if (!canceled && filePath) {
          await writeFile(filePath, JSON.stringify(payload, null, 2));
          return {
            success: true,
            message: "Request exported successfully!"
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
              : "Something went wrong while exporting the request."
        };
      }
    }
  );
  ipcMain.handle(
    "importFolder",
    async (
      _: IpcMainInvokeEvent,
      ...rest: Parameters<ElectronAPIRequestInterface["importFolder"]>
    ): Promise<ReturnType<ElectronAPIRequestInterface["importFolder"]>> => {
      try {
        if (!mainWindow) throw new Error();

        const id = rest[0] ?? null;
        const projectId = await getActiveProject();
        if (!projectId) throw new Error("no request selected");

        const { filePaths } = await dialog.showOpenDialog(mainWindow, {
          title: "Open request data",
          defaultPath: app.getPath("downloads"),
          filters: [
            {
              name: "JSON file",
              extensions: ["json"]
            }
          ]
        });

        const filePath = filePaths?.[0];
        if (!filePath) throw new Error("No file selected.");

        const fileStringData = await readFile(filePath, "utf-8");
        try {
          const fileData = JSON.parse(
            fileStringData
          ) as FolderExportFileInterface;
          const response = await importFolder({
            requestId: id,
            projectId,
            ...fileData
          });
          if (!response) throw new Error();
        } catch {
          throw new Error("Not valid folder-request-file.");
        }

        return {
          success: true,
          message: "Request folder imported successfully!"
        };
      } catch (error: unknown) {
        console.error(error);
        return {
          success: false,
          message:
            error instanceof Error
              ? error.message
              : "Something went wrong while importing request folder."
        };
      }
    }
  );
  ipcMain.handle(
    "exportFolder",
    async (
      _: IpcMainInvokeEvent,
      ...rest: Parameters<ElectronAPIRequestInterface["exportFolder"]>
    ): Promise<ReturnType<ElectronAPIRequestInterface["exportFolder"]>> => {
      try {
        if (!mainWindow) throw new Error();
        const id = rest[0];
        if (!id) throw new Error("No folder selected");
        const payload = await exportFolder(id);

        const folderName =
          (await getRequestOrFolderMetaById(id))?.name ?? "folder";
        const exportFileName = `${folderName.replaceAll(" ", "_")}_request_folder.json`;

        const { canceled, filePath } = await dialog.showSaveDialog(mainWindow, {
          title: "Save request folder data",
          defaultPath: path.join(app.getPath("downloads"), exportFileName),
          filters: [
            {
              name: "JSON file",
              extensions: ["json"]
            }
          ]
        });
        if (!canceled && filePath) {
          await writeFile(filePath, JSON.stringify(payload, null, 2));
          return {
            success: true,
            message: "Request folder exported successfully!"
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
              : "Something went wrong while exporting the folder."
        };
      }
    }
  );
};
