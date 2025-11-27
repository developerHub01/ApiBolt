import { app, dialog, ipcMain } from "electron";
import {
  clearRequestDB,
  exportFolder,
  exportRequest,
  importFolder,
  importRequest,
} from "../db/requestDB.js";
import { getRequestOrFolderMetaById } from "../db/requestOrFolderMetaDB.js";
import path from "path";
import { readFile, writeFile } from "fs/promises";
import { mainWindow } from "../main.js";
import { getSelectedTab } from "../db/tabsDB.js";
import { getActiveProject } from "../db/projectsDB.js";

export const requestHandler = () => {
  ipcMain.handle(
    "clearRequestDB",
    async (_, ...rest) => await clearRequestDB(...rest)
  );
  ipcMain.handle("importRequest", async (_, requestId) => {
    try {
      requestId = requestId ?? (await getSelectedTab());
      if (!requestId) throw new Error("no request selected");

      const { filePaths } = await dialog.showOpenDialog(mainWindow, {
        title: "Open request data",
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

      if (Array.isArray(fileData?.bodyFormData)) {
        fileData.bodyFormData.map((form, index) => {
          if (Array.isArray(form.value)) {
            fileData.bodyFormData[index].value = JSON.stringify(
              fileData.bodyFormData[index].value
            );
          }
        });
      }

      try {
        const response = await importRequest({
          requestId,
          ...fileData,
        });
        if (!response) throw new Error();
      } catch (error) {
        console.error(error);
        throw new Error("Not valid request-file.");
      }

      return {
        success: true,
        message: "Request imported successfully!",
      };
    } catch (error) {
      console.error(error);
      return {
        success: false,
        message:
          error.message ?? "Something went wrong while exporting request.",
      };
    }
  });
  ipcMain.handle("exportRequest", async (_, id) => {
    try {
      const payload = await exportRequest(id);
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
            extensions: ["json"],
          },
        ],
      });

      if (!canceled && filePath) {
        await writeFile(filePath, JSON.stringify(payload, null, 2));
        return {
          success: true,
          message: "Request exported successfully!",
        };
      } else {
        throw new Error("Save dialog cancelled.");
      }
    } catch (error) {
      console.error(error);
      return {
        success: false,
        message:
          error.message ?? "Something went wrong while exporting the request.",
      };
    }
  });
  ipcMain.handle("importFolder", async (_, id) => {
    try {
      id = id ?? null;
      const projectId = await getActiveProject();
      if (!id || !projectId) throw new Error("no request selected");

      const { filePaths } = await dialog.showOpenDialog(mainWindow, {
        title: "Open request data",
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
        const response = await importFolder({
          requestId: id,
          projectId,
          ...fileData,
        });
        if (!response) throw new Error();
      } catch (error) {
        console.error(error);
        throw new Error("Not valid folder-request-file.");
      }

      return {
        success: true,
        message: "Request folder imported successfully!",
      };
    } catch (error) {
      console.error(error);
      return {
        success: false,
        message:
          error.message ??
          "Something went wrong while importing request folder.",
      };
    }
  });
  ipcMain.handle("exportFolder", async (_, id) => {
    try {
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
            extensions: ["json"],
          },
        ],
      });
      if (!canceled && filePath) {
        await writeFile(filePath, JSON.stringify(payload, null, 2));
        return {
          success: true,
          message: "Request folder exported successfully!",
        };
      } else {
        throw new Error("Save dialog cancelled.");
      }
    } catch (error) {
      console.error(error);
      return {
        success: false,
        message:
          error.message ?? "Something went wrong while exporting the folder.",
      };
    }
  });
};
