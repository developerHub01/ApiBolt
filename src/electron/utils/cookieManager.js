import { CookieJar } from "tough-cookie";
import { jar } from "../main.js";
import {
  getCookiesByProject,
  replaceCookiesByProject,
} from "../db/cookiesDB.js";

export const clearJar = async (jar) => {
  jar = new CookieJar();
};

export const loadJarFromDB = async (jar, projectId) => {
  try {
    // clear existing cookies first
    await jarManager.clear(jar);

    const cookiesData = await getCookiesByProject(projectId);
    if (!cookiesData) return;

    const cookieData = JSON.parse(cookiesData);
    const tempJar = CookieJar.fromJSON(cookieData);

    const allCookies = await tempJar.store.getAllCookies();
    for (const cookie of allCookies) {
      let normalizedUrl = "";
      try {
        normalizedUrl = new URL(cookie.domain).origin;
      } catch (error) {
        normalizedUrl = cookie.domain;
      }

      await jar.setCookie(
        `${cookie.key ?? ""}=${cookie.value ?? ""}; Domain=${cookie.domain ?? ""}; Path=${cookie.path ?? "/"}`,
        normalizedUrl
      );
    }
  } catch (error) {
    console.error(error);
  }
};

export const initialCookieJar = async () => {
  try {
    const cookies = await getCookiesByProject();
    const cookiesData = JSON.parse(cookies);
    if (!cookiesData || !cookiesData.cookies)
      throw new Error("No cookies exist");

    return CookieJar.fromJSON(cookiesData);
  } catch (error) {
    console.error(error);
    return new CookieJar();
  }
};

export const saveCookiesToDB = async () => {
  try {
    if (!jar) return;

    const json = jar.toJSON();
    await replaceCookiesByProject({
      cookies: json,
    });
  } catch (error) {
    console.error("error from save cookiesToFile");
    console.error(error);
  }
};

export const getAllCookies = async () => {
  return await jar.store.getAllCookies();
};

export const getCookiesByDomain = async (domain) => {
  return await jar.getCookies(domain);
};

export const getCookiesStringByDomain = async (domain) => {
  return await jar.getCookieString(domain);
};

export const jarManager = {
  clear: (jarParam) => clearJar(jarParam ?? jar),
  loadFromDB: (projectId) => loadJarFromDB(jar, projectId),
  saveToDB: () => saveCookiesToDB(),
  init: () => initialCookieJar(),
  getCookiesAll: () => getAllCookies(),
  getCookiesByDomain: (domain) => getCookiesByDomain(domain),
  getCookiesStringByDomain: (domain) => getCookiesStringByDomain(domain),
};
