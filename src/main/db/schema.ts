import { TAuthAddTo, TAuthType } from "@shared/types/authorization.types";
import { TRequestCodeType } from "@shared/types/code-snippit.types";
import {
  ParamInterface,
  TActiveTabType,
  TContentType,
  THTTPMethods,
  TRequestBodyType,
} from "@shared/types/request-response.types";
import { SettingsInterface } from "@shared/types/setting.types";
import { TSidebarTab } from "@shared/types/sidebar.types";
import { ThemeInterface } from "@shared/types/theme.types";
import { sql } from "drizzle-orm";
import {
  int,
  primaryKey,
  real,
  sqliteTable,
  text,
  uniqueIndex,
} from "drizzle-orm/sqlite-core";
import { v4 as uuidv4 } from "uuid";

export const ACTIVE_PROJECT_ID = "singleton";
export const ACTIVE_SIDEBAR_TAB_ID = "singleton";
export const ACTIVE_CODE_SNIPPIT_TYPE_ID = "singleton";
export const LOCAL_PASSWORD_ID = "singleton";
export const API_URL_DEFAULT_VALUE = "http://localhost:3000";
export const DEFAULT_ACTIVE_SIDEBAR_TAB: TSidebarTab = "navigate_projects";
export const DEFAULT_ACTIVE_CODE_SNIPPIT_TYPE: TRequestCodeType =
  "javascript-fetch";

export const localPasswordTable = sqliteTable("local_password_table", {
  id: text("id")
    .primaryKey()
    .default(LOCAL_PASSWORD_ID),
  password: text(),
});

export const projectTable = sqliteTable("projects_table", {
  id: text("id")
    .primaryKey()
    .$defaultFn(() => uuidv4()),
  name: text().notNull().default("Project"),
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
    .notNull()
    .references(() => projectTable.id, {
      onDelete: "cascade",
    }),
  cookies: text(),
});

export const activeSidebarTabTable = sqliteTable("active_sidebar_tab_table", {
  id: text().primaryKey().default(ACTIVE_SIDEBAR_TAB_ID),
  tab: text()
    .$type<TSidebarTab>()
    .notNull()
    .default(DEFAULT_ACTIVE_SIDEBAR_TAB),
});

export const activeCodeSnippitTypeTable = sqliteTable(
  "active_code_snippit_type_table",
  {
    id: text().primaryKey().default(ACTIVE_CODE_SNIPPIT_TYPE_ID),
    languageId: text()
      .$type<TRequestCodeType>()
      .notNull()
      .default(DEFAULT_ACTIVE_CODE_SNIPPIT_TYPE),
  },
);

export const httpStatusTable = sqliteTable("http_status_table", {
  code: text().notNull().primaryKey(),
  reason: text().notNull().default(""),
  description: text().notNull().default(""),
  editedReason: text(),
  editedDescription: text(),
});

export const environmentTable = sqliteTable("environments_table", {
  id: text("id")
    .primaryKey()
    .$defaultFn(() => uuidv4()),
  variable: text().notNull().default(""),
  type: text()
    .$type<"default" | "secret">()
    .notNull()
    .default("default") /* "default" | "secret" */,
  value: text().notNull().default(""),
  isCheck: int({ mode: "boolean" }).notNull().default(true),
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
  type: text()
    .$type<TAuthType>()
    .notNull()
    .default(
      "no-auth",
    ) /* "no-auth" | "inherit-parent" | "basic-auth" | "bearer-token" | "jwt-bearer" | "api-key"; */,
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
  apiKeyKey: text().notNull().default(""),
  apiKeyValue: text().notNull().default(""),
  apiKeyAddTo: text()
    .$type<TAuthAddTo>()
    .notNull()
    .default("header") /* "header" | "query" */,
  /* Bearer Token Auth ============ */
  bearerToken: text().notNull().default(""),
  /* Basic Auth =========== */
  basicAuthUsername: text().notNull().default(""),
  basicAuthPassword: text().notNull().default(""),
  /* JWT Bearer Auth ============ */
  jwtAlgo: text().notNull().default("HS256"),
  jwtSecret: text().notNull().default(""),
  jwtPayload: text().notNull().default(""),
  jwtHeaderPrefix: text().notNull().default("Bearer"),
  jwtAddTo: text()
    .$type<TAuthAddTo>()
    .notNull()
    .default("header") /* "header" | "query" */,
  /* Tokens =================== */
  basicAuthToken: text().notNull().default(""),
  jwtAuthToken: text().notNull().default(""),
});

export const requestOrFolderMetaTable = sqliteTable(
  "request_or_folder_meta_table",
  {
    id: text()
      .primaryKey()
      .$defaultFn(() => uuidv4()),
    method: text()
      .$type<THTTPMethods | null>()
      .default(null) /* "get" | "post" | "put" | "patch" | "delete"; */,
    name: text().notNull().default(""),
    projectId: text()
      .notNull()
      .references(() => projectTable.id, {
        onDelete: "cascade",
      }),
    parentId: text().references(() => requestOrFolderMetaTable.id, {
      onDelete: "cascade",
    }),
    isExpended: int({ mode: "boolean" }).notNull().default(false),
    createdAt: text()
      .notNull()
      .default(sql`(current_timestamp)`),
  },
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
  isZoomable: int(),
  codeFontSize: int(),
  indentationSize: int(),
  layoutType: text()
    .$type<SettingsInterface["layoutType"]>()
    .default("ltr"),
  activityBarVisible: int(),
  tabListLayoutType: text()
    .$type<SettingsInterface["tabListLayoutType"]>()
    .default("right"),
  projectId: text()
    .references(() => projectTable.id, {
      onDelete: "cascade",
    }),
},  
table => [
  uniqueIndex("setting_unique_project").on(table.projectId)
],
);

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
  url: text().notNull().default(API_URL_DEFAULT_VALUE),
  createdAt: text()
    .notNull()
    .default(sql`(current_timestamp)`),
});

export const paramsTable = sqliteTable("params_table", {
  id: text()
    .primaryKey()
    .$defaultFn(() => uuidv4()),
  isCheck: int({ mode: "boolean" }).notNull().default(true),
  key: text().notNull().default(""),
  value: text().notNull().default(""),
  keyType: text().$type<ParamInterface["keyType"]>().notNull().default("text"), // text | env
  valueType: text()
    .$type<ParamInterface["valueType"]>()
    .notNull()
    .default("text"), // text | env
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
  isCheck: int({ mode: "boolean" }).notNull().default(true),
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
    authorization: int({ mode: "boolean" }).notNull().default(true),
    userAgent: int({ mode: "boolean" }).notNull().default(true),
    contentLength: int({ mode: "boolean" }).notNull().default(true),
    accept: int({ mode: "boolean" }).notNull().default(true),
    acceptEncoding: int({ mode: "boolean" }).notNull().default(true),
    connection: int({ mode: "boolean" }).notNull().default(true),
  },
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
    showHiddenParams: int({ mode: "boolean" }).notNull().default(false),
    showHiddenHeaders: int({ mode: "boolean" }).notNull().default(false),
  },
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
  activeMetaTab: text()
    .$type<TActiveTabType>()
    .notNull()
    .default("url") /* "url" | "params" | "headers" | "body" */,
  requestBodyType: text()
    .$type<TRequestBodyType>()
    .notNull()
    .default(
      "none",
    ) /* "none" | "form-data" | "x-www-form-urlencoded" | "raw" | "binary" */,
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
  type: text()
    .$type<TContentType>()
    .notNull()
    .default("json") /* text, javascript, json, html, xml */,
  rawData: text().notNull().default(""),
  lineWrap: int({ mode: "boolean" }).notNull().default(true),
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
    isCheck: int({ mode: "boolean" }).notNull().default(true),
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
  },
);

export const bodyFormDataTable = sqliteTable("body_form_data_table", {
  id: text()
    .primaryKey()
    .$defaultFn(() => uuidv4()),
  isCheck: int({ mode: "boolean" }).notNull().default(true),
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
  paramsValue: int({ mode: "boolean" }).notNull().default(true),
  paramsDescription: int({ mode: "boolean" }).notNull().default(false),
  headersValue: int({ mode: "boolean" }).notNull().default(true),
  headersDescription: int({ mode: "boolean" }).notNull().default(false),
  formDataValue: int({ mode: "boolean" }).notNull().default(true),
  formDataDescription: int({ mode: "boolean" }).notNull().default(false),
  xWWWFormUrlencodedValue: int({ mode: "boolean" }).notNull().default(true),
  xWWWFormUrlencodedDescription: int({ mode: "boolean" })
    .notNull()
    .default(false),
  createdAt: text()
    .notNull()
    .default(sql`(current_timestamp)`),
});

export const keyboardShortcutTable = sqliteTable(
  "keyboard_shortcut_table",
  {
    id: text().notNull(),
    label: text().notNull().default(""),
    key: text().notNull(),
    projectId: text().references(() => projectTable.id, {
      onDelete: "cascade",
    }),
  },
  table => [
    primaryKey({
      columns: [table.id, table.projectId],
    }),
  ],
);

export const historyTable = sqliteTable("history_table", {
  id: text()
    .primaryKey()
    .$defaultFn(() => uuidv4()),
  request: text()
    .notNull()
    .references(() => requestOrFolderMetaTable.id, {
      onDelete: "cascade",
    }),
  url: text().notNull(),
  method: text().$type<THTTPMethods>().notNull().default("get"),
  name: text().notNull(),
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
  name: text().notNull().default("theme"),
  type: text()
    .$type<ThemeInterface["type"]>()
    .notNull()
    .default("dark") /* light | dark | custom */,
  url: text().notNull().default(""),
  author: text().notNull().default("system"),
  thumbnail: text().notNull().default(""),
  palette: text(),
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
  table => [uniqueIndex("active_theme_unique_project").on(table.projectId)],
);
