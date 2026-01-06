import { defaultActiveThemePalette } from "@/data/themes";
import { getActiveThemePalette } from "@/main/db/activeThemeDB";

export const getApplyingTheme = async () => {
  const themePalette = await getActiveThemePalette();
  return themePalette.local ?? themePalette.global ?? defaultActiveThemePalette;
};

export const applyingThemeBackground = async () => {
  return (await getApplyingTheme())?.background;
};
