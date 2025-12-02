import {
  AnimatedDialogBottom,
  AnimatedDialogLoader,
} from "@/components/ui/animated-dialog";
import KeyboardShortcutsContent from "@/components/app/keyboard-shortcuts/keyboard-content/KeyboardShortcutsContent";
import KeyboardShortcutsTop from "@/components/app/keyboard-shortcuts/KeyboardShortcutsTop";
import KeyboardShortcutsEdit from "@/components/app/keyboard-shortcuts/keyboard-editor/KeyboardShortcutsEdit";
import { selectKeyboardShortcutsIsLoading } from "@/context/redux/status/selectors/keyboard-shortcuts";
import useShowSkeleton from "@/hooks/ui/use-show-skeleton";
import { useAppSelector } from "@/context/redux/hooks";

const KeyboardShortcutsRoot = () => {
  const isLoading = useAppSelector(selectKeyboardShortcutsIsLoading);
  const showSkeleton = useShowSkeleton(isLoading);
  return (
    <>
      <KeyboardShortcutsTop />
      <KeyboardShortcutsContent />
      <AnimatedDialogBottom>
        <p className="line-clamp-1 text-center text-muted-foreground max-w-lg text-sm">
          List of all keyboard shortcuts in the app
        </p>
      </AnimatedDialogBottom>
      <AnimatedDialogLoader isLoading={showSkeleton} />
      <KeyboardShortcutsEdit />
    </>
  );
};

export default KeyboardShortcutsRoot;
