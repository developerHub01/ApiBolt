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

export const EnvironmentFileSchema = z.array(
  z.object({
    variable: z.string(),
    type: z.enum(["default", "secret"]),
    value: z.string(),
    isCheck: z.boolean(),
  }),
);

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
  requestOrFolderMetaId: z.union([z.string(), z.null()]).optional(),
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
  parentId: z.union([z.string(), z.null()]).optional(),
  isExpended: z.boolean().optional(),
});

const FolderHeaderListSchema = z.record(
  z.string(),
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

export const FolderFileSchema = z.object({
  type: z.literal("folder"),
  requestList: z.record(z.string(), RequestListItemSchema),
  apiUrlList: z.record(
    z.string(),
    z.object({
      url: z.string().optional(),
    }),
  ),
  paramsList: z.record(
    z.string(),
    z.array(
      z.object({
        isCheck: z.boolean().optional(),
        key: z.string(),
        value: z.string(),
        keyType: z.enum(paramContentType).optional(),
        valueType: z.enum(paramContentType).optional(),
        description: z.string(),
        requestOrFolderMetaId: z.union([z.string(), z.null()]).optional(),
      }),
    ),
  ),
  headersList: FolderHeaderListSchema,
  hiddenHeadersCheckList: z.record(z.string(), RequestFileHiddenHeaderSchema),
  formDataList: FolderHeaderListSchema,
  xWWWFormUrlencodedList: FolderHeaderListSchema,
  binaryDataList: z.record(
    z.string(),
    z.object({
      path: z.string(),
    }),
  ),
  rawDataList: z.record(
    z.string(),
    z.object({
      type: z.enum(contentType),
      rawData: z.string(),
    }),
  ),
  requestMetaTabList: z.record(
    z.string(),
    z.object({
      requestOrFolderMetaId: z.union([z.string(), z.null()]).optional(),
      activeMetaTab: z.enum(activeTabType),
      requestBodyType: z.enum(requestBodyType),
    }),
  ),
  testScriptList: z.record(
    z.string(),
    z.object({
      script: z.string(),
    }),
  ),
  authorization: z.record(z.string(), RequestFileAuthSchema),
});
