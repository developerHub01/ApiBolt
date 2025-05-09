import { session } from "electron";

export const isElectron = () => {
  if (typeof navigator === "undefined") return false;
  return navigator.userAgent?.toLowerCase()?.includes(" electron/");
};

export const getCookiesFromUrl = async (apiUrl: string) => {
  const cookieURL = new URL(apiUrl).origin;
  const cookies = await session.defaultSession.cookies.get({ url: cookieURL });
  return cookies.map((c) => `${c.name}=${c.value}`).join("; ");
};
