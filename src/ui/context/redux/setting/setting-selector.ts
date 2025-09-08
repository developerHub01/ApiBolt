import { createSelector } from "@reduxjs/toolkit";
import type { RootState } from "@/context/redux/store";
import type {
  ProjectSettingsInterface,
  TLayoutSetting,
} from "@/types/setting.types";

export const selectSettingBackground = createSelector(
  [
    (state: RootState) => state.setting.globalSetting,
    (state: RootState) => state.setting.settings,
  ],
  (
    globalSettings,
    localSettings
  ): {
    global: ProjectSettingsInterface;
    local: ProjectSettingsInterface;
  } => {
    return {
      global: {
        backgroundImages: globalSettings.backgroundImages,
        backgroundBlur: globalSettings.backgroundBlur,
        backgroundOpacity: globalSettings.backgroundOpacity,
        slideInterval: globalSettings.slideInterval,
        maxNumberOfImages: globalSettings.maxNumberOfImages,
      },
      local: {
        backgroundImages: localSettings?.backgroundImages,
        backgroundBlur: localSettings?.backgroundBlur,
        backgroundOpacity: localSettings?.backgroundOpacity,
        slideInterval: localSettings?.slideInterval,
        maxNumberOfImages: localSettings?.maxNumberOfImages,
      },
    };
  }
);

export const selectIsSettingOpen = createSelector(
  [(state: RootState) => state.setting.isSettingOpen],
  (isSettingOpen): boolean => isSettingOpen ?? false
);

export const selectBlurGlobal = createSelector(
  [(state: RootState) => state.setting.globalSetting.backgroundBlur],
  (backgroundBlur): number => backgroundBlur
);

export const selectBlurLocal = createSelector(
  [(state: RootState) => state.setting.settings?.backgroundBlur],
  (backgroundBlur): number | null => backgroundBlur ?? null
);

export const selectMaxImagesGlobal = createSelector(
  [(state: RootState) => state.setting.globalSetting.maxNumberOfImages],
  (maxNumberOfImages): number | null => maxNumberOfImages ?? null
);

export const selectMaxImagesLocal = createSelector(
  [(state: RootState) => state.setting.settings?.maxNumberOfImages],
  (maxNumberOfImages): number | null => maxNumberOfImages ?? null
);

export const selectOpacityGlobal = createSelector(
  [(state: RootState) => state.setting.globalSetting.backgroundOpacity],
  (backgroundOpacity): number | null => backgroundOpacity ?? null
);

export const selectOpacityLocal = createSelector(
  [(state: RootState) => state.setting.settings?.backgroundOpacity],
  (backgroundOpacity): number | null => backgroundOpacity ?? null
);

export const selectSlideIntervalGlobal = createSelector(
  [(state: RootState) => state.setting.globalSetting.slideInterval],
  (slideInterval): number | null => slideInterval ?? null
);

export const selectSlideIntervalLocal = createSelector(
  [(state: RootState) => state.setting.settings?.slideInterval],
  (slideInterval): number | null => slideInterval ?? null
);

export const selectBackgroundImagesGlobal = createSelector(
  [(state: RootState) => state.setting.globalSetting.backgroundImages],
  (backgroundImages): Array<string> => backgroundImages ?? []
);

export const selectBackgroundImagesLocal = createSelector(
  [(state: RootState) => state.setting.settings?.backgroundImages],
  (backgroundImages): Array<string> => backgroundImages ?? []
);

export const selectCodeFontSizeGlobal = createSelector(
  [(state: RootState) => state.setting.globalSetting.codeFontSize],
  (codeFontSize): number => codeFontSize
);

export const selectCodeFontSizeLocal = createSelector(
  [(state: RootState) => state.setting.settings?.codeFontSize],
  (codeFontSize): number | null => codeFontSize ?? null
);

export const selectIndentationSizeGlobal = createSelector(
  [(state: RootState) => state.setting.globalSetting.indentationSize],
  (indentationSize): number => indentationSize
);

export const selectIndentationSizeLocal = createSelector(
  [(state: RootState) => state.setting.settings?.indentationSize],
  (indentationSize): number | null => indentationSize ?? null
);

export const selectLayoutTypeGlobal = createSelector(
  [(state: RootState) => state.setting.globalSetting.layoutType],
  (layoutType): TLayoutSetting => layoutType
);

export const selectLayoutTypeLocal = createSelector(
  [(state: RootState) => state.setting.settings?.layoutType],
  (layoutType): TLayoutSetting | null => layoutType ?? null
);

export const selectIsZoomableGlobal = createSelector(
  [(state: RootState) => state.setting.globalSetting.isZoomable],
  (isZoomable): number => isZoomable
);

export const selectIsZoomableLocal = createSelector(
  [(state: RootState) => state.setting.settings?.isZoomable],
  (isZoomable): number | null => isZoomable ?? null
);

export const selectZoomLevelGlobal = createSelector(
  [(state: RootState) => state.setting.globalSetting.zoomLevel],
  (zoomLevel): number => zoomLevel
);

export const selectZoomLevelLocal = createSelector(
  [(state: RootState) => state.setting.settings?.isZoomable],
  (zoomLevel): number | null => zoomLevel ?? null
);
