export const senitizeValue = (
  value: unknown,
  defaultValue: unknown
): number | string =>
  ([-1, "default"].includes(value as string | number)
    ? defaultValue
    : value) as string | number;
