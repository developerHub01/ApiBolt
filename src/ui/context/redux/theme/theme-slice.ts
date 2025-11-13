import type {
  ActiveThemeIdInterface,
  ThemeColorId,
  ThemeInterface,
  ThemeMetaInterface,
} from "@/types/theme.types";
import { createSlice, type PayloadAction } from "@reduxjs/toolkit";

interface ThemeInitialInterface
  extends Pick<ThemeInterface, "name" | "type" | "thumbnail"> {
  palette: Record<ThemeColorId, string>;
  themeMetaList: Array<ThemeMetaInterface>;
  activeThemeId: ActiveThemeIdInterface;
}

// Define the initial state using that type
const initialState: ThemeInitialInterface = {
  palette: {
    background: "#000e14",
    foreground: "#fafafa",
    popover: "#001a2c",
    "popover-foreground": "#fafafa",
    primary: "#e4e4e7",
    "primary-foreground": "#001a2c",
    secondary: "#003d5c",
    "secondary-foreground": "#fafafa",
    muted: "#003d5ce5",
    "muted-foreground": "#9f9fa9",
    accent: "#003d5c",
    "accent-foreground": "#fafafa",
    destructive: "#cb1b16",
    border: "#295a7e",
    input: "#001b29",
    ring: "#295a7e",
    line: "#00416cb3",
  },
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
    handleChangeThemePalette: (
      state,
      action: PayloadAction<{
        key: ThemeColorId;
        value: string;
      }>
    ) => {
      const { key, value } = action.payload;
      state.palette[key] = value;
    },
    handleLoadThemeMetaList: (
      state,
      action: PayloadAction<Array<ThemeMetaInterface>>
    ) => {
      state.themeMetaList = action.payload;
    },
    handleLoadActiveThemeId: (
      state,
      action: PayloadAction<ActiveThemeIdInterface>
    ) => {
      state.activeThemeId = action.payload;
    },
    handleUpdateActiveThemeId: (
      state,
      action: PayloadAction<Partial<ActiveThemeIdInterface>>
    ) => {
      state.activeThemeId = {
        ...state.activeThemeId,
        ...action.payload,
      };
    },
  },
});

export const {
  handleChangeThemePalette,
  handleLoadThemeMetaList,
  handleLoadActiveThemeId,
  handleUpdateActiveThemeId,
} = themeSlice.actions;

export default themeSlice.reducer;
