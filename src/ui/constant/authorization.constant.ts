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
