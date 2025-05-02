"use client";

import { useEffect } from "react";

const PreventDefaultActions = () => {
  useEffect(() => {
    const keyboardHandler = (e: KeyboardEvent) => {
      if (
        (e.ctrlKey &&
          ["=", "+", "-", "0", "s", "p", "u", "r", "f"].includes(
            e.key.toLowerCase()
          )) ||
        (e.ctrlKey && e.shiftKey && ["c"].includes(e.key.toLowerCase())) ||
        (e.altKey && e.shiftKey && ["f"].includes(e.key.toLowerCase())) ||
        ["F12", "F5", "F3", "F10"].includes(e.key)
      )
        e.preventDefault();
    };
    const wheelEventHandler = (e: WheelEvent) => {
      if (e.ctrlKey) e.preventDefault();
    };
    // const contextMenuHandler = (e: MouseEvent) => e.preventDefault();

    window.addEventListener("keydown", keyboardHandler, { passive: false });
    window.addEventListener("wheel", wheelEventHandler, { passive: false });
    // window.addEventListener("contextmenu", contextMenuHandler);

    return () => {
      window.removeEventListener("keydown", keyboardHandler);
      window.removeEventListener("wheel", wheelEventHandler);
      // window.removeEventListener("contextmenu", contextMenuHandler);
    };
  }, []);

  return null;
};

export default PreventDefaultActions;
