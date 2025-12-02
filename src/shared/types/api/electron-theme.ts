import {
  ThemeCreatePayloadInterface,
  ThemeInterface,
  ThemeMetaInterface
} from "@/shared/types/theme.types";

export interface ElectronAPIThemeInterface {
  getThemeListMeta(): Promise<Array<ThemeMetaInterface>>;
  getThemeById(id: string): Promise<ThemeInterface>;
  getThemePaletteById(id: string): Promise<ThemeInterface["palette"]>;
  createTheme(payload: ThemeCreatePayloadInterface): Promise<boolean>;
  updateTheme(payload: Partial<ThemeCreatePayloadInterface>): Promise<boolean>;
  deleteThemeById(id: string): Promise<boolean>;

  saveThemePalette(palette: ThemeInterface["palette"]): Promise<boolean>;
}
