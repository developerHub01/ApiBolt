import {
  ActiveThemeIdInterface,
  ActiveThemePaletteInterface,
  ChangeActiveThemePayloadInterface
} from "@/shared/types/theme.types";

export interface ElectronAPIActiveThemeInterface {
  getActiveThemeId(): Promise<ActiveThemeIdInterface>;
  getActiveThemePalette(): Promise<ActiveThemePaletteInterface>;
  changeActiveTheme(
    payload: ChangeActiveThemePayloadInterface
  ): Promise<boolean>;
}
