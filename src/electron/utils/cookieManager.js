import fs from "fs";
import { promisify } from "util";
import { CookieJar } from "tough-cookie";
import { COOKIE_FILE, jar } from "../main.js";

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
    console.log("✅ Cookie jar loaded from file");
    return CookieJar.fromJSON(cookieData);
  }

  console.log("🆕 New cookie jar created");
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
  console.log("💾 Cookie jar saved to file");
};

/**
 * This function clears the cookies by creating a new CookieJar instance and deleting the cookie file.
 *
 * **/
export const clearCookies = () => {
  jar = new CookieJar();
  fs.unlinkSync(COOKIE_FILE);
  console.log("🧹 Cookie jar cleared");
};

// promisify the callback functions
const getAllCookiesAsync = promisify(jar.store.getAllCookies).bind(jar.store);
const getCookiesByDomainAsync = promisify(jar.getCookies).bind(jar);

export const getAllCookies = async () => {
  return await getAllCookiesAsync();
};

export const getCookiesByDomain = async (domain) => {
  return await getCookiesByDomainAsync(domain);
};
