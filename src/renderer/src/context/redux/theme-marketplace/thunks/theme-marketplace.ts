import { createAsyncThunk } from "@reduxjs/toolkit";
import type { AppDispatch, RootState } from "@/context/redux/store";
import { axiosServerClient } from "@/lib/utils";
import { ThemeInterface, ThemeMetaInterface } from "@shared/types/theme.types";
import {
  handleChangeSelectedThemeDetails,
  handleLoadThemeList,
} from "@/context/redux/theme-marketplace/theme-marketplace-slice";
import { THEME_MARKETPLACE_FILTER_LOCAL } from "@renderer/constant/theme.constant";

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
      const isLocalSearch = THEME_MARKETPLACE_FILTER_LOCAL.has(filterType);

      if (!isLocalSearch) {
        const response = await axiosServerClient.get("/themes/meta");
        const data = (response.data?.data ?? []) as Array<ThemeMetaInterface>;

        if (response.status !== 200 || !data) throw new Error();
        dispatch(handleLoadThemeList(data));
      } else if (filterType === "active") {
        /*  */
      } else {
        const themeList = await window.electronAPITheme.getThemeListMeta();
        dispatch(handleLoadThemeList(themeList));
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
>("theme-marketplace/installTheme", async id => {
  try {
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
  } catch (error) {
    console.error(error);
  }
});
