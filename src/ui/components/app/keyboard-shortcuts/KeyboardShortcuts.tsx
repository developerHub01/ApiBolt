import { memo, useCallback } from "react";
import { useAppDispatch, useAppSelector } from "@/context/redux/hooks";
import {
  AnimatedDialogBottom,
  AnimatedDialogContentWrapper,
  AnimatedDialogLoader,
} from "@/components/ui/animated-dialog";
import { AnimatedDialog } from "@/components/ui/animated-dialog";
import { handleChangeIsKeyboardShortcutPanelOpen } from "@/context/redux/keyboard-shortcuts/keyboard-shortcuts-slice";
import KeyboardShortcutsContent from "@/components/app/keyboard-shortcuts/keyboard-content/KeyboardShortcutsContent";
import KeyboardShortcutsTop from "@/components/app/keyboard-shortcuts/KeyboardShortcutsTop";
import KeyboardShortcutsProvider from "@/context/keyboard-shortcuts/KeyboardShortcutsProvider";
import { selectIsKeyboardShortcutPanelOpen } from "@/context/redux/keyboard-shortcuts/selectors/keyboard-shortcuts";
import KeyboardShortcutsEdit from "@/components/app/keyboard-shortcuts/keyboard-editor/KeyboardShortcutsEdit";
import { selectKeyboardShortcutsIsLoading } from "@/context/redux/status/selectors/keyboard-shortcuts";
import useShowSkeleton from "@/hooks/ui/use-show-skeleton";

const KeyboardShortcuts = memo(() => {
  const dispatch = useAppDispatch();
  const isOpen = useAppSelector(selectIsKeyboardShortcutPanelOpen);
  const isLoading = useAppSelector(selectKeyboardShortcutsIsLoading);
  const showSkeleton = useShowSkeleton(isLoading);

  const handleClose = useCallback(
    () => dispatch(handleChangeIsKeyboardShortcutPanelOpen(false)),
    [dispatch]
  );

  return (
    <KeyboardShortcutsProvider>
      <AnimatedDialog isOpen={isOpen} onClose={handleClose}>
        <AnimatedDialogContentWrapper className="max-w-3xl">
          <KeyboardShortcutsTop />
          <KeyboardShortcutsContent />
          <AnimatedDialogBottom>
            <p className="line-clamp-1 text-center text-muted-foreground max-w-lg text-sm">
              List of all keyboard shortcuts in the app
            </p>
          </AnimatedDialogBottom>
          <AnimatedDialogLoader isLoading={showSkeleton} />
          <KeyboardShortcutsEdit />
        </AnimatedDialogContentWrapper>
      </AnimatedDialog>
    </KeyboardShortcutsProvider>
  );
});

export default KeyboardShortcuts;
