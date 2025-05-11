import { app } from "electron";
import fs from "fs";
import { CookieJar } from "tough-cookie";
import { jar } from "../main.js";
import path from "path";

const COOKIE_FILE = path.join(app.getAppPath(), "cookies.json");

/*
 * This function initializes a cookie jar by checking if a cookie file exists.
 * If it does, it reads the cookies from the file and creates a CookieJar instance.
 * If not, it creates a new CookieJar instance.
 *
 * @returns {CookieJar} - A CookieJar instance with cookies loaded from the file or a new one.
 */
export const initialCookieJar = () => {
  if (fs.existsSync(COOKIE_FILE)) {
    const cookieData = JSON.parse(fs.readFileSync(COOKIE_FILE));
    return CookieJar.fromJSON(cookieData);
  }

  return new CookieJar();
};

/**
 * This function saves the cookies from the provided jar to a file.
 *
 **/
export const saveCookiesToFile = () => {
  if (!jar) return;

  const json = jar.toJSON();
  fs.writeFileSync(COOKIE_FILE, JSON.stringify(json, null, 2));
};

/**
 * This function clears the cookies by creating a new CookieJar instance and deleting the cookie file.
 *
 * **/
export const clearCookies = () => {
  jar = new CookieJar();
  fs.unlinkSync(COOKIE_FILE);
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
