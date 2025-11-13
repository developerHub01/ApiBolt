import { DEFAULT_THEME_ID } from "../electron/db/schema.js";

export const defaultThemeList = [
  {
    id: DEFAULT_THEME_ID,
    name: "Polar Night",
    type: "dark",
    palette: {
      background: "#000e14",
      foreground: "#fafafa",
      card: "#001a2c",
      "card-foreground": "#fafafa",
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
      border: "#295a7e",
      input: "#001b29",
      ring: "#295a7e",
    },
  },
];
