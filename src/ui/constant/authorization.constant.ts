import type {
  APIKeyInterface,
  BasicAuthInterface,
  JWTBearerAuthInterface,
  TAuthContextType,
} from "@/types/authorization.types";

export const DEFAULT_AUTHORIZATION_ID: TAuthContextType = "global";

export const DEFAULT_API_KEY: APIKeyInterface = {
  key: "",
  value: "",
  addTo: "header",
};

export const DEFAULT_BASIC_AUTH: BasicAuthInterface = {
  username: "",
  password: "",
};

export const DEFAULT_JWT_BEARER_AUTH: JWTBearerAuthInterface = {
  algo: "HS256",
  secret: "",
  payload: JSON.stringify({}),
  headerPrefix: "Bearer",
  addTo: "header",
};

export const AUTH_DEFAULT_HEADER_PREFIX = "Bearer";

export const AUTH_TYPE_LIST = [
  "no-auth",
  "basic-auth",
  "bearer-token",
  "jwt-bearer",
  "api-key",
];

export const AUTHORIZATION_DATA_ID = "authorization";
export const AUTHORIZATION_AUTH_HEADER_KEY = "Authorization";
export const INITIAL_HIDDEN_HEADER_AUTHORIZATION_DATA = {
  id: AUTHORIZATION_DATA_ID,
  key: "",
  value: "",
  prevent: true,
  isCheck: true,
};
