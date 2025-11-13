import { createAsyncThunk } from "@reduxjs/toolkit";
import type { AppDispatch, RootState } from "@/context/redux/store";
import {
  handleLoadActiveThemeId,
  handleLoadThemeMetaList,
  handleUpdateActiveThemeId,
} from "@/context/redux/theme/theme-slice";
import type { ChangeActiveThemePayloadInterface } from "@/types/theme.types";

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
  void,
  void,
  {
    dispatch: AppDispatch;
    state: RootState;
  }
>("theme/applyThemeInApp", async () => {
  try {
    await window.electronAPI.applyTheme();
  } catch (error) {
    console.error(error);
  }
});
