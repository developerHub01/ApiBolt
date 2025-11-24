import { createAsyncThunk } from "@reduxjs/toolkit";
import type { AppDispatch, RootState } from "@/context/redux/store";
import { handleChangeIsRequestListLoaded } from "@/context/redux/request-response/request-response-slice";
import { loadTabsData } from "@/context/redux/request-response/thunks/tab-list";
import type { ProjectInterface } from "@/types/project.types";
import { DEFAULT_AUTHORIZATION_ID } from "@/constant/authorization.constant";
import { loadEnvironmentsList } from "@/context/redux/environments/thunks/environments";
import { loadAuthorization } from "@/context/redux/request-response/thunks/auth";
import {
  handleChangeActiveProject,
  handleLoadProjectsList,
} from "@/context/redux/project/project-slice";
import { loadKeyboardShortcuts } from "@/context/redux/keyboard-shortcuts/thunks/keyboard-shortcuts";
import { applyThemeInApp } from "@/context/redux/theme/thunks/theme";

/* ==============================
========== Projects start =========
================================= */
export const loadProjectList = createAsyncThunk<
  {
    activeProject: string | null;
    projectList: Array<ProjectInterface>;
  } | void,
  void,
  {
    dispatch: AppDispatch;
    state: RootState;
  }
>("request-response/loadProjectList", async (_, { dispatch }) => {
  try {
    const list = await window.electronAPIProjectsDB.getProjects();
    const activeProject = await window.electronAPIProjectsDB.getActiveProject();

    dispatch(handleLoadProjectsList(list));
    dispatch(handleChangeActiveProject(activeProject));

    return {
      activeProject,
      projectList: list,
    };
  } catch (error) {
    console.error(error);
  }
});

export const changeActiveProject = createAsyncThunk<
  boolean,
  string,
  {
    dispatch: AppDispatch;
    state: RootState;
  }
>(
  "request-response/changeActiveProject",
  async (id, { dispatch, getState }) => {
    try {
      const state = getState() as RootState;
      const activeProjectId = state.project.activeProjectId;
      const newActiveProjectId = activeProjectId === id ? null : id;

      dispatch(handleChangeActiveProject(newActiveProjectId));
      const response =
        await window.electronAPIProjectsDB.changeActiveProject(
          newActiveProjectId
        );

      if (!response) return response;

      dispatch(handleChangeIsRequestListLoaded(false));
      await Promise.all([
        dispatch(applyThemeInApp()),
        dispatch(loadEnvironmentsList()),
        dispatch(loadTabsData()),
        dispatch(loadEnvironmentsList()),
        dispatch(
          loadAuthorization({
            requestOrFolderId: DEFAULT_AUTHORIZATION_ID,
          })
        ),
        dispatch(loadKeyboardShortcuts()),
      ]);

      return response;
    } catch (error) {
      console.error(error);
      return false;
    }
  }
);

export const createProject = createAsyncThunk<
  boolean,
  string,
  {
    dispatch: AppDispatch;
    state: RootState;
  }
>("request-response/changeActiveProject", async (name, { dispatch }) => {
  try {
    const response = await window.electronAPIProjectsDB.createProjects({
      name,
    });

    if (response) dispatch(loadProjectList());
    return response;
  } catch (error) {
    console.error(error);
    return false;
  }
});

export const deleteProject = createAsyncThunk<
  boolean,
  string,
  {
    dispatch: AppDispatch;
    state: RootState;
  }
>("request-response/deleteProject", async (id, { dispatch }) => {
  try {
    const response = await window.electronAPIProjectsDB.deleteProjects(id);

    // update the project list after deletion
    if (response) {
      dispatch(loadProjectList());
      dispatch(handleChangeActiveProject(null));
      dispatch(handleChangeIsRequestListLoaded(false));
      dispatch(loadTabsData());
      dispatch(loadEnvironmentsList());
      dispatch(
        loadAuthorization({
          requestOrFolderId: DEFAULT_AUTHORIZATION_ID,
        })
      );
    }
    return response;
  } catch (error) {
    console.error(error);
    return false;
  }
});

export const updateProject = createAsyncThunk<
  boolean,
  {
    id: string;
    name: string;
  },
  {
    dispatch: AppDispatch;
    state: RootState;
  }
>("request-response/updateProject", async ({ id, name }, { dispatch }) => {
  try {
    const response = await window.electronAPIProjectsDB.updateProjects(id, {
      name,
    });

    // update the project list after deletion
    if (response) dispatch(loadProjectList());

    return response;
  } catch (error) {
    console.error(error);
    return false;
  }
});
/* ==============================
========== Projects end =========
================================= */
