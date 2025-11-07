import { memo } from "react";
import KeyboardShortcutPreview from "@/components/app/keyboard-shortcuts/keyboard-content/keyboard-preview/KeyboardShortcutPreview";
import KeyboardShortcutSearch from "@/components/app/keyboard-shortcuts/keyboard-content/keyboard-search/KeyboardShortcutSearch";
import {
  AnimatedDialogContent,
  AnimatedDialogContentScroll,
} from "@/components/ui/animated-dialog";

const KeyboardShortcutsContent = memo(() => {
  return (
    <AnimatedDialogContent>
      <KeyboardShortcutSearch />
      <AnimatedDialogContentScroll>
        <KeyboardShortcutPreview />
      </AnimatedDialogContentScroll>
    </AnimatedDialogContent>
  );
});

export default KeyboardShortcutsContent;
