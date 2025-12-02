import { createSelector } from "@reduxjs/toolkit";
import type { RootState } from "@/context/redux/store";

export const selectHeaderIsOpen = createSelector(
  [(state: RootState) => state.header.isOpen],
  (isOpen) => isOpen
);

export const selectHeaderSearchTerm = createSelector(
  [(state: RootState) => state.header.searchTerm],
  (searchTerm) => searchTerm
);
