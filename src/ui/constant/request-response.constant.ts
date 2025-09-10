import type {
  APIKeyInterface,
  BasicAuthInterface,
  EnvironmentInterface,
  JWTBearerAuthInterface,
  TMetaTableType,
} from "@/types/request-response.types";
import { v4 as uuidv4 } from "uuid";

export const REQUEST_ITEM_SPACE_SIZE = 32;

export const generateNewMetaDataItem = (type?: TMetaTableType) => ({
  id: uuidv4(),
  key: "",
  value: "",
  contentType: type !== "form-data" ? undefined : "",
  description: "",
});

export const getCookiesByDomain = async (url: string) => {
  return await window.electronAPI.getCookieByDomain(url);
};

export const getCookiesStringByDomain = async (url: string) => {
  return await window.electronAPI.getCookieStringByDomain(url);
};

export const AuthTypeList = [
  "no-auth",
  "basic-auth",
  "bearer-token",
  "jwt-bearer",
  "api-key",
];

export const localStorageRequestActiveTabKey = (requestId: string) =>
  `request-active-tab-${requestId}`;

export const ResponsePanelMinLimit = 15;

export const defaultRequestResponseSize = {
  header: 0,
  body: 0,
};

export const defaultEnvironment = (
  id: string,
  projectId: string
): Omit<EnvironmentInterface, "createdAt"> => ({
  id,
  type: "default",
  variable: "",
  value: "",
  isCheck: true,
  projectId,
});

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

export const defaultFolderTitle: string = "New Folder";
export const defaultFolderDescription: string = `# Heading one`;

export const initialHiddenCookie = () => ({
  id: uuidv4(),
  key: "Cookie",
  value: "",
  description: "",
  prevent: true,
  calculateDynamicly: true,
});
export const initialHiddenHeaderData = () => [
  {
    id: "userAgent",
    key: "User-Agent",
    value: "",
    prevent: true,
    isCheck: true,
    calculateDynamicly: true,
  },
  {
    id: "contentLength",
    key: "Content-Length",
    value: `${import.meta.env.VITE_APP_NAME}/${import.meta.env.VITE_APP_VERSION}`,
    prevent: true,
    isCheck: true,
  },
  {
    id: "accept",
    key: "Accept",
    value: "*/*",
    prevent: true,
    isCheck: true,
  },
  {
    id: "acceptEncoding",
    key: "Accept-Encoding",
    value: "gzip, deflate, br",
    prevent: true,
    isCheck: true,
  },
  {
    id: "connection",
    key: "Connection",
    value: "keep-alive",
    prevent: true,
    isCheck: true,
  },
];
