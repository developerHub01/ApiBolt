import { createSelector } from "@reduxjs/toolkit";
import type { RootState } from "@/context/redux/store";
import type { ProjectInterface } from "@/types/project.types";

export const selectActiveProjectId = createSelector(
  [(state: RootState) => state.requestResponse.activeProjectId],
  (activeProjectId): string | null => (activeProjectId ? activeProjectId : null)
);

export const selectProjectList = createSelector(
  [(state: RootState) => state.requestResponse.projectList],
  (projectList): Array<ProjectInterface> => projectList ?? []
);

export const selectActiveProject = createSelector(
  [selectActiveProjectId, selectProjectList],
  (activeProjectId, projectList): ProjectInterface | null => {
    if (!activeProjectId) return null;

    return (
      projectList.find((project) => project.id === activeProjectId) ?? null
    );
  }
);

export const selectActiveProjectName = createSelector(
  [selectActiveProjectId, selectProjectList],
  (projectId, projectList): string =>
    projectList.find((project) => project.id === projectId)?.name ?? ""
);

export const selectProjectById = (id?: string | null) =>
  createSelector(selectProjectList, (projectList): ProjectInterface | null => {
    if (!id) return null;

    return projectList.find((project) => project.id === id) ?? null;
  });
