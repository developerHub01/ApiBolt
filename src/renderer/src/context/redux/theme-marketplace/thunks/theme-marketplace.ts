import { createAsyncThunk } from "@reduxjs/toolkit";
import type { AppDispatch, RootState } from "@/context/redux/store";
import { axiosServerClient } from "@/lib/utils";
import { ThemeInterface, ThemeMetaInterface } from "@shared/types/theme.types";
import {
  handleChangeIsInstallMaxCountAlertOpen,
  handleChangeSelectedThemeDetails,
  handleLoadThemeList,
} from "@/context/redux/theme-marketplace/theme-marketplace-slice";
import {
  applyTestTheme,
  applyThemeInApp,
  loadActiveThemeId,
  loadThemeMetaList as loadInstalledThemeMetaList,
} from "@/context/redux/theme/thunks/theme";
import { handleChangeThemePreviewMode } from "../../theme/theme-slice";
import { MAX_INSTALLED_THEME_COUNT } from "@shared/constant/theme";

export const loadThemesSearchResult = createAsyncThunk<
  void,
  void,
  {
    dispatch: AppDispatch;
    state: RootState;
  }
>(
  "theme-marketplace/loadThemesSearchResult",
  async (_, { dispatch, getState }) => {
    try {
      const state = getState() as RootState;
      const filterType = state.themeMarketplace.searchFilter;

      if (filterType === "active") {
        dispatch(loadInstalledThemeMetaList());
        dispatch(loadActiveThemeId());
        return;
      } else if (filterType === "installed") {
        dispatch(loadInstalledThemeMetaList());
        return;
      } else {
        const response = await axiosServerClient.get("/themes/meta");
        const data = (response.data?.data ?? []) as Array<ThemeMetaInterface>;

        if (response.status !== 200 || !data) throw new Error();
        dispatch(handleLoadThemeList(data));
        return;
      }
    } catch (error) {
      console.error(error);
    }
  },
);

export const loadThemesDetails = createAsyncThunk<
  void,
  string | undefined | null,
  {
    dispatch: AppDispatch;
    state: RootState;
  }
>("theme-marketplace/loadThemesDetails", async (id, { dispatch, getState }) => {
  try {
    const state = getState() as RootState;
    id = id ?? state.themeMarketplace.selectedThemeId;
    if (!id) throw new Error("Theme id not passed");

    const response = await axiosServerClient.get(`/themes/details/${id}`);
    const data = response.data?.data as ThemeInterface;

    if (response.status !== 200 || !data) throw new Error();
    dispatch(handleChangeSelectedThemeDetails(data));
  } catch (error) {
    console.error(error);
  }
});

export const installTheme = createAsyncThunk<
  void,
  string,
  {
    dispatch: AppDispatch;
    state: RootState;
  }
>("theme-marketplace/installTheme", async (id, { dispatch, getState }) => {
  try {
    const state = getState() as RootState;

    if (state.theme.themeMetaList.length >= MAX_INSTALLED_THEME_COUNT) {
      dispatch(handleChangeIsInstallMaxCountAlertOpen(true));
      return;
    }

    const response = await axiosServerClient.get(`/themes/details/${id}`);
    const theme = response.data?.data as ThemeInterface;

    if (response.status !== 200 || !theme) throw new Error();

    await window.electronAPITheme.installTheme({
      id: theme.id,
      name: theme.name,
      palette: theme.palette,
      type: theme.type,
      author: theme.author,
      authorUsername: theme.authorUsername,
      thumbnail: theme.thumbnail,
      version: theme.version,
    });

    dispatch(loadInstalledThemeMetaList());
  } catch (error) {
    console.error(error);
  }
});

export const unInstallTheme = createAsyncThunk<
  void,
  string,
  {
    dispatch: AppDispatch;
    state: RootState;
  }
>("theme-marketplace/unInstallTheme", async (id, { dispatch, getState }) => {
  try {
    const state = getState() as RootState;

    const response = await window.electronAPITheme.deleteThemeById(id);
    if (!response) return;

    dispatch(loadInstalledThemeMetaList());

    if (
      state.theme.activeThemeId.global === id ||
      state.theme.activeThemeId.local === id
    ) {
      dispatch(loadActiveThemeId());
      dispatch(applyThemeInApp());
    }
  } catch (error) {
    console.error(error);
  }
});

export const previewTheme = createAsyncThunk<
  void,
  void,
  {
    dispatch: AppDispatch;
    state: RootState;
  }
>("theme-marketplace/previewTheme", async (_, { dispatch, getState }) => {
  try {
    const state = getState() as RootState;
    const palette = state.themeMarketplace.selectedThemeDetails?.palette;
    if (!palette) return;

    dispatch(applyTestTheme(palette));
    dispatch(handleChangeThemePreviewMode());
  } catch (error) {
    console.error(error);
  }
});
