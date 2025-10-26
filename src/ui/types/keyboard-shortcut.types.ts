export interface KeybaordShortCutInterface {
  id: string;
  label: string;
  key: Array<string> | null;
  projectId: string | null;
}

export interface KeybaordShortCutReceivePayloadInterface {
  global: Record<string, KeybaordShortCutInterface>;
  local: Record<string, KeybaordShortCutInterface>;
}

export type KeybaordShortCutUpdatePayloadInterface =
  Partial<KeybaordShortCutInterface> &
    Pick<KeybaordShortCutInterface, "id" | "projectId">;
