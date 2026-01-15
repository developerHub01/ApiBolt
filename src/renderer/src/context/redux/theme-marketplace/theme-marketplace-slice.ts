import { createSlice, type PayloadAction } from "@reduxjs/toolkit";
import { TThemeMarketplaceSearchFilter } from "@shared/types/theme.types";

export interface ThemeMarketplaceInitialInterface {
  searchTerm: string;
  searchFilter: TThemeMarketplaceSearchFilter;
  page: number;
  selectedThemeId: string | null;
}

// Define the initial state using that type
const initialState: ThemeMarketplaceInitialInterface = {
  searchTerm: "",
  searchFilter: "all",
  page: 1,
  selectedThemeId: null,
};

export const themeMarketplaceSlice = createSlice({
  name: "theme-marketplace",
  // `createSlice` will infer the state type from the `initialState` argument
  initialState,
  reducers: {
    handleChangeSearchTerm: (
      state,
      action: PayloadAction<string | undefined>,
    ) => {
      state.searchTerm = action.payload ?? "";
      state.page = 1;
    },
    handleChangeSearchFilter: (
      state,
      action: PayloadAction<TThemeMarketplaceSearchFilter | undefined>,
    ) => {
      state.searchFilter = action.payload ?? "all";
      state.page = 1;
    },
    incrementPage: state => {
      state.page += 1;
    },
    handleChangeSelectedThemeId: (
      state,
      action: PayloadAction<string | null | undefined>,
    ) => {
      state.selectedThemeId = action.payload ?? null;
    },
  },
});

export const {
  handleChangeSearchTerm,
  handleChangeSearchFilter,
  incrementPage,
  handleChangeSelectedThemeId,
} = themeMarketplaceSlice.actions;

export default themeMarketplaceSlice.reducer;
