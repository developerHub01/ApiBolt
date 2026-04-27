import { createAsyncThunk } from "@reduxjs/toolkit";
import type { AppDispatch, RootState } from "@/context/redux/store";
import { handleLoadAppInfo } from "@/context/redux/app-info/app-info-slice";

export const loadAppInfo = createAsyncThunk<
  void,
  void,
  {
    dispatch: AppDispatch;
    state: RootState;
  }
>("app-info/loadAppInfo", async (_, { dispatch }) => {
  try {
    const response = await window.electronAPIAppInfo.getAppInfo();

    dispatch(handleLoadAppInfo(response));
  } catch (error) {
    console.error(error);
    throw new Error("Something went wrong, couldn't load cookies");
  }
});
