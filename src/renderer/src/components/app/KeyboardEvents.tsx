import { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "@/context/redux/hooks";
import { handleChangeIsSettingOpen } from "@/context/redux/setting/setting-slice";
import {
  updateSettings,
  updateSettingsZoomByKeyboard,
} from "@/context/redux/setting/thunks/setting";
import { useGlobal } from "@/context/global/GlobalProvider";
import { changeActiveTab } from "@/context/redux/sidebar/thunks/sidebar";
import { handleChangeIsCookiesOpen } from "@/context/redux/cookies/cookies-slice";
import {
  addNewTabsData,
  addNewTabsToLeftOrRight,
  removeTab,
  shiftSelectedTab,
} from "@/context/redux/request-response/thunks/tab-list";
import useCheckApplyingLayoutActivityBarVisible from "@/hooks/setting/use-check-applying-layout-activity-bar-visible";
import { selectActiveProjectId } from "@/context/redux/project/selectors/project";
import { selectApplyingKeyboardShortcutsStrFormated } from "@/context/redux/keyboard-shortcuts/selectors/keyboard-shortcuts";
import { handleChangeIsKeyboardShortcutPanelOpen } from "@/context/redux/keyboard-shortcuts/keyboard-shortcuts-slice";
import { changeHeaderIsOpen as changeHeaderSearchIsOpen } from "@/context/redux/header/thunks/header";
import type { TKeyboardShortcutKey } from "@shared/types/setting.types";
import { MODIFIER_KEY_TRACK_ORDER } from "@/constant/keyboard-shortcut.constant";
import useToggleSidebar from "@/hooks/sidebar/use-toggle-sidebar";
import { useNavigate } from "react-router-dom";
import { SIDEBAR_THEME_MENU_ITEMS } from "@/constant/sidebar.constant";
import type { TSidebarTab } from "@shared/types/sidebar.types";
import {
  handleClearTabList,
  handleToggleTabListCollapse,
} from "@/context/redux/request-response/request-response-slice";

const KeyboardEvents = () => {
  const dispatch = useAppDispatch();
  const { toggleFullscreen } = useGlobal();
  const activeProjectId = useAppSelector(selectActiveProjectId);
  const keybindingMap = useAppSelector(
    selectApplyingKeyboardShortcutsStrFormated,
  );
  const isActivityBarVisible = useCheckApplyingLayoutActivityBarVisible();
  const handleToggleSidebar = useToggleSidebar();
  const navigate = useNavigate();

  useEffect(() => {
    const handler = async (e: KeyboardEvent) => {
      const keyList: Array<string> = [];

      MODIFIER_KEY_TRACK_ORDER.forEach(({ eventProperty, key }) => {
        if (e[eventProperty]) keyList.push(key);
      });
      if (e.key) keyList.push(e.key.toLowerCase());

      const keyString = keyList.join("+");
      const actionId = Object.entries(keybindingMap).find(
        ([, keyBindingString]) =>
          keyBindingString && keyBindingString === keyString,
      )?.[0];
      if (!actionId) return;

      switch (actionId) {
        case "navigate_projects":
        case "navigate_collections":
        case "navigate_environments":
        case "navigate_authorization": {
          e.preventDefault();
          return await dispatch(changeActiveTab(actionId));
        }
        case "navigate_themes_marketplace":
        case "navigate_themes_editor": {
          e.preventDefault();
          await dispatch(changeActiveTab(actionId as TSidebarTab));
          const path = SIDEBAR_THEME_MENU_ITEMS.find(
            item => item.id === actionId,
          )?.path;
          if (path) navigate(path);
          return;
        }
        case "toggle_activitybar": {
          e.preventDefault();
          return dispatch(
            updateSettings({
              activityBarVisible: Number(!isActivityBarVisible),
              projectId: activeProjectId,
            }),
          );
        }
        case "toggle_sidebar": {
          e.preventDefault();
          return handleToggleSidebar();
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
        /***
         * =============================
         * Tabs start
         * =============================
         * ***/
        /* open =================== */
        case "open_tab": {
          e.preventDefault();
          return dispatch(
            addNewTabsData({
              autoSelect: true,
            }),
          );
        }
        case "open_left_tab": {
          e.preventDefault();
          return dispatch(
            addNewTabsToLeftOrRight({
              type: "left",
            }),
          );
        }
        case "open_right_tab": {
          e.preventDefault();
          return dispatch(
            addNewTabsToLeftOrRight({
              type: "right",
            }),
          );
        }
        /* close =================== */
        case "close_tab": {
          e.preventDefault();
          return dispatch(
            removeTab({
              type: "current",
            }),
          );
        }
        case "close_all_tabs": {
          e.preventDefault();
          return dispatch(handleClearTabList());
        }
        case "close_other_tabs": {
          e.preventDefault();
          return dispatch(
            removeTab({
              type: "others",
            }),
          );
        }
        case "close_left_tabs": {
          e.preventDefault();
          return dispatch(
            removeTab({
              type: "all-left",
            }),
          );
        }
        case "close_right_tabs": {
          e.preventDefault();
          return dispatch(
            removeTab({
              type: "all-right",
            }),
          );
        }
        /* switch =================== */
        case "switch_left_tab": {
          e.preventDefault();
          return dispatch(
            shiftSelectedTab({
              type: "left",
            }),
          );
        }
        case "switch_right_tab": {
          e.preventDefault();
          return dispatch(
            shiftSelectedTab({
              type: "right",
            }),
          );
        }
        /* lock/unlock =================== */
        case "lock_tab": {
          e.preventDefault();
          return dispatch(handleToggleTabListCollapse());
        }
        /***
         * =============================
         * Tabs end
         * =============================
         * ***/
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
              keybindingMap[actionId]?.at(-1) as TKeyboardShortcutKey,
            ),
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
    handleToggleSidebar,
    navigate,
  ]);

  return null;
};

export default KeyboardEvents;
