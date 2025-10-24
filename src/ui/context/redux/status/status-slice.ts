import { createSlice } from "@reduxjs/toolkit";
import { loadCookies } from "@/context/redux/cookies/thunk/cookies-thunk";

interface StatusInterface {
  isCookiesLoading: boolean;
  isCookiesError: null | string;
}

// Define the initial state using that type
const initialState: StatusInterface = {
  isCookiesLoading: false,
  isCookiesError: null,
};

export const statusSlice = createSlice({
  name: "status",
  // `createSlice` will infer the state type from the `initialState` argument
  initialState,
  reducers: {},

  extraReducers: (builder) => {
    builder
      .addCase(loadCookies.pending, (state) => {
        state.isCookiesLoading = true;
        state.isCookiesError = null;
      })
      .addCase(loadCookies.fulfilled, (state) => {
        state.isCookiesLoading = false;
        state.isCookiesError = null;
      })
      .addCase(loadCookies.rejected, (state, action) => {
        state.isCookiesLoading = false;
        state.isCookiesError = action.error.message ?? null;
      });
  },
});

// export const {} = statusSlice.actions;

export default statusSlice.reducer;
