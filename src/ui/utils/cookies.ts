import type { CookieInterface } from "@/types/cookies.types";

export const cookieToString = (cookie: CookieInterface) => {
  const parts = [`${cookie.key}=${cookie.value}`];

  if (cookie.domain) parts.push(`Domain=${cookie.domain}`);
  if (cookie.path) parts.push(`Path=${cookie.path}`);
  if (cookie.maxAge !== undefined) parts.push(`Max-Age=${cookie.maxAge}`);
  if (cookie.expires)
    parts.push(`Expires=${new Date(cookie.expires).toUTCString()}`);
  if (cookie.httpOnly) parts.push(`HttpOnly`);
  if (cookie.secure) parts.push(`Secure`);
  if (cookie.sameSite) parts.push(`SameSite=${cookie.sameSite}`);

  return parts.join("; ");
};
