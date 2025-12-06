import { DEFAULT_THEME_PALETTE } from "@/constant/theme.constant";
import type {
  ActiveThemeIdInterface,
  ThemeColorId,
  ThemeInterface,
  ThemeMetaInterface,
} from "@shared/types/theme.types";
import { createSlice, type PayloadAction } from "@reduxjs/toolkit";

export interface ThemeInitialInterface extends Pick<
  ThemeInterface,
  "name" | "type" | "thumbnail"
> {
  isThemeListCollapsed: boolean;
  palette: Record<ThemeColorId, string> | null;
  themeMetaList: Array<ThemeMetaInterface>;
  activeThemeId: ActiveThemeIdInterface;
}

// Define the initial state using that type
const initialState: ThemeInitialInterface = {
  isThemeListCollapsed: false,
  palette: null,
  name: "",
  type: "dark",
  thumbnail: "",
  themeMetaList: [],
  activeThemeId: {
    global: "",
    local: null,
  },
};

export const themeSlice = createSlice({
  name: "theme",
  // `createSlice` will infer the state type from the `initialState` argument
  initialState,
  reducers: {
    handleToggleThemeListCollapsed: (
      state,
      action: PayloadAction<boolean | undefined>,
    ) => {
      state.isThemeListCollapsed =
        action.payload ?? !state.isThemeListCollapsed;
    },
    handleChangeThemePalette: (
      state,
      action: PayloadAction<{
        key: ThemeColorId;
        value: string;
      }>,
    ) => {
      const { key, value } = action.payload;
      if (!state.palette) state.palette = DEFAULT_THEME_PALETTE;
      state.palette[key] = value;
    },
    handleReplaceThemePalette: (
      state,
      action: PayloadAction<ThemeInitialInterface["palette"]>,
    ) => {
      state.palette = action.payload;
    },
    handleLoadThemeMetaList: (
      state,
      action: PayloadAction<Array<ThemeMetaInterface>>,
    ) => {
      state.themeMetaList = action.payload;
    },
    handleLoadActiveThemeId: (
      state,
      action: PayloadAction<ActiveThemeIdInterface>,
    ) => {
      state.activeThemeId = action.payload;
    },
    handleUpdateActiveThemeId: (
      state,
      action: PayloadAction<Partial<ActiveThemeIdInterface>>,
    ) => {
      state.activeThemeId = {
        ...state.activeThemeId,
        ...action.payload,
      };
    },
  },
});

export const {
  handleToggleThemeListCollapsed,
  handleChangeThemePalette,
  handleReplaceThemePalette,
  handleLoadThemeMetaList,
  handleLoadActiveThemeId,
  handleUpdateActiveThemeId,
} = themeSlice.actions;

export default themeSlice.reducer;
