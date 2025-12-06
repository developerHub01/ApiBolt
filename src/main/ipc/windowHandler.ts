import { ElectronAPIInterface } from "@shared/types/api/electron-api";
import { BrowserWindow, ipcMain } from "electron";

export const windowHandler = (mainWindow: BrowserWindow) => {
  ipcMain.handle(
    "windowIsMaximized",
    async (): ReturnType<ElectronAPIInterface["isWindowMaximized"]> => {
      return mainWindow?.isMaximized() ?? false;
    },
  );
  ipcMain.handle(
    "windowMinimize",
    async (): ReturnType<ElectronAPIInterface["windowMaximize"]> => {
      mainWindow?.minimize();
    },
  );
  ipcMain.handle(
    "windowMaximize",
    async (): ReturnType<ElectronAPIInterface["windowMaximize"]> => {
      mainWindow?.maximize();
      mainWindow?.webContents.send("windowMaximizeChange", true);
    },
  );
  ipcMain.handle(
    "windowUnmaximize",
    async (): ReturnType<ElectronAPIInterface["windowUnmaximize"]> => {
      mainWindow?.restore();
      mainWindow?.webContents.send("windowMaximizeChange", false);
    },
  );
  ipcMain.handle(
    "windowClose",
    async (): ReturnType<ElectronAPIInterface["windowClose"]> => {
      mainWindow?.close();
    },
  );
  // native maximize/unmaximize syncing
  mainWindow.on("maximize", () => {
    mainWindow?.webContents.send("windowMaximizeChange", true);
  });
  mainWindow.on("unmaximize", () => {
    mainWindow?.webContents.send("windowMaximizeChange", false);
  });
};
