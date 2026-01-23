import { createAsyncThunk } from "@reduxjs/toolkit";
import type { AppDispatch, RootState } from "@/context/redux/store";
import { handleKeepOnlyWindowedRequests } from "@/context/redux/request-response/request-response-slice";
import { MAX_REQUEST_RESPONSE_WINDOW_SIZE } from "@/constant";

export const keepOnlyWindowedRequests = createAsyncThunk<
  void,
  void,
  {
    dispatch: AppDispatch;
    state: RootState;
  }
>(
  "request-response/keepOnlyWindowedRequests",
  async (_, { dispatch, getState }) => {
    const state = getState() as RootState;
    const requestTimeLine = state.requestResponseWindow.requestTimeLine;
    if (requestTimeLine.length < MAX_REQUEST_RESPONSE_WINDOW_SIZE) return;

    dispatch(
      handleKeepOnlyWindowedRequests(
        state.requestResponseWindow.requestTimeLine,
      ),
    );
  },
);
