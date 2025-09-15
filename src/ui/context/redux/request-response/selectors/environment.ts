import { createSelector } from "@reduxjs/toolkit";
import type { RootState } from "@/context/redux/store";
import type { EnvironmentInterface } from "@/types/environment.types";


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
    const map = new Map<string, EnvironmentInterface>();

    Object.values(environmentsList).forEach((env) => {
      const existing = map.get(env.variable);
      if (
        env.variable &&
        (!existing || new Date(env.createdAt) > new Date(existing.createdAt))
      )
        map.set(env.variable, env);
    });

    return Array.from(map.values());
  }
);