import {
  Table,
  TableBody,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { useKeyboardShortcuts } from "@/context/keyboard-shortcuts/KeyboardShortcutsProvider";
import type { KeybaordShortCutInterface } from "@/types/keyboard-shortcut.types";
import KeyboardShortcutsRow from "@/components/app/keyboard-shortcuts/keyboard-content/keyboard-preview/KeyboardShortcutsRow";

const KeyboardShortcutPreview = () => {
  const { searchResult } = useKeyboardShortcuts();

  return (
    <Table className="w-full border table-fixed overflow-hidden relative">
      <TableHeader className="bg-secondary font-bold">
        <TableRow className="[&>th]:border-r [&>th]:last:border-r-0">
          {["action", "Key binding"].map((label) => (
            <TableHead className="whitespace-normal p-3 capitalize">
              {label}
            </TableHead>
          ))}
        </TableRow>
      </TableHeader>
      <TableBody>
        {(
          Object.entries(searchResult) as Array<
            [string, KeybaordShortCutInterface]
          >
        ).map(([id, { key, ...rest }]) => (
          <KeyboardShortcutsRow key={id} {...rest} keyMap={key} />
        ))}
      </TableBody>
    </Table>
  );
};

export default KeyboardShortcutPreview;
