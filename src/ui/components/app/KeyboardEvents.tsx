import { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "@/context/redux/hooks";
import { handleChangeIsSettingOpen } from "@/context/redux/setting/setting-slice";
import {
  updateSettings,
  updateSettingsZoomByKeyboard,
} from "@/context/redux/setting/thunk/setting-thunk";
import type { TKeyboardShortcutKey } from "@/types/setting.types";
import { useGlobal } from "@/context/global/GlobalProvider";
import { handleToggleRequestList } from "@/context/redux/request-response/request-response-slice";
import { changeActiveTab } from "@/context/redux/sidebar/sidebar-thunk";
import { handleChangeIsCookiesOpen } from "@/context/redux/cookies/cookies-slice";
import { removeTab } from "@/context/redux/request-response/thunks/tab-list";
import useCheckApplyingLayoutActivityBarVisible from "@/hooks/setting/use-check-applying-layout-activity-bar-visible";
import { selectActiveProjectId } from "@/context/redux/project/selectors/project";
import { selectApplyingKeyboardShortcutsStringFormated } from "@/context/redux/keyboard-shortcuts/selectors/keyboard-shortcuts";
import { handleChangeIsKeyboardShortcutPanelOpen } from "@/context/redux/keyboard-shortcuts/keyboard-shortcuts-slice";

const KeyboardEvents = () => {
  const dispatch = useAppDispatch();
  const { toggleFullscreen } = useGlobal();
  const activeProjectId = useAppSelector(selectActiveProjectId);
  const keybindingMap = useAppSelector(
    selectApplyingKeyboardShortcutsStringFormated
  );
  const isActivityBarVisible = useCheckApplyingLayoutActivityBarVisible();

  useEffect(() => {
    const handler = async (e: KeyboardEvent) => {
      const keyList = [];

      if (e.ctrlKey) keyList.push("ctrl");
      if (e.shiftKey) keyList.push("shift");
      if (e.altKey) keyList.push("alt");
      if (e.metaKey) keyList.push("meta");
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
        case "navigate_authorization": {
          e.preventDefault();
          await dispatch(changeActiveTab(actionId));
          return;
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
          return dispatch(handleChangeIsSettingOpen(true));
        }
        case "close_tab": {
          e.preventDefault();
          return dispatch(removeTab());
        }
      }

      if (e.ctrlKey && ["+", "-", "=", "0"].includes(e.key)) {
        return dispatch(
          updateSettingsZoomByKeyboard(e.key as TKeyboardShortcutKey)
        );
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
  ]);

  return null;
};

export default KeyboardEvents;
