import { ipcMain } from "electron";

export const windowHandler = (mainWindow) => {
  ipcMain.handle("windowIsMaximized", async () => {
    return mainWindow?.isMaximized() ?? false;
  });
  ipcMain.handle("windowMinimize", async () => {
    mainWindow?.minimize();
  });
  ipcMain.handle("windowMaximize", async () => {
    mainWindow?.maximize();
    mainWindow?.webContents.send("windowMaximizeChange", true);
  });
  ipcMain.handle("windowUnmaximize", async () => {
    mainWindow?.restore();
    mainWindow?.webContents.send("windowMaximizeChange", false);
  });
  ipcMain.handle("windowClose", async () => {
    mainWindow?.close();
  });
  // native maximize/unmaximize syncing
  mainWindow.on("maximize", () => {
    mainWindow?.webContents.send("windowMaximizeChange", true);
  });
  mainWindow.on("unmaximize", () => {
    mainWindow?.webContents.send("windowMaximizeChange", false);
  });
};
