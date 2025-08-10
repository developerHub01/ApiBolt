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
