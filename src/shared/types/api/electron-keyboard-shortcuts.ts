import {
  KeybaordShortCutInterface,
  KeybaordShortCutReceivePayloadInterface,
  KeybaordShortCutUpdatePayloadInterface
} from "@shared/types/keyboard-shortcut.types";

export interface ElectronAPIKeyboardShortcutInterface {
  getKeyboardShortcuts(
    projectId?: string | null
  ): Promise<KeybaordShortCutReceivePayloadInterface | null>;
  getKeyboardShortcutsById(
    payload: Pick<KeybaordShortCutInterface, "id" | "projectId">
  ): Promise<KeybaordShortCutInterface | null>;
  updateKeyboardShortcuts(
    payload: KeybaordShortCutUpdatePayloadInterface
  ): Promise<boolean>;
  resetKeyboardShortcuts(
    payload: Pick<KeybaordShortCutInterface, "id" | "projectId">
  ): Promise<KeybaordShortCutInterface | null>;
}
