import { SettingsRequestInterface } from "@shared/types/setting-request.types";

export const MAX_MAX_RESPONSE_SIZE = 250;
export const MIN_MAX_RESPONSE_SIZE = 1;
export const DEFAULT_MAX_RESPONSE_SIZE = 50;

export const MAX_REQUEST_TIMEOUT = 3_600_000;
export const MIN_REQUEST_TIMEOUT = 0;
export const DEFAULT_REQUEST_TIMEOUT = 0;

export const DEFAULT_SSL_VERIFICATION = 1;

export const DEFAULT_COOKIE_TRACKING = 1;

/* this is the real values not masked or cover like use -1 or "default" as but in UI show masked preapred value  */
export const DEFAULT_RAW_SETTINGS_REQUEST_VALUES: SettingsRequestInterface = {
  httpVersion: "default",
  requestTimeout: -1,
  maxResponseSize: -1,
  sslVerification: -1,
  cookieTracking: -1,
};

export const DEFAULT_SETTINGS_REQUEST: SettingsRequestInterface = {
  httpVersion: "default",
  requestTimeout: DEFAULT_REQUEST_TIMEOUT,
  maxResponseSize: DEFAULT_MAX_RESPONSE_SIZE,
  sslVerification: DEFAULT_SSL_VERIFICATION,
  cookieTracking: DEFAULT_COOKIE_TRACKING,
};
