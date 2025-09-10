import { createAsyncThunk } from "@reduxjs/toolkit";
import type { AppDispatch, RootState } from "@/context/redux/store";
import {
  handleChangeActiveProject,
  handleChangeIsRequestListLoaded,
  handleLoadProjectsList,
} from "@/context/redux/request-response/request-response-slice";
import type { ProjectInterface } from "@/types/request-response.types";

/* ==============================
========== Projects start =========
================================= */
export const loadProjectList = createAsyncThunk<
  {
    activeProject: string | null;
    projectList: Array<ProjectInterface>;
  },
  void,
  {
    dispatch: AppDispatch;
    state: RootState;
  }
>("request-response/loadProjectList", async (_, { dispatch }) => {
  const list = await window.electronAPIProjectsDB.getProjects();
  const activeProject = await window.electronAPIProjectsDB.getActiveProject();

  dispatch(handleLoadProjectsList(list));
  dispatch(handleChangeActiveProject(activeProject));

  return {
    activeProject,
    projectList: list,
  };
});

export const changeActiveProject = createAsyncThunk<
  boolean,
  string,
  {
    dispatch: AppDispatch;
    state: RootState;
  }
>("request-response/changeActiveProject", async (id, { dispatch }) => {
  dispatch(handleChangeActiveProject(id));
  const response = await window.electronAPIProjectsDB.changeActiveProject(id);

  if (response) dispatch(handleChangeIsRequestListLoaded(false));

  return response;
});

export const createProject = createAsyncThunk<
  boolean,
  string,
  {
    dispatch: AppDispatch;
    state: RootState;
  }
>("request-response/changeActiveProject", async (name, { dispatch }) => {
  const response = await window.electronAPIProjectsDB.createProjects({
    name,
  });

  if (response) dispatch(loadProjectList());

  return response;
});

export const deleteProject = createAsyncThunk<
  boolean,
  string,
  {
    dispatch: AppDispatch;
    state: RootState;
  }
>("request-response/deleteProject", async (id, { dispatch }) => {
  const response = await window.electronAPIProjectsDB.deleteProjects(id);

  // update the project list after deletion
  if (response) {
    dispatch(loadProjectList());
    dispatch(handleChangeActiveProject(null));
    dispatch(handleChangeIsRequestListLoaded(false));
  }

  return response;
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
  const response = await window.electronAPIProjectsDB.updateProjects(id, {
    name,
  });

  // update the project list after deletion
  if (response) {
    dispatch(loadProjectList());
  }

  return response;
});
/* ==============================
========== Projects end =========
================================= */
