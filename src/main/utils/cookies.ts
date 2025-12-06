import { CookieInterface } from "@shared/types/cookies.types";
import { Cookie } from "tough-cookie";

export const parseCookie = (cookie: Cookie): CookieInterface => {
  const cookieStr = String(cookie);
  const parsedCookie: Partial<CookieInterface> = {};
  const cookieParts = cookieStr.split(";");

  const [nameValue, cookieValue] = cookieParts[0].split("=");
  parsedCookie.key = nameValue.trim();
  parsedCookie.value = cookieValue.trim();

  cookieParts.slice(1).forEach(part => {
    const [key, value] = part.trim().split("=");
    switch (key.toLowerCase()) {
      case "domain":
        parsedCookie.domain = value;
        break;
      case "path":
        parsedCookie.path = value;
        break;
      case "expires":
        parsedCookie.expires = value;
        break;
      case "httponly":
        parsedCookie.httpOnly = true;
        break;
      case "secure":
        parsedCookie.secure = true;
        break;
      case "samesite":
        parsedCookie.sameSite = value as CookieInterface["sameSite"];
        break;
      default:
        break;
    }
  });

  return parsedCookie as CookieInterface;
};

export const parseSetCookie = (setCookieArray: Array<Cookie>) =>
  setCookieArray?.map(parseCookie);
