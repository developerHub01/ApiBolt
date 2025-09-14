import type {
  APIKeyInterface,
  BasicAuthInterface,
  JWTBearerAuthInterface,
} from "@/types/authorization.types";

export const defaultAuthorizationId = "local";

export const defaultApiKey: APIKeyInterface = {
  key: "",
  value: "",
  addTo: "header",
};

export const defaultBasicAuth: BasicAuthInterface = {
  username: "",
  password: "",
};
export const defaultJWTBearerAuth: JWTBearerAuthInterface = {
  algo: "HS256",
  secret: "",
  payload: JSON.stringify({}),
  headerPrefix: "Bearer",
  addTo: "header",
};
