import { ipcMain } from "electron";
import { fetchApi } from "../utils/api.js";
import { jarManager } from "../utils/cookieManager.js";

export const registerCookieHandlers = () => {
  ipcMain.handle("fetchApi", fetchApi);
  ipcMain.handle("getAllCookies", async () => await jarManager.getAllCookies());
  ipcMain.handle("getCookieByDomain", async (_, url) => {
    try {
      const normalizedUrl = new URL(url).origin;
      return await jarManager.getCookiesByDomain(normalizedUrl);
    } catch (error) {
      console.error(error);
    }
  });
  ipcMain.handle("getCookieStringByDomain", async (_, url) => {
    try {
      const normalizedUrl = new URL(url).origin;
      return await jarManager.getCookiesStringByDomain(normalizedUrl);
    } catch (error) {
      console.error(error);
    }
  });
};
