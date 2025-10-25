import { createAsyncThunk } from "@reduxjs/toolkit";
import type { AppDispatch, RootState } from "@/context/redux/store";
import {
  handleAddCookie,
  handleChangeIsAddCookieOption,
  handleChangeSelectedCookieKey,
  handleClearEditing,
  handleDeleteCookieByKey,
  handleLoadCookies,
  handleSaveEditCookie,
} from "@/context/redux/cookies/cookies-slice";
import type { CookieInterface } from "@/types/cookies.types";

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
    throw new Error("Something went wrong, couldn't load cookies");
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
  boolean,
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

    return response;
  } catch (error) {
    console.error(error);
    return false;
  }
});

export const addCookie = createAsyncThunk<
  boolean,
  void,
  {
    dispatch: AppDispatch;
    state: RootState;
  }
>("cookies/addCookie", async (_, { dispatch }) => {
  try {
    dispatch(handleAddCookie());
    const response = await dispatch(updateCookies()).unwrap();

    /* if added successfully then close it */
    if (response) dispatch(handleChangeIsAddCookieOption(false));
    return response;
  } catch (error) {
    console.error(error);
    return false;
  }
});

export const saveEditingCookie = createAsyncThunk<
  boolean,
  void,
  {
    dispatch: AppDispatch;
    state: RootState;
  }
>("cookies/saveEditingCookie", async (_, { dispatch }) => {
  try {
    dispatch(handleSaveEditCookie());
    const response = await dispatch(updateCookies()).unwrap();

    if (response) dispatch(handleClearEditing());
    return response;
  } catch (error) {
    console.error(error);
    return false;
  }
});

export const updateCookies = createAsyncThunk<
  boolean,
  void,
  {
    dispatch: AppDispatch;
    state: RootState;
  }
>("cookies/updateCookies", async (_, { dispatch, getState }) => {
  try {
    const state = getState() as RootState;
    let cookies = [...(state.cookies.cookies ?? [])];

    cookies = cookies.map((cookie) => {
      const newCookie: CookieInterface = { ...cookie };

      (Object.keys(newCookie) as Array<keyof CookieInterface>).map((key) => {
        if (newCookie[key] === null) delete newCookie[key];
      });

      return newCookie;
    });

    const response = await window.electronAPICookiesDB.updateCookiesByProject({
      cookies,
    });

    if (!response) await dispatch(loadCookies());
    return response;
  } catch (error) {
    console.error(error);
    return false;
  }
});
