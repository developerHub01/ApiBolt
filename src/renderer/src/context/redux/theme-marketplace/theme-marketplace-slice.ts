import { createSlice, type PayloadAction } from "@reduxjs/toolkit";
import {
  ThemeInterface,
  ThemeMetaDBInterface,
  ThemeMetaInterface,
  TThemeMarketplaceSearchFilter,
} from "@shared/types/theme.types";

export interface ThemeMarketplaceInitialInterface {
  searchTerm: string;
  searchFilter: TThemeMarketplaceSearchFilter;
  totalThemes: number;
  page: number;
  totalPages: number;
  selectedThemeId: string | null;
  themesList: Array<ThemeMetaInterface>;
  selectedThemeDetails: ThemeInterface | null;
  isInstallMaxCountAlertOpen: boolean;
}

const THEME_MARKET_THEME_LIST_DEFAULT: Pick<
  ThemeMarketplaceInitialInterface,
  "page" | "totalThemes" | "totalPages" | "themesList"
> = {
  page: 1,
  totalThemes: 0,
  totalPages: 1,
  themesList: [],
};

// Define the initial state using that type
const initialState: ThemeMarketplaceInitialInterface = {
  searchTerm: "",
  searchFilter: "all",
  ...THEME_MARKET_THEME_LIST_DEFAULT,
  selectedThemeId: null,
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
    handleChangeTotalThemes: (
      state,
      action: PayloadAction<number | undefined | null>,
    ) => {
      state.totalThemes = action.payload ?? 0;
    },
    handlePage: (state, action: PayloadAction<number | undefined | null>) => {
      state.page = Math.min(Math.max(1, action.payload ?? 1), state.totalPages);
    },
    handleIncrementPage: state => {
      state.page = Math.min(state.page + 1, state.totalPages);
    },
    handleDecrementPage: state => {
      state.page = Math.max(1, state.page - 1);
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
    handleClearThemeMarketCache: state => {
      Object.assign(state, THEME_MARKET_THEME_LIST_DEFAULT);
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
  handleChangeTotalThemes,
  handlePage,
  handleIncrementPage,
  handleDecrementPage,
  handleChangeTotalPages,
  handleChangeSelectedThemeId,
  handleLoadThemeList,
  handleClearThemeMarketCache,
  handleChangeSelectedThemeDetails,
  handleChangeIsInstallMaxCountAlertOpen,
} = themeMarketplaceSlice.actions;

export default themeMarketplaceSlice.reducer;
