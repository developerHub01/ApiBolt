import { createSelector } from "@reduxjs/toolkit";
import type { RootState } from "@/context/redux/store";

export const selectIsLoadingInheritParentAuthorization = createSelector(
  [(state: RootState) => state.status.isLoadingInheritParentAuthorization],
  isLoading => isLoading,
);
