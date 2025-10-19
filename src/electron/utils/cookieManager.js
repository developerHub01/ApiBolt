import { CookieJar } from "tough-cookie";
import { jar } from "../main.js";
import {
  getCookiesByProject,
  updateCookiesByProject,
} from "../db/cookiesDB.js";

export const clearJar = async (jar) => {
  jar = new CookieJar();
};

export const loadJarFromDB = async (jar, projectId) => {
  // clear existing cookies first
  // await jarManager.clear(jar);

  const cookiesData = await getCookiesByProject(projectId);
  if (!cookiesData) return;

  const cookieData = JSON.parse(cookiesData);
  const tempJar = CookieJar.fromJSON(cookieData);

  const allCookies = await tempJar.store.getAllCookies();
  for (const cookie of allCookies) {
    await jar.setCookie(
      `${cookie.key}=${cookie.value}; Domain=${cookie.domain}; Path=${cookie.path}`,
      `https://${cookie.domain}`
    );
  }
};

export const initialCookieJar = async () => {
  try {
    const cookies = await getCookiesByProject();
    if (cookies) {
      const cookieData = JSON.parse(cookies);
      return CookieJar.fromJSON(cookieData);
    }

    return new CookieJar();
  } catch (error) {
    console.error(error);
    return new CookieJar();
  }
};

export const saveCookiesToDB = async () => {
  try {
    if (!jar) return;

    const json = jar.toJSON();
    // fs.writeFileSync(COOKIE_FILE, JSON.stringify(json, null, 2));
    await updateCookiesByProject({
      cookies: JSON.stringify(json),
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
