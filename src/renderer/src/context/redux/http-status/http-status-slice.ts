import type {
  HttpStatusListInterface,
  HttpStatusSingleInterface,
  HttpStatusUpdatePayloadInterface
} from "@shared/types/http-status.type";
import { createSlice, type PayloadAction } from "@reduxjs/toolkit";

export interface HttpStatusStateInterface {
  httpStatus: HttpStatusListInterface;
  selectedSettingHttpStatusCode: string | null;
}

// Define the initial state using that type
const initialState: HttpStatusStateInterface = {
  httpStatus: {},
  selectedSettingHttpStatusCode: null
};

export const httpStatusSlice = createSlice({
  name: "http-status",
  // `createSlice` will infer the state type from the `initialState` argument
  initialState,
  reducers: {
    handleLoadHttpStatus: (
      state,
      action: PayloadAction<HttpStatusListInterface>
    ) => {
      state.httpStatus = action.payload;
    },
    handleLoadSingleHttpStatus: (
      state,
      action: PayloadAction<HttpStatusSingleInterface>
    ) => {
      const { code, ...payload } = action.payload;
      state.httpStatus[code] = payload;
    },
    handleUpdateHttpStatus: (
      state,
      action: PayloadAction<HttpStatusUpdatePayloadInterface>
    ) => {
      const { code, ...payload } = action.payload;
      state.httpStatus[code] = {
        ...(state.httpStatus[code] ?? {}),
        ...payload
      };
    },
    handleUpdateSelectedSettingHttpStatusCode: (
      state,
      action: PayloadAction<string | null>
    ) => {
      state.selectedSettingHttpStatusCode = action.payload;
    }
  }
});

export const {
  handleLoadHttpStatus,
  handleLoadSingleHttpStatus,
  handleUpdateHttpStatus,
  handleUpdateSelectedSettingHttpStatusCode
} = httpStatusSlice.actions;

export default httpStatusSlice.reducer;
