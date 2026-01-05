import { createAsyncThunk } from "@reduxjs/toolkit";
import type { AppDispatch, RootState } from "@/context/redux/store";
import { handleChangeHaveLocalPassword } from "@/context/redux/local-password/local-password-slice";

export const loadLocalPassword = createAsyncThunk<
  void,
  void,
  {
    dispatch: AppDispatch;
    state: RootState;
  }
>("local-password/loadLocalPassword", async (_, { dispatch }) => {
  try {
    const response =
      await window.electronAPILocalPassword.getHaveLocalPassword();

    dispatch(handleChangeHaveLocalPassword(response));
  } catch (error) {
    console.error(error);
    throw new Error("Something went wrong, couldn't load have password");
  }
});

export const disableLocalPassword = createAsyncThunk<
  boolean,
  void,
  {
    dispatch: AppDispatch;
    state: RootState;
  }
>("local-password/disableLocalPassword", async (_, { dispatch }) => {
  try {
    const response =
      await window.electronAPILocalPassword.changeLocalPassword();
    if (!response) await dispatch(loadLocalPassword());

    /* if successfully disabled then make 'haveLocalPassword' false */
    dispatch(handleChangeHaveLocalPassword(false));
    return response;
  } catch (error) {
    console.error(error);
    return false;
  }
});

export const updateLocalPassword = createAsyncThunk<
  boolean,
  string,
  {
    dispatch: AppDispatch;
    state: RootState;
  }
>("local-password/updateLocalPassword", async (password, { dispatch }) => {
  try {
    const response =
      await window.electronAPILocalPassword.changeLocalPassword(password);
    if (!response) await dispatch(loadLocalPassword());

    /* if successfully set password then make 'haveLocalPassword' true */
    dispatch(handleChangeHaveLocalPassword(true));
    return response;
  } catch (error) {
    console.error(error);
    return false;
  }
});

export const matchLocalPassword = createAsyncThunk<
  boolean,
  string,
  {
    dispatch: AppDispatch;
    state: RootState;
  }
>("local-password/matchLocalPassword", async password => {
  try {
    const response =
      await window.electronAPILocalPassword.matchLocalPassword(password);

    return response;
  } catch (error) {
    console.error(error);
    return false;
  }
});
