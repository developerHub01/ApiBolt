import { createAsyncThunk } from "@reduxjs/toolkit";
import type { AppDispatch, RootState } from "@/context/redux/store";
import {
  handleChangeSelectedCookieKey,
  handleDeleteCookieByKey,
  handleLoadCookies,
} from "../cookies-slice";

export const loadCookies = createAsyncThunk<
  void,
  void,
  {
    dispatch: AppDispatch;
    state: RootState;
  }
>("cookies/loadCookies", async (_, { dispatch }) => {
  try {
    const response =
      await window.electronAPICookiesDB.getParsedCookiesByProject();

    dispatch(handleLoadCookies(response));
  } catch (error) {
    console.error(error);
  }
});

export const deleteCookieByKey = createAsyncThunk<
  void,
  string,
  {
    dispatch: AppDispatch;
    state: RootState;
  }
>("cookies/deleteCookieByKey", async (key, { dispatch, getState }) => {
  try {
    const state = getState() as RootState;

    if (state.cookies.selectedCookieKey === key)
      dispatch(handleChangeSelectedCookieKey(null));
    dispatch(handleDeleteCookieByKey(key));

    const response = await window.electronAPICookiesDB.deleteCookieKeyByProject(
      { key }
    );

    if (!response) await dispatch(loadCookies());
  } catch (error) {
    console.error(error);
  }
});

export const clearCookies = createAsyncThunk<
  void,
  void,
  {
    dispatch: AppDispatch;
    state: RootState;
  }
>("cookies/clearCookies", async (_, { dispatch }) => {
  try {
    dispatch(handleChangeSelectedCookieKey(null));
    dispatch(handleLoadCookies([]));

    const response = await window.electronAPICookiesDB.clearCookiesByProject();

    if (!response) await dispatch(loadCookies());
  } catch (error) {
    console.error(error);
  }
});
