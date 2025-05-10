export const parseCookie = (cookie) => {
  const parsedCookie = {};
  const cookieParts = cookie.split(";");

  const [nameValue, cookieValue] = cookieParts[0].split("=");
  parsedCookie.name = nameValue.trim();
  parsedCookie.value = cookieValue.trim();

  cookieParts.slice(1).forEach((part) => {
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
        parsedCookie.HttpOnly = true;
        break;
      case "secure":
        parsedCookie.secure = true;
        break;
      case "samesite":
        parsedCookie.samesite = value;
        break;
      default:
        break;
    }
  });

  return parsedCookie;
};

export const parseSetCookie = (setCookieArray) =>
  setCookieArray?.map(parseCookie);
