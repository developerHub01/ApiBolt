import type {
  KeybaordShortCutInterface,
  KeybaordShortCutReceivePayloadInterface,
} from "@/types/keyboard-shortcut.types";
import { createSlice, type PayloadAction } from "@reduxjs/toolkit";

interface KeyboardShortcutsStateInterface {
  isKeyboardShortcutPanelOpen: boolean;
  globalShortcuts: Record<string, KeybaordShortCutInterface>;
  localShortcuts: Record<string, KeybaordShortCutInterface>;
}

// Define the initial state using that type
const initialState: KeyboardShortcutsStateInterface = {
  isKeyboardShortcutPanelOpen: false,
  globalShortcuts: {},
  localShortcuts: {},
};

export const keyboardShortcutsSlice = createSlice({
  name: "keyboard-shortcuts",
  initialState,
  reducers: {
    handleChangeIsKeyboardShortcutPanelOpen: (
      state,
      action: PayloadAction<boolean | undefined>
    ) => {
      state.isKeyboardShortcutPanelOpen =
        action.payload ?? !state.isKeyboardShortcutPanelOpen;
    },
    handleReplaceShortcuts: (
      state,
      action: PayloadAction<KeybaordShortCutReceivePayloadInterface>
    ) => {
      state.globalShortcuts = action.payload.global;
      state.localShortcuts = action.payload.local;
    },
  },
});

export const {
  handleChangeIsKeyboardShortcutPanelOpen,
  handleReplaceShortcuts,
} = keyboardShortcutsSlice.actions;

export default keyboardShortcutsSlice.reducer;
