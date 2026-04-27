import { createSlice, type PayloadAction } from "@reduxjs/toolkit";
import { AppInfoInterface } from "@shared/types/app-info.types";

export interface AppInfoStateInterface {
  isOpen: boolean;
  info: AppInfoInterface;
}

// Define the initial state using that type
const initialState: AppInfoStateInterface = {
  isOpen: false,
  info: {
    name: "",
    version: "",
    description: "",
    tagline: "",
    website: "",
    docs: "",
    developerName: "",
    developer: "",
    developerGithub: "",
    githubRepo: "",
    supportEmail: "",
  },
};

const appInfoSlice = createSlice({
  name: "app-info",
  // `createSlice` will infer the state type from the `initialState` argument
  initialState,
  reducers: {
    handleChangeIsInfoOpen: (
      state,
      action: PayloadAction<boolean | undefined>,
    ) => {
      if (state.isOpen === action.payload) return;
      state.isOpen = action.payload ?? !state.isOpen;
    },
    handleLoadAppInfo: (state, action: PayloadAction<AppInfoInterface>) => {
      state.info = structuredClone(action.payload);
    },
  },
});

export const { handleChangeIsInfoOpen, handleLoadAppInfo } =
  appInfoSlice.actions;

export default appInfoSlice.reducer;
