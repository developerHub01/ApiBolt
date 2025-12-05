import {
  KeybaordShortCutInterface,
  KeybaordShortCutReceivePayloadInterface,
  KeybaordShortCutUpdatePayloadInterface
} from "@shared/types/keyboard-shortcut.types";

export interface ElectronAPIKeyboardShortcutInterface {
  getKeyboardShortcuts(
    projectId?: string
  ): Promise<KeybaordShortCutReceivePayloadInterface>;
  getKeyboardShortcutsById(
    payload: Pick<KeybaordShortCutInterface, "id" | "projectId">
  ): Promise<KeybaordShortCutInterface>;
  updateKeyboardShortcuts(
    payload: KeybaordShortCutUpdatePayloadInterface
  ): Promise<boolean>;
  resetKeyboardShortcuts(
    payload: Pick<KeybaordShortCutInterface, "id" | "projectId">
  ): Promise<KeybaordShortCutInterface>;
}
