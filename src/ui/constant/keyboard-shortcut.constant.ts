import type { KeyboardEvent } from "react";

export const MODIFIER_KEY_TRACK_ORDER: Array<{
  key: "ctrl" | "shift" | "alt" | "meta";
  eventProperty: keyof Pick<
    KeyboardEvent,
    "ctrlKey" | "shiftKey" | "altKey" | "metaKey"
  >;
}> = [
  {
    key: "ctrl",
    eventProperty: "ctrlKey",
  },
  {
    key: "shift",
    eventProperty: "shiftKey",
  },
  {
    key: "alt",
    eventProperty: "altKey",
  },
  {
    key: "meta",
    eventProperty: "metaKey",
  },
];
