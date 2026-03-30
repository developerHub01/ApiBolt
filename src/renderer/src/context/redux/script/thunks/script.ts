import { createAsyncThunk } from "@reduxjs/toolkit";
import type { AppDispatch, RootState } from "@/context/redux/store";
import { handleUpdateScript } from "@/context/redux/script/script-slice";

export const updateScript = createAsyncThunk<
  void,
  {
    id?: string;
    script?: string;
  },
  {
    dispatch: AppDispatch;
    state: RootState;
  }
>("script/updateScript", async (payload, { dispatch, getState }) => {
  try {
    const state = getState() as RootState;
    const selectedTab = payload?.id ?? state.requestResponse.selectedTab;

    if (!selectedTab) throw new Error();

    dispatch(
      handleUpdateScript({
        id: selectedTab,
        script: payload?.script ?? "",
      }),
    );

    return;
  } catch (error) {
    console.error(error);
    return;
  }
});
