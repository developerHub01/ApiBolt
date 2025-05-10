import { app, ipcMain } from "electron";
import { createWindow } from "./utils/window.js";
import { getCookies } from "./utils/cookies.js";
import { fetchApi } from "./utils/api.js";
import { wrapper } from "axios-cookiejar-support";
import axios from "axios";
import { initialCookieJar } from "./utils/cookieManager.js";
import path from "path";

// browser style cookies holder by domain/path
export const jar = initialCookieJar();
// axios client with cookie jar support
export const client = wrapper(axios.create({ jar }));

export const COOKIE_FILE = path.join(app.getAppPath(), "cookies.json");

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
