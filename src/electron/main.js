import { app, ipcMain } from "electron";
import { createWindow } from "./utils/window.js";
import { getCookies } from "./utils/cookies.js";
import { fetchApi } from "./utils/api.js";
import { wrapper } from "axios-cookiejar-support";
import axios from "axios";
import { getAllCookies, initialCookieJar } from "./utils/cookieManager.js";

// browser style cookies holder by domain/path
export const jar = initialCookieJar(undefined, { rejectPublicSuffixes: false });
// axios client with cookie jar support
export const client = wrapper(axios.create({ jar }));

app.whenReady().then(() => {
  let mainWindow = createWindow();

  app.on("activate", () => {
    if (BrowserWindow.getAllWindows().length === 0) mainWindow = createWindow();
  });

  ipcMain.handle("getCookies", getCookies);

  ipcMain.handle("fetchApi", fetchApi);

  ipcMain.handle("getAllCookies", getAllCookies);
  ipcMain.handle(
    "getCookieByDomain",
    async (_, domain) => await fetchApi(domain)
  );

  ipcMain.handle("windowControls", (_, type) => {
    if (type === "minimize") return mainWindow.minimize();
    else if (type === "maximize") return mainWindow.maximize();
    else if (type === "close") return mainWindow.close();
    else if (type === "unmaximize") return mainWindow.unmaximize();
  });
  ipcMain.handle("isWindowMaximized", () => mainWindow.isMaximized());
});

app.on("window-all-closed", () => {
  if (process.platform !== "darwin") app.quit();
});
