import type {
  SettingsInterface,
  SettingsTotalInterface,
} from "@/types/setting.types";
import { createAsyncThunk } from "@reduxjs/toolkit";
import type { AppDispatch, RootState } from "@/context/redux/store";
import { handleLoadSettings, handleUpdateSettings } from "./setting-slice";

export const loadSettings = createAsyncThunk<
  SettingsTotalInterface,
  void,
  { dispatch: AppDispatch; state: RootState }
>("request-response/loadSettings", async (_, { dispatch }) => {
  const response = await window.electronAPISettingsDB.getSettings();

  dispatch(handleLoadSettings(response));

  return response;
});
export const updateSettings = createAsyncThunk<
  boolean,
  Partial<SettingsInterface>,
  { dispatch: AppDispatch; state: RootState }
>("request-response/updateSettings", async (payload, { dispatch }) => {
  const response = await window.electronAPISettingsDB.updateSettings(payload);

  dispatch(
    handleUpdateSettings({
      type: payload.projectId ? "project" : "global",
      payload,
    })
  );

  return response;
});
