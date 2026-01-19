export type ThemeColorId =
  | "background"
  | "foreground"
  | "popover"
  | "popover-foreground"
  | "primary"
  | "primary-foreground"
  | "secondary"
  | "secondary-foreground"
  | "muted"
  | "muted-foreground"
  | "accent"
  | "accent-foreground"
  | "destructive"
  | "border"
  | "input"
  | "ring"
  | "line";

export const THEME_PALETTE_PROPERTIES = new Set<ThemeColorId>([
  "background",
  "foreground",
  "popover",
  "popover-foreground",
  "primary",
  "primary-foreground",
  "secondary",
  "secondary-foreground",
  "muted",
  "muted-foreground",
  "accent",
  "accent-foreground",
  "destructive",
  "border",
  "input",
  "ring",
  "line",
]);

export const DEFAULT_THEME_ID = "system";

export const MAX_INSTALLED_THEME_COUNT = 6;
