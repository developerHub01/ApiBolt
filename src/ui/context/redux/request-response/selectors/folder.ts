import { createSelector } from "@reduxjs/toolkit";
import type { RootState } from "@/context/redux/store";
import type { TRequestFolderDescriptionTab } from "@/types/request-response.types";

export const selectRequestFolderTitle = createSelector(
  [
    (state: RootState) =>
      state.requestResponse.folderTitle[
        state.requestResponse.selectedTab! ?? ""
      ],
  ],
  (folderTitle): string | undefined => folderTitle
);

export const selectRequestFolderDescription = createSelector(
  [
    (state: RootState) =>
      state.requestResponse.folderDescription[
        state.requestResponse.selectedTab! ?? ""
      ],
  ],
  (folderDescription): string | undefined => folderDescription
);

export const selectRequestFolderDescriptionActiveTab = createSelector(
  [
    (state: RootState) =>
      state.requestResponse.folderDescriptionActiveTab[
        state.requestResponse.selectedTab! ?? ""
      ] ?? "markdown",
  ],
  (folderDescriptionActiveTab): TRequestFolderDescriptionTab =>
    folderDescriptionActiveTab
);

export const selectIsFolderLoading = createSelector(
  [
    (state: RootState) =>
      state.requestResponse.isLoadingFolder[
        state.requestResponse.selectedTab! ?? ""
      ] ?? "markdown",
  ],
  (folderDescriptionActiveTab): boolean => folderDescriptionActiveTab
);

export const selectIsFolderDescriptionLineWrap = createSelector(
  [
    (state: RootState) =>
      state.requestResponse.folderDescriptionLineWrap[
        state.requestResponse.selectedTab! ?? ""
      ] ?? "markdown",
  ],
  (folderDescriptionActiveTab): boolean => folderDescriptionActiveTab
);
