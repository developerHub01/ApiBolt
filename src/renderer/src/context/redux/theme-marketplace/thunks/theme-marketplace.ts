import { createAsyncThunk } from "@reduxjs/toolkit";
import type { AppDispatch, RootState } from "@/context/redux/store";
import { axiosServerClient } from "@/lib/utils";
import { ThemeInterface, ThemeMetaInterface } from "@shared/types/theme.types";
import {
  handleChangeSelectedThemeDetails,
  handleLoadThemeList,
} from "@/context/redux/theme-marketplace/theme-marketplace-slice";

export const loadThemesSearchResult = createAsyncThunk<
  void,
  void,
  {
    dispatch: AppDispatch;
    state: RootState;
  }
>("theme-marketplace/loadThemesSearchResult", async (_, { dispatch }) => {
  try {
    const response = await axiosServerClient.get("/themes/meta");
    const data = (response.data?.data ?? []) as Array<ThemeMetaInterface>;

    if (response.status !== 200 || !data) throw new Error();
    dispatch(handleLoadThemeList(data));
  } catch (error) {
    console.error(error);
  }
});

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
