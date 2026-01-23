import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { MAX_REQUEST_RESPONSE_WINDOW_SIZE } from "@/constant";

export interface RequestResponseWindowInterface {
  requestTimeLine: Array<string>;
}

// Define the initial state using that type
const initialState: RequestResponseWindowInterface = {
  requestTimeLine: [],
};

export const requestResponseWindowSlice = createSlice({
  name: "request-response-window",
  // `createSlice` will infer the state type from the `initialState` argument
  initialState,
  reducers: {
    handleAddRequestTimeLine: (state, action: PayloadAction<string>) => {
      const alreadyHavingIndex = state.requestTimeLine.indexOf(action.payload);
      const haveAlready = alreadyHavingIndex >= 0;

      /* if already added in last index means most latest so no need to do anything, skip */
      if (
        haveAlready &&
        alreadyHavingIndex === state.requestTimeLine.length - 1
      )
        return;
      if (haveAlready) state.requestTimeLine.splice(alreadyHavingIndex, 1);

      state.requestTimeLine.push(action.payload);

      /* deleting from extra old caches from starting */
      const needDeletionCount =
        state.requestTimeLine.length >= MAX_REQUEST_RESPONSE_WINDOW_SIZE
          ? state.requestTimeLine.length - MAX_REQUEST_RESPONSE_WINDOW_SIZE
          : 0;

      state.requestTimeLine.splice(0, needDeletionCount);
    },
    handleRemoveRequestTimeLine: (state, action: PayloadAction<string>) => {
      const alreadyHavingIndex = state.requestTimeLine.indexOf(action.payload);
      if (alreadyHavingIndex < 0) return;
      state.requestTimeLine.splice(alreadyHavingIndex, 1);
    },
    handleClearRequestTimeLine: state => {
      state.requestTimeLine = [];
    },
  },
});

export const {
  handleAddRequestTimeLine,
  handleRemoveRequestTimeLine,
  handleClearRequestTimeLine,
} = requestResponseWindowSlice.actions;

export default requestResponseWindowSlice.reducer;
