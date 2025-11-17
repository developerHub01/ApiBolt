import { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "@/context/redux/hooks";
import { handleChangeIsSettingOpen } from "@/context/redux/setting/setting-slice";
import {
  updateSettings,
  updateSettingsZoomByKeyboard,
} from "@/context/redux/setting/thunks/setting";
import { useGlobal } from "@/context/global/GlobalProvider";
import { handleToggleRequestList } from "@/context/redux/request-response/request-response-slice";
import { changeActiveTab } from "@/context/redux/sidebar/thunks/sidebar";
import { handleChangeIsCookiesOpen } from "@/context/redux/cookies/cookies-slice";
import { removeTab } from "@/context/redux/request-response/thunks/tab-list";
import useCheckApplyingLayoutActivityBarVisible from "@/hooks/setting/use-check-applying-layout-activity-bar-visible";
import { selectActiveProjectId } from "@/context/redux/project/selectors/project";
import { selectApplyingKeyboardShortcutsStrFormated } from "@/context/redux/keyboard-shortcuts/selectors/keyboard-shortcuts";
import { handleChangeIsKeyboardShortcutPanelOpen } from "@/context/redux/keyboard-shortcuts/keyboard-shortcuts-slice";
import { changeHeaderIsOpen as changeHeaderSearchIsOpen } from "@/context/redux/header/thunks/header";
import type { TKeyboardShortcutKey } from "@/types/setting.types";
import { MODIFIER_KEY_TRACK_ORDER } from "@/constant/keyboard-shortcut.constant";
import { selectSidebarActiveTab } from "@/context/redux/sidebar/selectors/sidebar";
import { handleToggleThemeListCollapsed } from "@/context/redux/theme/theme-slice";

const KeyboardEvents = () => {
  const dispatch = useAppDispatch();
  const { toggleFullscreen } = useGlobal();
  const activeProjectId = useAppSelector(selectActiveProjectId);
  const keybindingMap = useAppSelector(
    selectApplyingKeyboardShortcutsStrFormated
  );
  const isActivityBarVisible = useCheckApplyingLayoutActivityBarVisible();
  const activeSidebarTab = useAppSelector(selectSidebarActiveTab);

  useEffect(() => {
    const handler = async (e: KeyboardEvent) => {
      const keyList = [];

      MODIFIER_KEY_TRACK_ORDER.forEach(({ eventProperty, key }) => {
        if (e[eventProperty]) keyList.push(key);
      });
      if (e.key) keyList.push(e.key.toLowerCase());

      const keyString = keyList.join("+");
      const actionId = Object.entries(keybindingMap).find(
        ([, keyBindingString]) =>
          keyBindingString && keyBindingString === keyString
      )?.[0];

      if (!actionId) return;

      switch (actionId) {
        case "navigate_projects":
        case "navigate_collections":
        case "navigate_environments":
        case "navigate_authorization":
        case "navigate_themes": {
          e.preventDefault();
          return await dispatch(changeActiveTab(actionId));
        }
        case "toggle_activitybar": {
          e.preventDefault();
          return dispatch(
            updateSettings({
              activityBarVisible: Number(!isActivityBarVisible),
              projectId: activeProjectId,
            })
          );
        }
        case "toggle_sidebar": {
          e.preventDefault();
          switch (activeSidebarTab) {
            case "navigate_collections":
              dispatch(handleToggleRequestList());
              return;
            case "navigate_themes":
              dispatch(handleToggleThemeListCollapsed());
              return;
          }
          return dispatch(handleToggleRequestList());
        }
        case "toggle_fullscreen": {
          e.preventDefault();
          return toggleFullscreen();
        }
        case "open_cookies": {
          e.preventDefault();
          return dispatch(handleChangeIsCookiesOpen(true));
        }
        case "open_keyboard_shortcut": {
          e.preventDefault();
          return dispatch(handleChangeIsKeyboardShortcutPanelOpen(true));
        }
        case "open_settings": {
          e.preventDefault();
          return dispatch(handleChangeIsSettingOpen(true));
        }
        case "close_tab": {
          e.preventDefault();
          return dispatch(removeTab());
        }
        case "search_collection": {
          e.preventDefault();
          return dispatch(changeHeaderSearchIsOpen(true));
        }
        case "zoom_in":
        case "zoom_out":
        case "zoom_reset": {
          e.preventDefault();
          const shortcutString = keybindingMap[actionId]?.at(-1);
          if (!shortcutString) return;

          return dispatch(
            updateSettingsZoomByKeyboard(
              keybindingMap[actionId]?.at(-1) as TKeyboardShortcutKey
            )
          );
        }
      }
    };

    window.addEventListener("keydown", handler);

    return () => window.removeEventListener("keydown", handler);
  }, [
    activeProjectId,
    dispatch,
    isActivityBarVisible,
    toggleFullscreen,
    keybindingMap,
    activeSidebarTab,
  ]);

  return null;
};

export default KeyboardEvents;
