import type { ProjectInterface } from "@shared/types/project.types";
import { createSlice, type PayloadAction } from "@reduxjs/toolkit";

export interface RequestResponseState {
  projectList: Array<ProjectInterface>;
  activeProjectId: string | null;
}

// Define the initial state using that type
const initialState: RequestResponseState = {
  projectList: [],
  activeProjectId: null
};

export const projectSlice = createSlice({
  name: "project",
  initialState,
  reducers: {
    /* =============== Project reducers start ============= */
    handleLoadProjectsList: (
      state,
      action: PayloadAction<Array<ProjectInterface>>
    ) => {
      state.projectList = action.payload;
    },
    handleChangeActiveProject: (
      state,
      action: PayloadAction<string | null>
    ) => {
      if (state.activeProjectId === action.payload) return;
      state.activeProjectId = action.payload;
    }
    /* =============== Project reducers end ============= */
  }
});

export const { handleLoadProjectsList, handleChangeActiveProject } =
  projectSlice.actions;

export default projectSlice.reducer;
