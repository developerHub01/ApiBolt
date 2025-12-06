import { CookieJar } from "tough-cookie";
import { jar as defaultJar } from "@/main/index.js";
import {
  getCookiesByProject,
  replaceCookiesByProject,
} from "@/main/db/cookiesDB.js";

export const clearJar = async (jar: CookieJar | null) => {
  const targetJar = jar ?? defaultJar;
  targetJar?.removeAllCookies();
};

export const loadJarFromDB = async (
  jar: CookieJar | null,
  projectId?: string,
) => {
  try {
    const targetJar = jar ?? defaultJar;
    // clear existing cookies first
    await jarManager.clear(targetJar);

    const cookiesData = await getCookiesByProject(projectId);
    if (!cookiesData) return;

    const cookieData = JSON.parse(cookiesData);
    const tempJar = CookieJar.fromJSON(cookieData);

    const allCookies = await tempJar.store.getAllCookies();
    for (const cookie of allCookies) {
      if (!cookie.domain) continue;
      let normalizedUrl = "";
      try {
        normalizedUrl = new URL(cookie.domain).origin;
      } catch (error) {
        normalizedUrl = cookie.domain;
      }

      await targetJar?.setCookie(
        `${cookie.key ?? ""}=${cookie.value ?? ""}; Domain=${cookie.domain ?? ""}; Path=${cookie.path ?? "/"}`,
        normalizedUrl,
      );
    }
  } catch (error) {
    console.error(error);
  }
};

export const initialCookieJar = async () => {
  try {
    const cookies = await getCookiesByProject();
    if (!cookies) throw new Error();
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
    if (!defaultJar) return;
    const json = defaultJar.toJSON();
    await replaceCookiesByProject(json ?? null);
  } catch (error) {
    console.error("error from save cookiesToFile");
    console.error(error);
  }
};

export const getAllCookies = async () =>
  await defaultJar?.store.getAllCookies();

export const getCookiesByDomain = async (domain: string) =>
  await defaultJar?.getCookies(domain);

export const getCookiesStringByDomain = async (domain: string) =>
  await defaultJar?.getCookieString(domain);

export const jarManager = {
  clear: (jarParam?: CookieJar | null) => clearJar(jarParam ?? defaultJar),
  loadFromDB: (projectId?: string) => loadJarFromDB(defaultJar, projectId),
  saveToDB: () => saveCookiesToDB(),
  init: () => initialCookieJar(),
  getCookiesAll: () => getAllCookies(),
  getCookiesByDomain: (domain: string) => getCookiesByDomain(domain),
  getCookiesStringByDomain: (domain: string) =>
    getCookiesStringByDomain(domain),
};
