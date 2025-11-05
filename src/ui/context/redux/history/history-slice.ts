import { createSlice, type PayloadAction } from "@reduxjs/toolkit";
import type {
  HistoryItemMetaInterface,
  THistoryFilter,
} from "@/types/history.types";
import { loadRequestHistoryMeta } from "@/context/redux/history/thunks/history";

interface HistoryInterface {
  meta: Record<string, Array<HistoryItemMetaInterface>>;
  isMetaLoading: boolean;
  selectedFilterMethod: Record<string, THistoryFilter>;
  openedHistory: {
    id: string;
    requestId: string;
  } | null;
}

// Define the initial state using that type
const initialState: HistoryInterface = {
  meta: {},
  isMetaLoading: false,
  selectedFilterMethod: {},
  openedHistory: null,
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
    handleClearHistoryCacheByRequestId: (
      state,
      action: PayloadAction<string>
    ) => {
      delete state.meta[action.payload];
    },
    handleLoadHistoryByRequestId: (
      state,
      action: PayloadAction<{
        requestId: string;
        payload: Array<HistoryItemMetaInterface>;
      }>
    ) => {
      state.meta[action.payload.requestId] = action.payload.payload;
    },
    handleAddHistoryByRequestId: (
      state,
      action: PayloadAction<{
        requestId: string;
        payload: HistoryItemMetaInterface;
      }>
    ) => {
      state.meta[action.payload.requestId] = [
        action.payload.payload,
        ...(state.meta[action.payload.requestId] ?? []),
      ];
    },
    handleReplaceHistoryByRequestId: (
      state,
      action: PayloadAction<{
        requestId: string;
        payload: Array<HistoryItemMetaInterface>;
      }>
    ) => {
      state.meta[action.payload.requestId] = action.payload.payload;
    },
    handleDeleteHistoryByRequestId: (
      state,
      action: PayloadAction<{
        id: string;
        requestId: string;
      }>
    ) => {
      const index = state.meta[action.payload.requestId]?.findIndex(
        (item) => item.id === action.payload.id
      );
      if (index < 0) return;

      state.meta[action.payload.requestId].splice(index, 1);
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
  },

  extraReducers: (builder) => {
    builder
      .addCase(loadRequestHistoryMeta.pending, (state) => {
        state.isMetaLoading = true;
      })
      .addCase(loadRequestHistoryMeta.fulfilled, (state) => {
        state.isMetaLoading = false;
      })
      .addCase(loadRequestHistoryMeta.rejected, (state) => {
        state.isMetaLoading = false;
      });
  },
});

export const {
  handleChangeFilterMethod,
  handleClearHistoryCacheByRequestId,
  handleLoadHistoryByRequestId,
  handleAddHistoryByRequestId,
  handleReplaceHistoryByRequestId,
  handleDeleteHistoryByRequestId,
  handleChangeOpenedHistory,
} = historySlice.actions;

export default historySlice.reducer;
