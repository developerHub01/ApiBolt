export const areSamePayload = (
  payload: Record<string, unknown>,
  existingPayload: Record<string, unknown>
) =>
  Object.keys(payload).every((key) => {
    return payload[key] === existingPayload[key];
  });

export const toCapitalizeFirst = (str: string) =>
  str[0].toUpperCase() + str.slice(1);

export const toCapitalize = (str: string) =>
  str
    .split(" ")
    .map((item) => item[0].toUpperCase() + item.slice(1))
    .join(" ");
