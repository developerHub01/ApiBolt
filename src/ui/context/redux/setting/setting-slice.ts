import { createSlice, type PayloadAction } from "@reduxjs/toolkit";

interface SettingStateInterface {
  isSettingOpen: boolean;
}

// Define the initial state using that type
const initialState: SettingStateInterface = {
  isSettingOpen: false,
};

export const settingSlice = createSlice({
  name: "setting",
  // `createSlice` will infer the state type from the `initialState` argument
  initialState,
  reducers: {
    handleChangeIsSettingOpen: (
      state,
      action: PayloadAction<boolean | undefined>
    ) => {
      if (state.isSettingOpen === action.payload) return;

      state.isSettingOpen = action.payload ?? !state.isSettingOpen;
    },
  },
});

export const { handleChangeIsSettingOpen } = settingSlice.actions;

export default settingSlice.reducer;
