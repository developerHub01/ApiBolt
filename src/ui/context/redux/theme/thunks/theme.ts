import { createAsyncThunk } from "@reduxjs/toolkit";
import type { AppDispatch, RootState } from "@/context/redux/store";
import {
  handleLoadActiveThemeId,
  handleLoadThemeMetaList,
  handleReplaceThemePalette,
  handleUpdateActiveThemeId,
} from "@/context/redux/theme/theme-slice";
import type {
  ChangeActiveThemePayloadInterface,
  ThemeColorId,
} from "@/types/theme.types";
import { isValidColor } from "@/utils/color.utils";
import Color from "color";
import { DEFAULT_THEME_PALETTE } from "@/constant/theme.constant";

export const loadThemeMetaList = createAsyncThunk<
  void,
  void,
  {
    dispatch: AppDispatch;
    state: RootState;
  }
>("theme/loadThemeMetaList", async (_, { dispatch }) => {
  try {
    const response = await window.electronAPITheme.getThemeListMeta();
    if (response) dispatch(handleLoadThemeMetaList(response));
  } catch (error) {
    console.error(error);
  }
});

export const loadThemePalette = createAsyncThunk<
  boolean,
  void | { once?: boolean; themeId?: string },
  {
    dispatch: AppDispatch;
    state: RootState;
  }
>("theme/loadThemePalette", async (payload, { dispatch, getState }) => {
  try {
    const once = payload?.once ?? false;
    const themeId = payload?.themeId ?? null;
    const state = getState() as RootState;
    if (state.theme.palette && once) return true;

    let replacePayload: Record<ThemeColorId, string> | null = null;

    if (themeId) {
      replacePayload =
        await window.electronAPITheme.getThemePaletteById(themeId);
    } else {
      const response =
        await window.electronAPIActiveTheme.getActiveThemePalette();
      if (response)
        replacePayload = {
          ...response.global,
          ...(response.local ?? {}),
        };
    }

    if (!replacePayload) {
      if (!state.theme.palette)
        dispatch(handleReplaceThemePalette(DEFAULT_THEME_PALETTE));
      return false;
    }

    dispatch(handleReplaceThemePalette(replacePayload));
    return true;
  } catch (error) {
    console.error(error);
    return false;
  }
});

export const loadActiveThemeId = createAsyncThunk<
  void,
  void,
  {
    dispatch: AppDispatch;
    state: RootState;
  }
>("theme/loadActiveThemeId", async (_, { dispatch }) => {
  try {
    const response = await window.electronAPIActiveTheme.getActiveThemeId();
    if (response) dispatch(handleLoadActiveThemeId(response));
  } catch (error) {
    console.error(error);
  }
});

export const changeActiveThemeId = createAsyncThunk<
  void,
  ChangeActiveThemePayloadInterface,
  {
    dispatch: AppDispatch;
    state: RootState;
  }
>("theme/changeActiveThemeId", async (payload, { dispatch }) => {
  try {
    const response =
      await window.electronAPIActiveTheme.changeActiveTheme(payload);
    if (!response) return;

    dispatch(
      handleUpdateActiveThemeId({
        [payload.projectId ? "local" : "global"]: payload.activeTheme,
      })
    );

    await dispatch(applyThemeInApp());
  } catch (error) {
    console.error(error);
  }
});

export const applyThemeInApp = createAsyncThunk<
  {
    success: boolean;
    message: string;
  },
  void,
  {
    dispatch: AppDispatch;
    state: RootState;
  }
>("theme/applyThemeInApp", async () => {
  try {
    await window.electronAPI.applyTheme();

    return {
      success: true,
      message: "Restored applying theme.",
    };
  } catch (error) {
    console.error(error);
    return {
      success: false,
      message: "Something went wrong.",
    };
  }
});

export const saveThemePalette = createAsyncThunk<
  boolean,
  void,
  {
    dispatch: AppDispatch;
    state: RootState;
  }
>("theme/saveThemePalette", async (_, { getState }) => {
  try {
    const state = getState() as RootState;
    const palette = state.theme.palette;
    if (!palette) return false;

    return await window.electronAPITheme.saveThemePalette(palette);
  } catch (error) {
    console.error(error);
    return false;
  }
});

export const pasteThemePalette = createAsyncThunk<
  {
    success: boolean;
    message?: string;
  },
  void,
  {
    dispatch: AppDispatch;
    state: RootState;
  }
>("theme/pasteThemePalette", async (_, { dispatch, getState }) => {
  try {
    const payloadString = await window.navigator.clipboard.readText();
    const payload = JSON.parse(payloadString);

    if (Object.values(payload).some((item) => !isValidColor(item as string))) {
      return {
        success: false,
        message: "Not valid color in theme",
      };
    }

    const state = getState() as RootState;
    const palette = state.theme.palette ?? DEFAULT_THEME_PALETTE;

    const expectedKeyList = Object.keys(palette) as Array<ThemeColorId>;
    if (expectedKeyList.some((item) => !payload[item])) {
      return {
        success: false,
        message: "Some color are missings",
      };
    }

    const updatePayload = structuredClone(palette);
    expectedKeyList.forEach((item) => {
      const color = Color(payload[item]).hexa();
      updatePayload[item] = color;
    });

    dispatch(handleReplaceThemePalette(updatePayload));
    return {
      success: true,
      message: "Theme palette pasted successfully.",
    };
  } catch (error) {
    console.error(error);
    return {
      success: false,
      message: "Not valid palette.",
    };
  }
});

export const applyTestTheme = createAsyncThunk<
  {
    success: boolean;
    message: string;
  },
  void,
  {
    dispatch: AppDispatch;
    state: RootState;
  }
>("theme/applyTestTheme", async (_, { getState }) => {
  try {
    const state = getState() as RootState;
    const palette = state.theme.palette ?? DEFAULT_THEME_PALETTE;

    await window.electronAPI.applyTestTheme(palette);

    return {
      success: true,
      message: "Theme palette applied.",
    };
  } catch (error) {
    console.error(error);
    return {
      success: false,
      message: "Not valid palette.",
    };
  }
});
