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
  createWindow();

  app.on("activate", () => {
    if (BrowserWindow.getAllWindows().length === 0) createWindow();
  });

  ipcMain.handle("getCookies", getCookies);

  ipcMain.handle("fetchApi", fetchApi);

  ipcMain.handle("getAllCookies", getAllCookies);
  ipcMain.handle("getCookieByDomain", async(_, domain) => await fetchApi(domain));
});

app.on("window-all-closed", () => {
  if (process.platform !== "darwin") app.quit();
});
