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

export interface ThemeInterface {
  id: string;
  name: string;
  type: "light" | "dark" | "custom";
  url?: string;
  author?: string;
  thumbnail?: string;
  palette: Record<ThemeColorId, string>;
  createdAt?: string;
}

export type ThemeMetaInterface = Omit<ThemeInterface, "palette" | "createdAt">;

export interface ActiveThemeInterface {
  activeTheme: string;
  projectId: string | null;
}

export interface ChangeActiveThemePayloadInterface
  extends Omit<ActiveThemeInterface, "activeTheme"> {
  activeTheme: string | null;
}

export type ThemeCreatePayloadInterface = Required<
  Pick<ThemeInterface, "name" | "palette">
> &
  Partial<Pick<ThemeInterface, "type" | "thumbnail">>;

export interface ActiveThemeIdInterface {
  global: string;
  local: string | null;
}

export interface ActiveThemePaletteInterface {
  global: ThemeInterface["palette"];
  local: ThemeInterface["palette"] | null;
}
