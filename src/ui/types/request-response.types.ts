export type TRequestFolderDescriptionTab = "markdown" | "preview" | "split";

export type TContentType = "text" | "html" | "xml" | "json" | "javascript";
export type TAuthType =
  | "no-auth"
  | "basic-auth"
  | "bearer-token"
  | "jwt-bearer"
  | "api-key";

export type TActiveTabType = "params" | "headers" | "body";

export type TAuthAddTo = "header" | "query";

export interface ProjectInterface {
  id: string;
  name: string;
}

export type TMetaTableType =
  | "params"
  | "hiddenParams"
  | "headers"
  | "hiddenHeaders"
  | "form-data"
  | "x-www-form-urlencoded"
  | "environments";

export interface EnvironmentInterface {
  id: string;
  variable: string;
  type: "default" | "secret";
  value: string;
  isCheck: boolean;
  projectId: string;
  createdAt: string;
}

export type EnvironmentPayloadInterface = Omit<
  EnvironmentInterface,
  "createdAt"
>;

export interface AuthorizationPayloadInterface {
  id: string;
  type: TAuthType;
  projectId: string;
  apiKeyKey: string;
  apiKeyValue: string;
  apiKeyAddTo: TAuthAddTo;
  /* Bearer Token Auth ============ */
  bearerToken: string;
  /* Basic Auth =========== */
  basicAuthUsername: string;
  basicAuthPassword: string;
  /* JWT Bearer Auth ============ */
  jwtAlgo: string;
  jwtSecret: string;
  jwtPayload: string;
  jwtHeaderPrefix: string;
  jwtAddTo: TAuthAddTo;
}

export interface RequestListItemInterface {
  id: string;
  name: string;
  method?: THTTPMethods;
  children?: Array<string>;
  parentId?: string;
  createdAt?: number;
  isExpended?: boolean;
}

export type RequestListItemUpdatePayloadInterface = Required<
  Pick<RequestListItemInterface, "id">
> &
  Partial<Omit<RequestListItemInterface, "id" | "createdAt" | "children">>;

export interface RequestListInterface {
  [key: string]: RequestListItemInterface;
}

export type TRequestBodyType =
  | "none"
  | "form-data"
  | "x-www-form-urlencoded"
  | "raw"
  | "binary";

export type THTTPMethods = "get" | "post" | "put" | "patch" | "delete";

export interface ParamHeaderPayloadInterface {
  id: string;
  isCheck: boolean;
  key: string;
  value: string;
  description: string;
  requestOrFolderMetaId: string;
  createdAt: string;
}

export interface ParamHeaderBuildPayloadInterface {
  isCheck?: boolean;
  key: string;
  value: string;
  description: string;
  requestOrFolderMetaId?: string;
}

export interface ParamInterface<ValueT = string> {
  id: string;
  key: string;
  value: ValueT;
  description?: string;
  isCheck?: boolean;
  prevent?: boolean;
  calculateDynamicly?: boolean;
}

export interface HiddenHeadersCheckInterface {
  userAgent: boolean;
  contentLength: boolean;
  accept: boolean;
  acceptEncoding: boolean;
  connection: boolean;
}

export interface FormDataInterface
  extends ParamInterface<string | Array<string>> {
  contentType?: string;
}

export interface CookieInterface {
  name: string;
  value: string;
  domain?: string;
  path?: string;
  expires?: string;
  HttpOnly?: boolean;
  secure?: boolean;
  samesite?: string;
}

export interface ResponseInterface {
  data: unknown;
  headers: Record<string, unknown>;
  cookies?: Array<CookieInterface>;
  status: number;
  statusText: string;
  statusDescription?: string;
}

export interface RequestResponseSizeInterface {
  header: number;
  body: number;
}

export interface FileMetadataInterface {
  name: string;
  size: number;
  type: string;
  lastModified: number;
  fileName: string;
  mimeType: string;
  base64?: string;
}

export interface FormDataFileMetadataInterface
  extends Omit<FormDataInterface, "value"> {
  value: Array<FileMetadataInterface> | string;
}

export interface ResponseFileDataInterface {
  name: string;
  url: string;
  method: THTTPMethods;
  params: Array<ParamInterface>;
  headers: Array<ParamInterface>;
  authorization: {
    type: TAuthType;
    data?:
      | BasicAuthInterface
      | TBearerToken
      | JWTBearerAuthInterface
      | APIKeyInterface;
  };
  body: {
    selected: TRequestBodyType;
    rawData: string;
    formData: Array<FormDataFileMetadataInterface>;
    xWWWFormUrlencodedData: Array<ParamInterface>;
    binaryData: FileMetadataInterface | null;
    rawRequestBodyType: TContentType;
  };
  response: ResponseInterface | null;
  size: {
    requestSize: RequestResponseSizeInterface;
    responseSize: RequestResponseSizeInterface;
  };
}

export interface ResponseFolderDataInterface {
  title: string;
  description: string;
}

export type ResponseFileDataBackendInterface = Omit<
  ResponseFileDataInterface,
  "response" | "name" | "method"
>;

export type ResponseDataBackendInterface =
  | ResponseFileDataBackendInterface
  | ResponseFolderDataInterface;

export interface APIPayloadBody {
  method: THTTPMethods;
  url: string;
  headers: Record<string, string>;
  hiddenHeaders: Record<string, string>;
  bodyType: TRequestBodyType;
  formData?: Array<{
    key: string;
    value: string | Array<File>;
  }>;
  xWWWformDataUrlencoded?: Array<{
    key: string;
    value: string;
  }>;
  rawData?: string;
  binaryData?: File;
  rawSubType?: TContentType;
}

export interface StatusDataInterface {
  [key: string]: {
    reason: string;
    description: string;
  };
}

export interface APIKeyInterface {
  key: string;
  value: string;
  addTo: TAuthAddTo;
}
export type TBearerToken = string;
export interface BasicAuthInterface {
  username: string;
  password: string;
}
export interface JWTBearerAuthInterface {
  algo: string;
  secret: string;
  payload: string;
  headerPrefix: string;
  addTo: TAuthAddTo;
}

export type BodyRawInterface = {
  requestOrFolderMetaId?: string;
  type: TContentType /* text, javascript, json, html, xml */;
  rawData: string;
  lineWrap: boolean;
};

export type BodyBinaryInterface = {
  requestOrFolderMetaId?: string;
  file: string;
};

export type RequestTabInterface = {
  requestOrFolderMetaId?: string;
  activeMetaTab: TActiveTabType;
  requestBodyType: TRequestBodyType;
};

export interface FormDataPayloadInterface extends ParamHeaderPayloadInterface {
  type: "text" | "file";
}

export type TMetaShowColumnKey = "value" | "description";

export interface MetaShowColumnInterface {
  requestOrFolderMetaId: string;
  paramsValue: boolean;
  paramsDescription: boolean;
  headersValue: boolean;
  headersDescription: boolean;
  formDataValue: boolean;
  formDataDescription: boolean;
  xWWWFormUrlencodedValue: boolean;
  xWWWFormUrlencodedDescription: boolean;
}
