import { useAppDispatch, useAppSelector } from "@/context/redux/hooks";
import { selectKeyboardShortcutEditingId } from "@/context/redux/keyboard-shortcuts/selectors/editing";
import { handleChangeEditingId } from "@/context/redux/keyboard-shortcuts/keyboard-shortcuts-slice";
import {
  AnimatedDialog,
  AnimatedDialogContentWrapper,
} from "@/components/ui/animated-dialog";
import KeyboardShortcutsEditContent from "@/components/app/keyboard-shortcuts/keyboard-editor/KeyboardShortcutsEditContent";

const KeyboardShortcutsEdit = () => {
  const dispatch = useAppDispatch();
  const shortcutId = useAppSelector(selectKeyboardShortcutEditingId);

  const handleClose = () => dispatch(handleChangeEditingId());

  return (
    <AnimatedDialog isOpen={Boolean(shortcutId)} onClose={handleClose}>
      <AnimatedDialogContentWrapper className="border bg-background/60 max-w-[400px] max-h-60">
        <KeyboardShortcutsEditContent shortcutId={shortcutId!} />
      </AnimatedDialogContentWrapper>
    </AnimatedDialog>
  );
};

export default KeyboardShortcutsEdit;
