import { createSlice } from "@reduxjs/toolkit";

// interface SettingState {}

// Define the initial state using that type
const initialState = {};

export const settingSlice = createSlice({
  name: "setting",
  // `createSlice` will infer the state type from the `initialState` argument
  initialState,
  reducers: {},
});

// export const {} = settingSlice.actions;

export default settingSlice.reducer;
