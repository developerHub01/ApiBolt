import { initialUrlTokensValue } from "@/constant/request-url.constant";
import type {
  TAPIUrlTokenType,
  UrlTokenInterface,
} from "@/types/request-url.types";
import { createSlice, type PayloadAction } from "@reduxjs/toolkit";
import { v4 as uuidv4 } from "uuid";

interface RequestUrlStateInterface {
  tokens: Record<string, Array<UrlTokenInterface>>;
}

// Define the initial state using that type
const initialState: RequestUrlStateInterface = {
  tokens: {},
};

export const requestUrlSlice = createSlice({
  name: "request-url",
  // `createSlice` will infer the state type from the `initialState` argument
  initialState,
  reducers: {
    handleRequestUrlAddToken: (
      state,
      action: PayloadAction<{
        type: TAPIUrlTokenType;
        preTokenId: string;
        selectedTab: string;
      }>
    ) => {
      const { selectedTab, type, preTokenId = "port" } = action.payload;

      const newValue = type === "text" ? "text" : "";
      const newToken = { id: uuidv4(), type, value: newValue };

      if (!state.tokens[selectedTab]) {
        state.tokens[selectedTab] = [...initialUrlTokensValue];
      }
      const index =
        (state.tokens[selectedTab].findIndex((t) => t.id === preTokenId) ?? 0) +
        1;
      state.tokens[selectedTab].splice(index, 0, newToken);
    },
    handleRequestUrlUpdateToken: (
      state,
      action: PayloadAction<
        Partial<UrlTokenInterface> &
          Pick<UrlTokenInterface, "id"> & { selectedTab: string }
      >
    ) => {
      try {
        const { selectedTab, id, ...payload } = action.payload;

        if (!state.tokens[selectedTab]) {
          state.tokens[selectedTab] = [...initialUrlTokensValue];
        }

        const index = state.tokens[selectedTab].findIndex(
          (token) => token.id === id
        );
        console.log({ index, token: state.tokens[selectedTab] });
        if (index < 0) return;

        state.tokens[selectedTab][index] = {
          ...(state.tokens[selectedTab][index] ?? {}),
          ...payload,
        };
      } catch (error) {
        console.log(error);
      }
    },
    handleRequestUrlDeleteToken: (
      state,
      action: PayloadAction<{
        id: string;
        selectedTab: string;
      }>
    ) => {
      const { selectedTab, id } = action.payload;

      if (
        !state.tokens[selectedTab] ||
        ["protocol", "host", "port"].includes(id)
      )
        return;

      state.tokens[selectedTab] = state.tokens[selectedTab].filter(
        (item) => item.id !== id
      );
    },
  },
});

export const {
  handleRequestUrlAddToken,
  handleRequestUrlUpdateToken,
  handleRequestUrlDeleteToken,
} = requestUrlSlice.actions;

export default requestUrlSlice.reducer;
