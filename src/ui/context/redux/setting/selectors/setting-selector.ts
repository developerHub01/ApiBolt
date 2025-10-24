import { createSelector } from "@reduxjs/toolkit";
import type { RootState } from "@/context/redux/store";
import type { ProjectSettingsInterface } from "@/types/setting.types";

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
  (isSettingOpen) => isSettingOpen ?? false
);

export const selectBlurGlobal = createSelector(
  [(state: RootState) => state.setting.globalSetting.backgroundBlur],
  (backgroundBlur) => backgroundBlur
);

export const selectBlurLocal = createSelector(
  [(state: RootState) => state.setting.settings?.backgroundBlur],
  (backgroundBlur) => backgroundBlur ?? null
);

export const selectMaxImagesGlobal = createSelector(
  [(state: RootState) => state.setting.globalSetting.maxNumberOfImages],
  (maxNumberOfImages) => maxNumberOfImages ?? null
);

export const selectMaxImagesLocal = createSelector(
  [(state: RootState) => state.setting.settings?.maxNumberOfImages],
  (maxNumberOfImages) => maxNumberOfImages ?? null
);

export const selectOpacityGlobal = createSelector(
  [(state: RootState) => state.setting.globalSetting.backgroundOpacity],
  (backgroundOpacity) => backgroundOpacity ?? null
);

export const selectOpacityLocal = createSelector(
  [(state: RootState) => state.setting.settings?.backgroundOpacity],
  (backgroundOpacity) => backgroundOpacity ?? null
);

export const selectSlideIntervalGlobal = createSelector(
  [(state: RootState) => state.setting.globalSetting.slideInterval],
  (slideInterval) => slideInterval ?? null
);

export const selectSlideIntervalLocal = createSelector(
  [(state: RootState) => state.setting.settings?.slideInterval],
  (slideInterval) => slideInterval ?? null
);

export const selectBackgroundImagesGlobal = createSelector(
  [(state: RootState) => state.setting.globalSetting.backgroundImages],
  (backgroundImages) => backgroundImages ?? null
);

export const selectBackgroundImagesLocal = createSelector(
  [(state: RootState) => state.setting.settings?.backgroundImages],
  (backgroundImages) => backgroundImages ?? null
);

export const selectCodeFontSizeGlobal = createSelector(
  [(state: RootState) => state.setting.globalSetting.codeFontSize],
  (codeFontSize) => codeFontSize
);

export const selectCodeFontSizeLocal = createSelector(
  [(state: RootState) => state.setting.settings?.codeFontSize],
  (codeFontSize) => codeFontSize ?? null
);

export const selectIndentationSizeGlobal = createSelector(
  [(state: RootState) => state.setting.globalSetting.indentationSize],
  (indentationSize) => indentationSize
);

export const selectIndentationSizeLocal = createSelector(
  [(state: RootState) => state.setting.settings?.indentationSize],
  (indentationSize) => indentationSize ?? null
);

export const selectLayoutTypeGlobal = createSelector(
  [(state: RootState) => state.setting.globalSetting.layoutType],
  (layoutType) => layoutType
);

export const selectLayoutTypeLocal = createSelector(
  [(state: RootState) => state.setting.settings?.layoutType],
  (layoutType) => layoutType ?? null
);

export const selectIsZoomableGlobal = createSelector(
  [(state: RootState) => state.setting.globalSetting.isZoomable],
  (isZoomable) => isZoomable
);

export const selectIsZoomableLocal = createSelector(
  [(state: RootState) => state.setting.settings?.isZoomable],
  (isZoomable) => isZoomable ?? null
);

export const selectZoomLevelGlobal = createSelector(
  [(state: RootState) => state.setting.globalSetting.zoomLevel],
  (zoomLevel) => zoomLevel
);

export const selectActivityBarVisibleLocal = createSelector(
  [(state: RootState) => state.setting.settings?.activityBarVisible],
  (activityBarVisible) => activityBarVisible ?? null
);

export const selectActivityBarVisibleGlobal = createSelector(
  [(state: RootState) => state.setting.globalSetting.activityBarVisible],
  (activityBarVisible) => activityBarVisible
);

export const selectZoomLevelLocal = createSelector(
  [(state: RootState) => state.setting.settings?.zoomLevel],
  (zoomLevel) => zoomLevel ?? null
);
