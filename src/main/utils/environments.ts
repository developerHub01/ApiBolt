import { TEnvironmentFile } from "@shared/types/export-import/environments";

const typeList = new Set(["default", "secret"]);

export const filterValidEnvironments = (
  payload: TEnvironmentFile
): TEnvironmentFile | null => {
  try {
    if (!Array.isArray(payload)) payload = [payload];

    for (const index in payload) {
      const { variable, type, value, isCheck } = payload[index];

      if (
        !("variable" in payload[index]) ||
        !("type" in payload[index]) ||
        !("value" in payload[index]) ||
        !("isCheck" in payload[index]) ||
        (variable?.length && !/^[a-zA-Z0-9_-]$/.test(variable)) ||
        (type && !typeList.has(type)) ||
        typeof isCheck !== "boolean"
      )
        return null;

      payload[index] = { variable, type, value, isCheck };
    }

    return payload;
  } catch (error) {
    console.error(error);
    return null;
  }
};
