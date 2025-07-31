import type {
  ProjectSettingsInterface,
  SettingsInterface,
  SettingsTotalInterface,
  TKeyboardShortcutKey,
} from "@/types/setting.types";
import { createAsyncThunk } from "@reduxjs/toolkit";
import type { AppDispatch, RootState } from "@/context/redux/store";
import { handleLoadSettings, handleUpdateSettings } from "./setting-slice";
import {
  defaultZoomLevel,
  maxZoomLevel,
  minZoomLevel,
  stepAmountZoomLevel,
} from "@/constant/settings.constant";
import { calculateIntoFixedPoint } from "@/utils";

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
  Partial<SettingsInterface | ProjectSettingsInterface>,
  { dispatch: AppDispatch; state: RootState }
>(
  "request-response/updateSettings",
  async (payload, { dispatch, getState }) => {
    const response = await window.electronAPISettingsDB.updateSettings(payload);

    const projectId =
      payload.projectId ?? getState().requestResponse.activeProjectId;

    dispatch(
      handleUpdateSettings({
        type: projectId ? "project" : "global",
        payload,
      })
    );

    return response;
  }
);
export const updateSettingsZoomByKeyboard = createAsyncThunk<
  boolean,
  TKeyboardShortcutKey,
  { dispatch: AppDispatch; state: RootState }
>(
  "request-response/updateSettingsZoomByKeyboard",
  async (type, { dispatch, getState }) => {
    const state = getState() as RootState;

    const activeProjectId = state.requestResponse.activeProjectId ?? null;

    /* if activeProject have and not global or nor project isZoomable enabled or not any activeProject and nor global isZommable active then return not have to update  */
    if (
      (activeProjectId &&
        !state.setting.settings?.isZoomable &&
        !state.setting.globalSetting.isZoomable) ||
      (!activeProjectId && !state.setting.globalSetting.isZoomable)
    )
      return false;

    const oldZoomLevel =
      (state.setting.settings || state.setting.globalSetting).zoomLevel ?? 1;

    /* first updating level basded on keybord key then normalizing between min and max elvel */
    const newZoomLevel = Math.max(
      Math.min(
        type === "+"
          ? calculateIntoFixedPoint(oldZoomLevel + stepAmountZoomLevel, 1)
          : type === "-"
            ? calculateIntoFixedPoint(oldZoomLevel - stepAmountZoomLevel, 1)
            : defaultZoomLevel,
        maxZoomLevel
      ),
      minZoomLevel
    );

    if (oldZoomLevel === newZoomLevel) return false;

    const response = await window.electronAPISettingsDB.updateSettings({
      zoomLevel: newZoomLevel,
      projectId: activeProjectId,
    });

    dispatch(
      handleUpdateSettings({
        type: activeProjectId ? "project" : "global",
        payload: {
          zoomLevel: newZoomLevel,
        },
      })
    );

    return response;
  }
);
