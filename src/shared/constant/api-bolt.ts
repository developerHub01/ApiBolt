export const DEFAULT_APP_NAME = "APIBolt";
export const DEFAULT_APP_VERSION = "1.0.0";

const WEBSITE_ORIGIN_DEV = "http://localhost:3000";
const WEBSITE_ORIGIN_PROD = "https://apibolt.vercel.app";

export const WEBSITE_BASE_URL = import.meta.env.DEV
  ? WEBSITE_ORIGIN_DEV
  : WEBSITE_ORIGIN_PROD;

export const SERVER_API_BASE_URL = `${WEBSITE_BASE_URL}/api/v1/client`;
export const FAKE_API_DOCS_URL = `${WEBSITE_BASE_URL}/fake`;
export const WEBSITE_DOCS = `${WEBSITE_BASE_URL}/docs`;
export const MARKETPLACE_URL = `${WEBSITE_BASE_URL}/marketplace`;
