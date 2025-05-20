import { ipcMain } from "electron";
import { fetchApi } from "../utils/api.js";
import {
  getAllCookies,
  getCookiesByDomain,
  getCookiesStringByDomain,
} from "../utils/cookieManager.js";

export const registerCookieHandlers = () => {
  ipcMain.handle("fetchApi", fetchApi);
  ipcMain.handle("getAllCookies", getAllCookies);
  ipcMain.handle("getCookieByDomain", async (_, url) => {
    const normalizedUrl = new URL(url).origin;
    return await getCookiesByDomain(normalizedUrl);
  });
  ipcMain.handle("getCookieStringByDomain", async (_, url) => {
    try {
      const normalizedUrl = new URL(url).origin;
      return await getCookiesStringByDomain(normalizedUrl);
    } catch (error) {
      // console.log(error);
    }
  });
};
