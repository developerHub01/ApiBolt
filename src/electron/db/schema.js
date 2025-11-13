import { sql } from "drizzle-orm";
import { boolean, unique } from "drizzle-orm/gel-core";
import {
  int,
  integer,
  primaryKey,
  real,
  sqliteTable,
  text,
} from "drizzle-orm/sqlite-core";
import { v4 as uuidv4 } from "uuid";

export const ACTIVE_PROJECT_ID = "singleton";
export const ACTIVE_SIDEBAR_TAB_ID = "singleton";
export const ACTIVE_CODE_SNIPPIT_TYPE_ID = "singleton";
export const API_URL_DEFAULT_VALUE = "http://localhost:3000";

export const projectTable = sqliteTable("projects_table", {
  id: text("id")
    .primaryKey()
    .$defaultFn(() => uuidv4()),
  name: text().notNull(),
});

export const activeProjectTable = sqliteTable("active_project_table", {
  id: text().primaryKey().default(ACTIVE_PROJECT_ID),
  activeProjectId: text("active_project_id")
    .unique()
    .references(() => projectTable.id, {
      onDelete: "cascade",
    }),
});

export const cookiesTable = sqliteTable("cookies_table", {
  id: text("id")
    .primaryKey()
    .$defaultFn(() => uuidv4()),
  projectId: text("projectId")
    .unique()
    .references(() => projectTable.id, {
      onDelete: "cascade",
    }),
  cookies: text(),
});

export const activeSidebarTabTable = sqliteTable(
  "active_active_sidebar_tab_table",
  {
    id: text().primaryKey().default(ACTIVE_SIDEBAR_TAB_ID),
    tab: text().default("project"),
  }
);

export const activeCodeSnippitTypeTable = sqliteTable(
  "active_code_snippit_type_table",
  {
    id: text().primaryKey().default(ACTIVE_CODE_SNIPPIT_TYPE_ID),
    languageId: text(),
  }
);

export const httpStatusTable = sqliteTable("http_status_table", {
  code: text().notNull().primaryKey(),
  reason: text().default(""),
  description: text().default(""),
  editedReason: text(),
  editedDescription: text(),
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

export const authorizationTable = sqliteTable("authorization_table", {
  id: text()
    .primaryKey()
    .$defaultFn(() => uuidv4()),
  type: text().notNull() /* "no-auth" | "inherit-parent" | "basic-auth" | "bearer-token" | "jwt-bearer" | "api-key"; */,
  projectId: text()
    .notNull()
    .references(() => projectTable.id, {
      onDelete: "cascade",
    }),
  requestOrFolderMetaId: text()
    .unique()
    .references(() => requestOrFolderMetaTable.id, {
      onDelete: "cascade",
    }),
  /* API Key Auth =========== */
  apiKeyKey: text().default(""),
  apiKeyValue: text().default(""),
  apiKeyAddTo: text().default("header") /* "header" | "query" */,
  /* Bearer Token Auth ============ */
  bearerToken: text().default(""),
  /* Basic Auth =========== */
  basicAuthUsername: text().default(""),
  basicAuthPassword: text().default(""),
  /* JWT Bearer Auth ============ */
  jwtAlgo: text().default("HS256"),
  jwtSecret: text().default(""),
  jwtPayload: text().default(""),
  jwtHeaderPrefix: text().default("Bearer"),
  jwtAddTo: text().default("header") /* "header" | "query" */,
  /* Tokens =================== */
  basicAuthToken: text().default(""),
  jwtAuthToken: text().default(""),
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
  selectedTab: text(),
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
  activityBarVisible: int({ mode: boolean }),
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

export const apiUrlTable = sqliteTable("api_url_table", {
  id: text()
    .primaryKey()
    .$defaultFn(() => uuidv4()),
  requestOrFolderMetaId: text()
    .notNull()
    .unique()
    .references(() => requestOrFolderMetaTable.id, {
      onDelete: "cascade",
    }),
  url: text().default(API_URL_DEFAULT_VALUE),
  createdAt: text()
    .notNull()
    .default(sql`(current_timestamp)`),
});

export const paramsTable = sqliteTable("params_table", {
  id: text()
    .primaryKey()
    .$defaultFn(() => uuidv4()),
  isCheck: int({ mode: boolean }).default(1),
  key: text().notNull().default(""),
  value: text().notNull().default(""),
  keyType: text().default("text"), // text | env
  valueType: text().default("text"), // text | env
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
    authorization: int({ mode: boolean }).default(1),
    userAgent: int({ mode: boolean }).default(1),
    contentLength: int({ mode: boolean }).default(1),
    accept: int({ mode: boolean }).default(1),
    acceptEncoding: int({ mode: boolean }).default(1),
    connection: int({ mode: boolean }).default(1),
  }
);

export const showHiddenMetaDataTable = sqliteTable(
  "show_hidden_meta_data_table",
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
    showHiddenParams: int({ mode: boolean }).default(0),
    showHiddenHeaders: int({ mode: boolean }).default(0),
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
  activeMetaTab: text() /* "url" | "params" | "headers" | "body" */,
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

export const keyboardShortcutTable = sqliteTable(
  "keyboard_shortcut_table",
  {
    id: text().notNull(),
    label: text().default(""),
    key: text(),
    projectId: text().references(() => projectTable.id, {
      onDelete: "cascade",
    }),
  },
  (table) => [
    primaryKey({
      columns: [table.id, table.projectId],
    }),
  ]
);

export const historyTable = sqliteTable("history_table", {
  id: text()
    .primaryKey()
    .$defaultFn(() => uuidv4()),
  request: text().references(() => requestOrFolderMetaTable.id, {
    onDelete: "cascade",
  }),
  url: text().default(""),
  method: text(),
  name: text(),
  params: text(),
  headers: text(),
  authorization: text(),
  body: text(),
  responseStatus: text(),
  responseSize: text(),
  createdAt: text()
    .notNull()
    .default(sql`(current_timestamp)`),
});

export const themeTable = sqliteTable("theme_table", {
  id: text()
    .primaryKey()
    .$defaultFn(() => uuidv4()),
  name: text(),
  type: text() /* light | dark | custom */,
  url: text().default(""),
  author: text().default("system"),
  thumbnail: text(),
  palette: text().notNull(),
  createdAt: text()
    .notNull()
    .default(sql`(current_timestamp)`),
});

export const activeThemeTable = sqliteTable(
  "active_theme_table",
  {
    projectId: text().references(() => projectTable.id, {
      onDelete: "cascade",
    }),
    activeTheme: text().references(() => themeTable.id, {
      onDelete: "cascade",
    }),
  },
  (table) => [
    unique({
      columns: [table.type, table.activeTheme],
    }),
  ]
);
