import type {
  KeybaordShortCutInterface,
  KeybaordShortCutReceivePayloadInterface,
} from "@/types/keyboard-shortcut.types";
import { createSlice, type PayloadAction } from "@reduxjs/toolkit";

interface KeyboardShortcutsStateInterface {
  isKeyboardShortcutPanelOpen: boolean;
  globalShortcuts: Record<string, KeybaordShortCutInterface>;
  localShortcuts: Record<string, KeybaordShortCutInterface>;
  editingId: string | null;
}

// Define the initial state using that type
const initialState: KeyboardShortcutsStateInterface = {
  isKeyboardShortcutPanelOpen: false,
  globalShortcuts: {},
  localShortcuts: {},
  editingId: null,
};

export const keyboardShortcutsSlice = createSlice({
  name: "keyboard-shortcuts",
  initialState,
  reducers: {
    handleChangeIsKeyboardShortcutPanelOpen: (
      state,
      action: PayloadAction<boolean | undefined>
    ) => {
      const payload = action.payload ?? !state.isKeyboardShortcutPanelOpen;
      state.isKeyboardShortcutPanelOpen = payload;
      if (!payload && state.editingId) state.editingId = null;
    },
    handleReplaceShortcuts: (
      state,
      action: PayloadAction<KeybaordShortCutReceivePayloadInterface>
    ) => {
      state.globalShortcuts = action.payload.global;
      state.localShortcuts = action.payload.local;
    },
    handleChangeEditingId: (
      state,
      action: PayloadAction<string | undefined | null>
    ) => {
      state.editingId = action.payload ?? null;
    },
  },
});

export const {
  handleChangeIsKeyboardShortcutPanelOpen,
  handleReplaceShortcuts,
  handleChangeEditingId,
} = keyboardShortcutsSlice.actions;

export default keyboardShortcutsSlice.reducer;
