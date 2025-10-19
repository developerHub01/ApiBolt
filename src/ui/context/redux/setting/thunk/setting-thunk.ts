import type {
  ProjectSettingsInterface,
  SettingsInterface,
  TKeyboardShortcutKey,
  UpdateBackgroundImagePayloadInterface,
} from "@/types/setting.types";
import { createAsyncThunk } from "@reduxjs/toolkit";
import type { AppDispatch, RootState } from "@/context/redux/store";
import {
  handleLoadSettings,
  handleUpdateSettings,
} from "@/context/redux/setting/setting-slice";
import {
  DEFAULT_SETTINGS,
  DEFAULT_ZOOM_LEVEL,
  MAX_ZOOM_LEVEL,
  MIN_ZOOM_LEVEL,
  STEP_AMOUNT_ZOOM_LEVEL,
} from "@/constant/settings.constant";
import { calculateIntoFixedPoint } from "@/utils";
import { checkApplyingZoomable } from "@/utils/settings.utils";

export const loadSettings = createAsyncThunk<
  void,
  void,
  {
    dispatch: AppDispatch;
    state: RootState;
  }
>("setting/loadSettings", async (_, { dispatch }) => {
  try {
    const response = await window.electronAPISettingsDB.getSettings();

    dispatch(handleLoadSettings(response));
  } catch (error) {
    console.error(error);
  }
});

export const updateSettings = createAsyncThunk<
  boolean,
  Partial<SettingsInterface | ProjectSettingsInterface>,
  {
    dispatch: AppDispatch;
    state: RootState;
  }
>("setting/updateSettings", async (payload, { dispatch }) => {
  try {
    const response = await window.electronAPISettingsDB.updateSettings(payload);

    dispatch(
      handleUpdateSettings({
        type: payload.projectId ? "project" : "global",
        payload,
      })
    );

    return response;
  } catch (error) {
    console.error(error);
    return false;
  }
});

export const updateSettingsZoomByKeyboard = createAsyncThunk<
  boolean,
  TKeyboardShortcutKey,
  {
    dispatch: AppDispatch;
    state: RootState;
  }
>(
  "setting/updateSettingsZoomByKeyboard",
  async (type, { dispatch, getState }) => {
    try {
      const state = getState() as RootState;

      const activeProjectId = state.requestResponse.activeProjectId ?? null;

      /* first checking do we can zoom? based on the local(project based), global, default */
      const isZoomable = checkApplyingZoomable({
        activeProjectId,
        isZoomableLocal: state.setting.settings?.isZoomable,
        isZoomableGlobal: state.setting.globalSetting?.isZoomable,
        defaultZoomable: DEFAULT_SETTINGS.isZoomable,
      });

      if (!isZoomable) return false;

      const oldZoomLevel =
        (state.setting.settings || state.setting.globalSetting).zoomLevel ?? 1;

      /* first updating level basded on keybord key then normalizing between min and max elvel */
      const newZoomLevel = Math.max(
        Math.min(
          type === "+"
            ? calculateIntoFixedPoint(oldZoomLevel + STEP_AMOUNT_ZOOM_LEVEL, 1)
            : type === "-"
              ? calculateIntoFixedPoint(
                  oldZoomLevel - STEP_AMOUNT_ZOOM_LEVEL,
                  1
                )
              : DEFAULT_ZOOM_LEVEL,
          MAX_ZOOM_LEVEL
        ),
        MIN_ZOOM_LEVEL
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
    } catch (error) {
      console.error(error);
      return false;
    }
  }
);

export const updateSettingsBackgroundImages = createAsyncThunk<
  boolean,
  Pick<UpdateBackgroundImagePayloadInterface, "method"> & {
    type: "project" | "global";
  },
  {
    dispatch: AppDispatch;
    state: RootState;
  }
>(
  "setting/updateSettingsBackgroundImages",
  async ({ type, method }, { dispatch, getState }) => {
    try {
      const state = getState() as RootState;

      const activeProjectId = state.requestResponse.activeProjectId ?? null;

      const response =
        await window.electronAPISettingsDB.updateSettingsBackgroundImages({
          projectId: type === "global" ? null : activeProjectId,
          method,
        });

      if (response) await dispatch(loadSettings());

      return response;
    } catch (error) {
      console.error(error);
      return false;
    }
  }
);
