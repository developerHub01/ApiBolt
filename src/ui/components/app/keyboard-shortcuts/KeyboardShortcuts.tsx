import { memo, useCallback } from "react";
import { useAppDispatch, useAppSelector } from "@/context/redux/hooks";
import {
  AnimatedDialogBottom,
  AnimatedDialogContent,
  AnimatedDialogContentWrapper,
} from "@/components/ui/animated-dialog";
import { AnimatedDialog } from "@/components/ui/animated-dialog";
import LoadCookies from "@/components/app/cookies/LoadCookies";
import { handleChangeIsKeyboardShortcutPanelOpen } from "@/context/redux/keyboard-shortcuts/keyboard-shortcuts-slice";
import KeyboardShortcutsContent from "@/components/app/keyboard-shortcuts/KeyboardShortcutsContent";
import KeyboardShortcutsTop from "@/components/app/keyboard-shortcuts/KeyboardShortcutsTop";
import KeyboardShortcutsProvider from "@/context/keyboard-shortcuts/KeyboardShortcutsProvider";
import { selectIsKeyboardShortcutPanelOpen } from "@/context/redux/keyboard-shortcuts/selectors/keyboard-shortcuts";
import KeyboardShortcutsEdit from "@/components/app/keyboard-shortcuts/keyboard-editor/KeyboardShortcutsEdit";

const KeyboardShortcuts = memo(() => {
  const dispatch = useAppDispatch();
  const isOpen = useAppSelector(selectIsKeyboardShortcutPanelOpen);

  const handleClose = useCallback(
    () => dispatch(handleChangeIsKeyboardShortcutPanelOpen(false)),
    [dispatch]
  );

  return (
    <KeyboardShortcutsProvider>
      <AnimatedDialog isOpen={isOpen} onClose={handleClose}>
        <AnimatedDialogContentWrapper className="border bg-background/60 max-w-3xl">
          <KeyboardShortcutsTop />
          <AnimatedDialogContent>
            <KeyboardShortcutsContent />
          </AnimatedDialogContent>
          <AnimatedDialogBottom>
            <p className="line-clamp-1 text-center max-w-lg text-sm">
              List of all keybindings in the app
            </p>
          </AnimatedDialogBottom>
          <LoadCookies />
          <KeyboardShortcutsEdit />
        </AnimatedDialogContentWrapper>
      </AnimatedDialog>
    </KeyboardShortcutsProvider>
  );
});

export default KeyboardShortcuts;
