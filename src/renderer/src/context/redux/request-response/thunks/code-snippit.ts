import { createAsyncThunk } from "@reduxjs/toolkit";
import type { AppDispatch, RootState } from "@/context/redux/store";
import { handleChangeCodeSnippitType } from "@/context/redux/request-response/request-response-slice";
import type { TRequestCodeType } from "@shared/types/code-snippit.types";

export const loadCodeSnippitType = createAsyncThunk<
  void,
  void,
  {
    dispatch: AppDispatch;
    state: RootState;
  }
>("sidebar/loadCodeSnippitType", async (_, { dispatch }) => {
  try {
    const response =
      await window.electronAPIActiveCodeSnippitType.getActiveCodeSnippitType();

    dispatch(handleChangeCodeSnippitType(response));
  } catch (error) {
    console.error(error);
  }
});

export const changeCodeSnippitType = createAsyncThunk<
  void,
  TRequestCodeType | null,
  {
    dispatch: AppDispatch;
    state: RootState;
  }
>("sidebar/changeCodeSnippitType", async (languageId, { dispatch }) => {
  try {
    dispatch(handleChangeCodeSnippitType(languageId));
    const response =
      await window.electronAPIActiveCodeSnippitType.updateActiveCodeSnippitType(
        languageId
      );

    if (!response) await dispatch(loadCodeSnippitType());
  } catch (error) {
    console.error(error);
  }
});
