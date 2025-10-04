import { createAsyncThunk } from "@reduxjs/toolkit";
import type { AppDispatch, RootState } from "@/context/redux/store";
import {
  handleChangeActiveProject,
  handleChangeIsRequestListLoaded,
  handleLoadProjectsList,
} from "@/context/redux/request-response/request-response-slice";
import { loadTabsData } from "@/context/redux/request-response/thunks/tab-list";
import type { ProjectInterface } from "@/types/project.types";
import { DEFAULT_AUTHORIZATION_ID } from "@/constant/authorization.constant";
import { loadEnvironmentsList } from "@/context/redux/request-response/thunks/environment";
import { loadAuthorization } from "@/context/redux/request-response/thunks/auth";

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
>("request-response/changeActiveProject", async (id, { dispatch }) => {
  try {
    dispatch(handleChangeActiveProject(id));
    const response = await window.electronAPIProjectsDB.changeActiveProject(id);

    if (response) {
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
