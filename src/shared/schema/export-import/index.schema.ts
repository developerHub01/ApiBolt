import * as z from "zod";
import {
  activeTabType,
  authAddTo,
  authType,
  contentType,
  methodList,
  paramContentType,
  requestBodyType,
} from "@shared/constant/request-response";
import { THEME_PALETTE_PROPERTIES } from "@shared/constant/theme";
import { isValidColor } from "@shared/utils/color.utils";
import { ThemeColorId } from "@shared/types/theme.types";

const EnvironmentFileSchema = z.object({
  variable: z.string(),
  type: z.enum(["default", "secret"]),
  value: z.string(),
  isCheck: z.boolean(),
});

/* ========================================
============== ENVIRONMENT ================
=========================================== */
export const EnvironmentsFileSchema = z.array(EnvironmentFileSchema);

/* ========================================
==============   REQUEST    ===============
=========================================== */
const RequestFileParamSchema = z.object({
  isCheck: z.boolean(),
  key: z.string(),
  value: z.string(),
  description: z.string(),
  keyType: z.enum(paramContentType),
  valueType: z.enum(paramContentType),
});

const RequestFileHeaderSchema = z.object({
  isCheck: z.boolean(),
  key: z.string(),
  value: z.string(),
  description: z.string(),
});

const RequestFileAuthSchema = z.object({
  type: z.enum(authType).optional(),
  apiKeyKey: z.string().optional(),
  apiKeyValue: z.string().optional(),
  apiKeyAddTo: z.enum(authAddTo).optional(),
  bearerToken: z.string().optional(),
  basicAuthUsername: z.string().optional(),
  basicAuthPassword: z.string().optional(),
  jwtAlgo: z.string().optional(),
  jwtSecret: z.string().optional(),
  jwtPayload: z.string().optional(),
  jwtHeaderPrefix: z.string().optional(),
  jwtAddTo: z.enum(authAddTo).optional(),
  basicAuthToken: z.string().optional(),
  jwtAuthToken: z.string().optional(),
});

const RequestFileHiddenHeaderSchema = z.object({
  userAgent: z.boolean().optional(),
  contentLength: z.boolean().optional(),
  accept: z.boolean().optional(),
  acceptEncoding: z.boolean().optional(),
  connection: z.boolean().optional(),
  requestOrFolderMetaId: z.union([z.uuid(), z.null()]).optional(),
});

export const RequestFileSchema = z.object({
  type: z.literal("request"),
  name: z.string(),
  method: z.enum(methodList),
  url: z.string().optional(),
  params: z.array(RequestFileParamSchema),
  headers: z.array(RequestFileHeaderSchema),
  hiddenHeadersCheck: RequestFileHiddenHeaderSchema,
  requestMetaTab: z.object({
    activeMetaTab: z.enum(activeTabType).optional(),
    requestBodyType: z.enum(requestBodyType).optional(),
  }),
  bodyRaw: z.object({
    type: z.enum(contentType).optional(),
    rawData: z.string().optional(),
  }),
  bodyBinary: z.object({
    path: z.union([z.string(), z.null()]).optional(),
  }),
  bodyXWWWFormUrlencoded: z.array(RequestFileHeaderSchema),
  bodyFormData: z.array(RequestFileParamSchema),
  testScript: z.object({
    script: z.string().optional(),
  }),
  authorization: RequestFileAuthSchema,
});

/* ========================================
==============   FOLDER    ================
=========================================== */
const RequestListItemSchema = z.object({
  name: z.string(),
  method: z.union([z.enum(methodList), z.null()]),
  parentId: z.union([z.uuid(), z.null()]).optional(),
  isExpended: z.boolean().optional(),
});

const FolderHeaderListSchema = z.record(
  z.uuid(),
  z.array(
    z.object({
      isCheck: z.boolean().optional(),
      key: z.string(),
      value: z.string(),
      description: z.string(),
      requestOrFolderMetaId: z.string(),
    }),
  ),
);

const FolderProjectParamSchema = z.object({
  isCheck: z.boolean().optional(),
  key: z.string(),
  value: z.string(),
  keyType: z.enum(paramContentType).optional(),
  valueType: z.enum(paramContentType).optional(),
  description: z.string(),
  requestOrFolderMetaId: z.union([z.uuid(), z.null()]).optional(),
});

export const FolderFileSchema = z.object({
  type: z.literal("folder"),
  requestList: z.record(z.uuid(), RequestListItemSchema),
  apiUrlList: z.record(
    z.uuid(),
    z.object({
      url: z.string().optional(),
    }),
  ),
  paramsList: z.record(z.uuid(), z.array(FolderProjectParamSchema)),
  headersList: FolderHeaderListSchema,
  hiddenHeadersCheckList: z.record(z.uuid(), RequestFileHiddenHeaderSchema),
  formDataList: FolderHeaderListSchema,
  xWWWFormUrlencodedList: FolderHeaderListSchema,
  binaryDataList: z.record(
    z.uuid(),
    z.object({
      path: z.string(),
    }),
  ),
  rawDataList: z.record(
    z.uuid(),
    z.object({
      type: z.enum(contentType),
      rawData: z.string(),
    }),
  ),
  requestMetaTabList: z.record(
    z.uuid(),
    z.object({
      requestOrFolderMetaId: z.union([z.uuid(), z.null()]).optional(),
      activeMetaTab: z.enum(activeTabType),
      requestBodyType: z.enum(requestBodyType),
    }),
  ),
  testScriptList: z.record(
    z.uuid(),
    z.object({
      script: z.string(),
    }),
  ),
  authorization: z.record(z.uuid(), RequestFileAuthSchema),
});

/* ========================================
==============   PROJECT   ================
=========================================== */
export const ProjectFileSchema = z.object({
  type: z.literal("project"),
  project: z.object({
    name: z.string(),
  }),
  environments: z.array(EnvironmentFileSchema),
  requestList: z.record(z.uuid(), RequestListItemSchema),
  apiUrlList: z.record(
    z.uuid(),
    z.object({
      url: z.string().optional(),
    }),
  ),
  paramsList: z.record(z.uuid(), z.array(FolderProjectParamSchema)),
  headersList: FolderHeaderListSchema,
  hiddenHeadersCheckList: z.record(z.uuid(), RequestFileHiddenHeaderSchema),
  formDataList: FolderHeaderListSchema,
  xWWWFormUrlencodedList: FolderHeaderListSchema,
  binaryDataList: z.record(
    z.uuid(),
    z.object({
      path: z.string(),
    }),
  ),
  rawDataList: z.record(
    z.uuid(),
    z.object({
      type: z.enum(contentType),
      rawData: z.string(),
    }),
  ),
  requestMetaTabList: z.record(
    z.uuid(),
    z.object({
      requestOrFolderMetaId: z.union([z.uuid(), z.null()]).optional(),
      activeMetaTab: z.enum(activeTabType),
      requestBodyType: z.enum(requestBodyType),
    }),
  ),
  testScriptList: z.record(
    z.uuid(),
    z.object({
      script: z.string(),
    }),
  ),
  authorization: z.record(
    z.union([z.uuid(), z.literal("null")]),
    RequestFileAuthSchema,
  ),
});

/* ========================================
===============   THEME   =================
=========================================== */
export const ThemePaletteFileSchema = z.object(
  Array.from(THEME_PALETTE_PROPERTIES).reduce(
    (acc, curr) => {
      acc[curr] = z.string().refine(isValidColor);
      return acc;
    },
    {} as Record<ThemeColorId, z.ZodString>,
  ),
);
