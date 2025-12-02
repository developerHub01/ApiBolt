import { memo, lazy, Suspense, useCallback } from "react";
import { useAppDispatch, useAppSelector } from "@/context/redux/hooks";
import { AnimatedDialogContentWrapper } from "@/components/ui/animated-dialog";
import { AnimatedDialog } from "@/components/ui/animated-dialog";
import { handleChangeIsKeyboardShortcutPanelOpen } from "@/context/redux/keyboard-shortcuts/keyboard-shortcuts-slice";
import KeyboardShortcutsProvider from "@/context/keyboard-shortcuts/KeyboardShortcutsProvider";
import { selectIsKeyboardShortcutPanelOpen } from "@/context/redux/keyboard-shortcuts/selectors/keyboard-shortcuts";
const KeyboardShortcutsRoot = lazy(
  () => import("@/components/app/keyboard-shortcuts/KeyboardShortcutsRoot")
);
import KeyboardShortcutsFallback from "@/fallback/KeyboardShortcutsFallback";

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
        <AnimatedDialogContentWrapper className="max-w-3xl">
          <Suspense fallback={<KeyboardShortcutsFallback />}>
            <KeyboardShortcutsRoot />
          </Suspense>
        </AnimatedDialogContentWrapper>
      </AnimatedDialog>
    </KeyboardShortcutsProvider>
  );
});

export default KeyboardShortcuts;
