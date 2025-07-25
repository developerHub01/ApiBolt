import { sql } from "drizzle-orm";
import { boolean } from "drizzle-orm/gel-core";
import { int, integer, sqliteTable, text } from "drizzle-orm/sqlite-core";
import { v4 as uuidv4 } from "uuid";

export const ACTIVE_PROJECT_ID = "singleton";

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
    .references(() => projectTable.id, {
      onDelete: "cascade",
    }),
  createdAt: text()
    .notNull()
    .default(sql`(current_timestamp)`),
});

export const activeProjectTable = sqliteTable("active_project_table", {
  id: text().primaryKey().default(ACTIVE_PROJECT_ID),
  activeProjectId: text("active_project_id").references(() => projectTable.id, {
    onDelete: "cascade",
  }),
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
    .references(() => projectTable.id, {
      onDelete: "cascade",
    }),
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

export const requestOrFolderMetaTable = sqliteTable(
  "request_or_folder_meta_table",
  {
    id: text()
      .primaryKey()
      .$defaultFn(() => uuidv4()),
    method: text() /* "get" | "post" | "put" | "patch" | "delete"; */,
    name: text().default(""),
    projectId: text()
      .notNull()
      .references(() => projectTable.id, {
        onDelete: "cascade",
      }),
    parentId: text().references(() => requestOrFolderMetaTable.id, {
      onDelete: "cascade",
    }),
    isExpended: integer({ mode: "boolean" }).notNull().default(0),
    createdAt: text()
      .notNull()
      .default(sql`(current_timestamp)`),
  }
);

export const tabsTable = sqliteTable("tabs_table", {
  id: text()
    .primaryKey()
    .$defaultFn(() => uuidv4()),
  openTabs: text().notNull().default("[]"),
  selectedTab: text().references(() => requestOrFolderMetaTable.id),
  projectId: text()
    .notNull()
    .unique()
    .references(() => projectTable.id, {
      onDelete: "cascade",
    }),
  createdAt: text()
    .notNull()
    .default(sql`(current_timestamp)`),
});

export const settingTable = sqliteTable("setting_table", {
  id: text()
    .primaryKey()
    .$defaultFn(() => uuidv4()),
  backgroundImages: text(),
  backgroundOpacity: int(),
  backgroundBlur: int(),
  zoomLevel: int(),
  isZoomable: int({ mode: boolean }),
  codeFontSize: int(),
  indentationSize: int(),
  layoutType: text() /* ltr | rtl */,
  projectId: text().references(() => projectTable.id, {
    onDelete: "cascade",
  }),
});

export const folderTable = sqliteTable("folder_table", {
  id: text()
    .primaryKey()
    .$defaultFn(() => uuidv4()),
  title: text().notNull().default(""),
  description: text().notNull().default(""),
  projectId: text()
    .notNull()
    .references(() => projectTable.id, {
      onDelete: "cascade",
    }),
  requestOrFolderMetaId: text()
    .notNull()
    .references(() => requestOrFolderMetaTable.id, {
      onDelete: "cascade",
    }),
});
