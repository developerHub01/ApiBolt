export type TAuthContextType = "global" | "local";

export type TAuthType =
  | "inherit-parent"
  | "no-auth"
  | "basic-auth"
  | "bearer-token"
  | "jwt-bearer"
  | "api-key";

export type TAuthAddTo = "header" | "query";

export interface AuthorizationPayloadInterface {
  id: string;
  type: TAuthType;
  projectId: string;
  requestOrFolderMetaId?: string;
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
  basicAuthToken: string;
  jwtAuthToken: string;
}

export type AuthorizationUpdatedPayloadInterface = Pick<
  AuthorizationPayloadInterface,
  "basicAuthToken" | "jwtAuthToken"
>;

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
