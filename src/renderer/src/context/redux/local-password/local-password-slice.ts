import { createSlice, type PayloadAction } from "@reduxjs/toolkit";

export interface LocalPasswordInterface {
  isLocalPasswordOpen: boolean;
  haveLocalPassword: boolean;
}

// Define the initial state using that type
const initialState: LocalPasswordInterface = {
  isLocalPasswordOpen: false,
  haveLocalPassword: false,
};

export const localPasswordSlice = createSlice({
  name: "local-password",
  initialState,
  reducers: {
    handleChangeIsLocalPasswordOpen: (
      state,
      action: PayloadAction<boolean | undefined>,
    ) => {
      if (state.isLocalPasswordOpen === action.payload) return;
      state.isLocalPasswordOpen = action.payload ?? !state.isLocalPasswordOpen;
    },
    handleChangeHaveLocalPassword: (
      state,
      action: PayloadAction<boolean | undefined>,
    ) => {
      if (state.haveLocalPassword === action.payload) return;
      state.haveLocalPassword = action.payload ?? !state.haveLocalPassword;
    },
  },
});

export const {
  handleChangeIsLocalPasswordOpen,
  handleChangeHaveLocalPassword,
} = localPasswordSlice.actions;

export default localPasswordSlice.reducer;
