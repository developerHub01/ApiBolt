import { memo } from "react";
import {
  Table,
  TableBody,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { useAppSelector } from "@/context/redux/hooks";
import {
  selectGlobalKeyboardShortcuts,
  selectLocalKeyboardShortcuts,
} from "@/context/redux/keyboard-shortcuts/selectors/keyboard-shortcuts";
import { useKeyboardShortcuts } from "@/context/keyboard-shortcuts/KeyboardShortcutsProvider";
import type { KeybaordShortCutInterface } from "@/types/keyboard-shortcut.types";
import KeyboardShortcutsRow from "@/components/app/keyboard-shortcuts/KeyboardShortcutsRow";

const KeyboardShortcutsContent = memo(() => {
  const { activeTab } = useKeyboardShortcuts();
  const keyboardShortcuts = useAppSelector(
    activeTab === "global"
      ? selectGlobalKeyboardShortcuts
      : selectLocalKeyboardShortcuts
  );

  return (
    <div className="w-full">
      <Table className="w-full border table-fixed overflow-hidden relative">
        <TableHeader className="bg-secondary font-bold">
          <TableRow className="[&>th]:border-r [&>th]:last:border-r-0">
            {["label", "Key binding"].map((label) => (
              <TableHead className="whitespace-normal p-3 capitalize">
                {label}
              </TableHead>
            ))}
          </TableRow>
        </TableHeader>
        <TableBody>
          {(
            Object.entries(keyboardShortcuts) as Array<
              [string, KeybaordShortCutInterface]
            >
          ).map(([id, { key, ...rest }]) => (
            <KeyboardShortcutsRow key={id} {...rest} keyMap={key} />
          ))}
        </TableBody>
      </Table>
    </div>
  );
});

export default KeyboardShortcutsContent;
