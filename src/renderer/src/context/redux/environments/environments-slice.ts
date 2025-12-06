import { createSlice, type PayloadAction } from "@reduxjs/toolkit";
import type { EnvironmentInterface } from "@shared/types/environment.types";

export interface RequestResponseState {
  environmentsList: Record<string, EnvironmentInterface>;
}

// Define the initial state using that type
const initialState: RequestResponseState = {
  environmentsList: {},
};

export const requesEnvironmentsSlice = createSlice({
  name: "environments",
  // `createSlice` will infer the state type from the `initialState` argument
  initialState,
  reducers: {
    /* =============== Environment reducers start ============= */
    handleLoadEnvironmentsList: (
      state,
      action: PayloadAction<Record<string, EnvironmentInterface>>,
    ) => {
      state.environmentsList = action.payload;
    },
    /* =============== Environment reducers end ============= */
  },
});

export const { handleLoadEnvironmentsList } = requesEnvironmentsSlice.actions;

export default requesEnvironmentsSlice.reducer;
