import type { SettingsInterface } from "@shared/types/setting.types";
import { createSlice, type PayloadAction } from "@reduxjs/toolkit";
import { DEFAULT_RAW_SETTINGS_REQUEST_VALUES } from "@/constant/settings-request.constant";
import {
  ProjectSettingsRequestInterface,
  SettingsRequestInterface,
  SettingsRequestTotalInterface,
} from "@shared/types/setting-request.types";

export interface SettingRequestStateInterface {
  globalSetting: SettingsRequestInterface;
  settings: ProjectSettingsRequestInterface | null;
}

// Define the initial state using that type
const initialState: SettingRequestStateInterface = {
  globalSetting: DEFAULT_RAW_SETTINGS_REQUEST_VALUES,
  settings: null,
};

export const settingRequestSlice = createSlice({
  name: "setting-request",
  // `createSlice` will infer the state type from the `initialState` argument
  initialState,
  reducers: {
    handleLoadSettingsRequest: (
      state,
      action: PayloadAction<SettingsRequestTotalInterface>,
    ) => {
      const { settings, globalSetting } = action.payload;

      state.globalSetting = globalSetting;
      state.settings = settings;
    },
    handleUpdateSettingsRequest: (
      state,
      action: PayloadAction<{
        payload: Partial<SettingsRequestInterface>;
        type: "global" | "project";
      }>,
    ) => {
      const { payload, type } = action.payload;

      if (type === "global")
        state.globalSetting = {
          ...state.globalSetting,
          ...(payload as SettingsRequestInterface),
        };
      else
        state.settings = {
          ...(state.settings ?? {}),
          ...payload,
        };
    },
  },
});

export const { handleLoadSettingsRequest, handleUpdateSettingsRequest } =
  settingRequestSlice.actions;

export default settingRequestSlice.reducer;
