export const areSamePayload = (
  payload: Record<string, unknown>,
  existingPayload: Record<string, unknown>,
) =>
  Object.keys(payload).every(key => {
    return payload[key] === existingPayload[key];
  });

export const isAlphabetOnly = (input: string): boolean =>
  /^[a-zA-Z]+$/.test(input);

export const needsQuotesForKey = (key: string): boolean => {
  /* Check if the key is a valid JavaScript identifier */
  const isValidIdentifier = /^[a-zA-Z_$][a-zA-Z0-9_$]*$/.test(key);

  /* If it doesn't match a valid identifier, it needs quotes */
  return !isValidIdentifier;
};

export const toCapitalizeFirst = (str: string) =>
  str[0].toUpperCase() + str.slice(1);

export const toCapitalize = (str: string) =>
  str
    .split(" ")
    .map(item => item[0].toUpperCase() + item.slice(1))
    .join(" ");

export const isValidJson = (str: string): boolean => {
  try {
    JSON.parse(str);
    return true;
  } catch {
    return false;
  }
};

export const isStringIsValidObject = (str: string): boolean => {
  try {
    const parsed = JSON.parse(str);
    return typeof parsed === "object";
  } catch {
    return false;
  }
};

export const normalizePath = (path: string) => {
  if (!path) return "/";

  /* Replace multiple consecutive slashes with a single slash */
  let normalized = path.replace(/\/+/g, "/");

  /* Ensure it starts with a leading slash */
  if (!normalized.startsWith("/")) {
    normalized = "/" + normalized;
  }

  return normalized;
};
