import { useAppSelector } from "@/context/redux/hooks";
import { selectApplyingKeyboardShortcutsById } from "@/context/redux/keyboard-shortcuts/selectors/keyboard-shortcuts";
import { keyListStringify } from "@/utils/keyboard-shortcut.utils";

const ShortcutText = () => {
  const shortcuts = useAppSelector(state =>
    selectApplyingKeyboardShortcutsById(state, "close_tab"),
  );

  const shortcutString =
    Array.isArray(shortcuts) && shortcuts.length
      ? ` (${keyListStringify(shortcuts)})`
      : "";

  if (!shortcutString) return null;

  return <p>Close Tab {shortcutString}</p>;
};

export default ShortcutText;
