import { createSelector } from "@reduxjs/toolkit";
import type { RootState } from "@/context/redux/store";
import type { EnvironmentInterface } from "@/types/environment.types";
import { removeDuplicateEnvs } from "@/utils/environments.utils";

export const selectEnvironmentsList = createSelector(
  [(state: RootState) => state.requestResponse.environmentsList],
  (environmentsList: Record<string, EnvironmentInterface>) => environmentsList
);

export const selectEnvironmentsVariableList = createSelector(
  [(state: RootState) => state.requestResponse.environmentsList],
  (
    environmentsList: Record<string, EnvironmentInterface>
  ): Array<EnvironmentInterface> => Object.values(environmentsList)
);

export const selectEnvironmentsVariableListUnique = createSelector(
  [(state: RootState) => state.requestResponse.environmentsList],
  (
    environmentsList: Record<string, EnvironmentInterface>
  ): Array<EnvironmentInterface> => {
    const map = removeDuplicateEnvs(environmentsList);
    return Array.from(map.values());
  }
);
