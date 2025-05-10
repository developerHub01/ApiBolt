import { ipcMain } from "electron";

export const registerWindowHandlers = (mainWindow) => {
  ipcMain.handle("windowControls", (_, type) => {
    if (type === "minimize") return mainWindow.minimize();
    if (type === "maximize") return mainWindow.maximize();
    if (type === "unmaximize") return mainWindow.unmaximize();
    if (type === "close") return mainWindow.close();
  });

  ipcMain.handle("isWindowMaximized", () => {
    return mainWindow.isMaximized();
  });
};
