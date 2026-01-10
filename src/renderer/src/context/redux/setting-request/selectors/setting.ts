import { createSelector } from "@reduxjs/toolkit";
import type { RootState } from "@/context/redux/store";

export const selectHttpVersionGlobal = createSelector(
  [(state: RootState) => state.settingRequest.globalSetting.httpVersion],
  httpVersion => httpVersion,
);

export const selectHttpVersionLocal = createSelector(
  [(state: RootState) => state.settingRequest.settings?.httpVersion],
  httpVersion => httpVersion ?? null,
);

export const selectRequestTimeoutGlobal = createSelector(
  [(state: RootState) => state.settingRequest.globalSetting.requestTimeout],
  requestTimeout => requestTimeout ?? null,
);

export const selectRequestTimeoutLocal = createSelector(
  [(state: RootState) => state.settingRequest.settings?.requestTimeout],
  requestTimeout => requestTimeout ?? null,
);

export const selectMaxResponseSizeGlobal = createSelector(
  [(state: RootState) => state.settingRequest.globalSetting.maxResponseSize],
  maxResponseSize => maxResponseSize ?? null,
);

export const selectMaxResponseSizeLocal = createSelector(
  [(state: RootState) => state.settingRequest.settings?.maxResponseSize],
  maxResponseSize => maxResponseSize ?? null,
);

export const selectSslVerificationGlobal = createSelector(
  [(state: RootState) => state.settingRequest.globalSetting.sslVerification],
  sslVerification => sslVerification ?? null,
);

export const selectSslVerificationLocal = createSelector(
  [(state: RootState) => state.settingRequest.settings?.sslVerification],
  sslVerification => sslVerification ?? null,
);

export const selectCookieTrackingGlobal = createSelector(
  [(state: RootState) => state.settingRequest.globalSetting.cookieTracking],
  cookieTracking => cookieTracking ?? null,
);

export const selectCookieTrackingLocal = createSelector(
  [(state: RootState) => state.settingRequest.settings?.cookieTracking],
  cookieTracking => cookieTracking ?? null,
);
