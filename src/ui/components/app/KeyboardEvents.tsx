import { useEffect } from "react";
import { useAppDispatch } from "@/context/redux/hooks";
import { handleChangeIsSettingOpen } from "@/context/redux/setting/setting-slice";
import { updateSettingsZoomByKeyboard } from "@/context/redux/setting/thunk/setting-thunk";
import type { TKeyboardShortcutKey } from "@/types/setting.types";
import { useGlobal } from "@/context/global/GlobalProvider";
import { handleToggleRequestList } from "@/context/redux/request-response/request-response-slice";
import { changeActiveTab } from "@/context/redux/sidebar/sidebar-thunk";
import { handleChangeIsCookiesOpen } from "@/context/redux/cookies/cookies-slice";

const KeyboardEvents = () => {
  const dispatch = useAppDispatch();
  const { toggleFullscreen } = useGlobal();

  useEffect(() => {
    const handler = async (e: KeyboardEvent) => {
      if (e.ctrlKey && e.key === ",") {
        return dispatch(handleChangeIsSettingOpen(true));
      } else if (e.ctrlKey && e.altKey && e.key === "c") {
        return dispatch(handleChangeIsCookiesOpen(true));
      } else if (e.key === "F11") {
        return toggleFullscreen();
      } else if (e.ctrlKey && ["+", "-", "=", "0"].includes(e.key)) {
        return dispatch(
          updateSettingsZoomByKeyboard(e.key as TKeyboardShortcutKey)
        );
      } else if (
        e.ctrlKey &&
        !e.shiftKey &&
        !e.altKey &&
        !e.metaKey &&
        e.key.toLowerCase() === "b"
      ) {
        e.preventDefault();
        dispatch(handleToggleRequestList());
      } else if (
        e.ctrlKey &&
        e.shiftKey &&
        !e.altKey &&
        !e.metaKey &&
        e.key.toLowerCase() === "p"
      ) {
        e.preventDefault();
        await dispatch(changeActiveTab("projects"));
      } else if (
        e.ctrlKey &&
        e.shiftKey &&
        !e.altKey &&
        !e.metaKey &&
        e.key.toLowerCase() === "c"
      ) {
        e.preventDefault();
        await dispatch(changeActiveTab("collections"));
      } else if (
        e.ctrlKey &&
        e.shiftKey &&
        !e.altKey &&
        !e.metaKey &&
        e.key.toLowerCase() === "e"
      ) {
        e.preventDefault();
        await dispatch(changeActiveTab("environments"));
      } else if (
        e.ctrlKey &&
        e.shiftKey &&
        !e.altKey &&
        !e.metaKey &&
        e.key.toLowerCase() === "a"
      ) {
        e.preventDefault();
        await dispatch(changeActiveTab("authorization"));
      }
    };

    window.addEventListener("keydown", handler);

    return () => window.removeEventListener("keydown", handler);
  }, [dispatch, toggleFullscreen]);

  return null;
};

export default KeyboardEvents;
