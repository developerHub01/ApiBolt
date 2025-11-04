import { createSelector } from "@reduxjs/toolkit";
import type { RootState } from "@/context/redux/store";
import type {
  RequestListInterface,
  RequestListItemInterface,
  THTTPMethods,
} from "@/types/request-response.types";
import { getRequestNodeLevel } from "@/utils/request-response.utils";

export const selectIsRequestListCollapsed = createSelector(
  [(state: RootState) => state.requestResponse.requestListCollapsed],
  (requestListCollapsed): boolean => requestListCollapsed ?? false
);

export const selectRequestOrFolderList = createSelector(
  [(state: RootState) => state.requestResponse.requestList],
  (requestOrFolder): RequestListInterface => requestOrFolder
);

export const selectActiveRequestOrFolder = createSelector(
  [
    (state: RootState) =>
      state.requestResponse.requestList?.[
        state.requestResponse.selectedTab ?? ""
      ] ?? null,
  ],
  (requestOrFolder): RequestListItemInterface | null => requestOrFolder
);

export const selectRequestOrFolderById = (id: string) =>
  createSelector(
    [(state: RootState) => state.requestResponse.requestList[id]],
    (request): RequestListItemInterface => request
  );

export const selectRequestOrFolderLavelById = (id: string) =>
  createSelector(
    [(state: RootState) => state.requestResponse.requestList],
    (requestList): number =>
      getRequestNodeLevel({
        source: requestList,
        id,
      })
  );

export const selectIsHttpMethodType = createSelector(
  [
    (state: RootState) =>
      state.requestResponse.requestList[state.requestResponse.selectedTab!]
        ?.method ?? "get",
  ],
  (httpMethodType): THTTPMethods => httpMethodType
);

export const selectRequestName = createSelector(
  [
    (state: RootState) =>
      state.requestResponse.requestList[state.requestResponse.selectedTab!]
        ?.name ?? "Request",
  ],
  (name): string => name
);

export const selectIsRequestOrFolderExist = createSelector(
  [
    (state: RootState) => state.requestResponse.requestList,
    (_, id: string | undefined) => id,
  ],
  (requestList, id): boolean => Boolean(id ? requestList[id] : false)
);
