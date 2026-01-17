import { createSlice, type PayloadAction } from "@reduxjs/toolkit";
import {
  ThemeInterface,
  ThemeMetaInterface,
  TThemeMarketplaceSearchFilter,
} from "@shared/types/theme.types";

export interface ThemeMarketplaceInitialInterface {
  searchTerm: string;
  searchFilter: TThemeMarketplaceSearchFilter;
  page: number;
  totalPages: number;
  selectedThemeId: string | null;
  themesList: Array<ThemeMetaInterface>;
  selectedThemeDetails: ThemeInterface | null;
  isInstallMaxCountAlertOpen: boolean;
}

// Define the initial state using that type
const initialState: ThemeMarketplaceInitialInterface = {
  searchTerm: "",
  searchFilter: "all",
  page: 1,
  totalPages: 1,
  selectedThemeId: null,
  themesList: [],
  selectedThemeDetails: null,
  isInstallMaxCountAlertOpen: false,
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
    handlePage: (state, action: PayloadAction<number | undefined | null>) => {
      state.page = action.payload ?? 1;
    },
    handleIncrementPage: state => {
      state.page += 1;
    },
    handleDecrementPage: state => {
      state.page -= 1;
    },
    handleChangeTotalPages: (
      state,
      action: PayloadAction<number | undefined | null>,
    ) => {
      state.totalPages = action.payload ?? 1;
    },
    handleChangeSelectedThemeId: (
      state,
      action: PayloadAction<string | null | undefined>,
    ) => {
      state.selectedThemeId = action.payload ?? null;
    },
    handleLoadThemeList: (
      state,
      action: PayloadAction<Array<ThemeMetaInterface>>,
    ) => {
      state.themesList = action.payload;
    },
    handleChangeSelectedThemeDetails: (
      state,
      action: PayloadAction<ThemeInterface | undefined | null>,
    ) => {
      state.selectedThemeDetails = action.payload ?? null;
    },
    handleChangeIsInstallMaxCountAlertOpen: (
      state,
      action: PayloadAction<boolean | undefined | null>,
    ) => {
      state.isInstallMaxCountAlertOpen = action.payload ?? false;
    },
  },
});

export const {
  handleChangeSearchTerm,
  handleChangeSearchFilter,
  handlePage,
  handleIncrementPage,
  handleDecrementPage,
  handleChangeTotalPages,
  handleChangeSelectedThemeId,
  handleLoadThemeList,
  handleChangeSelectedThemeDetails,
  handleChangeIsInstallMaxCountAlertOpen,
} = themeMarketplaceSlice.actions;

export default themeMarketplaceSlice.reducer;
