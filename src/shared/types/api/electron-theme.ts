import {
  ActiveThemeMetaInterface,
  ThemeCreatePayloadInterface,
  ThemeMetaDBInterface,
  ThemeMetaInterface,
} from "@shared/types/theme.types";

export interface ElectronAPIThemeInterface {
  getThemeListMeta(): Promise<Array<ThemeMetaInterface>>;
  getActiveThemeMeta(): Promise<ActiveThemeMetaInterface>;
  getThemeById(id: string): Promise<ThemeMetaDBInterface | null>;
  getThemePaletteById(
    id: string,
  ): Promise<ThemeMetaDBInterface["palette"] | null>;
  createTheme(payload: ThemeCreatePayloadInterface): Promise<boolean>;
  updateTheme(payload: Partial<ThemeCreatePayloadInterface>): Promise<boolean>;
  deleteThemeById(id: string): Promise<boolean>;
  saveThemePalette(palette: ThemeMetaDBInterface["palette"]): Promise<boolean>;
  importThemePaletteInEditor(): Promise<ThemeMetaDBInterface["palette"] | null>;
  installTheme(payload: ThemeMetaDBInterface): Promise<boolean>;
  unInstallTheme(id: string): Promise<boolean>;
}
