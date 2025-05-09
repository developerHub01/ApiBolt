import { app, ipcMain } from "electron";
import { createWindow } from "./utils/window.js";
import { getCookies } from "./utils/cookies.js";
import { fetchApi } from "./utils/api.js";

app.whenReady().then(() => {
  createWindow();

  app.on("activate", () => {
    if (BrowserWindow.getAllWindows().length === 0) createWindow();
  });

  ipcMain.handle("getCookies", getCookies);

  ipcMain.handle("fetchApi", fetchApi);
});

app.on("window-all-closed", () => {
  if (process.platform !== "darwin") app.quit();
});
