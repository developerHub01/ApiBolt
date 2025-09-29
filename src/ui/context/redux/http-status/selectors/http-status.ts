import type { RootState } from "@/context/redux/store";
import { createSelector } from "@reduxjs/toolkit";

export const selectHttpStatusList = createSelector(
  (state: RootState) => state.httpStatus.httpStatus,
  (httpStatus) => httpStatus
);

export const selectHttpStatusCodeList = createSelector(
  (state: RootState) => state.httpStatus.httpStatus,
  (httpStatus) => Object.keys(httpStatus)
);

export const selectSelectedSettingHttpStatusCode = createSelector(
  (state: RootState) => state.httpStatus.selectedSettingHttpStatusCode,
  (selectedSettingHttpStatusCode) => selectedSettingHttpStatusCode
);

export const selectHttpStatusCodeDetails = (code: string) =>
  createSelector(
    (state: RootState) => state.httpStatus.httpStatus[code],
    (httpStatusDetails) => httpStatusDetails
  );
