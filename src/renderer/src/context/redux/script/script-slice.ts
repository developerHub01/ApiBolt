import { createSlice, type PayloadAction } from "@reduxjs/toolkit";

export interface scriptInterface {
  script: Record<string, string>;
}

// Define the initial state using that type
const initialState: scriptInterface = {
  script: {},
};

export const scriptSlice = createSlice({
  name: "script",
  // `createSlice` will infer the state type from the `initialState` argument
  initialState,
  reducers: {
    handleUpdateScript: (
      state,
      action: PayloadAction<{
        id: string;
        script: string;
      }>,
    ) => {
      const script = action.payload.script ?? undefined;
      state.script[action.payload.id] = script;
    },
  },
});

export const { handleUpdateScript } = scriptSlice.actions;

export default scriptSlice.reducer;
