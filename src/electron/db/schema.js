import { sql } from "drizzle-orm";
import { boolean } from "drizzle-orm/gel-core";
import { int, integer, real, sqliteTable, text } from "drizzle-orm/sqlite-core";
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
  activeProjectId: text("active_project_id")
    .unique()
    .references(() => projectTable.id, {
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
  backgroundOpacity: real(),
  backgroundBlur: int(),
  maxNumberOfImages: int(),
  slideInterval: int(),
  zoomLevel: real(),
  isZoomable: int({ mode: boolean }),
  codeFontSize: int(),
  indentationSize: int(),
  layoutType: text() /* ltr | rtl */,
  projectId: text()
    .unique()
    .references(() => projectTable.id, {
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
    .unique()
    .references(() => requestOrFolderMetaTable.id, {
      onDelete: "cascade",
    }),
});

export const paramsTable = sqliteTable("params_table", {
  id: text()
    .primaryKey()
    .$defaultFn(() => uuidv4()),
  isCheck: int({ mode: boolean }).default(1),
  key: text().notNull().default(""),
  value: text().notNull().default(""),
  description: text().notNull().default(""),
  requestOrFolderMetaId: text()
    .notNull()
    .references(() => requestOrFolderMetaTable.id, {
      onDelete: "cascade",
    }),
  createdAt: text()
    .notNull()
    .default(sql`(current_timestamp)`),
});

export const headersTable = sqliteTable("headers_table", {
  id: text()
    .primaryKey()
    .$defaultFn(() => uuidv4()),
  isCheck: int({ mode: boolean }).default(1),
  key: text().notNull().default(""),
  value: text().notNull().default(""),
  description: text().notNull().default(""),
  requestOrFolderMetaId: text()
    .notNull()
    .references(() => requestOrFolderMetaTable.id, {
      onDelete: "cascade",
    }),
  createdAt: text()
    .notNull()
    .default(sql`(current_timestamp)`),
});

export const hiddenHeadersCheckTable = sqliteTable(
  "hidden_headers_check_table",
  {
    id: text()
      .primaryKey()
      .$defaultFn(() => uuidv4()),
    requestOrFolderMetaId: text()
      .notNull()
      .unique()
      .references(() => requestOrFolderMetaTable.id, {
        onDelete: "cascade",
      }),
    userAgent: int({ mode: boolean }).default(1),
    contentLength: int({ mode: boolean }).default(1),
    accept: int({ mode: boolean }).default(1),
    acceptEncoding: int({ mode: boolean }).default(1),
    connection: int({ mode: boolean }).default(1),
  }
);

export const requestMetaTabTable = sqliteTable("request_meta_tab_table", {
  id: text()
    .primaryKey()
    .$defaultFn(() => uuidv4()),
  requestOrFolderMetaId: text()
    .notNull()
    .unique()
    .references(() => requestOrFolderMetaTable.id, {
      onDelete: "cascade",
    }),
  activeMetaTab: text() /* "params" | "headers" | "body" */,
  requestBodyType:
    text() /* "none" | "form-data" | "x-www-form-urlencoded" | "raw" | "binary" */,
});

export const bodyRawTable = sqliteTable("body_raw_table", {
  id: text()
    .primaryKey()
    .$defaultFn(() => uuidv4()),
  requestOrFolderMetaId: text()
    .notNull()
    .unique()
    .references(() => requestOrFolderMetaTable.id, {
      onDelete: "cascade",
    }),
  type: text().default("json") /* text, javascript, json, html, xml */,
  rawData: text().default(""),
  lineWrap: int({ mode: boolean }).default(1),
});

export const bodyBinaryTable = sqliteTable("body_binary_table", {
  id: text()
    .primaryKey()
    .$defaultFn(() => uuidv4()),
  requestOrFolderMetaId: text()
    .notNull()
    .unique()
    .references(() => requestOrFolderMetaTable.id, {
      onDelete: "cascade",
    }),
  path: text(),
});

export const bodyXWWWFormUrlencodedTable = sqliteTable(
  "body_x_www_form_urlencoded_table",
  {
    id: text()
      .primaryKey()
      .$defaultFn(() => uuidv4()),
    isCheck: int({ mode: boolean }).default(1),
    key: text().notNull().default(""),
    value: text().notNull().default(""),
    description: text().notNull().default(""),
    requestOrFolderMetaId: text()
      .notNull()
      .references(() => requestOrFolderMetaTable.id, {
        onDelete: "cascade",
      }),
    createdAt: text()
      .notNull()
      .default(sql`(current_timestamp)`),
  }
);

export const bodyFormDataTable = sqliteTable("body_form_data_table", {
  id: text()
    .primaryKey()
    .$defaultFn(() => uuidv4()),
  isCheck: int({ mode: boolean }).default(1),
  key: text().notNull().default(""),
  value: text().notNull().default(""),
  valueType: text().notNull().default("text") /* text | file */,
  description: text().notNull().default(""),
  requestOrFolderMetaId: text()
    .notNull()
    .references(() => requestOrFolderMetaTable.id, {
      onDelete: "cascade",
    }),
  createdAt: text()
    .notNull()
    .default(sql`(current_timestamp)`),
});

export const metaShowColumnTable = sqliteTable("meta_show_column_table", {
  id: text()
    .primaryKey()
    .$defaultFn(() => uuidv4()),
  requestOrFolderMetaId: text()
    .notNull()
    .unique()
    .references(() => requestOrFolderMetaTable.id, {
      onDelete: "cascade",
    }),
  paramsValue: int({ mode: boolean }).default(1),
  paramsDescription: int({ mode: boolean }).default(0),
  headersValue: int({ mode: boolean }).default(1),
  headersDescription: int({ mode: boolean }).default(0),
  formDataValue: int({ mode: boolean }).default(1),
  formDataDescription: int({ mode: boolean }).default(0),
  xWWWFormUrlencodedValue: int({ mode: boolean }).default(1),
  xWWWFormUrlencodedDescription: int({ mode: boolean }).default(0),
  createdAt: text()
    .notNull()
    .default(sql`(current_timestamp)`),
});
