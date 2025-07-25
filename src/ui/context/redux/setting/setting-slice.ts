import { defaultSettings } from "@/constant/settings.constant";
import type {
  SettingsInterface,
  SettingsTotalInterface,
} from "@/types/setting.types";
import { createSlice, type PayloadAction } from "@reduxjs/toolkit";

interface SettingStateInterface {
  isSettingOpen: boolean;
  globalSetting: SettingsInterface;
  settings: Partial<SettingsInterface> | null;
}

// Define the initial state using that type
const initialState: SettingStateInterface = {
  isSettingOpen: false,
  globalSetting: defaultSettings,
  settings: null,
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
    handleLoadSettings: (
      state,
      action: PayloadAction<SettingsTotalInterface>
    ) => {
      const { settings, globalSetting } = action.payload;

      state.globalSetting = globalSetting;
      state.settings = settings;
    },
    handleUpdateSettings: (
      state,
      action: PayloadAction<{
        payload: Partial<SettingsInterface>;
        type: "global" | "project";
      }>
    ) => {
      const { payload, type } = action.payload;

      if (type === "global")
        state.globalSetting = {
          ...state.globalSetting,
          ...payload,
        };
      else
        state.settings = {
          ...(state.settings ?? {}),
          ...payload,
        };
    },
  },
});

export const {
  handleChangeIsSettingOpen,
  handleLoadSettings,
  handleUpdateSettings,
} = settingSlice.actions;

export default settingSlice.reducer;
