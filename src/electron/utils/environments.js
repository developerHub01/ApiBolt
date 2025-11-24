/* 
id: text("id")
    .primaryKey()
    .$defaultFn(() => uuidv4()),
  variable: text(),
  type: text().default("default"),
  value: text(),
  isCheck: int().notNull().default(1),
  projectId: text()
    .notNull()
    .references(() => projectTable.id, {
      onDelete: "cascade",
    }),
  createdAt: text()
    .notNull()
    .default(sql`(current_timestamp)`),

*/

const typeList = new Set(["default", "secret"]);

export const filterValidEnvironments = (payload = {}) => {
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
