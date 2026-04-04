import React, { memo, useCallback, useEffect } from "react";
import { ResizablePanel } from "@/components/ui/resizable";
import { handleToggleCollapse } from "@/context/redux/request-response/request-response-slice";
import { useAppDispatch, useAppSelector } from "@/context/redux/hooks";
import { selectApplyingKeyboardShortcutsStrFormated } from "@/context/redux/keyboard-shortcuts/selectors/keyboard-shortcuts";
import { useRequestResponse } from "@/context/collections/request/RequestResponseProvider";
import { getKeyboardTriggerKeyShortcutId } from "@/utils/keyboard-shortcut.utils";

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
      const { actionId } = getKeyboardTriggerKeyShortcutId(e, keybindingMap);
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
