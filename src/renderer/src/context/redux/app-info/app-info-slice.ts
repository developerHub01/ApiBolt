import { createSlice, type PayloadAction } from "@reduxjs/toolkit";
import {
  DEFAULT_APP_NAME,
  DEFAULT_APP_VERSION,
} from "@shared/constant/api-bolt";
import { AppInfoInterface } from "@shared/types/app-info.types";

export interface AppInfoStateInterface {
  isOpen: boolean;
  info: AppInfoInterface;
}

// Define the initial state using that type
const initialState: AppInfoStateInterface = {
  isOpen: false,
  info: {
    name: DEFAULT_APP_NAME,
    version: DEFAULT_APP_VERSION,
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
    handleLoadAppInfo: (
      state,
      action: PayloadAction<Partial<AppInfoInterface>>,
    ) => {
      state.info = {
        ...state.info,
        ...action.payload,
      };
    },
  },
});

export const { handleChangeIsInfoOpen, handleLoadAppInfo } =
  appInfoSlice.actions;

export default appInfoSlice.reducer;
