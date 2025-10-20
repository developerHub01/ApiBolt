import type { CookieInterface, CookiesInterface } from "@/types/cookies.types";
import { createSlice, type PayloadAction } from "@reduxjs/toolkit";
import { loadCookies } from "@/context/redux/cookies/thunk/cookies-thunk";

export const DEFAULT_COOKIE_DETAILS: CookieInterface = {
  key: "",
  value: "",
  domain: "",
  path: "/",
  maxAge: null,
  expires: null,
  httpOnly: false,
  secure: false,
  sameSite: "lax",
};

interface CookiesStateInterface {
  isCookiesOpen: boolean;
  cookies: CookiesInterface;
  isLoading: boolean;
  error: null | string;
  selectedCookieKey: null | string;
  isAddOptionOpen: boolean;
  addCookieDetails: CookieInterface;
  isEditing: Record<string, boolean>;
  editingCookies: Record<string, CookieInterface>;
}

// Define the initial state using that type
const initialState: CookiesStateInterface = {
  isCookiesOpen: false,
  cookies: [],
  isLoading: false,
  error: null,
  selectedCookieKey: null,
  isAddOptionOpen: false,
  addCookieDetails: DEFAULT_COOKIE_DETAILS,
  isEditing: {},
  editingCookies: {},
};

export const cookiesSlice = createSlice({
  name: "cookies",
  initialState,
  reducers: {
    handleChangeIsCookiesOpen: (
      state,
      action: PayloadAction<boolean | undefined>
    ) => {
      if (state.isCookiesOpen === action.payload) return;

      if (!action.payload) state.selectedCookieKey = null;
      state.isCookiesOpen = action.payload ?? !state.isCookiesOpen;

      state.isEditing = {};
      state.editingCookies = {};
      state.isAddOptionOpen = false;
    },
    handleLoadCookies: (state, action: PayloadAction<CookiesInterface>) => {
      state.cookies = action.payload;
    },
    handleDeleteCookieByKey: (state, action: PayloadAction<string>) => {
      state.cookies = state.cookies.filter(
        (entry) => entry.key !== action.payload
      );
      delete state.isEditing[action.payload];
      delete state.editingCookies[action.payload];
    },
    handleChangeSelectedCookieKey: (
      state,
      action: PayloadAction<string | null>
    ) => {
      state.isAddOptionOpen = false;
      state.selectedCookieKey =
        state.selectedCookieKey === action.payload ? null : action.payload;
    },
    handleChangeIsAddCookieOption: (
      state,
      action: PayloadAction<boolean | undefined>
    ) => {
      state.selectedCookieKey = null;
      state.isAddOptionOpen = action.payload ?? !state.isAddOptionOpen;
    },
    handleResetAddCookieDetails: (state) => {
      state.addCookieDetails = DEFAULT_COOKIE_DETAILS;
    },
    handleCancelAddCookie: (state) => {
      state.isAddOptionOpen = false;
      state.addCookieDetails = DEFAULT_COOKIE_DETAILS;
    },
    handleChangeAddCookie: (
      state,
      action: PayloadAction<Partial<CookieInterface>>
    ) => {
      state.addCookieDetails = {
        ...state.addCookieDetails,
        ...action.payload,
      };
    },
    handleClearEditing: (
      state,
      action: PayloadAction<
        | {
            key?: string;
          }
        | undefined
      >
    ) => {
      const key = action.payload?.key ?? state.selectedCookieKey;
      if (!key) return;

      /* after update clear editing and close isEditing */
      delete state.editingCookies[key];
      delete state.isEditing[key];
    },
    handleChangeIsEditing: (
      state,
      action: PayloadAction<
        | {
            key?: string;
            value?: boolean;
          }
        | undefined
      >
    ) => {
      const key = action.payload?.key ?? state.selectedCookieKey;
      if (!key) return;
      const value = action.payload?.value ?? !state.isEditing[key];

      const existingCookieData = state.cookies.find(
        (entry) => entry.key === key
      );
      if (!existingCookieData) return;

      state.isEditing[key] = value;

      /* if editing enabled and editing state not exist then make it */
      if (!value || state.editingCookies[key]) return;
      state.editingCookies[key] = existingCookieData;
    },
    handleResetEditing: (state, action: PayloadAction<string | undefined>) => {
      const key = action.payload ?? state.selectedCookieKey;

      const existingCookieData = state.cookies.find(
        (entry) => entry.key === key
      );
      if (!existingCookieData || !key) return;

      state.editingCookies[key] = existingCookieData;
    },
    handleChangeEditCookie: (
      state,
      action: PayloadAction<{
        key?: string;
        payload: Partial<CookieInterface>;
      }>
    ) => {
      const key = action.payload?.key ?? state.selectedCookieKey;
      if (!key || !state.editingCookies[key]) return;

      state.editingCookies[key] = {
        ...state.editingCookies[key],
        ...action.payload.payload,
      };
    },
    handleSaveEditCookie: (
      state,
      action: PayloadAction<
        | {
            key?: string;
          }
        | undefined
      >
    ) => {
      const key = action.payload?.key ?? state.selectedCookieKey;
      if (!key || !state.editingCookies[key]) return;

      const index = state.cookies.findIndex((cookie) => cookie.key === key);
      if (index < 0 || !state.cookies[index]) return;

      state.cookies[index] = {
        ...state.cookies[index],
        ...state.editingCookies[key],
      };
    },
    handleAddCookie: (state) => {
      state.cookies.push(state.addCookieDetails);
      state.addCookieDetails = DEFAULT_COOKIE_DETAILS;
    },
  },

  extraReducers: (builder) => {
    builder
      .addCase(loadCookies.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(loadCookies.fulfilled, (state) => {
        state.isLoading = false;
        state.error = null;
      })
      .addCase(loadCookies.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.error.message ?? null;
      });
  },
});

export const {
  handleChangeIsCookiesOpen,
  handleLoadCookies,
  handleChangeSelectedCookieKey,
  handleDeleteCookieByKey,
  handleChangeIsAddCookieOption,
  handleResetAddCookieDetails,
  handleCancelAddCookie,
  handleChangeAddCookie,
  handleClearEditing,
  handleChangeIsEditing,
  handleResetEditing,
  handleChangeEditCookie,
  handleSaveEditCookie,
  handleAddCookie,
} = cookiesSlice.actions;

export default cookiesSlice.reducer;
