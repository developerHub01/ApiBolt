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

export const isValidJson = (str: string): boolean => {
  try {
    console.log("====== str =======") ;
    console.log(str) ;
    const parsed = JSON.parse(str);
    console.log({ parsed });
    return true;
  } catch (error) {
    console.error(error);
    return false;
  }
};

export const isStringIsValidObject = (str: string): boolean => {
  try {
    console.log("===== str ======");
    console.log(str);
    const parsed = JSON.parse(str);
    console.log({ parsed });
    return typeof parsed === "object";
  } catch (error) {
    console.error({ error });
    return false;
  }
};
