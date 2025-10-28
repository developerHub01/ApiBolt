import { createSlice, type PayloadAction } from "@reduxjs/toolkit";

interface InitialStateInterface {
  isOpen: boolean;
  searchTerm: string;
}

// Define the initial state using that type
const initialState: InitialStateInterface = {
  isOpen: false,
  searchTerm: "",
};

export const headerSlice = createSlice({
  name: "header",
  // `createSlice` will infer the state type from the `initialState` argument
  initialState,
  reducers: {
    handleChangeIsOpen: (state, action: PayloadAction<boolean | undefined>) => {
      state.isOpen = action.payload ?? !state.isOpen;
    },
    handleChangeSearchTerm: (
      state,
      action: PayloadAction<string | undefined>
    ) => {
      state.searchTerm = action.payload ?? "";
    },
  },
});

export const { handleChangeIsOpen, handleChangeSearchTerm } =
  headerSlice.actions;

export default headerSlice.reducer;
