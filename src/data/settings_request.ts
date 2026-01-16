import { SettingsRequestInterface } from "@shared/types/setting-request.types";

export const defaultSettingsRequest: SettingsRequestInterface = {
  /* default == "default" | global == null */
  httpVersion: "default",
  requestTimeout: -1,
  maxResponseSize: -1,
  sslVerification: -1,
  cookieTracking: -1,
};
