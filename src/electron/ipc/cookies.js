import { ipcMain } from "electron";
import { fetchApi } from "../utils/api.js";
import { getAllCookies, getCookiesByDomain } from "../utils/cookieManager.js";

export const registerCookieHandlers = () => {
  ipcMain.handle("fetchApi", fetchApi);
  ipcMain.handle("getAllCookies", getAllCookies);
  ipcMain.handle("getCookieByDomain", async (_, domain) => {
    return await getCookiesByDomain(domain);
  });
};
