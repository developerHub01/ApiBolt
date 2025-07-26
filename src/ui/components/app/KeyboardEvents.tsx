import { useEffect } from "react";
import { useAppDispatch } from "@/context/redux/hooks";
import { handleChangeIsSettingOpen } from "@/context/redux/setting/setting-slice";
import { updateSettingsZoomByKeyboard } from "@/context/redux/setting/setting-thunk";
import type { TKeyboardShortcutKey } from "@/types/setting.types";

const KeyboardEvents = () => {
  const dispatch = useAppDispatch();

  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if (e.ctrlKey && e.key === ",") {
        return dispatch(handleChangeIsSettingOpen(true));
      } else if (e.ctrlKey && ["+", "-", "=", "0"].includes(e.key)) {
        return dispatch(
          updateSettingsZoomByKeyboard(e.key as TKeyboardShortcutKey)
        );
      }
    };

    window.addEventListener("keydown", handler);

    return () => window.removeEventListener("keydown", handler);
  }, [dispatch]);

  return null;
};

export default KeyboardEvents;
