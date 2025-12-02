import type { ThemeColorId } from "@shared/types/theme.types";

export const DEFAULT_THEME_PALETTE: Record<ThemeColorId, string> = {
  background: "#000e14",
  foreground: "#fafafa",
  popover: "#001a2c",
  "popover-foreground": "#fafafa",
  primary: "#e4e4e7",
  "primary-foreground": "#001a2c",
  secondary: "#003d5c",
  "secondary-foreground": "#fafafa",
  muted: "#003d5ce5",
  "muted-foreground": "#9f9fa9",
  accent: "#003d5c",
  "accent-foreground": "#fafafa",
  destructive: "#cb1b16",
  border: "#002233",
  input: "#00406c",
  ring: "#295a7e",
  line: "#00416cb3"
};

export const DEFAULT_THUMBNAIL_FALLBACK =
  "./theme-thumbnail/theme_thumbnail_placeholder.png";
