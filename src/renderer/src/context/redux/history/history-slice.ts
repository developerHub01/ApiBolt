import { createSlice, type PayloadAction } from "@reduxjs/toolkit";
import type {
  HistoryItemInterface,
  HistoryItemMetaInterface,
  THistoryFilter
} from "@shared/types/history.types";
import { MAX_LIMIT_OF_HISTORY_PER_REQUEST } from "@/constant/history.constant";

export interface HistoryInterface {
  meta: Array<HistoryItemMetaInterface> | null;
  selectedFilterMethod: Record<string, THistoryFilter>;
  openedHistory: {
    id: string;
    requestId: string;
  } | null;
  historyDetails: HistoryItemInterface | null;
}

// Define the initial state using that type
const initialState: HistoryInterface = {
  meta: null,
  selectedFilterMethod: {},
  openedHistory: null,
  historyDetails: null
};

export const historySlice = createSlice({
  name: "history",
  // `createSlice` will infer the state type from the `initialState` argument
  initialState,
  reducers: {
    handleChangeFilterMethod: (
      state,
      action: PayloadAction<{
        requestId: string;
        method: THistoryFilter;
      }>
    ) => {
      state.selectedFilterMethod[action.payload.requestId] =
        action.payload.method;
    },
    handleClearHistoryCache: state => {
      state.meta = null;
    },
    handleLoadHistory: (
      state,
      action: PayloadAction<Array<HistoryItemMetaInterface>>
    ) => {
      state.meta = action.payload;
    },
    handleAddHistory: (
      state,
      action: PayloadAction<HistoryItemMetaInterface>
    ) => {
      state.meta = [action.payload, ...(state.meta ?? [])].slice(
        0,
        MAX_LIMIT_OF_HISTORY_PER_REQUEST
      );
    },
    handleReplaceHistory: (
      state,
      action: PayloadAction<Array<HistoryItemMetaInterface>>
    ) => {
      state.meta = action.payload;
    },
    handleDeleteHistory: (state, action: PayloadAction<string>) => {
      const index = state.meta?.findIndex(item => item.id === action.payload);
      if (index === undefined || index < 0) return;

      state.meta?.splice(index, 1);
    },
    handleChangeOpenedHistory: (
      state,
      action: PayloadAction<
        | {
            id: string;
            requestId: string;
          }
        | null
        | undefined
      >
    ) => {
      state.openedHistory = action.payload ?? null;
    },
    handleReplaceHistoryDetails: (
      state,
      action: PayloadAction<HistoryItemInterface | null | undefined>
    ) => {
      state.historyDetails = action.payload ?? null;
    }
  }
});

export const {
  handleChangeFilterMethod,
  handleClearHistoryCache,
  handleLoadHistory,
  handleAddHistory,
  handleReplaceHistory,
  handleDeleteHistory,
  handleChangeOpenedHistory,
  handleReplaceHistoryDetails
} = historySlice.actions;

export default historySlice.reducer;
