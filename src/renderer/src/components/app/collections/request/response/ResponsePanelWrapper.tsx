import React, { memo, useCallback, useEffect } from "react";
import { ResizablePanel } from "@/components/ui/resizable";
import { handleToggleCollapse } from "@/context/redux/request-response/request-response-slice";
import { useAppDispatch, useAppSelector } from "@/context/redux/hooks";
import { MODIFIER_KEY_TRACK_ORDER } from "@/constant/keyboard-shortcut.constant";
import { selectApplyingKeyboardShortcutsStrFormated } from "@/context/redux/keyboard-shortcuts/selectors/keyboard-shortcuts";
import { useRequestResponse } from "@/context/collections/request/RequestResponseProvider";

interface ResponsePanelWrapperProps {
  children: React.ReactNode;
}

const ResponsePanelWrapper = memo(({ children }: ResponsePanelWrapperProps) => {
  const dispatch = useAppDispatch();
  const keybindingMap = useAppSelector(
    selectApplyingKeyboardShortcutsStrFormated,
  );
  const { handleCollapse } = useRequestResponse();

  const handleResize = useCallback(
    (size: number) => {
      dispatch(
        handleToggleCollapse({
          size,
        }),
      );
    },
    [dispatch],
  );

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
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
        case "toggle_response_panel": {
          e.preventDefault();
          return handleCollapse();
        }
      }
    };

    document.addEventListener("keydown", handleKeyDown);
    return () => {
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [handleCollapse, keybindingMap]);

  return (
    <ResizablePanel
      onResize={handleResize}
      id="response-panel"
      className="min-h-11 border-t-4"
      defaultSize={0}
    >
      {children}
    </ResizablePanel>
  );
});

ResponsePanelWrapper.displayName = "Response panel wrapper";

export default ResponsePanelWrapper;
