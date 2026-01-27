import { createAsyncThunk } from "@reduxjs/toolkit";
import type { AppDispatch, RootState } from "@/context/redux/store";
import { axiosServerClient } from "@/lib/utils";
import {
  ThemeInterface,
  ThemeMetaInterface,
  ThemesSearchResultInterface,
} from "@shared/types/theme.types";
import {
  handleChangeIsInstallMaxCountAlertOpen,
  handleChangeSelectedThemeDetails,
  handleChangeTotalPages,
  handleChangeTotalThemes,
  handleClearThemeMarketCache,
  handleLoadThemeList,
} from "@/context/redux/theme-marketplace/theme-marketplace-slice";
import {
  applyTestTheme,
  applyThemeInApp,
  loadActiveThemeId,
  loadThemeMetaList as loadInstalledThemeMetaList,
} from "@/context/redux/theme/thunks/theme";
import { handleChangeThemePreviewMode } from "@/context/redux/theme/theme-slice";
import {
  DEFAULT_THEME_ID,
  MAX_INSTALLED_THEME_COUNT,
} from "@shared/constant/theme";
import axios from "axios";
import { THEME_MARKETPLACE_PAGE_SIZE } from "@/constant/theme.constant";

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
      try {
        const response = await axiosServerClient.get("/themes/meta", {
          params: {
            searchTerm: state.themeMarketplace.searchTerm,
            searchFilter: state.themeMarketplace.searchFilter,
            page: state.themeMarketplace.page,
            pageSize: THEME_MARKETPLACE_PAGE_SIZE,
          },
        });

        if (response.status !== 200 || !response.data?.data) throw new Error();

        const { meta, data } = response.data
          ?.data as ThemesSearchResultInterface;

        console.log(data);

        dispatch(handleLoadThemeList(data));
        dispatch(handleChangeTotalPages(meta.totalPages));
        dispatch(handleChangeTotalThemes(meta.total));
        return;
      } catch (error) {
        if (axios.isAxiosError(error)) {
          if (error.code === "ERR_NETWORK") throw new Error("ERR_NETWORK");
        }
        dispatch(handleClearThemeMarketCache());
      }
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
  const state = getState() as RootState;
  id = id ?? state.themeMarketplace.selectedThemeId;
  try {
    if (!id) throw new Error("Theme id not passed");
    if (id === DEFAULT_THEME_ID) throw new Error("it is the default theme");

    const response = await axiosServerClient.get(`/themes/details/${id}`);

    const data = response.data?.data as ThemeInterface;
    dispatch(handleChangeSelectedThemeDetails(data));
  } catch (error) {
    if (!id) throw new Error();
    const themeDetails = await window.electronAPITheme.getThemeById(id);
    dispatch(handleChangeSelectedThemeDetails(themeDetails));
    if (axios.isAxiosError(error)) {
      if (error.code === "ERR_NETWORK") throw new Error("ERR_NETWORK");
      else if (error.status === 404) throw new Error("NOT_FOUND");
    }
  }
});

export const installTheme = createAsyncThunk<
  boolean,
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
      throw new Error();
    }

    const themeResponse = await axiosServerClient.get(`/themes/details/${id}`);
    const theme = themeResponse.data?.data as ThemeInterface;

    if (themeResponse.status !== 200 || !theme) throw new Error();

    const response = await window.electronAPITheme.installTheme({
      id: theme.id,
      name: theme.name,
      palette: theme.palette,
      type: theme.type,
      author: theme.author,
      authorUsername: theme.authorUsername,
      thumbnail: theme.thumbnail,
      preview: theme.preview,
      version: theme.version,
    });

    dispatch(loadInstalledThemeMetaList());

    return response;
  } catch (error) {
    console.error(error);
    return false;
  }
});

export const unInstallTheme = createAsyncThunk<
  boolean,
  string,
  {
    dispatch: AppDispatch;
    state: RootState;
  }
>("theme-marketplace/unInstallTheme", async (id, { dispatch, getState }) => {
  try {
    const state = getState() as RootState;
    const activeProjectId = state.project.activeProjectId;

    if (id === DEFAULT_THEME_ID)
      throw new Error("default theme cant uninstall");

    const isDeletingRootTheme =
      !activeProjectId &&
      state.theme.activeThemeId.global ===
        state.themeMarketplace.selectedThemeId;

    const response = await window.electronAPITheme.unInstallTheme(id);
    if (!response) throw new Error();

    dispatch(loadInstalledThemeMetaList());

    if (
      isDeletingRootTheme ||
      state.theme.activeThemeId.global === id ||
      state.theme.activeThemeId.local === id
    ) {
      dispatch(loadActiveThemeId());
      dispatch(applyThemeInApp());
    }

    return response;
  } catch (error) {
    console.error(error);
    return false;
  }
});

export const togglePreviewTheme = createAsyncThunk<
  boolean,
  void,
  {
    dispatch: AppDispatch;
    state: RootState;
  }
>("theme-marketplace/togglePreviewTheme", async (_, { dispatch, getState }) => {
  try {
    const state = getState() as RootState;
    const isPreviewOn = state.theme.isPreviewModeOn;

    return await dispatch(
      isPreviewOn ? exitPreviewTheme() : previewTheme(),
    ).unwrap();
  } catch (error) {
    console.error(error);
    return false;
  }
});

export const previewTheme = createAsyncThunk<
  boolean,
  void,
  {
    dispatch: AppDispatch;
    state: RootState;
  }
>("theme-marketplace/previewTheme", async (_, { dispatch, getState }) => {
  try {
    const state = getState() as RootState;
    const palette = state.themeMarketplace.selectedThemeDetails?.palette;
    if (!palette) throw new Error();

    const response = await dispatch(applyTestTheme(palette)).unwrap();
    dispatch(handleChangeThemePreviewMode(true));
    return response.success;
  } catch (error) {
    console.error(error);
    return false;
  }
});

export const exitPreviewTheme = createAsyncThunk<
  boolean,
  void,
  {
    dispatch: AppDispatch;
    state: RootState;
  }
>("theme-marketplace/exitPreviewTheme", async (_, { dispatch }) => {
  try {
    const response = await dispatch(applyThemeInApp()).unwrap();
    dispatch(handleChangeThemePreviewMode(false));
    return response.success;
  } catch (error) {
    console.error(error);
    return false;
  }
});
