export const getCookiePropertyList = (propertyList: Array<string>) => {
  const mustNeed = [
    "name",
    "value",
    "domain",
    "path",
    "expires",
    "HttpOnly",
    "secure",
    "samesite",
  ];

  propertyList = propertyList.filter(item => !mustNeed.includes(item));

  return [...mustNeed, ...propertyList];
};
