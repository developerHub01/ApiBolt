import { memo } from "react";
import KeyboardShortcutPreview from "@/components/app/keyboard-shortcuts/keyboard-content/keyboard-preview/KeyboardShortcutPreview";
import KeyboardShortcutSearch from "@/components/app/keyboard-shortcuts/keyboard-content/keyboard-search/KeyboardShortcutSearch";

const KeyboardShortcutsContent = memo(() => {
  return (
    <div className="w-full min-h-0 flex flex-1 flex-col p-2">
      <KeyboardShortcutSearch />
      <KeyboardShortcutPreview />
    </div>
  );
});

export default KeyboardShortcutsContent;
