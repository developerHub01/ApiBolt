import { sql } from "drizzle-orm";
import { int, sqliteTable, text } from "drizzle-orm/sqlite-core";
import { v4 as uuidv4 } from "uuid";

export const ACTIVE_PROJECT_ID = "singleton";

export const usersTable = sqliteTable("users_table", {
  id: int().primaryKey({ autoIncrement: true }),
  name: text().notNull(),
  age: int().notNull(),
  email: text().notNull().unique(),
});

export const projectTable = sqliteTable("projects_table", {
  id: text("id")
    .primaryKey()
    .$defaultFn(() => uuidv4()),
  name: text().notNull(),
});

export const environmentTable = sqliteTable("environments_table", {
  id: text("id")
    .primaryKey()
    .$defaultFn(() => uuidv4()),
  variable: text(),
  type: text().default("default"),
  value: text(),
  isCheck: int().notNull().default(1),
  projectId: text()
    .notNull()
    .references(() => projectTable.id),
  createdAt: text()
    .notNull()
    .default(sql`(current_timestamp)`),
});

export const activeProjectTable = sqliteTable("active_project_table", {
  id: text().primaryKey().default(ACTIVE_PROJECT_ID),
  activeProjectId: text("active_project_id"),
});

export const authorizationTable = sqliteTable("authorization_table", {
  id: text()
    .primaryKey()
    .$defaultFn(() => uuidv4()),
  type: text()
    .notNull()
    .default(
      "no-auth"
    ) /* "no-auth" | "basic-auth" | "bearer-token" | "jwt-bearer" | "api-key"; */,
  projectId: text()
    .notNull()
    .unique()
    .references(() => projectTable.id),
  /* API Key Auth =========== */
  apiKeyKey: text(),
  apiKeyValue: text(),
  apiKeyAddTo: text() /* "header" | "query" */,
  /* Bearer Token Auth ============ */
  bearerToken: text(),
  /* Basic Auth =========== */
  basicAuthUsername: text(),
  basicAuthPassword: text(),
  /* JWT Bearer Auth ============ */
  jwtAlgo: text(),
  jwtSecret: text(),
  jwtPayload: text(),
  jwtHeaderPrefix: text(),
  jwtAddTo: text() /* "header" | "query" */,
});
