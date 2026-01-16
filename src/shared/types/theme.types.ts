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
  description?: string;
  type: "light" | "dark" | "custom";
  author?: string;
  authorUsername?: string | null;
  thumbnail?: string;
  preview?: string;
  install_count?: number;
  version?: number | null;
  palette: Record<ThemeColorId, string>;
  createdAt?: string;
}

export type ThemeMetaInterface = Omit<ThemeInterface, "palette" | "createdAt">;

export type ThemeMetaDBInterface = Omit<
  ThemeInterface,
  "createdAt" | "description" | "install_count" | "preview"
>;

export interface ActiveThemeInterface {
  activeTheme: string;
  projectId: string | null;
}

export interface ChangeActiveThemePayloadInterface extends Omit<
  ActiveThemeInterface,
  "activeTheme"
> {
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

export type TThemeMarketplaceSearchFilter =
  | "all"
  | "installed"
  | "active"
  | "dark"
  | "light"
  | "custom";
